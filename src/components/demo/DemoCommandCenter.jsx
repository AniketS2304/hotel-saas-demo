import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Plus, Check, TrendingUp, Bell, X, ChevronDown } from 'lucide-react'
import { useDemo } from '../../context/DemoContext'
import toast from 'react-hot-toast'

export default function DemoCommandCenter() {
  const { isOpen, setIsOpen, selectedTable, setSelectedTable, triggerNewOrder, triggerOrderReady, triggerRevenueTick, notifications } = useDemo()

  const [unread, setUnread] = useState(0)

  const handleNewOrder = () => {
    triggerNewOrder()
    toast.success(`New order placed — Table ${selectedTable}!`, { icon: '🍽️' })
    setUnread(n => n + 1)
  }

  const handleOrderReady = () => {
    triggerOrderReady()
    toast.success('Order marked as Ready to Serve!', { icon: '✅' })
  }

  const handleRevenue = () => {
    triggerRevenueTick()
    toast.success('Payment received! Revenue updated.', { icon: '💳' })
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        onClick={() => { setIsOpen(o => !o); setUnread(0) }}
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-charcoal-800 dark:bg-charcoal-700 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl border border-gold-500/30 hover:border-gold-500 transition-all group"
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <Zap className="w-3.5 h-3.5 text-gold-400" />
        DEMO MODE
        {unread > 0 && (
          <span className="w-5 h-5 rounded-full bg-gold-500 text-white text-xs flex items-center justify-center">
            {unread}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-gold-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-16 left-5 z-50 w-72 bg-charcoal-800 border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-charcoal-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs font-bold text-cream tracking-wider">DEMO COMMAND CENTER</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Info */}
              <p className="text-xs text-gray-400 leading-relaxed">
                Use these controls during client presentations to simulate live activity.
              </p>

              {/* Table selector */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">Active Table</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <button
                      key={n}
                      onClick={() => setSelectedTable(n)}
                      className={`text-xs py-1.5 rounded-lg font-semibold transition-all ${
                        selectedTable === n
                          ? 'bg-gold-500 text-white'
                          : 'bg-charcoal-700 text-gray-400 hover:bg-charcoal-500 hover:text-white'
                      }`}
                    >
                      T{n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trigger buttons */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">Instant Triggers</label>
                <div className="space-y-2">
                  <button
                    onClick={handleNewOrder}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    New Order — Table {selectedTable}
                  </button>
                  <button
                    onClick={handleOrderReady}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    Mark Order as Ready
                  </button>
                  <button
                    onClick={handleRevenue}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Simulate Payment
                  </button>
                </div>
              </div>

              {/* Recent notifications */}
              {notifications.length > 0 && (
                <div>
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">Recent Activity</label>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto hide-scrollbar">
                    {notifications.slice(0, 5).map(n => (
                      <div key={n.id} className="flex items-start gap-2 text-xs text-gray-300 bg-charcoal-700/50 rounded-lg px-3 py-2">
                        <Bell className="w-3 h-3 text-gold-400 flex-shrink-0 mt-0.5" />
                        <span>{n.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-xs text-gray-600 text-center border-t border-charcoal-700 pt-3">
                All data is simulated for demo purposes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
