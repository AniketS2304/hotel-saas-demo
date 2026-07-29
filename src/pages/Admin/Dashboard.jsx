import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, BarChart3, TableProperties, UserCheck, ArrowRight, Star } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../../components/ui/AnimatedSection'
import AnimatedCounter from '../../components/ui/AnimatedCounter'
import { DASHBOARD_STATS, REVENUE_TREND, DAILY_ORDERS_WEEK } from '../../data/chartData'
import { useDemo } from '../../context/DemoContext'
import { HOTEL_CONFIG } from '../../data/config'

const KPICard = ({ title, value, change, icon: Icon, prefix = '', suffix = '', color, link }) => {
  const isPositive = change >= 0
  return (
    <motion.div whileHover={{ y: -2 }} className="stat-card group cursor-pointer">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          isPositive ? 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400' : 'text-red-500 bg-red-50 dark:bg-red-900/30'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </span>
      </div>
      <div>
        <p className="kpi-label">{title}</p>
        <p className="kpi-value">{prefix}<AnimatedCounter to={value} />{suffix}</p>
      </div>
      {link && (
        <Link to={link} className="text-xs text-gold-500 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          View details <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-charcoal-800 border border-charcoal-600 rounded-xl p-3 text-xs">
        <p className="text-gray-400 mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">
            {p.name}: {p.name === 'Revenue' || p.name === 'Target' ? `₹${p.value.toLocaleString('en-IN')}` : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const { revenue, demoOrders } = useDemo()
  const activeOrders = demoOrders.filter(o => ['NEW','PREPARING','READY'].includes(o.status)).length

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Page header */}
      <AnimatedSection>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            System Online
          </div>
        </div>
      </AnimatedSection>

      {/* Sales-first value message */}
      <AnimatedSection>
        <div className="bg-gradient-to-r from-gold-500/10 to-gold-300/5 border border-gold-500/20 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-sm font-semibold text-charcoal-800 dark:text-cream">
            🚀 This dashboard gives you complete visibility of your business — revenue, orders, customers, and operations — all in one place.
          </p>
          <div className="flex gap-3 flex-wrap text-xs font-semibold text-gold-600 dark:text-gold-400">
            <span>✔ Real-time data</span>
            <span>✔ No accounting software needed</span>
            <span>✔ Access from any device</span>
          </div>
        </div>
      </AnimatedSection>

      {/* KPI Cards */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaggerItem>
          <KPICard title="Today's Sales" value={revenue} change={DASHBOARD_STATS.todaySalesChange} icon={DollarSign} prefix="₹" color="bg-gold-500" link="/admin/reports" />
        </StaggerItem>
        <StaggerItem>
          <KPICard title="Today's Orders" value={DASHBOARD_STATS.todayOrders + activeOrders} change={DASHBOARD_STATS.todayOrdersChange} icon={ShoppingBag} color="bg-blue-500" link="/admin/orders" />
        </StaggerItem>
        <StaggerItem>
          <KPICard title="Active Tables" value={activeOrders} change={DASHBOARD_STATS.runningTables} icon={TableProperties} suffix={`/${DASHBOARD_STATS.totalTables}`} color="bg-amber-500" link="/admin/tables" />
        </StaggerItem>
        <StaggerItem>
          <KPICard title="Reservations" value={DASHBOARD_STATS.reservations} change={DASHBOARD_STATS.reservationsChange} icon={Users} color="bg-purple-500" link="/admin/customers" />
        </StaggerItem>
        <StaggerItem>
          <KPICard title="Avg Order Value" value={DASHBOARD_STATS.avgOrderValue} change={DASHBOARD_STATS.avgOrderChange} icon={BarChart3} prefix="₹" color="bg-green-500" link="/admin/reports" />
        </StaggerItem>
        <StaggerItem>
          <KPICard title="Visitors Today" value={DASHBOARD_STATS.visitors} change={DASHBOARD_STATS.visitorsChange} icon={Users} color="bg-indigo-500" />
        </StaggerItem>
        <StaggerItem>
          <KPICard title="Returning Guests" value={DASHBOARD_STATS.returningCustomers} change={DASHBOARD_STATS.returningChange} icon={UserCheck} suffix="%" color="bg-rose-500" link="/admin/loyalty" />
        </StaggerItem>
        <StaggerItem>
          <KPICard title="Platform Rating" value={48} change={0.2} icon={Star} prefix="" suffix="/5.0" color="bg-gold-600" />
        </StaggerItem>
      </StaggerContainer>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <AnimatedSection delay={0.1}>
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-charcoal-800 dark:text-cream">Revenue Trend</h3>
                <p className="text-xs text-gray-400">Monthly revenue vs target · Current Year</p>
              </div>
              <Link to="/admin/reports" className="text-xs text-gold-500 font-semibold hover:text-gold-600">Full Report →</Link>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={REVENUE_TREND}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#C9A84C" strokeWidth={2.5} fill="url(#revGrad)" />
                <Area type="monotone" dataKey="target" name="Target" stroke="#6366F1" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AnimatedSection>

        {/* Weekly Orders */}
        <AnimatedSection delay={0.2}>
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-charcoal-800 dark:text-cream">Weekly Orders</h3>
                <p className="text-xs text-gray-400">Orders & covers this week</p>
              </div>
              <Link to="/admin/reports" className="text-xs text-gold-500 font-semibold hover:text-gold-600">Full Report →</Link>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={DAILY_ORDERS_WEEK} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orders" name="Orders" fill="#C9A84C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="covers" name="Covers" fill="#E5C158" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedSection>
      </div>

      {/* Recent demo orders */}
      <AnimatedSection>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-charcoal-800 dark:text-cream">Live Orders</h3>
            <Link to="/admin/orders" className="text-xs text-gold-500 font-semibold hover:text-gold-600">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-charcoal-700">
                  <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Table</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Customer</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-right py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {demoOrders.slice(0, 8).map(order => (
                  <tr key={order.id} className="border-b border-gray-50 dark:border-charcoal-700 hover:bg-gray-50 dark:hover:bg-charcoal-700/50 transition-colors">
                    <td className="py-3 font-mono text-xs text-charcoal-800 dark:text-cream font-semibold">{order.id}</td>
                    <td className="py-3 text-charcoal-800 dark:text-cream">Table {order.table}</td>
                    <td className="py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{order.customerName}</td>
                    <td className="py-3">
                      <span className={`badge-status-${order.status.toLowerCase()}`}>{order.status}</span>
                    </td>
                    <td className="py-3 text-right font-semibold text-charcoal-800 dark:text-cream">₹{order.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* Bottom value message */}
      <AnimatedSection>
        <div className="bg-charcoal-800 rounded-2xl p-5 text-center">
          <p className="font-display text-cream font-bold text-lg mb-2">This is what your hotel can look like in 48 hours.</p>
          <p className="text-gray-400 text-sm mb-4">Complete digital transformation. One platform. Zero hassle.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${HOTEL_CONFIG.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary text-sm">
              Get This For My Hotel
            </a>
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-cream transition-colors">
              View Demo Website →
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}


