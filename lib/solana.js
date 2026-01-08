import { Connection, PublicKey } from '@solana/web3.js'
import { SOLANA_RPC_ENDPOINT } from './constants'

/**
 * Fetch the SOL balance for a given wallet address
 * @param {PublicKey} walletPublicKey - The wallet's public key
 * @returns {Promise<string>} - Formatted balance string in SOL
 */
export async function getSolBalance (walletPublicKey) {
  try {
    const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed')

    // Get the balance in lamports (1 SOL = 1,000,000,000 lamports)
    const balanceInLamports = await connection.getBalance(walletPublicKey)

    // Convert lamports to SOL
    const balanceInSol = balanceInLamports / 1_000_000_000

    // Format the balance
    return formatBalance(balanceInSol)
  } catch (error) {
    console.error('Error fetching SOL balance:', error)
    return '0'
  }
}

/**
 * Format a number with commas for display
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
function formatBalance (num) {
  // Round to 3 decimal places
  const rounded = Math.floor(num * 1000) / 1000

  // Add commas
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
  })
}
