┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   MCP Server     │    │   Solana        │
│ (Next.js/TS)    │◄──►│ (Node.js/LLM)    │◄──►│   Blockchain    │
│                 │    │                  │    │ (Rust/Anchor)   │
│ - Home Page     │    │ - LLM Function   │    │                 │
│ - Dashboard     │    │   Calling        │    │ - Payroll PDA   │
│   + Chat UI     │    │ - Tx Signing     │    │ - Instructions  │
│ - Wallet Connect│    │ - RPC Integration│    │   (CreateOrg,   │
└─────────────────┘    └──────────────────┘    │    AddWorker,   │
                                               │    FundTreasury,│
                                               │    Withdraw)    │
                                               └─────────────────┘