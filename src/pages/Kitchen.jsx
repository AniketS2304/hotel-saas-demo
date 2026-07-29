import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, Clock, Check, AlertTriangle, Bell, RefreshCw, TrendingUp } from 'lucide-react'
import { useDemo } from '../context/DemoContext'

const StatusBadge = ({ status }) => {
  const map = {
    NEW: { label: 'New Order', cls: 'badge-status-new', dot: 'bg-blue-500' },
    PREPARING: { label: 'Preparing', cls: 'badge-status-preparing', dot: 'bg-amber-500 animate-pulse' },
    READY: { label: 'Ready to Serve', cls: 'badge-status-ready', dot: 'bg-green-500' },
    COMPLETED: { label: 'Completed', cls: 'badge-status-completed', dot: 'bg-gray-400' },
  }
  const s = map[status] || map.NEW
  return (
    <span className={`${s.cls} flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
      {s.label}
    </span>
  )
}

function KDSTimer({ placedAt }) {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const started = new Date(placedAt).getTime()
    const update = () => setElapsed(Math.floor((Date.now() - started) / 1000))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [placedAt])

  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const isUrgent = mins >= 10
  const isWarning = mins >= 5

  return (
    <div className={`flex items-center gap-1.5 text-sm font-mono font-bold ${isUrgent ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-green-400'}`}>
      <Clock className="w-3.5 h-3.5" />
      {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      {isUrgent && <AlertTriangle className="w-3.5 h-3.5" />}
    </div>
  )
}

export default function Kitchen() {
  const { demoOrders, setDemoOrders } = useDemo()
  const [filter, setFilter] = useState('active')

  const activeOrders = demoOrders.filter(o => ['NEW', 'PREPARING', 'READY'].includes(o.status))
  const filteredOrders = filter === 'active' ? activeOrders : demoOrders

  const counts = {
    new: demoOrders.filter(o => o.status === 'NEW').length,
    preparing: demoOrders.filter(o => o.status === 'PREPARING').length,
    ready: demoOrders.filter(o => o.status === 'READY').length,
    completed: demoOrders.filter(o => o.status === 'COMPLETED').length,
  }

  const bump = (id) => {
    setDemoOrders(prev => prev.map(o => {
      if (o.id !== id) return o
      const next = { NEW: 'PREPARING', PREPARING: 'READY', READY: 'COMPLETED' }[o.status]
      return next ? { ...o, status: next } : o
    }))
  }

  const borderColor = (status) => ({
    NEW: 'border-l-blue-500',
    PREPARING: 'border-l-amber-500',
    READY: 'border-l-green-500',
    COMPLETED: 'border-l-gray-500',
  }[status] || 'border-l-gray-500')

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-white">Kitchen Display System</h1>
              <p className="text-gray-400 text-xs">Real-time order management • Powered by HotelOS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-green-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              LIVE
            </span>
            <div className="text-xs text-gray-400 font-mono">{new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-4 gap-4">
          {[
            { label: 'New', count: counts.new, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Preparing', count: counts.preparing, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { label: 'Ready', count: counts.ready, color: 'text-green-400', bg: 'bg-green-500/10' },
            { label: 'Done Today', count: counts.completed, color: 'text-gray-400', bg: 'bg-gray-500/10' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl px-4 py-2.5 text-center`}>
              <p className={`text-2xl font-bold font-display ${s.color}`}>{s.count}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2">
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'active' ? 'bg-gold-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          Active Orders ({activeOrders.length})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'all' ? 'bg-gold-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          All Orders ({demoOrders.length})
        </button>
      </div>

      {/* KDS Board */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No orders right now. Use Demo Mode to add orders.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOrders.map(order => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-gray-900 border border-gray-800 border-l-4 ${borderColor(order.status)} rounded-2xl overflow-hidden ${
                  order.priority === 'high' ? 'ring-1 ring-red-500/50' : ''
                }`}
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                  <div>
                    <p className="font-bold text-white text-sm">Table {order.table}</p>
                    <p className="text-gray-400 text-xs">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={order.status} />
                    {order.status !== 'COMPLETED' && (
                      <div className="mt-1">
                        <KDSTimer placedAt={order.placedAt} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="px-4 py-3 space-y-1.5">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        <span className="font-bold text-white mr-1">{item.quantity}×</span>
                        {item.name}
                      </span>
                    </div>
                  ))}
                  {order.notes && (
                    <div className="mt-2 text-xs text-amber-400 bg-amber-500/10 rounded-lg px-2 py-1.5">
                      📝 {order.notes}
                    </div>
                  )}
                </div>

                {/* BUMP button */}
                {order.status !== 'COMPLETED' && (
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => bump(order.id)}
                      className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 ${
                        order.status === 'NEW' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                        order.status === 'PREPARING' ? 'bg-amber-500 hover:bg-amber-600 text-white' :
                        'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {order.status === 'NEW' ? '▶ Start Preparing' :
                       order.status === 'PREPARING' ? '✓ Mark as Ready' :
                       '🍽 Mark as Served'}
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Business value bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gold-500/10 border-t border-gold-500/20 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center md:justify-start text-xs text-gold-400 font-semibold">
          <span>✔ Reduces order errors by 80%</span>
          <span>✔ Real-time status for all staff</span>
          <span>✔ Priority alerts for urgent orders</span>
          <span>✔ No verbal communication needed</span>
        </div>
      </div>
    </div>
  )
}
