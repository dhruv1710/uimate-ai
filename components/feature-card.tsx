"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardContent className="p-6 relative">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-100 transition-colors">{title}</h3>
          <p className="text-slate-300 group-hover:text-slate-200 transition-colors">{description}</p>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

