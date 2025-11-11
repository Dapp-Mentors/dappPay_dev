import { Message, PayrollSummary } from './types'

const MOCK_NOW = Date.now()

export const INITIAL_MESSAGES: Message[] = [
  {
    role: 'bot',
    content: `Hello! I'm your AI payroll assistant. How can I help you today?`,
    timestamp: new Date(),
  },
]

export const MOCK_PAYROLLS: PayrollSummary[] = [
  {
    id: '1',
    orgName: 'Tech Corp',
    treasury: 5000000000,
    workers: [
      {
        pubkey: 'ABC...XYZ',
        salary: 1000000000,
        lastPaid: MOCK_NOW - 86400000,
      },
      {
        pubkey: 'DEF...UVW',
        salary: 1500000000,
        lastPaid: MOCK_NOW - 86400000,
      },
    ],
  },
  {
    id: '2',
    orgName: 'Design Studio',
    treasury: 3000000000,
    workers: [
      {
        pubkey: 'GHI...RST',
        salary: 800000000,
        lastPaid: MOCK_NOW - 172800000,
      },
    ],
  },
]
