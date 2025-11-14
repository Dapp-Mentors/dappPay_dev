#![allow(unexpected_cfgs)]

use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod states;

use instructions::*;

declare_id!("A9fnM3skS5kbECt2isFV2EGvS4D7hnsMjnqi2YBwaeed");

#[program]
pub mod payroll_program {
    use super::*;

    pub fn create_org(ctx: Context<CreateOrgCtx>, name: String) -> Result<()> {
        instructions::create_org(ctx, name)
    }

    pub fn add_worker(ctx: Context<AddWorkerCtx>, salary: u64) -> Result<()> {
        instructions::add_worker(ctx, salary)
    }

    pub fn fund_treasury(ctx: Context<FundTreasuryCtx>, amount: u64) -> Result<()> {
        instructions::fund_treasury(ctx, amount)
    }

    pub fn process_payroll<'info>(
        ctx: Context<'_, '_, 'info, 'info, ProcessPayrollCtx<'info>>,
        cycle_timestamp: u64,
    ) -> Result<()> {
        instructions::process_payroll(ctx, cycle_timestamp)
    }

    pub fn withdraw(ctx: Context<WithdrawCtx>, amount: u64) -> Result<()> {
        instructions::withdraw(ctx, amount)
    }
}
