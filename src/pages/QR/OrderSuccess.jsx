import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock, ChefHat, UtensilsCrossed, Home, QrCode } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const ORDER_STAGES = [
  { key: 'confirmed', label: 'Order Confirmed', icon: Check, color: 'text-blue-400', bg: 'bg-blue-500/20', desc: 'Your order is received and being processed.' },
  { key: 'preparing', label: 'Preparing Your Food', icon: ChefHat, color: 'text-amber-400', bg: 'bg-amber-500/20', desc: 'Our chefs are preparing your order with care.' },
  { key: 'ready', label: 'Ready to Serve!', icon: UtensilsCrossed, color: 'text-green-400', bg: 'bg-green-500/20', desc: 'Your food is on its way to your table.' },
]

export default function OrderSuccess() {
  const { table, items, total, clearCart } = useCart()
  const [stageIdx, setStageIdx] = useState(0)
  const [orderNum] = useState(() => Math.floor(1000 + Math.random() * 9000))
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    // Simulate order progression
    const timers = [
      setTimeout(() => setStageIdx(1), 3000),
      setTimeout(() => setStageIdx(2), 12000),
    ]
    const interval = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { timers.forEach(clearTimeout); clearInterval(interval) }
  }, [])

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
  const estimatedMinutes = 20 - Math.floor(elapsed / 60)

  return (
    <div className="min-h-screen bg-charcoal-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-sm w-full text-center">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-28 h-28 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
          >
            <Check className="w-14 h-14 text-green-400" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h1 className="font-display font-bold text-3xl text-cream mb-2">Order Placed!</h1>
          <p className="text-gray-400 text-sm mb-6">Your food is being prepared with love 🍽️</p>

          {/* Order details */}
          <div className="glass-dark rounded-2xl p-5 mb-6 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Order #</span>
              <span className="font-bold text-gold-400 font-mono">#{orderNum}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Table</span>
              <span className="font-semibold text-cream">Table {table || '1'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Items</span>
              <span className="font-semibold text-cream">{items.length} dishes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Amount</span>
              <span className="font-bold text-cream">₹{total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Est. Time</span>
              <span className="font-semibold text-gold-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {estimatedMinutes > 0 ? `~${estimatedMinutes} min` : 'Almost ready!'}
              </span>
            </div>
          </div>

          {/* Status tracker */}
          <div className="glass-dark rounded-2xl p-5 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Order Status</p>
            <div className="space-y-3">
              {ORDER_STAGES.map((stage, i) => {
                const Icon = stage.icon
                const isActive = i === stageIdx
                const isDone = i < stageIdx
                return (
                  <motion.div
                    key={stage.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i <= stageIdx ? 1 : 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isDone ? 'bg-green-500/30' : isActive ? stage.bg : 'bg-charcoal-600'
                    }`}>
                      <Icon className={`w-4.5 h-4.5 ${isDone ? 'text-green-400' : isActive ? stage.color : 'text-gray-600'}`} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${i <= stageIdx ? 'text-cream' : 'text-gray-600'}`}>{stage.label}</p>
                      {isActive && <p className="text-xs text-gray-400">{stage.desc}</p>}
                    </div>
                    {isActive && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                        className="ml-auto w-4 h-4 border-2 border-gold-400 border-t-transparent rounded-full"
                      />
                    )}
                    {isDone && <Check className="w-4 h-4 text-green-400 ml-auto" />}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Timer */}
          {stageIdx < 2 && (
            <div className="text-center mb-6">
              <p className="text-xs text-gray-500 mb-1">Time elapsed</p>
              <p className="font-mono text-2xl text-gold-400 font-bold">{formatTime(elapsed)}</p>
            </div>
          )}

          {stageIdx === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4 mb-6"
            >
              <p className="text-green-400 font-bold text-lg">🎉 Your food is ready!</p>
              <p className="text-gray-300 text-sm mt-1">Your waiter is bringing it to Table {table || '1'}</p>
            </motion.div>
          )}

          <div className="flex gap-3">
            <Link to="/qr/menu" className="flex-1 flex items-center justify-center gap-2 bg-charcoal-700 text-cream font-semibold py-3 rounded-xl text-sm border border-white/10 hover:bg-charcoal-600 transition-colors">
              <UtensilsCrossed className="w-4 h-4" /> Order More
            </Link>
            <Link to="/" onClick={clearCart} className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
              <Home className="w-4 h-4" /> Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
