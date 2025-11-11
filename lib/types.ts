export interface Message {
  role: 'user' | 'bot'
  content: string
  timestamp: Date
}

export interface WorkerSummary {
  pubkey: string
  salary: number
  lastPaid: number
}

export interface PayrollSummary {
  id: string
  orgName: string
  treasury: number
  workers: WorkerSummary[]
}
