'use client'
import { motion } from "framer-motion"

export default function Uimate() {
  return (
   <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <a href="/" className="text-2xl font-bold text-white text-center">
                <span className="text-blue-400 mr-1">ui</span>mate
              </a>
            </motion.div>
  )
}