import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-charcoal-800 flex flex-col items-center justify-center z-[999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-gold-500 flex items-center justify-center">
          <span className="text-white font-display font-bold text-3xl">H</span>
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gold-500"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            />
          ))}
        </div>
        <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Loading</p>
      </motion.div>
    </div>
  )
}
