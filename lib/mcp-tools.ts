// lib/mcp-tools.ts
import { tool } from 'ai'
import { z } from 'zod'

// Define your MCP tools
export const mcpTools = {
  // Tool 1: Get hello message
  get_hello_message: tool({
    description: 'Get a hello message from the server',
    inputSchema: z.object({}), // No parameters needed
    execute: async () => {
      // Fetch data from your API
      const response = await fetch('http://localhost:3000/api/hello')
      const data = await response.json()
      return data
    },
  }),

  // Tool 2: Get current time
  get_current_time: tool({
    description: 'Get the current server time',
    inputSchema: z.object({}),
    execute: async () => {
      return {
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    },
  }),
}
