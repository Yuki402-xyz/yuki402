# ❄️ Yuki402

> **Meet Yuki: Your AI Agent Settling Payments at Light Speed**

No more waiting. No more clicking. Yuki autonomously handles every payment the moment an API asks for it—slashing through HTTP 402 status codes with blockchain-powered precision. It's magic, but make it crypto.

## ✨ What Makes Yuki Special

- **🤖 Pure Autonomy**: Yuki intercepts HTTP 402 responses instantly and executes payments without you lifting a finger
- **⚡ Lightning Speed**: 2-second settlements on Solana—faster than you can say "gas fees"
- **💎 Zero Platform Fees**: No middlemen. Only blockchain gas + service costs. That's it.
- **🌐 Chain Agnostic**: Works with Ethereum, Solana, or any blockchain that speaks x402
- **🚫 No Accounts Required**: Forget OAuth, emails, and sign-ups. Access services directly with crypto.
- **🔓 Open Protocol**: Built on x402—the open standard for internet-native payments

## 🎯 The x402 Protocol

x402 transforms the forgotten HTTP 402 status code into a payment superpower:

- **Programmatic Payments**: APIs tell you what they cost. Yuki pays. You get access. Simple.
- **Trustless Transactions**: Every payment is verified on-chain with cryptographic proof
- **Machine Economy Ready**: Built for autonomous agents to pay other machines at scale
- **No Platform Lock-In**: It's an open protocol—anyone can implement it, no permission needed

Dive deeper: [x402.org](https://x402.org) | [Protocol Docs](https://x402.gitbook.io/x402)

## 🛠️ Tech Stack

Yuki is powered by cutting-edge web3 tech:

- **Next.js 16** – App Router for blazing-fast routing
- **Tailwind CSS 4** – Modern styling with zero config
- **Framer Motion** – Buttery smooth animations
- **Vercel AI SDK** – Google Gemini powers Yuki's brain
- **Solana Web3.js** – Lightning-fast blockchain settlements
- **Lucide React** – Beautiful, consistent icons
- **x402 Protocol** – The heart of autonomous payments

## 🚀 Get Yuki Running Locally

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key ([Grab yours here](https://openrouter.ai/))
- A Solana wallet (Phantom, Solflare, etc.)

### Installation

Clone the repo and fire it up:

```bash
# Clone Yuki
git clone https://github.com/Yuki402-xyz/yuki402.git
cd yuki402

# Install dependencies
npm install

# Set up your environment
cp .env.example .env.local
```

Add your keys to `.env.local`:

```bash
OPENROUTER_API_KEY=your_api_key_here
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
```

Fire up the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and watch Yuki come alive ⚡

## 📁 Project Structure

```
yuki402/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js          # AI chat API endpoint
│   ├── app/
│   │   └── page.js                # Yuki's chat interface
│   ├── components/
│   │   ├── Button.js              # Reusable button components
│   │   └── WalletProvider.js      # Solana wallet integration
│   ├── layout.js                  # Root layout + metadata
│   ├── page.js                    # Landing page
│   └── globals.css                # Global styles + glass effects
├── public/                        # Static assets (images, videos)
├── lib/
│   └── solana.js                  # Solana blockchain utilities
├── .env.local                     # Your secret keys (gitignored)
└── package.json
```

## 🎮 How Yuki Works

It's a four-step dance:

1. **You Ask** → Your app requests premium data from any x402-enabled API
2. **API Responds** → The API sends back HTTP 402 with payment instructions
3. **Yuki Strikes** → In milliseconds, she signs the transaction, broadcasts it to Solana, and secures cryptographic proof
4. **You Win** → The API verifies payment instantly and delivers your premium data

Zero clicks. Zero friction. Pure automation.

## 💡 Use Cases

### For Developers
- Build AI agents that autonomously pay for API access
- Create tools that consume paid services without manual intervention
- Access premium data sources programmatically

### For API Providers
- Monetize your API instantly—no auth infrastructure needed
- Accept payments in crypto with cryptographic verification
- Tap into the machine economy

### For Token Investors
- Hold $YUKI for lifetime fee-free access
- Benefit from automatic buybacks funded by platform fees
- Participate in a deflationary token economy

### For Crypto Enthusiasts
- Experience true web3 payments in action
- No wrapped tokens or custodial wallets—just pure blockchain
- Watch autonomous agents handle value transfer

## 🌐 Deploy to Production

### Vercel Deployment (Recommended)

Yuki deploys to Vercel in under 60 seconds:

1. Push your code to GitHub
2. Import repo on [Vercel](https://vercel.com)
3. Add environment variables:
   - `OPENROUTER_API_KEY`
   - `NEXT_PUBLIC_SOLANA_RPC_ENDPOINT`
4. Hit deploy and you're live 🚀

### Other Platforms

Yuki runs anywhere Next.js does:
- **Railway** – One-click deploy
- **Fly.io** – Edge deployment
- **AWS Amplify** – Scalable hosting
- **DigitalOcean** – VPS deployment

Just remember to set your environment variables!

## 💎 $YUKI Tokenomics

### Hold $YUKI, Pay Nothing

We're not just another token—$YUKI powers a deflationary economy where holders win.

#### The Deal

**0.95% Fee Without $YUKI**
- A tiny fee on autonomous payments
- Still cheaper than any traditional payment processor
- Transparent and fair

**0% Fee With $YUKI**
- Hold the token, unlock infinite fee-free payments
- Forever. No gimmicks, no expiration.
- Maximum value for holders

### 100% Automatic Buybacks

Here's the alpha: **100% of platform fees flow directly into automatic $YUKI buybacks.**

- Not some of it. Not most of it. **ALL of it.**
- More payments = more buybacks = more value accruing to holders
- Smart contract automation—zero human intervention
- 100% transparent, 100% on-chain
- Deflationary pressure as adoption grows

**It's DeFi done right.**

## 🔧 Advanced x402 Integration

Want to make Yuki actually process real payments? You'll need:

1. **x402 Facilitator Endpoints** – For payment verification
2. **Wallet Connectivity** – WalletConnect, Phantom, etc.
3. **Spending Limits** – User-controlled transaction monitoring
4. **x402-Compatible Services** – APIs that speak the protocol

Full integration guide: [x402 Protocol Docs](https://x402.gitbook.io/x402)

## ⚠️ Important Disclaimers

- **You're In Control**: Set spending limits. Monitor transactions. You're the boss.
- **Blockchain is Permanent**: All transactions are irreversible—double check before approving
- **Trust, But Verify**: Always verify the services you're accessing
- **Experimental Software**: Yuki is cutting-edge tech—use at your own risk
- **Not Financial Advice**: This is a technology demonstration, not investment advice

## 🤝 Contributing

Yuki is open source and thrives on community contributions!

- Found a bug? Open an issue
- Built something cool? Submit a PR
- Have ideas? Start a discussion

We review PRs regularly and love seeing the community build on Yuki.

## 📚 Resources

**Protocol & Docs**
- [x402 Protocol Website](https://x402.org)
- [x402 Technical Docs](https://x402.gitbook.io/x402)
- [x402 GitHub](https://github.com/x402)

**Community**
- [Yuki402 GitHub](https://github.com/Yuki402-xyz)
- [X / Twitter](https://x.com/yuki402xyz)
- [Documentation Site](https://docs.yuki402.xyz)

## 📄 License

MIT License – Free to use, modify, and deploy. Build the future of payments with us.

## 🙏 Support

Questions? Issues? Want to chat?

- **GitHub Issues**: Technical problems and bug reports
- **Discussions**: Feature requests and ideas
- **Twitter/X**: [@yuki402xyz](https://x.com/yuki402xyz)

---

<div align="center">

**Built with the x402 protocol for autonomous, internet-native payments.**

*Powered by Solana • Made for the machine economy • Open source forever*

[🌐 Website](https://yuki402.xyz) • [📖 Docs](https://docs.yuki402.xyz) • [💬 Community](https://x.com/yuki402xyz)

</div>
