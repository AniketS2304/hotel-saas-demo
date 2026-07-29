import React from 'react'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import AnimatedSection from '../../components/ui/AnimatedSection'

const INVENTORY = [
  { id: 1, name: 'Chicken (Fresh)', category: 'Protein', unit: 'kg', stock: 45, minStock: 20, supplier: 'Fresh Farm Co.', lastUpdated: '2 hrs ago', status: 'good' },
  { id: 2, name: 'Basmati Rice', category: 'Grains', unit: 'kg', stock: 12, minStock: 15, supplier: 'Rice Traders Ltd.', lastUpdated: '1 day ago', status: 'low' },
  { id: 3, name: 'Paneer', category: 'Dairy', unit: 'kg', stock: 8, minStock: 10, supplier: 'Dairy Fresh', lastUpdated: '3 hrs ago', status: 'low' },
  { id: 4, name: 'Tomatoes', category: 'Vegetables', unit: 'kg', stock: 30, minStock: 15, supplier: 'Local Market', lastUpdated: '5 hrs ago', status: 'good' },
  { id: 5, name: 'Cooking Oil', category: 'Oils', unit: 'L', stock: 0, minStock: 10, supplier: 'Oil Depot', lastUpdated: '2 days ago', status: 'out' },
  { id: 6, name: 'Butter', category: 'Dairy', unit: 'kg', stock: 6, minStock: 5, supplier: 'Dairy Fresh', lastUpdated: '1 day ago', status: 'good' },
  { id: 7, name: 'Flour (Maida)', category: 'Grains', unit: 'kg', stock: 25, minStock: 20, supplier: 'Grains Direct', lastUpdated: '2 days ago', status: 'good' },
  { id: 8, name: 'Cream (Fresh)', category: 'Dairy', unit: 'L', stock: 4, minStock: 8, supplier: 'Dairy Fresh', lastUpdated: '1 day ago', status: 'low' },
  { id: 9, name: 'Saffron', category: 'Spices', unit: 'gm', stock: 50, minStock: 20, supplier: 'Spice House', lastUpdated: '5 days ago', status: 'good' },
  { id: 10, name: 'Mutton (Boneless)', category: 'Protein', unit: 'kg', stock: 18, minStock: 10, supplier: 'Fresh Farm Co.', lastUpdated: '1 day ago', status: 'good' },
]

const STATUS_STYLES = {
  good: { cls: 'text-green-600 bg-green-50 dark:bg-green-900/30', icon: CheckCircle, label: 'In Stock' },
  low: { cls: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30', icon: AlertTriangle, label: 'Low Stock' },
  out: { cls: 'text-red-600 bg-red-50 dark:bg-red-900/30', icon: XCircle, label: 'Out of Stock' },
}

export default function Inventory() {
  const counts = { good: INVENTORY.filter(i => i.status === 'good').length, low: INVENTORY.filter(i => i.status === 'low').length, out: INVENTORY.filter(i => i.status === 'out').length }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <AnimatedSection>
        <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Inventory</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Track ingredients and supplies</p>
      </AnimatedSection>

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 text-center bg-green-50 dark:bg-green-900/20">
          <p className="text-2xl font-display font-bold text-green-600">{counts.good}</p>
          <p className="text-xs text-gray-500">In Stock</p>
        </div>
        <div className="card p-4 text-center bg-amber-50 dark:bg-amber-900/20">
          <p className="text-2xl font-display font-bold text-amber-600">{counts.low}</p>
          <p className="text-xs text-gray-500">Low Stock</p>
        </div>
        <div className="card p-4 text-center bg-red-50 dark:bg-red-900/20">
          <p className="text-2xl font-display font-bold text-red-600">{counts.out}</p>
          <p className="text-xs text-gray-500">Out of Stock</p>
        </div>
      </div>

      <AnimatedSection className="card p-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-charcoal-700">
              {['Ingredient', 'Category', 'Stock', 'Min Required', 'Status', 'Supplier', 'Updated'].map(h => (
                <th key={h} className="text-left py-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVENTORY.map(item => {
              const s = STATUS_STYLES[item.status]
              const Icon = s.icon
              return (
                <tr key={item.id} className="border-b border-gray-50 dark:border-charcoal-700 hover:bg-gray-50 dark:hover:bg-charcoal-700/50 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-charcoal-800 dark:text-cream">{item.name}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400 text-xs">{item.category}</td>
                  <td className="py-3 pr-4 font-bold text-charcoal-800 dark:text-cream">{item.stock} {item.unit}</td>
                  <td className="py-3 pr-4 text-gray-500 text-xs">{item.minStock} {item.unit}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${s.cls}`}>
                      <Icon className="w-3 h-3" />{s.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400 text-xs">{item.supplier}</td>
                  <td className="py-3 pr-4 text-gray-400 text-xs">{item.lastUpdated}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </AnimatedSection>

      <div className="bg-gold-500/10 border border-gold-500/20 rounded-2xl p-4 text-sm">
        <p className="font-semibold text-charcoal-800 dark:text-cream mb-1">💡 Business Value</p>
        <p className="text-gray-600 dark:text-gray-400">Real-time inventory tracking prevents waste and stockouts. Hotels using HotelOS report 25% less food wastage and zero stockout incidents during peak hours.</p>
      </div>
    </div>
  )
}
