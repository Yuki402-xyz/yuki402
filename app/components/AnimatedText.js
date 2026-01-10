'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedText ({ children, className = '', delay = 0 }) {
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    const text = textRef.current.textContent
    textRef.current.textContent = ''

    let delayCounter = delay

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span')
      span.textContent = text[i]
      span.className = 'reveal-char'

      if (text[i] === ' ') {
        span.style.width = '0.25em'
      }

      span.style.animationDelay = `${delayCounter * 0.03}s`
      textRef.current.appendChild(span)
      delayCounter++
    }
  }, [delay])

  return <span ref={textRef} className={className}>{children}</span>
}
