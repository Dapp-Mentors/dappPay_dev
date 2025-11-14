// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai'
import { streamText, convertToModelMessages, stepCountIs } from 'ai'
import { mcpTools } from '@/lib/mcp-tools'

export async function POST(request: Request) {
  // Get the user's message
  const { messages } = await request.json()

  // Call OpenAI with MCP tools
  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToModelMessages(messages), // Convert UI messages to model format
    tools: mcpTools, // Give AI access to your tools
    stopWhen: stepCountIs(5), // Allow up to 5 steps (e.g., multiple tool calls and iterations)
  })

  // Stream structured UI response (text + tool events) back to the user
  return result.toUIMessageStreamResponse()
}
