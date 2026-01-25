import { render, screen } from '@testing-library/react'
import WalletContextProvider from '../WalletProvider'

// Mock Solana wallet adapter modules
jest.mock('@solana/wallet-adapter-wallets', () => ({
  PhantomWalletAdapter: jest.fn().mockImplementation(() => ({
    name: 'Phantom',
    url: 'https://phantom.app',
    icon: 'phantom-icon',
  })),
}))

jest.mock('@solana/web3.js', () => ({
  ...jest.requireActual('@solana/web3.js'),
  clusterApiUrl: jest.fn(() => 'https://api.mainnet-beta.solana.com'),
}))

describe('WalletContextProvider', () => {
  it('renders children correctly', () => {
    render(
      <WalletContextProvider>
        <div data-testid="child-element">Test Child</div>
      </WalletContextProvider>
    )

    expect(screen.getByTestId('child-element')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('wraps children with wallet providers', () => {
    const { container } = render(
      <WalletContextProvider>
        <div>Content</div>
      </WalletContextProvider>
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    render(
      <WalletContextProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </WalletContextProvider>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })
})
