// Mock the AI SDK and OpenRouter provider before importing
jest.mock('@openrouter/ai-sdk-provider', () => ({
  createOpenRouter: jest.fn(() => jest.fn()),
}))

jest.mock('ai', () => ({
  streamText: jest.fn(),
}))

import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'
import { POST, maxDuration } from '../route'

describe('Chat API Route', () => {
  let mockToUIMessageStreamResponse

  beforeEach(() => {
    jest.clearAllMocks()

    // Set up environment variables
    process.env.OPENROUTER_API_KEY = 'test-api-key'
    process.env.YUKI_SYSTEM_PROMPT = 'You are Yuki, a helpful AI assistant.'

    // Mock the response
    mockToUIMessageStreamResponse = jest.fn(() => ({
      status: 200,
      body: 'mock-stream',
    }))

    streamText.mockReturnValue({
      toUIMessageStreamResponse: mockToUIMessageStreamResponse,
    })

    createOpenRouter.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    delete process.env.OPENROUTER_API_KEY
    delete process.env.YUKI_SYSTEM_PROMPT
  })

  describe('maxDuration', () => {
    it('should be set to 120 seconds', () => {
      expect(maxDuration).toBe(120)
    })
  })

  describe('POST handler', () => {
    it('should process messages and return stream response', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          messages: [
            {
              role: 'user',
              content: 'Hello, Yuki!',
            },
          ],
        }),
      }

      const response = await POST(mockRequest)

      expect(mockRequest.json).toHaveBeenCalled()
      expect(streamText).toHaveBeenCalledWith(
        expect.objectContaining({
          system: 'You are Yuki, a helpful AI assistant.',
          messages: [
            {
              role: 'user',
              content: 'Hello, Yuki!',
            },
          ],
          temperature: 0.7,
          maxTokens: 6000,
        })
      )
      expect(mockToUIMessageStreamResponse).toHaveBeenCalled()
      expect(response).toEqual({
        status: 200,
        body: 'mock-stream',
      })
    })

    it('should handle messages with parts structure', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          messages: [
            {
              role: 'user',
              parts: [{ text: 'Message with parts' }],
            },
          ],
        }),
      }

      await POST(mockRequest)

      expect(streamText).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: [
            {
              role: 'user',
              content: 'Message with parts',
            },
          ],
        })
      )
    })

    it('should handle messages with content field', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          messages: [
            {
              role: 'assistant',
              content: 'Direct content message',
            },
          ],
        }),
      }

      await POST(mockRequest)

      expect(streamText).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: [
            {
              role: 'assistant',
              content: 'Direct content message',
            },
          ],
        })
      )
    })

    it('should handle empty content gracefully', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          messages: [
            {
              role: 'user',
            },
          ],
        }),
      }

      await POST(mockRequest)

      expect(streamText).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: [
            {
              role: 'user',
              content: '',
            },
          ],
        })
      )
    })

    it('should handle multiple messages', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          messages: [
            {
              role: 'user',
              content: 'First message',
            },
            {
              role: 'assistant',
              content: 'Response',
            },
            {
              role: 'user',
              content: 'Second message',
            },
          ],
        }),
      }

      await POST(mockRequest)

      expect(streamText).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: [
            { role: 'user', content: 'First message' },
            { role: 'assistant', content: 'Response' },
            { role: 'user', content: 'Second message' },
          ],
        })
      )
    })

    it('should call streamText with correct parameters', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          messages: [{ role: 'user', content: 'Test message' }],
        }),
      }

      await POST(mockRequest)

      expect(streamText).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: 0.7,
          maxTokens: 6000,
          system: 'You are Yuki, a helpful AI assistant.',
        })
      )
    })
  })
})
