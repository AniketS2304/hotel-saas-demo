import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, UtensilsCrossed, CreditCard, Bell, X, Check, Printer, QrCode } from 'lucide-react'
import { TABLES } from '../data/tables'
import { useDemo } from '../context/DemoContext'
import toast from 'react-hot-toast'

const TABLE_STATUS_STYLES = {
  available: { bg: 'bg-green-500/20 border-green-500/50 hover:bg-green-500/30', dot: 'bg-green-400', label: 'Available', text: 'text-green-400' },
  occupied:  { bg: 'bg-amber-500/20 border-amber-500/50 hover:bg-amber-500/30', dot: 'bg-amber-400 animate-pulse', label: 'Occupied', text: 'text-amber-400' },
  billing:   { bg: 'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30', dot: 'bg-blue-400', label: 'Billing', text: 'text-blue-400' },
  reserved:  { bg: 'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30', dot: 'bg-purple-400', label: 'Reserved', text: 'text-purple-400' },
}

function BillingModal({ table, onClose }) {
  const [payMethod, setPayMethod] = useState('upi')
  const [paid, setPaid] = useState(false)
  const subtotal = 1240; const gst = 62; const sc = 124; const total = 1426

  const handlePay = () => {
    setPaid(true)
    setTimeout(() => {
      toast.success(`Payment received for Table ${table.number}! ₹${total.toLocaleString('en-IN')} via ${payMethod.toUpperCase()}`, { icon: '💳' })
      onClose()
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 w-full max-w-sm">
        {paid ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <p className="font-display font-bold text-xl text-charcoal-800 dark:text-cream">Payment Successful!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-lg text-charcoal-800 dark:text-cream">Bill — Table {table.number}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>

            {/* Invoice lines */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Butter Chicken ×2</span><span>₹640</span></div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Dal Makhani ×1</span><span>₹220</span></div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Garlic Naan ×4</span><span>₹240</span></div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Mango Lassi ×2</span><span>₹200</span></div>
              <div className="border-t border-gray-200 dark:border-charcoal-600 pt-2 space-y-1">
                <div className="flex justify-between text-gray-500 dark:text-gray-400"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400"><span>GST (5%)</span><span>₹{gst}</span></div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400"><span>Service Charge (10%)</span><span>₹{sc}</span></div>
                <div className="flex justify-between font-bold text-base border-t border-gray-200 dark:border-charcoal-600 pt-2">
                  <span className="text-charcoal-800 dark:text-cream">Total</span>
                  <span className="text-gold-500 text-lg">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['cash', 'card', 'upi'].map(m => (
                <button key={m} onClick={() => setPayMethod(m)}
                  className={`py-2.5 rounded-xl text-sm font-semibold uppercase transition-all ${payMethod === m ? 'bg-gold-500 text-white' : 'bg-gray-100 dark:bg-charcoal-700 text-gray-600 dark:text-gray-300'}`}>
                  {m}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => toast('Sending to printer...', { icon: '🖨️' })}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-600 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-charcoal-700 transition-colors">
                <Printer className="w-4 h-4" />
              </button>
              <button onClick={handlePay} className="flex-1 btn-primary justify-center">
                <CreditCard className="w-4 h-4" /> Collect ₹{total.toLocaleString('en-IN')}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Staff() {
  const { demoOrders, tableStatuses } = useDemo()
  const [selectedTable, setSelectedTable] = useState(null)
  const [billingTable, setBillingTable] = useState(null)
  const [section, setSection] = useState('All')

  const getStatus = (t) => tableStatuses[t.id] || t.status
  const getOrder = (t) => demoOrders.find(o => o.table === t.id && ['NEW','PREPARING','READY'].includes(o.status))

  const stats = {
    available: TABLES.filter(t => getStatus(t) === 'available').length,
    occupied: TABLES.filter(t => getStatus(t) === 'occupied').length,
    billing: TABLES.filter(t => getStatus(t) === 'billing').length,
    reserved: TABLES.filter(t => getStatus(t) === 'reserved').length,
  }

  const sections = ['All', 'Main Hall', 'Garden', 'Rooftop']
  const filtered = section === 'All' ? TABLES : TABLES.filter(t => t.section === section)

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal-900 pt-0">
      {/* Header */}
      <div className="bg-white dark:bg-charcoal-800 border-b border-gray-200 dark:border-charcoal-700 px-6 py-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl text-charcoal-800 dark:text-cream">Staff Dashboard</h1>
            <p className="text-xs text-gray-500">Waiter & Cashier View</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Floor View
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Available', count: stats.available, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' },
            { label: 'Occupied', count: stats.occupied, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
            { label: 'Billing', count: stats.billing, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
            { label: 'Reserved', count: stats.reserved, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4 text-center`}>
              <p className={`text-3xl font-display font-bold ${s.color}`}>{s.count}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-5">
          {Object.entries(TABLE_STATUS_STYLES).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
              <span className={`w-2 h-2 rounded-full ${v.dot}`}></span>
              {v.label}
            </div>
          ))}
        </div>

        {/* Section filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto hide-scrollbar">
          {sections.map(s => (
            <button key={s} onClick={() => setSection(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${section === s ? 'bg-gold-500 text-white' : 'bg-white dark:bg-charcoal-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-charcoal-600'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Table grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-3">
          {filtered.map(table => {
            const status = getStatus(table)
            const style = TABLE_STATUS_STYLES[status] || TABLE_STATUS_STYLES.available
            const order = getOrder(table)
            return (
              <motion.button
                key={table.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTable(table)}
                className={`relative border-2 rounded-2xl p-3 text-center transition-all ${style.bg}`}
              >
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${style.dot}`}></div>
                <p className="font-display font-bold text-charcoal-800 dark:text-cream text-sm">{table.number}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{table.capacity} seats</p>
                <p className={`text-xs font-semibold mt-1 ${style.text}`}>{style.label}</p>
                {order && (
                  <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-gold-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{order.items.length}</span>
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Table detail modal */}
      <AnimatePresence>
        {selectedTable && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTable(null)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <motion.div initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-charcoal-800 dark:text-cream">Table {selectedTable.number}</h3>
                <button onClick={() => setSelectedTable(null)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <div className="space-y-2 mb-5 text-sm text-gray-600 dark:text-gray-400">
                <p>Section: <strong className="text-charcoal-800 dark:text-cream">{selectedTable.section}</strong></p>
                <p>Capacity: <strong className="text-charcoal-800 dark:text-cream">{selectedTable.capacity} persons</strong></p>
                <p>Waiter: <strong className="text-charcoal-800 dark:text-cream">{selectedTable.waiter}</strong></p>
                <p>Status: <strong className={TABLE_STATUS_STYLES[getStatus(selectedTable)]?.text}>{TABLE_STATUS_STYLES[getStatus(selectedTable)]?.label}</strong></p>
              </div>
              {getOrder(selectedTable) && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-4">
                  <p className="text-xs font-bold text-amber-600 mb-1">Active Order</p>
                  {getOrder(selectedTable).items.map((item, i) => (
                    <p key={i} className="text-sm text-gray-700 dark:text-gray-300">{item.quantity}× {item.name}</p>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => { toast(`Waiter called for Table ${selectedTable.number}`, { icon: '🔔' }); setSelectedTable(null) }}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-200 dark:border-charcoal-600 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-charcoal-700 transition-colors">
                  <Bell className="w-4 h-4" /> Call Waiter
                </button>
                <button onClick={() => { setBillingTable(selectedTable); setSelectedTable(null) }}
                  className="flex-1 btn-primary justify-center text-sm py-2.5">
                  <CreditCard className="w-4 h-4" /> Generate Bill
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Billing modal */}
      <AnimatePresence>
        {billingTable && <BillingModal table={billingTable} onClose={() => setBillingTable(null)} />}
      </AnimatePresence>

      {/* Value bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gold-500/10 border-t border-gold-500/20 px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center text-xs text-gold-600 dark:text-gold-400 font-semibold">
          <span>✔ Visual table management — know your floor at a glance</span>
          <span>✔ Turn tables 30% faster</span>
          <span>✔ One-tap billing saves 15 min per table</span>
        </div>
      </div>
    </div>
  )
}
