'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { Send, Loader2, Receipt, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { getSolBalance } from '@/lib/solana'
import { PrimaryButton, SecondaryButton } from '../components/Button'

export default function AppPage () {
  const { messages, sendMessage, status } = useChat()
  const { connected, publicKey } = useWallet()
  const messagesEndRef = useRef(null)
  const [input, setInput] = useState('')

  const [paymentThreads, setPaymentThreads] = useState([])
  const [activeThread, setActiveThread] = useState(null)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [showPaymentRequest, setShowPaymentRequest] = useState(false)
  const [pendingPayment, setPendingPayment] = useState(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const isLoading = status === 'submitted' || status === 'streaming'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize cooldown from localStorage on mount
  useEffect(() => {
    const checkCooldown = () => {
      const cooldownEnd = localStorage.getItem('yuki-cooldown-end')
      if (cooldownEnd) {
        const remaining = Math.max(0, Math.ceil((parseInt(cooldownEnd) - Date.now()) / 1000))
        setCooldownRemaining(remaining)

        if (remaining > 0) {
          const interval = setInterval(() => {
            const newRemaining = Math.max(0, Math.ceil((parseInt(cooldownEnd) - Date.now()) / 1000))
            setCooldownRemaining(newRemaining)

            if (newRemaining <= 0) {
              clearInterval(interval)
              localStorage.removeItem('yuki-cooldown-end')
            }
          }, 1000)

          return () => clearInterval(interval)
        } else {
          localStorage.removeItem('yuki-cooldown-end')
        }
      }
    }

    checkCooldown()
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || cooldownRemaining > 0) return

    sendMessage({ text: input })
    setInput('')

    // Start 60 second cooldown due to high traffic
    const cooldownEnd = Date.now() + 60000
    localStorage.setItem('yuki-cooldown-end', cooldownEnd.toString())
    setCooldownRemaining(60)

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000))
      setCooldownRemaining(remaining)

      if (remaining <= 0) {
        clearInterval(interval)
        localStorage.removeItem('yuki-cooldown-end')
      }
    }, 1000)
  }

  const [balance, setBalance] = useState('0')

  // Fetch SOL balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!connected || !publicKey) {
        setBalance('0')
        return
      }

      try {
        const solBalance = await getSolBalance(publicKey)
        setBalance(solBalance)
      } catch (error) {
        console.error('Error fetching balance:', error)
        setBalance('0')
      }
    }

    fetchBalance()
  }, [connected, publicKey])

  const handleThreadClick = (thread) => {
    setActiveThread(thread.id)
    setPaymentDetails(thread)
    setShowPaymentModal(true)
  }

  const closeModal = () => {
    setShowPaymentModal(false)
    setPaymentDetails(null)
    setActiveThread(null)
  }

  return (
    <div className='relative h-screen text-white overflow-hidden flex flex-col'>
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
        <div className='absolute inset-0 bg-black/75' />
      </div>

      {/* Top Status Bar */}
      <nav className='relative z-50 flex-shrink-0'>
        <div className='container mx-auto px-6 h-20 flex items-center justify-between'>
          <div className='flex items-center gap-10'>
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
            <div className='hidden md:flex items-center gap-6'>
              <span className='text-white/50'>Agent</span>
              <span className='font-medium text-white'>New Payment Thread</span>
            </div>
          </div>
          <div className='flex items-center gap-10'>
            <div className='flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel'>
              <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
              <span className='text-xs font-medium text-emerald-400'>x402 Protocol Active</span>
            </div>
            <WalletMultiButton />
          </div>
        </div>
      </nav>

      <div className='relative z-10 flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <div className='w-64 glass-panel border-r border-white/10 flex flex-col ml-4 my-4 rounded-lg'>
          <div className='p-4'>
            <PrimaryButton icon={false} className='w-full !px-6 text-center'>
              Add Payment Thread
            </PrimaryButton>
          </div>

          {connected && (
            <>
              <div className='px-4 pb-2'>
                <h3 className='text-xs font-semibold text-white/60 uppercase tracking-wider'>History</h3>
              </div>

              <div className='flex-1 overflow-y-auto px-2'>
                {connected && paymentThreads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => handleThreadClick(thread)}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-left transition-colors ${
                      activeThread === thread.id ? 'glass-card hover:translate-0' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className='w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center'>
                      <Receipt className='w-4 h-4 text-white/70' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='text-xs font-medium text-white truncate'>{thread.name}</div>
                      <div className='text-xs text-white/60'>{thread.time}</div>
                    </div>
                    {thread.status === 'completed' && (
                      <CheckCircle2 className='w-4 h-4 text-emerald-400' />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {!connected && (
            <div className='flex-1 flex items-center justify-center px-4'>
              <p className='text-xs text-center text-white/70'>Connect wallet to view payment history</p>
            </div>
          )}

          {/* Balance Footer */}
          <div className='p-4 border-t border-white/10'>
            <div className='flex items-center gap-2 text-xs'>
              <div className='w-2 h-2 rounded-full bg-emerald-500' />
              <span className='text-white/70'>{connected ? 'Connected' : 'Not connected'}</span>
            </div>
            <div className='mt-2 text-xs text-white/60'>
              {connected ? publicKey.toString().slice(0, 4) + '...' + publicKey.toString().slice(-3) : 'Not connected'}
            </div>
            <div className='mt-2 flex items-baseline gap-1'>
              <span className='text-lg font-semibold text-white'>{balance}</span>
              <span className='text-xs text-white/60'>SOL</span>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className='flex-1 flex flex-col mx-4 mb-4'>
          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-6 space-y-6'>
            {!connected ? (
              <div className='flex items-center justify-center h-full'>
                <div className='text-center'>
                  <p className='text-white/80 mb-4'>Connect your wallet to start using Yuki</p>
                  <WalletMultiButton />
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full max-w-2xl mx-auto'>
                <div className='w-16 h-16 rounded-2xl bg-[#4A9FB8]/20 border border-[#4A9FB8]/30 flex items-center justify-center mb-4'>
                  <Image src='/logo.png' alt='Yuki402' width={50} height={50} />
                </div>
                <h2 className='text-xl font-semibold text-white mb-2'>Yuki Agent</h2>
                <p className='text-sm text-white/70 mb-8 text-center max-w-md'>
                  Ready. I'm listening for HTTP 402 payment requests. Paste a URL or make a request to begin.
                </p>

                <div className='w-full max-w-2xl'>
                  <div className='grid grid-cols-2 gap-3'>
                    {[
                      'Explain the x402 payment protocol',
                      'Simulate a payment being made on Yuki402',
                      'Why should I use x402 for payments?',
                      'Check x402 payment history'
                    ].map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(prompt)}
                        className='cursor-pointer px-4 py-3 rounded-lg glass-panel hover:bg-white/10 text-left text-sm text-white/80 transition-all'
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <AnimatePresence mode='popLayout'>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant'
                        ? (
                          <div className='flex gap-3 max-w-3xl'>
                            <div className='w-8 h-8 p-0.5 rounded-lg bg-[#4A9FB8]/20 border border-[#4A9FB8]/30 flex items-center justify-center flex-shrink-0'>
                              <Image src='/logo.png' alt='Yuki402' width={50} height={50} />
                            </div>
                            <div className='flex-1'>
                              <div className='text-xs font-medium text-white/70 mb-1'>Yuki Agent</div>
                              <div className='text-sm text-white/80 leading-relaxed markdown-content-dark'>
                                {message.parts?.map((part, partIndex) => (
                                  <div key={`${message.id}-${partIndex}`}>
                                    {part.type === 'text' && (
                                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {part.text}
                                      </ReactMarkdown>
                                    )}
                                  </div>
                                )) || (
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {message.content || ''}
                                  </ReactMarkdown>
                                )}
                              </div>
                            </div>
                          </div>
                          )
                        : (
                          <div className='max-w-2xl'>
                            <div className='px-4 py-3 rounded-xl glass-panel'>
                              <div className='text-sm text-white'>
                                {message.parts?.[0]?.text}
                              </div>
                            </div>
                          </div>
                          )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <div className='flex gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-[#4A9FB8]/20 border border-[#4A9FB8]/30 flex items-center justify-center flex-shrink-0'>
                      <Loader2 className='w-4 h-4 text-[#4A9FB8] animate-spin' />
                    </div>
                    <div className='flex items-center gap-2 text-sm text-white/70'>
                      <span>Processing...</span>
                    </div>
                  </div>
                )}

                {/* Payment Request Popup */}
                <AnimatePresence>
                  {showPaymentRequest && pendingPayment && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className='flex'
                    >
                      <div className='max-w-2xl glass-panel rounded-xl p-5 border-2 border-yellow-400/50 shadow-[0_8px_30px_-5px_rgba(250,204,21,0.3)]'>
                        {!isProcessingPayment
                          ? (
                            <>
                              <div className='flex items-start gap-3 mb-4'>
                                <div className='w-10 h-10 rounded-lg bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center flex-shrink-0'>
                                  <svg className='w-5 h-5 text-yellow-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                                  </svg>
                                </div>
                                <div className='flex-1'>
                                  <h4 className='text-base font-semibold text-white mb-1'>Payment Request Detected</h4>
                                  <p className='text-sm text-white/70'>HTTP 402 - Payment Required</p>
                                </div>
                              </div>

                              <div className='glass-card rounded-lg p-4 space-y-3 mb-4'>
                                <div className='flex justify-between items-center gap-10'>
                                  <span className='text-sm text-white/70'>Endpoint</span>
                                  <span className='text-sm text-white font-mono text-right break-all'>{pendingPayment.endpoint}</span>
                                </div>
                                <div className='h-px bg-white/10' />
                                <div className='flex justify-between items-center'>
                                  <span className='text-sm text-white/70'>Amount Required</span>
                                  <span className='text-lg text-white font-semibold'>{pendingPayment.amount}</span>
                                </div>
                              </div>

                              <div className='flex gap-3'>
                                <SecondaryButton
                                  icon={false}
                                  className='w-full'
                                  onClick={handleRejectPayment}
                                >
                                  Reject
                                </SecondaryButton>
                                <PrimaryButton
                                  icon={false}
                                  className='w-full'
                                  onClick={handleApprovePayment}
                                >
                                  Approve & Pay
                                </PrimaryButton>
                              </div>
                            </>
                            )
                          : (
                            <>
                              <div className='flex items-start gap-3 mb-4'>
                                <div className='w-10 h-10 rounded-lg bg-[#4A9FB8]/20 border border-[#4A9FB8]/30 flex items-center justify-center flex-shrink-0'>
                                  <Loader2 className='w-5 h-5 text-[#4A9FB8] animate-spin' />
                                </div>
                                <div className='flex-1'>
                                  <h4 className='text-base font-semibold text-white mb-1'>Payment Processing</h4>
                                  <p className='text-sm text-white/70'>Signing transaction on Solana...</p>
                                </div>
                              </div>

                              <div className='glass-card rounded-lg p-4 space-y-3 mb-4'>
                                <div className='flex justify-between items-center gap-10'>
                                  <span className='text-sm text-white/70'>Endpoint</span>
                                  <span className='text-sm text-white font-mono text-right break-all'>{pendingPayment.endpoint}</span>
                                </div>
                                <div className='h-px bg-white/10' />
                                <div className='flex justify-between items-center'>
                                  <span className='text-sm text-white/70'>Amount</span>
                                  <span className='text-lg text-white font-semibold'>{pendingPayment.amount}</span>
                                </div>
                                <div className='h-px bg-white/10' />
                                <div className='flex items-center gap-2'>
                                  <Loader2 className='w-4 h-4 text-[#4A9FB8] animate-spin' />
                                  <span className='text-sm text-white/70'>Broadcasting to protocol...</span>
                                </div>
                              </div>
                            </>
                            )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className='border-t border-white/10 p-4 glass-panel rounded-lg'>
            <form onSubmit={handleFormSubmit} className='max-w-5xl mx-auto'>
              <div className='flex gap-3 items-end'>
                <div className='flex-1 relative'>
                  <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={cooldownRemaining > 0 ? `Wait ${cooldownRemaining}s - High traffic` : 'Message Yuki...'}
                    disabled={!connected || isLoading || cooldownRemaining > 0}
                    className='w-full px-4 py-3 rounded-xl glass-panel text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#4A9FB8]/50 focus:ring-1 focus:ring-[#4A9FB8]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                  />
                </div>
                <button
                  type='submit'
                  disabled={!connected || isLoading || !input.trim() || cooldownRemaining > 0}
                  className='cursor-pointer p-3 rounded-xl bg-[#4A9FB8] hover:bg-[#7DB8D4] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_20px_-5px_rgba(74,159,184,0.4)] hover:shadow-[0_8px_30px_-5px_rgba(74,159,184,0.5)]'
                >
                  <Send className='w-5.5 h-5.5' />
                </button>
              </div>
              <p className='text-xs text-white/60 text-center mt-2'>
                {cooldownRemaining > 0
                  ? `Please wait ${cooldownRemaining} seconds due to high traffic at the moment`
                  : 'Yuki can make mistakes. Please verify payment details.'}
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && paymentDetails && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='fixed inset-0 z-50 flex items-center justify-center p-4'
            >
              <div className='glass-panel rounded-2xl p-6 max-w-xl w-full border border-white/20'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-semibold text-white'>Payment Details</h3>
                  <button
                    onClick={closeModal}
                    className='text-white/60 hover:text-white transition-colors cursor-pointer'
                  >
                    <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </button>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-lg bg-[#4A9FB8]/20 border border-[#4A9FB8]/30 flex items-center justify-center'>
                      <Receipt className='w-6 h-6 text-[#4A9FB8]' />
                    </div>
                    <div>
                      <div className='text-sm font-medium text-white'>{paymentDetails.name}</div>
                      <div className='text-xs text-white/60'>{paymentDetails.time}</div>
                    </div>
                  </div>

                  <div className='glass-card rounded-lg p-4 space-y-3'>
                    <div className='flex justify-between items-center gap-10'>
                      <span className='text-sm text-white/70'>Endpoint</span>
                      <span className='text-sm text-white font-mono'>{paymentDetails.endpoint}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-white/70'>Amount</span>
                      <span className='text-base text-white font-semibold'>{paymentDetails.amount}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-white/70'>Status</span>
                      <div className='flex items-center gap-2'>
                        {paymentDetails.status === 'completed'
                          ? (
                            <>
                              <CheckCircle2 className='w-4 h-4 text-emerald-400' />
                              <span className='text-sm text-emerald-400 font-medium'>Completed</span>
                            </>
                            )
                          : (
                            <>
                              <Loader2 className='w-4 h-4 text-yellow-400 animate-spin' />
                              <span className='text-sm text-yellow-400 font-medium'>Pending</span>
                            </>
                            )}
                      </div>
                    </div>
                  </div>

                  {paymentDetails.status === 'completed' && (
                    <div className='glass-card rounded-lg p-4'>
                      <div className='text-xs text-white/60 mb-2'>Transaction Hash</div>
                      <div className='text-xs text-white font-mono break-all'>
                        5K7Qz8xN...9mP4vW
                      </div>
                      <a
                        href='#'
                        className='text-xs text-[#4A9FB8] hover:text-[#7DB8D4] mt-2 inline-flex items-center gap-1'
                      >
                        View on Solscan
                        <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                        </svg>
                      </a>
                    </div>
                  )}

                  <PrimaryButton
                    onClick={closeModal}
                    icon={false}
                    className='w-full'
                  >
                    Close
                  </PrimaryButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
