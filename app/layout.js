import { Raleway, Inter } from 'next/font/google'
import './globals.css'
import WalletProvider from './components/WalletProvider'

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

const geist = Inter({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: 'Yuki402 - Your AI Agent Settling Payments at Light Speed | x402 Protocol',
  description:
    'Meet Yuki: Your AI agent settling payments at light speed. No more waiting. No more clicking. Yuki autonomously handles every payment the moment an API asks for it—slashing through HTTP 402 status codes with blockchain-powered precision. It\'s magic, but make it crypto. Hold $YUKI, pay nothing. 100% automatic buybacks.',
  keywords: [
    'x402',
    'autonomous-payments',
    'blockchain',
    'solana',
    'web3',
    'ai-agent',
    'http-402',
    'crypto-payments',
    'defi',
    'nextjs',
    'yuki402',
    '$YUKI',
    'yuki token',
    'lightning-speed-payments',
    'instant-settlement',
    'zero-platform-fees',
    'machine-economy',
    'autonomous-agent',
    'blockchain-agnostic',
    'deflationary-token',
    'automatic-buybacks',
    'api-monetization'
  ],
  authors: [{ name: 'Yuki402 Team' }],
  creator: 'Yuki402 Team',
  publisher: 'Yuki402',
  openGraph: {
    title: 'Yuki402 - AI Agent Settling Payments at Light Speed',
    description: 'Meet Yuki: Your autonomous AI agent slashing through HTTP 402 status codes with blockchain precision. 2-second settlements on Solana. Zero platform fees. Hold $YUKI, pay nothing. It\'s magic, but make it crypto.',
    url: 'https://yuki402.xyz',
    siteName: 'Yuki402',
    type: 'website',
    images: [
      {
        url: '/logo_white.png',
        width: 1200,
        height: 630,
        alt: 'Yuki402 - Your AI Agent Settling Payments at Light Speed'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yuki402 - AI Agent Settling Payments at Light Speed',
    description: '⚡ 2-second settlements on Solana. Zero platform fees. Hold $YUKI, pay nothing. 100% automatic buybacks. Your autonomous AI agent handling crypto payments at light speed.',
    creator: '@yuki402xyz',
    images: ['/logo_white.png']
  },
  icons: {
    icon: '/logo_white.png',
    apple: '/logo_white.png',
    shortcut: '/logo_white.png'
  }
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <script src='https://code.iconify.design/3/3.1.0/iconify.min.js' async />
        <link rel='icon' href='/logo_white.png' type='image/png' />
      </head>
      <body className={`${raleway.variable} ${geist.variable} antialiased bg-black`}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}
