"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function AiSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const size = Math.min(window.innerWidth * 0.8, 500)
      canvas.width = size
      canvas.height = size
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle system
    const particles: Particle[] = []
    const particleCount = 100
    const maxDistance = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.5})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw sphere gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )

      gradient.addColorStop(0, "rgba(30, 64, 175, 0.2)")
      gradient.addColorStop(0.5, "rgba(30, 64, 175, 0.1)")
      gradient.addColorStop(1, "rgba(30, 64, 175, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw particles and connections
      particles.forEach((particle) => {
        particle.update()
        particle.draw()

        // Connect particles
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(65, 105, 225, ${1 - distance / maxDistance})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      // Draw outer glow
      const outerGlow = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 3,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5,
      )

      outerGlow.addColorStop(0, "rgba(59, 130, 246, 0.1)")
      outerGlow.addColorStop(1, "rgba(59, 130, 246, 0)")

      ctx.fillStyle = outerGlow
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 1.5, 0, Math.PI * 2)
      ctx.fill()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        animate={{
          y: ["-10px", "10px", "-10px"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 5,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto"
          style={{
            filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.5))",
          }}
        />

        {/* Core sphere */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 opacity-80 blur-sm"></div>

        {/* Pulse effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-blue-500 opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

