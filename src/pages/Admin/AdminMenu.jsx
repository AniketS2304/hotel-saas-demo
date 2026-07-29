import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Edit3, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import AnimatedSection from '../../components/ui/AnimatedSection'
import { MENU_ITEMS, MENU_CATEGORIES } from '../../data/menu'
import toast from 'react-hot-toast'

export default function AdminMenu() {
  const [items, setItems] = useState(MENU_ITEMS)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')

  const filtered = items.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = cat === 'all' || d.category === cat
    return matchSearch && matchCat
  })

  const toggleAvail = (id) => {
    setItems(prev => prev.map(d => d.id === id ? { ...d, available: !d.available } : d))
    toast.success('Availability updated!')
  }

  const handleDelete = (id) => {
    setItems(prev => prev.filter(d => d.id !== id))
    toast.success('Item removed from menu')
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <AnimatedSection className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Menu Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{items.length} items · {items.filter(d => d.available).length} available</p>
        </div>
        <button onClick={() => toast.success('Add item form would open here')} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </AnimatedSection>

      <AnimatedSection className="card p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="input-field pl-9" placeholder="Search dishes..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {MENU_CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCat(c.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${cat === c.id ? 'bg-gold-500 text-white' : 'bg-gray-100 dark:bg-charcoal-700 text-gray-600 dark:text-gray-300'}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-charcoal-700">
                {['Item', 'Category', 'Price', 'Rating', 'Available', 'Actions'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(dish => (
                <tr key={dish.id} className="border-b border-gray-50 dark:border-charcoal-700 hover:bg-gray-50 dark:hover:bg-charcoal-700/50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={dish.image} alt={dish.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold text-charcoal-800 dark:text-cream">{dish.name}</p>
                        <span className={dish.isVeg ? 'badge-veg' : 'badge-nonveg'}>{dish.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400 capitalize text-xs">{dish.category.replace('-', ' ')}</td>
                  <td className="py-3 pr-4 font-semibold text-charcoal-800 dark:text-cream">₹{dish.price}</td>
                  <td className="py-3 pr-4 text-gold-500">★ {dish.rating}</td>
                  <td className="py-3 pr-4">
                    <button onClick={() => toggleAvail(dish.id)} className="text-2xl transition-all">
                      {dish.available
                        ? <ToggleRight className="w-6 h-6 text-green-500" />
                        : <ToggleLeft className="w-6 h-6 text-gray-400" />
                      }
                    </button>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-2">
                      <button onClick={() => toast('Edit form coming soon')} className="text-gray-400 hover:text-gold-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(dish.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </div>
  )
}
