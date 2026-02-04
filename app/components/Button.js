import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function PrimaryButton ({ href = '', children, icon = true, className = '', onClick }) {
  const baseClasses =
    'cursor-pointer group flex justify-center rounded-lg items-center gap-2 bg-sky-500/60 hover:bg-sky-500/80 border-2 border-sky-600 backdrop-blur px-8 py-4 font-semibold text-white transition-all duration-300'

  const content = (
    <>
      {children}
      {icon && <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />}
    </>
  )

  // If onClick is provided, render as button
  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClasses} ${className}`}>
        {content}
      </button>
    )
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={`${baseClasses} ${className}`}>
      {content}
    </a>
  )
}

export function SecondaryButton ({ href = '', children, icon = false, className = '' }) {
  const baseClasses =
    'justify-center cursor-pointer group flex items-center rounded-lg gap-2 border-2 border-gray-500/30 bg-gray-900/50 px-8 py-4 font-semibold text-gray-200 transition-all duration-300 hover:border-primary hover:bg-gray-900/60'

  const content = (
    <>
      {children}
      {icon && <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />}
    </>
  )

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {content}
      </a>
    )
  }

  return (
    <a href={href} className={`${baseClasses} ${className}`}>
      {content}
    </a>
  )
}

export function OutlineButton ({ href, children, icon = true, className = '' }) {
  const baseClasses =
    'inline-flex items-center gap-3 border-2 border-primary bg-gradient-primary px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-primary-bright'

  const content = (
    <>
      {children}
      {icon && <ArrowRight className='h-5 w-5' />}
    </>
  )

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} target='_blank' rel='noopener noreferrer' className={`${baseClasses} ${className}`}>
      {content}
    </a>
  )
}

export function NavButton ({ href, children, className = '' }) {
  const baseClasses =
    'bg-gradient-primary px-6 py-3 font-semibold text-white text-sm transition-all duration-300'

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={`${baseClasses} ${className}`}>
      {children}
    </a>
  )
}
