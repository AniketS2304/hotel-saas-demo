import React from 'react'
import AnimatedSection from '../../components/ui/AnimatedSection'

const EMPLOYEES = [
  { id: 1, name: 'Ramesh Kumar', role: 'Head Waiter', shift: 'Morning', phone: '+91 98765 11111', orders: 284, rating: 4.8, status: 'on-duty', avatar: 'RK' },
  { id: 2, name: 'Sunita Pillai', role: 'Cashier', shift: 'Morning', phone: '+91 98765 22222', orders: 156, rating: 4.9, status: 'on-duty', avatar: 'SP' },
  { id: 3, name: 'Mohan Desai', role: 'Waiter', shift: 'Evening', phone: '+91 98765 33333', orders: 198, rating: 4.6, status: 'off-duty', avatar: 'MD' },
  { id: 4, name: 'Kavitha Rao', role: 'Supervisor', shift: 'Full Day', phone: '+91 98765 44444', orders: 0, rating: 4.9, status: 'on-duty', avatar: 'KR' },
  { id: 5, name: 'Arjun Sharma', role: 'Chef', shift: 'Morning', phone: '+91 98765 55555', orders: 312, rating: 4.7, status: 'on-duty', avatar: 'AS' },
  { id: 6, name: 'Priya Thomas', role: 'Hostess', shift: 'Evening', phone: '+91 98765 66666', orders: 0, rating: 4.8, status: 'off-duty', avatar: 'PT' },
  { id: 7, name: 'Vikram Mehta', role: 'Barista', shift: 'Morning', phone: '+91 98765 77777', orders: 145, rating: 4.5, status: 'on-duty', avatar: 'VM' },
  { id: 8, name: 'Deepa Singh', role: 'Kitchen Assist.', shift: 'Evening', phone: '+91 98765 88888', orders: 0, rating: 4.4, status: 'off-duty', avatar: 'DS' },
]

export default function Employees() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <AnimatedSection>
        <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Employees</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{EMPLOYEES.length} staff members · {EMPLOYEES.filter(e => e.status === 'on-duty').length} on duty</p>
      </AnimatedSection>
      <AnimatedSection className="card p-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-charcoal-700">
              {['Staff', 'Role', 'Shift', 'Orders', 'Rating', 'Status'].map(h => (
                <th key={h} className="text-left py-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map(e => (
              <tr key={e.id} className="border-b border-gray-50 dark:border-charcoal-700 hover:bg-gray-50 dark:hover:bg-charcoal-700/50 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold-500 text-white text-xs font-bold flex items-center justify-center">{e.avatar}</div>
                    <div>
                      <p className="font-semibold text-charcoal-800 dark:text-cream">{e.name}</p>
                      <p className="text-xs text-gray-400">{e.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{e.role}</td>
                <td className="py-3 pr-4 text-gray-500 text-xs">{e.shift}</td>
                <td className="py-3 pr-4 font-semibold text-charcoal-800 dark:text-cream">{e.orders > 0 ? e.orders : '—'}</td>
                <td className="py-3 pr-4 text-gold-500 font-semibold">★ {e.rating}</td>
                <td className="py-3 pr-4">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${e.status === 'on-duty' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {e.status === 'on-duty' ? '● On Duty' : '○ Off Duty'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AnimatedSection>
    </div>
  )
}
