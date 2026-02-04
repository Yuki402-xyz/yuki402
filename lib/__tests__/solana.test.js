// Mock the dependencies first
import { Connection, PublicKey } from '@solana/web3.js'
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token'
import { getYukiTokenBalance } from '../solana'

jest.mock('@solana/web3.js', () => ({
  Connection: jest.fn(),
  PublicKey: jest.fn().mockImplementation((key) => ({
    toString: () => key,
    toBase58: () => key
  }))
}))

jest.mock('@solana/spl-token', () => ({
  getAssociatedTokenAddress: jest.fn(),
  getAccount: jest.fn()
}))

describe('getYukiTokenBalance', () => {
  const mockWalletPublicKey = { toString: () => '11111111111111111111111111111111' }
  const mockTokenAccountAddress = { toString: () => '22222222222222222222222222222222' }

  beforeEach(() => {
    jest.clearAllMocks()

    // Mock Connection constructor
    Connection.mockImplementation(() => ({
      getBalance: jest.fn(),
      getAccountInfo: jest.fn()
    }))

    // Mock getAssociatedTokenAddress
    getAssociatedTokenAddress.mockResolvedValue(mockTokenAccountAddress)
  })

  it('should return formatted balance when token account exists', async () => {
    const mockTokenAccount = {
      amount: BigInt(1500000000000) // 1500 tokens with 9 decimals
    }

    getAccount.mockResolvedValue(mockTokenAccount)

    const balance = await getYukiTokenBalance(mockWalletPublicKey)

    expect(balance).toBe('1,500')
    expect(getAssociatedTokenAddress).toHaveBeenCalled()
    expect(getAccount).toHaveBeenCalled()
  })

  it('should return "0" when token account does not exist', async () => {
    const error = new Error('Token account not found')
    error.name = 'TokenAccountNotFoundError'
    getAccount.mockRejectedValue(error)

    const balance = await getYukiTokenBalance(mockWalletPublicKey)

    expect(balance).toBe('0')
  })

  it('should return "0" when an unexpected error occurs in token account fetch', async () => {
    const error = new Error('Unexpected error')
    error.name = 'SomeOtherError'
    getAccount.mockRejectedValue(error)

    const balance = await getYukiTokenBalance(mockWalletPublicKey)

    expect(balance).toBe('0')
  })

  it('should return "0" when an error occurs in connection setup', async () => {
    getAssociatedTokenAddress.mockRejectedValue(new Error('Connection failed'))

    const balance = await getYukiTokenBalance(mockWalletPublicKey)

    expect(balance).toBe('0')
  })

  it('should format balance with decimals correctly', async () => {
    const mockTokenAccount = {
      amount: BigInt(1234567890) // 1.23456789 tokens with 9 decimals
    }

    getAccount.mockResolvedValue(mockTokenAccount)

    const balance = await getYukiTokenBalance(mockWalletPublicKey)

    expect(balance).toBe('1.23')
  })

  it('should format large balance with commas', async () => {
    const mockTokenAccount = {
      amount: BigInt(12345678900000000) // 12,345,678.90 tokens with 9 decimals
    }

    getAccount.mockResolvedValue(mockTokenAccount)

    const balance = await getYukiTokenBalance(mockWalletPublicKey)

    expect(balance).toBe('12,345,678.9')
  })

  it('should handle zero balance', async () => {
    const mockTokenAccount = {
      amount: BigInt(0)
    }

    getAccount.mockResolvedValue(mockTokenAccount)

    const balance = await getYukiTokenBalance(mockWalletPublicKey)

    expect(balance).toBe('0')
  })

  it('should floor decimal values to 2 places', async () => {
    const mockTokenAccount = {
      amount: BigInt(123999999) // 0.123999999 tokens with 9 decimals
    }

    getAccount.mockResolvedValue(mockTokenAccount)

    const balance = await getYukiTokenBalance(mockWalletPublicKey)

    expect(balance).toBe('0.12')
  })
})
