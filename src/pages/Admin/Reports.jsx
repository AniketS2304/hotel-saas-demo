import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../../components/ui/AnimatedSection'
import { REVENUE_TREND, DAILY_ORDERS_WEEK, CATEGORY_SALES, TOP_DISHES, PEAK_HOURS, PAYMENT_METHODS, CUSTOMER_GROWTH, MONTHLY_COMPARISON } from '../../data/chartData'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-charcoal-800 border border-charcoal-600 rounded-xl p-3 text-xs shadow-xl">
        <p className="text-gray-400 mb-1.5 font-medium">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color || p.fill }} className="font-semibold">
            {p.name}: {typeof p.value === 'number' && p.value > 1000 ? `₹${p.value.toLocaleString('en-IN')}` : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const ChartCard = ({ title, subtitle, children, className = '' }) => (
  <AnimatedSection className={`card p-5 ${className}`}>
    <div className="mb-4">
      <h3 className="font-display font-bold text-charcoal-800 dark:text-cream">{title}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </AnimatedSection>
)

const INSIGHT_PILLS = [
  '✔ Revenue grew 18.6% vs last year',
  '✔ Saturday is your highest-grossing day',
  '✔ 8 PM is your busiest hour — staff accordingly',
  '✔ UPI is your most popular payment (42%)',
  '✔ Biryani drives 23% of total food revenue',
  '✔ Returning customers spend 40% more per visit',
]

export default function Reports() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <AnimatedSection>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Reports & Analytics</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">All data for the current financial year</p>
          </div>
          <span className="text-xs font-bold text-gold-600 bg-gold-50 dark:bg-gold-900/30 dark:text-gold-400 px-3 py-1.5 rounded-full border border-gold-200 dark:border-gold-800">
            Demo Data
          </span>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-charcoal-800 to-charcoal-700 rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">📊 Key Business Insights</p>
          <div className="flex flex-wrap gap-2">
            {INSIGHT_PILLS.map(p => (
              <span key={p} className="text-xs font-semibold bg-white/10 text-gray-200 px-3 py-1.5 rounded-full">{p}</span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Revenue Trend */}
      <ChartCard title="Annual Revenue Trend" subtitle="Monthly revenue vs target · Full year comparison">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={REVENUE_TREND}>
            <defs>
              <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.2} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#C9A84C" strokeWidth={2.5} fill="url(#rg)" />
            <Area type="monotone" dataKey="target" name="Target" stroke="#6366F1" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Sales Pie */}
        <ChartCard title="Category Sales Mix" subtitle="Percentage of total revenue by cuisine category">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={CATEGORY_SALES} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {CATEGORY_SALES.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Payment Methods Donut */}
        <ChartCard title="Payment Methods" subtitle="Breakdown by payment type">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={PAYMENT_METHODS} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={3} dataKey="value">
                {PAYMENT_METHODS.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top Dishes Bar */}
      <ChartCard title="Top 8 Dishes by Orders" subtitle="Most ordered dishes this year">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={TOP_DISHES} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.2} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={120} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="orders" name="Orders" fill="#C9A84C" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Peak Hours */}
        <ChartCard title="Peak Hours" subtitle="Average orders by hour of day">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={PEAK_HOURS}>
              <defs>
                <linearGradient id="phg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.2} />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="orders" name="Orders" stroke="#6366F1" strokeWidth={2} fill="url(#phg)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Customer Growth */}
        <ChartCard title="Customer Growth" subtitle="New vs returning customers (last 6 months)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CUSTOMER_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.2} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="new" name="New Customers" fill="#10B981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="returning" name="Returning" fill="#C9A84C" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Monthly Comparison */}
      <ChartCard title="This Month vs Last Month" subtitle="Revenue comparison by category">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={MONTHLY_COMPARISON} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.2} />
            <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="thisMonth" name="This Month" fill="#C9A84C" radius={[4, 4, 0, 0]} />
            <Bar dataKey="lastMonth" name="Last Month" fill="#4B5563" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Weekly Orders Line */}
      <ChartCard title="Weekly Order Pattern" subtitle="Orders and covers this week by day">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={DAILY_ORDERS_WEEK}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.2} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="orders" name="Orders" stroke="#C9A84C" strokeWidth={2.5} dot={{ fill: '#C9A84C', r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="covers" name="Covers" stroke="#6366F1" strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <AnimatedSection>
        <div className="bg-gold-500/10 border border-gold-500/20 rounded-2xl p-5 text-center">
          <p className="font-display font-bold text-charcoal-800 dark:text-cream text-lg mb-2">Every chart you see here is available in real-time in your hotel.</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No spreadsheets. No manual reports. All data updated automatically as orders flow in.</p>
        </div>
      </AnimatedSection>
    </div>
  )
}
