use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Worker {
    pub org: Pubkey,
    pub worker_pubkey: Pubkey,
    pub salary: u64,
    pub last_paid_cycle: u64,
    pub bump: u8,
}