use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::errors::PayrollError;
use crate::states::Organization;

pub fn withdraw(ctx: Context<WithdrawCtx>, amount: u64) -> Result<()> {
    require!(amount > 0, PayrollError::InvalidAmount);
    require!(
        ctx.accounts.org.treasury >= amount,
        PayrollError::InsufficientFunds
    );

    let org = &ctx.accounts.org;
    let authority_key = ctx.accounts.authority.key();
    let name_bytes = org.name.as_bytes();
    let bump_ref = &[org.bump];
    let org_seeds = &[
        b"org".as_ref(),
        authority_key.as_ref(),
        name_bytes,
        bump_ref,
    ];
    let org_signer = &[&org_seeds[..]];

    let cpi_accounts = system_program::Transfer {
        from: ctx.accounts.org.to_account_info(),
        to: ctx.accounts.authority.to_account_info(),
    };
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.system_program.to_account_info(),
        cpi_accounts,
        org_signer,
    );
    system_program::transfer(cpi_ctx, amount)?;

    ctx.accounts.org.treasury -= amount;
    msg!("Withdrawn {} lamports from treasury", amount);
    Ok(())
}

#[derive(Accounts)]
pub struct WithdrawCtx<'info> {
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
}