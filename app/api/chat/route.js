import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'

export const maxDuration = 120

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': 'https://yuki402.xyz',
    'X-Title': 'Yuki402'
  }
})

export async function POST (req) {
  const { messages } = await req.json()

  console.log('Received messages:', JSON.stringify(messages, null, 2))

  // System prompt loaded from environment variable for security
  const systemPrompt = process.env.YUKI_SYSTEM_PROMPT

  const result = streamText({
    model: openrouter('google/gemini-3-flash-preview'),
    system: systemPrompt,
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.parts?.[0]?.text || msg.content || ''
    })),
    temperature: 0.7,
    maxTokens: 6000
  })

  return result.toUIMessageStreamResponse()
}
