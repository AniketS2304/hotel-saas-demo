import React from 'react'
import { Search, Star, Gift, Phone } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../../components/ui/AnimatedSection'

const CUSTOMERS = [
  { id: 1, name: 'Rahul Sharma', phone: '+91 98765 43210', orders: 24, spend: 48200, points: 2410, tier: 'Platinum', birthday: 'Mar 15', lastVisit: '2 days ago', avatar: 'RS' },
  { id: 2, name: 'Priya Mehta', phone: '+91 87654 32109', orders: 18, spend: 32400, points: 1620, tier: 'Gold', birthday: 'Jul 22', lastVisit: '1 week ago', avatar: 'PM' },
  { id: 3, name: 'Amit Patel', phone: '+91 76543 21098', orders: 12, spend: 21600, points: 1080, tier: 'Silver', birthday: 'Oct 5', lastVisit: '2 weeks ago', avatar: 'AP' },
  { id: 4, name: 'Sneha Reddy', phone: '+91 65432 10987', orders: 31, spend: 68200, points: 3410, tier: 'Platinum', birthday: 'Dec 1', lastVisit: 'Today', avatar: 'SR' },
  { id: 5, name: 'Vikram Singh', phone: '+91 54321 09876', orders: 8, spend: 14400, points: 720, tier: 'Silver', birthday: 'Feb 28', lastVisit: '1 month ago', avatar: 'VS' },
  { id: 6, name: 'Kavitha Nair', phone: '+91 43210 98765', orders: 22, spend: 39600, points: 1980, tier: 'Gold', birthday: 'Aug 14', lastVisit: '3 days ago', avatar: 'KN' },
  { id: 7, name: 'Rohit Jain', phone: '+91 32109 87654', orders: 15, spend: 27000, points: 1350, tier: 'Gold', birthday: 'Jan 8', lastVisit: '5 days ago', avatar: 'RJ' },
  { id: 8, name: 'Ananya Das', phone: '+91 21098 76543', orders: 6, spend: 10800, points: 540, tier: 'Silver', birthday: 'Sep 20', lastVisit: '3 weeks ago', avatar: 'AD' },
]

const TIER_COLORS = { Platinum: 'bg-purple-100 text-purple-700', Gold: 'bg-gold-100 text-gold-700', Silver: 'bg-gray-100 text-gray-600' }
const TIER_ICONS = { Platinum: '💎', Gold: '⭐', Silver: '🥈' }

export default function Customers() {
  const [search, setSearch] = React.useState('')
  const filtered = CUSTOMERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search))

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <AnimatedSection>
        <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Customers</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{CUSTOMERS.length} registered customers</p>
      </AnimatedSection>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Platinum Members', count: CUSTOMERS.filter(c => c.tier === 'Platinum').length, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Gold Members', count: CUSTOMERS.filter(c => c.tier === 'Gold').length, color: 'text-gold-600', bg: 'bg-gold-50 dark:bg-gold-900/20' },
          { label: 'Total Points Issued', count: CUSTOMERS.reduce((s, c) => s + c.points, 0).toLocaleString('en-IN'), color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
        ].map(s => (
          <div key={s.label} className={`card p-4 text-center ${s.bg}`}>
            <p className={`text-2xl font-display font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <AnimatedSection className="card p-5">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input-field pl-9" placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-charcoal-700">
                {['Customer', 'Phone', 'Orders', 'Total Spend', 'Points', 'Tier', 'Birthday', 'Last Visit'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-gray-50 dark:border-charcoal-700 hover:bg-gray-50 dark:hover:bg-charcoal-700/50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gold-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{c.avatar}</div>
                      <span className="font-semibold text-charcoal-800 dark:text-cream">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400 text-xs">{c.phone}</td>
                  <td className="py-3 pr-4 text-charcoal-800 dark:text-cream font-semibold">{c.orders}</td>
                  <td className="py-3 pr-4 font-semibold text-charcoal-800 dark:text-cream">₹{c.spend.toLocaleString('en-IN')}</td>
                  <td className="py-3 pr-4">
                    <span className="text-xs font-bold text-gold-600 bg-gold-50 dark:bg-gold-900/30 px-2 py-0.5 rounded-full">{c.points.toLocaleString('en-IN')} pts</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TIER_COLORS[c.tier]}`}>
                      {TIER_ICONS[c.tier]} {c.tier}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400 text-xs">{c.birthday}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400 text-xs">{c.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </div>
  )
}
