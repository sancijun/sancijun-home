"use client"

import { useEffect, useState, useRef } from 'react'
import { Star } from 'lucide-react'

// useInView hook to detect when an element is in the viewport
const useInView = (ref: React.RefObject<Element>, options?: IntersectionObserverInit) => {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect() // Disconnect after first intersection to run only once
      }
    }, options)

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, options])

  return inView
}

// Component to handle the animation of a single stat
const StatNumber = ({ value, duration = 2000 }: { value: string | number, duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  // Fix: The 'once' property is not part of IntersectionObserverInit. The hook handles it internally.
  const inView = useInView(ref, { threshold: 0.5 })

  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '').replace(/\+/g, '')) : value
  const suffix = typeof value === 'string' && /.*\+/.test(value) ? '+' : ''
  const decimals = typeof value === 'string' && value.includes('.') ? (value.split('.')[1] || '').length : 0

  useEffect(() => {
    if (inView) {
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        
        // Ease-out function for a smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        const currentCount = easedProgress * numericValue
        
        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(numericValue) // Ensure it ends on the exact number
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, numericValue, duration])

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
  }

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  )
}

// The complete stats section, now as a client component
export const StatsSection = () => {
  const stats = [
    { label: "活跃用户", value: "10,000+" },
    { label: "用户评分", value: "4.9", icon: <Star className="w-4 h-4 ml-1 text-primary fill-primary" /> },
    { label: "总下载量", value: "50,000+" },
  ]

  return (
    <div className="pt-4 animate-fadeIn" style={{ animationDelay: "600ms" }}>
      <div className="p-4 bg-background/40 backdrop-blur-md rounded-2xl border border-border/30">
        <div className="grid grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="flex items-center justify-center">
                <p className="text-2xl font-bold text-foreground">
                  <StatNumber value={stat.value} />
                </p>
                {stat.icon}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 