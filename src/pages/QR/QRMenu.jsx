import React, { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, ShoppingCart, Star, X, ChevronLeft } from 'lucide-react'
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/menu'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function QRMenu() {
  const [params] = useSearchParams()
  const table = params.get('table') || '1'
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ veg: false, nonveg: false, bestseller: false, spicy: false })
  const [showFilters, setShowFilters] = useState(false)
  const { addItem, itemCount } = useCart()

  const items = useMemo(() => {
    let list = cat === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(d => d.category === cat)
    if (search) list = list.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase()))
    if (filters.veg) list = list.filter(d => d.isVeg)
    if (filters.nonveg) list = list.filter(d => !d.isVeg)
    if (filters.bestseller) list = list.filter(d => d.isBestSeller)
    if (filters.spicy) list = list.filter(d => d.isSpicy)
    return list
  }, [cat, search, filters])

  const toggleFilter = (k) => setFilters(f => ({ ...f, [k]: !f[k] }))

  const handleAdd = (dish) => {
    addItem({ id: dish.id, name: dish.name, price: dish.price, image: dish.image })
    toast.success(`${dish.name} added!`, { icon: '✅' })
  }

  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-charcoal-800/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <Link to={`/qr?table=${table}`} className="text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <p className="font-display font-bold text-cream">Menu · Table {table}</p>
            <Link to="/qr/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 min-w-[18px] bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Search */}
          <div className="pb-3">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  className="w-full bg-charcoal-700 border border-white/10 text-cream placeholder-gray-500 text-sm pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-gold-400 transition-colors"
                  placeholder="Search dishes..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(f => !f)}
                className={`px-3 rounded-xl border transition-all ${showFilters ? 'bg-gold-500 border-gold-500 text-white' : 'border-white/10 text-gray-400 hover:border-gold-400 hover:text-white'}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Filter chips */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex gap-2 mt-2 overflow-hidden"
                >
                  {[
                    { key: 'veg', label: '🟢 Veg' },
                    { key: 'nonveg', label: '🔴 Non-Veg' },
                    { key: 'bestseller', label: '⭐ Best Seller' },
                    { key: 'spicy', label: '🌶 Spicy' },
                  ].map(f => (
                    <button key={f.key} onClick={() => toggleFilter(f.key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        filters[f.key] ? 'bg-gold-500 text-white' : 'bg-charcoal-700 text-gray-300 border border-white/10'
                      }`}>
                      {f.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3">
            {MENU_CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  cat === c.id ? 'bg-gold-500 text-white' : 'bg-charcoal-700 text-gray-300 border border-white/10 hover:border-gold-400'
                }`}
              >
                <span>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-gray-400">No dishes found. Try a different search.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(dish => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-charcoal-700 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all"
              >
                <div className="flex gap-3 p-3">
                  <Link to={`/qr/food/${dish.id}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                      <img src={dish.image} alt={dish.name} loading="lazy" className="w-full h-full object-cover" />
                      {dish.isBestSeller && (
                        <span className="absolute bottom-0 left-0 right-0 bg-gold-500 text-white text-xs font-bold text-center py-0.5">
                          ★ BEST
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`${dish.isVeg ? 'badge-veg' : 'badge-nonveg'} mb-1`}>
                          {dish.isVeg ? '🟢' : '🔴'}
                        </span>
                        <Link to={`/qr/food/${dish.id}`}>
                          <h3 className="font-bold text-cream text-sm mt-0.5 hover:text-gold-400 transition-colors">{dish.name}</h3>
                        </Link>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">{dish.description}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                      <span className="text-xs text-gray-400">{dish.rating} ({dish.ratingCount})</span>
                      <span className="text-gray-600 text-xs">· {dish.prepTime} min</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="font-bold text-cream">₹{dish.price}</span>
                        {dish.mrp > dish.price && (
                          <span className="text-xs text-gray-500 line-through ml-1">₹{dish.mrp}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAdd(dish)}
                        className="bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky cart button */}
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-charcoal-800/95 backdrop-blur-md border-t border-white/10 z-30"
        >
          <div className="max-w-2xl mx-auto">
            <Link
              to="/qr/cart"
              className="flex items-center justify-between bg-gold-500 hover:bg-gold-600 text-white font-bold py-3.5 px-5 rounded-2xl transition-all shadow-gold"
            >
              <span className="bg-gold-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg">{itemCount}</span>
              <span>View Cart & Checkout</span>
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
