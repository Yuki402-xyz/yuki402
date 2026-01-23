import { PublicKey } from '@solana/web3.js'
import { YUKI_TOKEN_MINT, YUKI_DECIMALS, SOLANA_RPC_ENDPOINT } from '../constants'

describe('Constants', () => {
  describe('YUKI_TOKEN_MINT', () => {
    it('should be a valid PublicKey instance', () => {
      expect(YUKI_TOKEN_MINT).toBeInstanceOf(PublicKey)
    })

    it('should have the correct address', () => {
      expect(YUKI_TOKEN_MINT.toString()).toBe('YUKITokenMintAddress11111111111111111111111')
    })
  })

  describe('YUKI_DECIMALS', () => {
    it('should be set to 9', () => {
      expect(YUKI_DECIMALS).toBe(9)
    })

    it('should be a number', () => {
      expect(typeof YUKI_DECIMALS).toBe('number')
    })
  })

  describe('SOLANA_RPC_ENDPOINT', () => {
    it('should use environment variable if set', () => {
      // Note: In test environment, this will use the mocked value from jest.setup.js
      expect(SOLANA_RPC_ENDPOINT).toBeDefined()
      expect(typeof SOLANA_RPC_ENDPOINT).toBe('string')
    })

    it('should be a valid URL format', () => {
      expect(SOLANA_RPC_ENDPOINT).toMatch(/^https?:\/\//)
    })
  })
})
