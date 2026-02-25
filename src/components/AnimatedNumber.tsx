'use client'

import { useEffect, useRef, useState } from 'react'
import { formatNumber } from '@/lib/utils'

interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  format?: boolean
}

export default function AnimatedNumber({ value, duration = 1500, className = '', format = true }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(Math.round(eased * value))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {format ? formatNumber(displayValue) : displayValue}
    </span>
  )
}
