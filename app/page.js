'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PrimaryButton, SecondaryButton } from './components/Button'

export default function Home () {
  useEffect(() => {
    // Initialize iconify script if needed
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="iconify"]')) {
      const script = document.createElement('script')
      script.src = 'https://code.iconify.design/3/3.1.0/iconify.min.js'
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className='relative min-h-screen text-white overflow-x-hidden scroll-smooth'>
      {/* Background Image with Overlay */}
      <div className='fixed inset-0 z-0'>
        <Image
          src='/background.png'
          alt='Background'
          fill
          className='object-cover'
          quality={100}
          priority
        />
        <div className='absolute inset-0 bg-black/35' />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className='relative hidden lg:flex'
      >
        <div className='absolute top-0 right-0 w-1/2 h-[900px]'>
          <Image
            src='/yuki.png'
            alt='Yuki Character'
            fill
            className='object-cover'
            priority
          />
        </div>
      </motion.div>

      <nav className='fixed top-0 w-full z-50'>
        <div className='container mx-auto px-6 h-20 flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-4 group'>
            <Image
              src='/logo.png'
              alt='Yuki402 Logo'
              width={60}
              height={60}
              className='transition-transform group-hover:scale-105 transition duration-500 ease-in-out'
            />
            <span className='text-white font-heading text-xl'>Yuki402</span>
          </Link>

          <div className='hidden md:flex items-center gap-8 font-medium'>
            <a href='#features' className='text-white/80 hover:text-sky-200 transition-colors'>
              Features
            </a>
            <a href='#how-it-works' className='text-white/80 hover:text-sky-200 transition-colors'>
              How It Works
            </a>
            <a href='#tokenomics' className='text-white/80 hover:text-sky-200 transition-colors'>
              Tokenomics
            </a>
            <a href='https://docs.yuki402.xyz' className='text-white/80 hover:text-sky-200 transition-colors'>
              Docs
            </a>
            <a
              href='https://github.com/Yuki402-xyz/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/80 hover:text-sky-200 transition-colors flex items-center gap-1.5'
            >
              Github
            </a>
          </div>

          <PrimaryButton href='/app' icon={false} className='!py-2 !px-6'>
            Launch App
          </PrimaryButton>
        </div>
      </nav>

      {/* Hero Section */}
      <main className='relative z-10 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 mt-[14rem] min-h-[calc(900px-14rem)]'>
            {/* Right: Text Content */}
            <div className='space-y-8 order-2 lg:order-2'>
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className='inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-sm text-white'
              >
                <span>✨ $YUKI Token live on Solana! <Link className='underline opacity-90 hover:text-sky-200' href="/#tokenomics">Learn more</Link></span>
              </motion.div> */}

              <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white tracking-tight leading-[1.1] font-heading'>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className='block'
                >
                  Meet Yuki:  AI Agent
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className='block text-sky-300'
                >
                  Settling Payments at Light Speed
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='text-lg text-white max-w-xl leading-relaxed'
              >
                No more waiting. No more clicking. Yuki autonomously handles every payment the moment an API asks for it, slashing through HTTP 402 status codes with blockchain-powered precision. It's magic, but make it crypto.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className='flex flex-col sm:flex-row items-start gap-4'
              >
                <PrimaryButton
                  href='/app'
                  icon={false}
                >
                  <span className='iconify' data-icon='lucide:terminal' data-width='16' data-stroke-width='2' />
                  Start Yuki Now
                </PrimaryButton>
                <SecondaryButton
                  href='https://docs.yuki402.xyz'
                  icon={false}
                >
                  Read Documentation
                </SecondaryButton>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <div className='backdrop-blur-lg bg-black/5'>
        {/* Features Section */}
        <section id='features' className='relative z-10 py-24 px-6'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4'>Yuki's Superpowers</h2>
              <p className='text-base max-w-xl mx-auto text-white'>
                Built for the machine economy. Yuki transforms complex blockchain transactions into simple HTTP status codes because even AI agents deserve a seamless payment experience.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='glass-card rounded-xl p-6 flex flex-col items-start gap-4'
              >
                <div className='w-14 h-14 rounded-lg bg-[#F4A8FF]/40 border-2 border-[#F4A8FF] flex items-center justify-center text-[#F4A8FF] shadow-lg shadow-[#7DB8D4]/30'>
                  <span className='iconify' data-icon='lucide:server' data-width='30' data-stroke-width='1.5' />
                </div>
                <div>
                  <h3 className='text-white font-semibold text-lg mb-2'>Lightning-Fast Detection</h3>
                  <p className='text-base text-white leading-relaxed'>
                    The moment an API throws{' '}
                    <span className='font-mono bg-white/10 px-1.5 rounded'>HTTP 402 Payment Required</span>
                    , Yuki intercepts it instantly. No pauses, no permissions. Just pure autonomous execution that keeps your workflows flowing.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='glass-card rounded-xl p-6 flex flex-col items-start gap-4'
              >
                <div className='w-14 h-14 rounded-lg bg-sky-200/40 border-2 border-sky-200 flex items-center justify-center text-sky-200 shadow-lg shadow-sky-200/30'>
                  <span className='iconify' data-icon='lucide:wallet-cards' data-width='30' data-stroke-width='1.5' />
                </div>
                <div>
                  <h3 className='text-white font-semibold text-lg mb-2'>Integrated Non-Custodial Wallet</h3>
                  <p className='text-base text-white leading-relaxed'>
                    Yuki comes loaded with a non-custodial wallet that speaks SOL, USDC, and native $YUKI. She optimizes gas fees, signs transactions, and manages your crypto while you sit back and watch the magic happen.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='glass-card rounded-xl p-6 flex flex-col items-start gap-4'
              >
                <div className='w-14 h-14 rounded-lg bg-emerald-500/40 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-500/30'>
                  <span className='iconify' data-icon='lucide:shield-check' data-width='30' data-stroke-width='1.5' />
                </div>
                <div>
                  <h3 className='text-white font-semibold text-lg mb-2'>Cryptographic Receipts</h3>
                  <p className='text-base text-white leading-relaxed'>
                    Every transaction gets an immutable proof stamped on-chain. APIs verify Yuki's cryptographic signatures instantly, unlocking premium resources at blockchain speed. Trust? It's built-in.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id='how-it-works' className='relative z-10 py-24 px-6'>
          <div className='max-w-6xl mx-auto'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4'>
              <div>
                <h2 className='text-3xl md:text-4xl font-semibold text-white tracking-tight mb-2'>How Yuki Works Her Magic</h2>
                <p className='text-white text-base'>Four steps. Zero friction. Infinite possibilities.</p>
              </div>
              <a
                href='https://x402.gitbook.io/x402'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-sky-200 hover:underline flex items-center gap-1 font-medium'
              >
                Read the Protocol Specs <span className='iconify' data-icon='lucide:arrow-right' data-width='12' />
              </a>
            </div>

            <div className='relative'>
              {/* Connector Line (Desktop) */}
              <div className='hidden md:block absolute top-6 left-0 w-6/7 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-y-1/2 z-0' />

              <div className='grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10'>
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className='group'
                >
                  <div className='w-12 h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur flex items-center justify-center text-white/70 mb-6 relative z-10 group-hover:border-sky-300/50 group-hover:text-sky-300 transition-colors mx-auto md:mx-0'>
                    <span className='iconify' data-icon='lucide:laptop-2' data-width='20' />
                  </div>
                  <div className='text-center md:text-left'>
                    <div className='text-xs font-mono text-white/50 mb-1'>01. Request</div>
                    <h4 className='text-white font-medium text-base mb-2'>You Ask</h4>
                    <p className='text-sm text-white leading-relaxed'>
                      Your app requests premium data from any x402-enabled API. Simple HTTP calls, no special setup required.
                    </p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className='group'
                >
                  <div className='w-12 h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur flex items-center justify-center text-white/70 mb-6 relative z-10 group-hover:border-sky-300/50 group-hover:text-sky-300 transition-colors mx-auto md:mx-0'>
                    <span className='iconify' data-icon='lucide:alert-circle' data-width='20' />
                  </div>
                  <div className='text-center md:text-left'>
                    <div className='text-xs font-mono text-white/50 mb-1'>02. Challenge</div>
                    <h4 className='text-white font-medium text-base mb-2'>API Responds</h4>
                    <p className='text-sm text-white leading-relaxed'>
                      The API sends back HTTP 402 with payment instructions. This is where most systems fail. Not Yuki.
                    </p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='group'
                >
                  <div className='w-12 h-12 rounded-full bg-white/20 border border-sky-300/30 border-sky-300 backdrop-blur flex items-center justify-center text-sky-300 shadow-[0_0_15px_-3px_rgba(74,159,184,0.5)] mb-6 relative z-10 mx-auto md:mx-0'>
                    <span className='iconify' data-icon='lucide:zap' data-width='20' />
                  </div>
                  <div className='text-center md:text-left'>
                    <div className='text-xs font-mono text-sky-200 mb-1'>03. Settlement</div>
                    <h4 className='text-white font-medium text-base mb-2'>Yuki Strikes</h4>
                    <p className='text-sm text-white leading-relaxed'>
                      In milliseconds, she signs the transaction, broadcasts it to Solana, and secures cryptographic proof. All autonomous.
                    </p>
                  </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className='group'
                >
                  <div className='w-12 h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur flex items-center justify-center text-white/70 mb-6 relative z-10 group-hover:border-sky-300/50 group-hover:text-sky-300 transition-colors mx-auto md:mx-0'>
                    <span className='iconify' data-icon='lucide:unlock' data-width='20' />
                  </div>
                  <div className='text-center md:text-left'>
                    <div className='text-xs font-mono text-white/50 mb-1'>04. Access</div>
                    <h4 className='text-white font-medium text-base mb-2'>You Win</h4>
                    <p className='text-sm text-white leading-relaxed'>
                      The API verifies payment instantly and delivers your premium data. Seamless, trustless, unstoppable.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Code Snippet */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='mt-16 max-w-3xl mx-auto'
              >
                <div className='glass-panel rounded-xl overflow-hidden shadow-xl text-left'>
                  <div className='flex items-center gap-2 px-4 py-3 bg-black/30 border-b border-white/10'>
                    <div className='flex gap-1.5'>
                      <div className='w-2.5 h-2.5 rounded-full bg-red-500' />
                      <div className='w-2.5 h-2.5 rounded-full bg-yellow-500' />
                      <div className='w-2.5 h-2.5 rounded-full bg-green-500' />
                    </div>
                    <div className='text-[10px] text-white/60 font-mono ml-2'>bash — yuki402</div>
                  </div>
                  <div className='p-6 font-mono text-xs md:text-sm overflow-x-auto bg-black/20'>
                    <div className='flex gap-3 mb-2'>
                      <span className='text-sky-200'>$</span>
                      <span className='text-white/90'>git clone https://github.com/Yuki402-xyz/yuki402.git</span>
                    </div>
                    <div className='flex gap-3 mb-2'>
                      <span className='text-sky-200'>$</span>
                      <span className='text-white/90'>cd yuki402 &amp;&amp; npm install</span>
                    </div>
                    <div className='flex gap-3 mb-4'>
                      <span className='text-sky-200'>$</span>
                      <span className='text-white/90'>npm run dev</span>
                    </div>
                    <div className='text-white/60 mb-1'># Output</div>
                    <div className='text-sky-200'>✓ Yuki402 Agent initialized</div>
                    <div className='text-sky-200'>✓ Wallet connected (0x71...402)</div>
                    <div className='text-sky-200'>✓ Listening for HTTP 402 triggers...</div>
                  </div>
                </div>
              </motion.div>

              {/* Demo Video */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='mt-20'
              >
                <div className='relative'>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='w-4/5 h-auto mx-auto'
                  >
                    <source src='/demo.mp4' type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className='text-center text-sm text-white/60 mt-4'>
                  Watch Yuki autonomously execute a payment to OpenWeatherMap in real-time. No clicks, no confirmations, just pure automation
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section id='tokenomics' className='relative z-10 py-24 px-6'>
          <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6'>
                Hold $YUKI, Pay Nothing
              </h2>
              <p className='text-white text-base leading-relaxed mb-8'>
                $YUKI is not just another token. $YUKI powers a deflationary economy where holders win. Every transaction feeds automatic buybacks, creating constant buying pressure. The more Yuki works, the more valuable your tokens becomes.
              </p>

              <div className='space-y-8'>
                <div>
                  <h3 className='text-lg font-semibold text-white mb-3'>The Deal</h3>
                  <div className='space-y-3'>
                    <div className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 p-1'>
                        <span className='iconify text-sky-200' data-icon='lucide:x' data-width='20' />
                      </div>
                      <div>
                        <div className='text-base font-medium text-white'>0.95% Fee Without $YUKI</div>
                        <div className='text-sm text-white'>A tiny fee on autonomous payments. Still cheaper than any traditional payment processor.</div>
                      </div>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-sky-200/20 border border-sky-200/30 flex items-center justify-center flex-shrink-0 mt-0.5 p-1'>
                        <span className='iconify text-sky-200' data-icon='lucide:check' data-width='20' />
                      </div>
                      <div>
                        <div className='text-base font-medium text-white'>0% Fee With $YUKI</div>
                        <div className='text-sm text-white'>Hold the token, unlock infinite fee-free payments. Forever. No gimmicks, no expiration.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <PrimaryButton
                href='https://pump.fun/coin/'
                className='w-fit'
                >
                  Buy $YUKI on Pump.fun
              </PrimaryButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='relative'
            >
              <div className='relative glass-card rounded-2xl p-8 border border-sky-200/20'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-sky-200/40 border-2 border-sky-200 text-sky-200 shadow-lg shadow-sky-200/30 flex items-center justify-center'>
                    <span className='iconify' data-icon='lucide:refresh-ccw-dot' data-width='24' />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-white'>100% Automatic Buybacks</h3>
                    <p className='text-sm text-white'>Every fee fuels the fire</p>
                  </div>
                </div>

                <div className='space-y-6'>
                  <p className='text-base text-white leading-relaxed'>
                    Here's the alpha: 100% of platform fees flow directly into automatic $YUKI buybacks. Not some of it. Not most of it. ALL of it. More payments = more buybacks = more value accruing to holders.
                  </p>

                  <div className='grid grid-cols-1 gap-3'>
                    <div className='flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10'>
                      <span className='iconify text-sky-200' data-icon='lucide:cog' data-width='20' />
                      <span className='text-sm text-white'>Smart contract buyback automation</span>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10'>
                      <span className='iconify text-sky-200' data-icon='lucide:link' data-width='20' />
                      <span className='text-sm text-white'>100% transparent, 100% on-chain</span>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10'>
                      <span className='iconify text-sky-200' data-icon='lucide:banknote-arrow-up' data-width='20' />
                      <span className='text-sm text-white'>Deflationary pressure as adoption grows</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <footer className='relative z-10 py-8 px-6'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Image src='/logo.png' alt='Yuki402' width={35} height={35} />
            <span className='text-xs text-white/60 font-medium'>Yuki402 © 2026</span>
          </div>
          <div className='flex gap-6 text-white/80'>
            <a href='/#features' className='hover:text-white transition-colors'>
              Features
            </a>
            <a href='/#how-it-works' className='hover:text-white transition-colors'>
              How It Works
            </a>
            <a href='/#tokenomics' className='hover:text-white transition-colors'>
              Tokenomics
            </a>
            <a href='https://x.com/yuki402xyz' target='_blank' rel='noopener noreferrer' className='hover:text-white transition-colors'>
              X / Twitter
            </a>
            <a href='https://docs.yuki402.xyz' className='hover:text-white transition-colors'>
              Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
