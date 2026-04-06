'use client'

import { useEffect, useState } from 'react'

interface GlitchTextProps {
  readonly text: string
  readonly className?: string
  readonly as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01'

export function GlitchText({ text, className = '', as: Tag = 'h1' }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)

      let iterations = 0
      const glitchInterval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, i) => {
              if (i < iterations) return text[i]
              if (char === ' ') return ' '
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            })
            .join('')
        )

        iterations += 1
        if (iterations > text.length) {
          clearInterval(glitchInterval)
          setDisplayText(text)
          setIsGlitching(false)
        }
      }, 30)

      return () => clearInterval(glitchInterval)
    }, 5000)

    return () => clearInterval(interval)
  }, [text])

  return (
    <Tag
      className={`${className} ${isGlitching ? 'animate-pulse' : ''}`}
      data-text={text}
    >
      {displayText}
    </Tag>
  )
}
