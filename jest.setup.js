import '@testing-library/jest-dom'

// Add TextEncoder/TextDecoder polyfills for Node.js environment
global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter () {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/'
    }
  },
  usePathname () {
    return '/'
  },
  useSearchParams () {
    return new URLSearchParams()
  }
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn()
  }),
  useInView: () => true
}))

// Mock Solana wallet adapter
jest.mock('@solana/wallet-adapter-react', () => ({
  useWallet: () => ({
    wallet: null,
    publicKey: null,
    connected: false,
    connecting: false,
    disconnecting: false,
    connect: jest.fn(),
    disconnect: jest.fn(),
    select: jest.fn(),
    sendTransaction: jest.fn()
  }),
  useConnection: () => ({
    connection: {
      getBalance: jest.fn(),
      getAccountInfo: jest.fn()
    }
  }),
  WalletProvider: ({ children }) => <>{children}</>,
  ConnectionProvider: ({ children }) => <>{children}</>
}))

jest.mock('@solana/wallet-adapter-react-ui', () => ({
  WalletModalProvider: ({ children }) => <>{children}</>,
  WalletMultiButton: () => <button>Connect Wallet</button>
}))

// Mock environment variables
process.env.NEXT_PUBLIC_YUKI_TOKEN_MINT = 'test-mint-address'
process.env.NEXT_PUBLIC_SOLANA_RPC_URL = 'https://api.mainnet-beta.solana.com'
