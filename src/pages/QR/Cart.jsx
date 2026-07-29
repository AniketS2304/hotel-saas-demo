import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Trash2, Plus, Minus, Tag, ShoppingBag, MessageSquare } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function Cart() {
  const navigate = useNavigate()
  const { items, subtotal, gst, serviceCharge, discountAmount, total, updateQty, removeItem, applyCoupon, coupon, instructions, setInstructions } = useCart()
  const [couponInput, setCouponInput] = useState('')

  const handleCoupon = () => {
    const result = applyCoupon(couponInput)
    if (result.success) {
      toast.success(result.message, { icon: '🎟️' })
    } else {
      toast.error(result.message)
    }
  }

  const handleCheckout = () => {
    if (items.length === 0) { toast.error('Your cart is empty'); return }
    navigate('/qr/success')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex flex-col items-center justify-center gap-5 px-4">
        <div className="text-6xl">🛒</div>
        <p className="font-display font-bold text-2xl text-cream">Your cart is empty</p>
        <p className="text-gray-400 text-sm text-center">Add some delicious dishes from our menu.</p>
        <Link to="/qr/menu" className="btn-primary">View Menu</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal-900 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-charcoal-800/95 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <p className="font-display font-bold text-cream flex-1">Your Order</p>
          <span className="text-xs text-gray-400">{items.reduce((s, i) => s + i.quantity, 0)} items</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {items.map(item => (
            <motion.div
              key={item.id}
              layout
              exit={{ opacity: 0, x: -50 }}
              className="bg-charcoal-700 rounded-2xl p-4 flex gap-3 border border-white/5"
            >
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-cream text-sm">{item.name}</p>
                <p className="text-gold-400 font-bold mt-0.5">₹{item.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-2 bg-charcoal-600 rounded-lg px-2 py-1">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-cream font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="text-gray-400 hover:text-white">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="font-bold text-cream self-center">₹{item.price * item.quantity}</p>
            </motion.div>
          ))}
        </div>

        {/* Coupon */}
        <div className="bg-charcoal-700 rounded-2xl p-4 border border-white/5">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5" /> Coupon Code
          </p>
          {coupon ? (
            <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
              <span>✔ Coupon applied: {coupon.label}</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                className="flex-1 bg-charcoal-600 border border-white/10 text-cream placeholder-gray-500 text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-gold-400 transition-colors uppercase"
                placeholder="WELCOME10"
                value={couponInput}
                onChange={e => setCouponInput(e.target.value.toUpperCase())}
              />
              <button onClick={handleCoupon} className="px-4 bg-gold-500 hover:bg-gold-600 text-white text-sm font-bold rounded-xl transition-colors">
                Apply
              </button>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1.5">Try: WELCOME10 · FLAT50 · FAMILY15</p>
        </div>

        {/* Instructions */}
        <div className="bg-charcoal-700 rounded-2xl p-4 border border-white/5">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5" /> Cooking Instructions
          </p>
          <textarea
            rows={2}
            className="w-full bg-charcoal-600 border border-white/10 text-cream placeholder-gray-500 text-sm px-3 py-2.5 rounded-xl resize-none focus:outline-none focus:border-gold-400 transition-colors"
            placeholder="Any special instructions? (e.g. no onions, extra spicy...)"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
          />
        </div>

        {/* Bill summary */}
        <div className="bg-charcoal-700 rounded-2xl p-5 border border-white/5 space-y-3">
          <p className="font-bold text-cream font-display">Bill Summary</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span><span className="text-cream">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>GST (5%)</span><span className="text-cream">₹{gst}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Service Charge (10%)</span><span className="text-cream">₹{serviceCharge}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-400 font-semibold">
                <span>Coupon Discount</span><span>−₹{discountAmount}</span>
              </div>
            )}
            <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-base">
              <span className="text-cream">Total</span>
              <span className="text-gold-400 text-lg">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-charcoal-800/95 backdrop-blur-md border-t border-white/10 z-20">
        <div className="max-w-lg mx-auto">
          <button onClick={handleCheckout} className="w-full flex items-center justify-between bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-gold">
            <ShoppingBag className="w-5 h-5" />
            <span>Place Order</span>
            <span className="bg-gold-600 px-2.5 py-1 rounded-lg text-sm">₹{total}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
