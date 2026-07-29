import React, { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, MapPin, ChevronRight, Bell, Receipt, UtensilsCrossed } from 'lucide-react'
import { IMAGES } from '../../data/images'
import { HOTEL_CONFIG } from '../../data/config'
import { getPopularDishes } from '../../data/menu'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function QRWelcome() {
  const [params] = useSearchParams()
  const table = params.get('table') || '1'
  const { setTable } = useCart()
  const popular = getPopularDishes().slice(0, 3)

  useEffect(() => {
    setTable(Number(table))
    toast(`Welcome to Table ${table}! 🍽️`, { icon: '👋' })
  }, [table])

  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={IMAGES.heroRestaurant} alt="Restaurant" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 via-transparent to-charcoal-900" />

        {/* Logo overlay */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center shadow-gold mb-2">
              <span className="text-white font-display font-bold text-2xl">H</span>
            </div>
            <p className="text-white font-display font-semibold text-sm">{HOTEL_CONFIG.name}</p>
          </div>
        </div>

        {/* Table badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <div className="glass text-center px-8 py-3 rounded-2xl border border-white/30">
            <p className="text-white/70 text-xs uppercase tracking-widest">You are at</p>
            <p className="text-white font-display font-bold text-3xl">Table {table.padStart(2, '0')}</p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Info row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="glass-dark rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              <span className="text-gold-400 font-bold text-sm">{HOTEL_CONFIG.rating}</span>
            </div>
            <p className="text-gray-500 text-xs">Rating</p>
          </div>
          <div className="glass-dark rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-cream font-bold text-sm">15–20</span>
            </div>
            <p className="text-gray-500 text-xs">Avg. Prep (min)</p>
          </div>
          <div className="glass-dark rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <UtensilsCrossed className="w-3.5 h-3.5 text-green-400" />
              <span className="text-cream font-bold text-sm">Open</span>
            </div>
            <p className="text-gray-500 text-xs">Status</p>
          </div>
        </motion.div>

        {/* Today's Special */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-dark rounded-2xl p-4 border border-gold-500/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">⭐ Today's Special</span>
          </div>
          <div className="flex gap-3">
            <img src={IMAGES.dishes.chickenBiryani} alt="Special" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
            <div>
              <p className="text-cream font-bold">Dum Biryani Festival</p>
              <p className="text-gray-400 text-xs mt-0.5">Slow-cooked aromatic biryani with saffron rice and raita. Chef's signature preparation.</p>
              <p className="text-gold-400 font-bold text-sm mt-1">₹349 <span className="text-gray-500 line-through text-xs font-normal">₹420</span></p>
            </div>
          </div>
        </motion.div>

        {/* Popular picks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-dark rounded-2xl p-4"
        >
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Popular at This Table</p>
          <div className="space-y-3">
            {popular.map((d, i) => (
              <div key={d.id} className="flex items-center gap-3">
                <span className="text-gold-400 font-bold text-sm w-4">{i + 1}</span>
                <img src={d.image} alt={d.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-cream text-sm font-semibold">{d.name}</p>
                  <p className="text-gray-500 text-xs">₹{d.price}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                  <span className="text-xs text-gray-400">{d.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Link
            to={`/qr/menu?table=${table}`}
            className="flex items-center justify-between bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-gold hover:shadow-lg active:scale-98"
          >
            <span className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" />
              View Full Menu & Order
            </span>
            <ChevronRight className="w-5 h-5" />
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => toast('Waiter notified! Someone will be with you shortly.', { icon: '🔔' })}
              className="flex items-center justify-center gap-2 bg-charcoal-700 hover:bg-charcoal-600 text-cream font-semibold py-3.5 rounded-2xl transition-all text-sm border border-white/10"
            >
              <Bell className="w-4 h-4" />
              Call Waiter
            </button>
            <button
              onClick={() => toast('Bill request sent! Our team will arrive shortly.', { icon: '🧾' })}
              className="flex items-center justify-center gap-2 bg-charcoal-700 hover:bg-charcoal-600 text-cream font-semibold py-3.5 rounded-2xl transition-all text-sm border border-white/10"
            >
              <Receipt className="w-4 h-4" />
              Request Bill
            </button>
          </div>
        </motion.div>

        {/* Opening hours */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center pt-2"
        >
          <p className="text-gray-600 text-xs flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {HOTEL_CONFIG.hoursDisplay}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
