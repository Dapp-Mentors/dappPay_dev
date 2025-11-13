use crate::errors::PayrollError;
use crate::states::{Organization, Worker};
use anchor_lang::prelude::*;
use anchor_lang::system_program;

pub fn process_payroll<'info>(
    ctx: Context<'_, '_, 'info, 'info, ProcessPayrollCtx<'info>>,
    cycle_timestamp: u64,
) -> Result<()> {
    let num_workers = ctx.accounts.org.workers_count as usize;
    let num_expected_accounts = num_workers * 2;

    require!(
        ctx.remaining_accounts.len() == num_expected_accounts,
        PayrollError::MissingWorkerAccount
    );

    let org_key = ctx.accounts.org.key();
    let program_id = *ctx.program_id;

    // First pass: Calculate total payout and validate all accounts
    let mut total_payout = 0u64;
    for i in 0..num_workers {
        let pda_idx = i * 2;
        let wallet_idx = pda_idx + 1;

        let pda_ai = &ctx.remaining_accounts[pda_idx];
        let wallet_ai = &ctx.remaining_accounts[wallet_idx];

        // Verify worker PDA
        let worker_wallet_key = wallet_ai.key();
        let worker_pda_seeds = &[
            b"worker".as_ref(),
            org_key.as_ref(),
            worker_wallet_key.as_ref(),
        ];
        let (expected_pda, _) = Pubkey::find_program_address(worker_pda_seeds, &program_id);

        require_keys_eq!(pda_ai.key(), expected_pda, PayrollError::InvalidWorkerPDA);

        let worker = Account::<Worker>::try_from(pda_ai)?;

        if worker.last_paid_cycle < cycle_timestamp {
            total_payout = total_payout
                .checked_add(worker.salary)
                .ok_or(PayrollError::InsufficientFunds)?;
        }
    }

    require!(
        ctx.accounts.org.treasury >= total_payout,
        PayrollError::InsufficientFunds
    );

    // Prepare org signer seeds before the loop
    let authority_key = ctx.accounts.authority.key();
    let org_name = ctx.accounts.org.name.clone();
    let org_bump = ctx.accounts.org.bump;
    let name_bytes = org_name.as_bytes();
    let bump_array = [org_bump];
    let org_seeds: &[&[u8]] = &[b"org", authority_key.as_ref(), name_bytes, &bump_array];
    let org_signer = &[org_seeds];

    // Second pass: Process payments
    for i in 0..num_workers {
        let pda_idx = i * 2;
        let wallet_idx = pda_idx + 1;

        let pda_ai = &ctx.remaining_accounts[pda_idx];
        let wallet_ai = &ctx.remaining_accounts[wallet_idx];

        let mut worker = Account::<Worker>::try_from(pda_ai)?;

        if worker.last_paid_cycle < cycle_timestamp {
            let salary_amount = worker.salary;

            // Update worker data
            worker.last_paid_cycle = cycle_timestamp;

            // Serialize updated worker data
            let mut data = pda_ai.try_borrow_mut_data()?;
            worker.try_serialize(&mut &mut data[..])?;
            drop(data); // Release the borrow

            // Transfer salary
            let cpi_accounts = system_program::Transfer {
                from: ctx.accounts.org.to_account_info(),
                to: wallet_ai.to_account_info(),
            };
            let cpi_ctx = CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                cpi_accounts,
                org_signer,
            );
            system_program::transfer(cpi_ctx, salary_amount)?;

            // Update treasury
            ctx.accounts.org.treasury = ctx.accounts.org.treasury.saturating_sub(salary_amount);
        }
    }

    msg!(
        "Payroll processed for org '{}': {} lamports paid to {} workers",
        org_name,
        total_payout,
        num_workers
    );
    Ok(())
}

#[derive(Accounts)]
pub struct ProcessPayrollCtx<'info> {
    #[account(
        mut,
        has_one = authority @ PayrollError::Unauthorized,
        seeds = [b"org", authority.key().as_ref(), org.name.as_bytes()],
        bump = org.bump
    )]
    pub org: Account<'info, Organization>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
    // Workers and their wallet pubkeys provided as remaining_accounts
    // (alternating: worker_pda, worker_wallet)
}
