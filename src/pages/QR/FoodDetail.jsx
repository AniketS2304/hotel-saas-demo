import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Star, Clock, Flame, ShoppingCart, Plus, Minus, Check } from 'lucide-react'
import { getDishById, getPopularDishes } from '../../data/menu'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function FoodDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dish = getDishById(id)
  const { addItem, itemCount } = useCart()
  const [qty, setQty] = useState(1)
  const [selected, setSelected] = useState([])
  const similar = getPopularDishes().filter(d => d.id !== id).slice(0, 4)

  if (!dish) return <div className="min-h-screen bg-charcoal-900 flex items-center justify-center text-cream">Dish not found</div>

  const toggleCustom = (opt) => setSelected(s => s.includes(opt) ? s.filter(x => x !== opt) : [...s, opt])

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: dish.id, name: dish.name, price: dish.price, image: dish.image, customizations: selected })
    }
    toast.success(`${qty}× ${dish.name} added to cart!`, { icon: '🛒' })
    navigate(-1)
  }

  const CUSTOM_LABELS = {
    'extra-butter': 'Extra Butter',
    'less-oil': 'Less Oil',
    'extra-chutney': 'Extra Chutney',
    'extra-sambar': 'Extra Sambar',
    'less-spicy': 'Less Spicy',
    'extra-gravy': 'Extra Gravy',
    'no-onion': 'No Onion',
    'boneless': 'Boneless',
    'extra-raita': 'Extra Raita',
    'extra-paneer': 'Extra Paneer',
    'extra-butter-alt': 'Extra Butter',
    'cheese-topping': 'Add Cheese',
    'extra-cream': 'Extra Cream',
    'less-cream': 'Less Cream',
    'dry': 'Dry Style',
    'gravy': 'Gravy Style',
    'extra-sauce': 'Extra Sauce',
    'egg-added': 'Add Egg',
    'extra-spicy': 'Extra Spicy',
    'extra-cheese': 'Extra Cheese',
    'no-sauce': 'No Sauce',
    'double-patty': 'Double Patty',
    'thin-crust': 'Thin Crust',
    'garlic-base': 'Garlic Base',
    'less-spicy2': 'Less Spicy',
    'extra-sauce2': 'Extra Sauce',
    'cheese-topping2': 'Cheese Topping',
    'warm': 'Serve Warm',
    'cold': 'Serve Cold',
    'extra-syrup': 'Extra Syrup',
    'extra-berries': 'Extra Berries',
    'no-cream': 'No Cream',
    'extra-falooda': 'Extra Falooda',
    'less-sweet': 'Less Sweet',
    'extra-mint': 'Extra Mint',
    'salt-rim': 'Salt Rim',
    'extra-mango': 'Extra Mango',
    'salted': 'Salted',
    'extra-ice-cream': 'Extra Ice Cream',
    'sugar-free': 'Sugar Free',
    'strong': 'Extra Strong',
    'extra-ginger': 'Extra Ginger',
    'extra-stew': 'Extra Stew',
    'no-coconut': 'No Coconut',
    'no-soy': 'No Soy Sauce',
    'extra-vegetables': 'Extra Vegetables',
  }

  return (
    <div className="min-h-screen bg-charcoal-900 pb-28">
      {/* Image */}
      <div className="relative h-72">
        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal-900" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-4 w-10 h-10 glass rounded-full flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <Link to="/qr/cart" className="absolute top-5 right-4">
          <div className="relative">
            <div className="w-10 h-10 glass rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
        </Link>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4 relative z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={dish.isVeg ? 'badge-veg' : 'badge-nonveg'}>{dish.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</span>
          {dish.isBestSeller && <span className="badge-bestseller">★ Best Seller</span>}
          {dish.isSpicy && <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded"><Flame className="w-3 h-3" /> Spicy</span>}
        </div>

        <h1 className="font-display font-bold text-2xl text-cream mb-2">{dish.name}</h1>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span className="text-cream font-semibold text-sm">{dish.rating}</span>
            <span className="text-gray-400 text-xs">({dish.ratingCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            {dish.prepTime} min prep time
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-5">{dish.description}</p>

        {/* Nutrition */}
        <div className="glass-dark rounded-2xl p-4 mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Nutritional Info (per serving)</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: 'Calories', value: dish.nutrition.calories, unit: 'kcal' },
              { label: 'Protein', value: dish.nutrition.protein, unit: 'g' },
              { label: 'Carbs', value: dish.nutrition.carbs, unit: 'g' },
              { label: 'Fat', value: dish.nutrition.fat, unit: 'g' },
            ].map(n => (
              <div key={n.label}>
                <p className="text-gold-400 font-bold text-sm">{n.value}{n.unit}</p>
                <p className="text-gray-500 text-xs">{n.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Key Ingredients</p>
          <div className="flex flex-wrap gap-2">
            {dish.ingredients.map(ing => (
              <span key={ing} className="text-xs bg-charcoal-700 text-gray-300 px-2.5 py-1 rounded-lg border border-white/10">{ing}</span>
            ))}
          </div>
        </div>

        {/* Customizations */}
        {dish.customizations?.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Customize Your Order</p>
            <div className="flex flex-wrap gap-2">
              {dish.customizations.map(opt => (
                <button
                  key={opt}
                  onClick={() => toggleCustom(opt)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all border ${
                    selected.includes(opt)
                      ? 'bg-gold-500 border-gold-500 text-white'
                      : 'border-white/10 text-gray-300 hover:border-gold-400 bg-charcoal-700'
                  }`}
                >
                  {selected.includes(opt) && <Check className="w-3 h-3" />}
                  {CUSTOM_LABELS[opt] || opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Similar dishes */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">You May Also Like</p>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {similar.map(d => (
              <Link key={d.id} to={`/qr/food/${d.id}`} className="flex-shrink-0 w-28">
                <img src={d.image} alt={d.name} loading="lazy" className="w-28 h-20 rounded-xl object-cover mb-1" />
                <p className="text-cream text-xs font-semibold truncate">{d.name}</p>
                <p className="text-gold-400 text-xs">₹{d.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-charcoal-800/95 backdrop-blur-md border-t border-white/10 z-30">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <div className="flex items-center gap-3 bg-charcoal-700 rounded-xl px-3 py-2">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-white">
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-cream font-bold w-4 text-center">{qty}</span>
            <button onClick={() => setQty(q => Math.min(10, q + 1))} className="text-gray-400 hover:text-white">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button onClick={handleAdd} className="flex-1 flex items-center justify-between bg-gold-500 hover:bg-gold-600 text-white font-bold py-3.5 px-5 rounded-xl transition-all shadow-gold">
            <span>Add {qty} to Cart</span>
            <span>₹{dish.price * qty}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
