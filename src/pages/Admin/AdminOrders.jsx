import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDemo } from '../../context/DemoContext'
import { Search, Filter, Eye, Clock, CheckCircle, XCircle } from 'lucide-react'
import AnimatedSection from '../../components/ui/AnimatedSection'

const STATUS_MAP = {
  NEW: { cls: 'badge-status-new', label: 'New' },
  PREPARING: { cls: 'badge-status-preparing', label: 'Preparing' },
  READY: { cls: 'badge-status-ready', label: 'Ready' },
  COMPLETED: { cls: 'badge-status-completed', label: 'Completed' },
}

export default function AdminOrders() {
  const { demoOrders } = useDemo()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = demoOrders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const stats = ['NEW','PREPARING','READY','COMPLETED'].map(s => ({
    status: s, count: demoOrders.filter(o => o.status === s).length
  }))

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <AnimatedSection>
        <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">All orders across tables</p>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => (
          <button key={s.status} onClick={() => setStatusFilter(s.status === statusFilter ? 'all' : s.status)}
            className={`card p-4 text-center transition-all hover:-translate-y-1 ${statusFilter === s.status ? 'ring-2 ring-gold-500' : ''}`}>
            <p className="text-2xl font-display font-bold text-charcoal-800 dark:text-cream">{s.count}</p>
            <span className={STATUS_MAP[s.status]?.cls}>{STATUS_MAP[s.status]?.label}</span>
          </button>
        ))}
      </div>

      <AnimatedSection className="card p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="input-field pl-9" placeholder="Search order ID or customer..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            {['NEW','PREPARING','READY','COMPLETED'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-charcoal-700">
                {['Order #', 'Table', 'Customer', 'Items', 'Status', 'Total', 'Time'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="border-b border-gray-50 dark:border-charcoal-700 hover:bg-gray-50 dark:hover:bg-charcoal-700/50 transition-colors">
                  <td className="py-3 pr-4 font-mono text-xs font-semibold text-charcoal-800 dark:text-cream">{order.id}</td>
                  <td className="py-3 pr-4 text-charcoal-800 dark:text-cream">T{order.table}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{order.customerName}</td>
                  <td className="py-3 pr-4 text-gray-500">{order.items.length} items</td>
                  <td className="py-3 pr-4"><span className={STATUS_MAP[order.status]?.cls}>{order.status}</span></td>
                  <td className="py-3 pr-4 font-semibold text-charcoal-800 dark:text-cream">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="py-3 pr-4 text-gray-400 text-xs">{new Date(order.placedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </div>
  )
}
