"use client"

import { useEffect, useRef, useState } from "react"
import { useMouse } from "@uidotdev/usehooks"

// Particle class
class Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  alpha: number

  constructor(x: number, y: number, radius: number, speed: number) {
    this.x = x
    this.y = y
    this.radius = radius
    const angle = Math.random() * 2 * Math.PI
    this.vx = (Math.random() - 0.5) * speed
    this.vy = (Math.random() - 0.5) * speed
    this.alpha = Math.random() * 0.5 + 0.2
  }

  update(width: number, height: number) {
    this.x += this.vx
    this.y += this.vy
    this.alpha -= 0.003

    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
    if (this.alpha < 0) {
      this.alpha = Math.random() * 0.5 + 0.2
      this.x = Math.random() * width
      this.y = Math.random() * height
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(160, 160, 160, ${this.alpha})`
    ctx.fill()
  }
}

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mouse, ref] = useMouse()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const numParticles = Math.floor((canvas.width * canvas.height) / 20000)
    const newParticles: Particle[] = []
    for (let i = 0; i < numParticles; i++) {
      newParticles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 1.5 + 0.5,
          0.3
        )
      )
    }
    setParticles(newParticles)

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      for (let i = 0; i < newParticles.length; i++) {
        for (let j = i + 1; j < newParticles.length; j++) {
          const dist = Math.hypot(
            newParticles[i].x - newParticles[j].x,
            newParticles[i].y - newParticles[j].y
          )
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(newParticles[i].x, newParticles[i].y)
            ctx.lineTo(newParticles[j].x, newParticles[j].y)
            ctx.strokeStyle = `rgba(160, 160, 160, ${Math.max(0, 1 - dist / 120) * 0.5})`
            ctx.stroke()
          }
        }
      }
      
      // Draw mouse connections
      if (mouse.x !== null && mouse.y !== null) {
        const mouseX = mouse.x - rect.left
        const mouseY = mouse.y - rect.top
        
        newParticles.forEach(p => {
          const dist = Math.hypot(p.x - mouseX, p.y - mouseY)
          if(dist < 200) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouseX, mouseY)
            ctx.strokeStyle = `rgba(160, 160, 160, ${Math.max(0, 1 - dist / 200) * 0.8})`
            ctx.stroke()
          }
        })
      }


      newParticles.forEach((p) => {
        p.update(canvas.width / dpr, canvas.height / dpr)
        p.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [mouse.x, mouse.y])

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="absolute inset-0 -z-10"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
       <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
       <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
    </div>
  )
}

export default HeroBackground 