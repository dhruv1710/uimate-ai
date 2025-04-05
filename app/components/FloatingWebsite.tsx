'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const FloatingWebsite = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left - width / 2) / 25
      const y = (e.clientY - top - height / 2) / 25
      
      containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative w-[500px] h-[300px] perspective-1000">
      <motion.div
        ref={containerRef}
        className="relative w-full h-full"
        initial={{ y: 20 }}
        animate={{ 
          y: [-20, 20, -20],
          rotateY: [-5, 5, -5],
          rotateX: [-2, 2, -2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Website Frame */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden">
          {/* Header Bar */}
          <div className="h-8 bg-slate-800 border-b border-slate-700/50 flex items-center px-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Fake Content */}
            <div className="h-4 w-3/4 bg-slate-700/50 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-slate-700/50 rounded mb-6"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-slate-700/30 rounded"></div>
              <div className="h-20 bg-slate-700/30 rounded"></div>
            </div>
          </div>

          {/* Scanning Effect */}
          <motion.div
            className="absolute inset-0 bg-blue-500/20"
            initial={{ y: -400 }}
            animate={{ y: 400 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.2), transparent)'
            }}
          />
        </div>

        {/* Reflection */}
        <div className="absolute -bottom-12 left-0 right-0 h-12 bg-gradient-to-b from-blue-500/20 to-transparent blur-sm"></div>
      </motion.div>
    </div>
  )
}

export default FloatingWebsite 