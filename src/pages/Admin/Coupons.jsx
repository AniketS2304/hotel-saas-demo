import React from 'react'
import { Ticket, Plus } from 'lucide-react'
import AnimatedSection from '../../components/ui/AnimatedSection'
import toast from 'react-hot-toast'

const COUPONS = [
  { code: 'WELCOME10', type: 'Percentage', value: '10%', minOrder: 300, uses: 145, maxUses: 500, expiry: '2025-12-31', active: true },
  { code: 'FLAT50', type: 'Flat Amount', value: '₹50', minOrder: 500, uses: 89, maxUses: 200, expiry: '2025-11-30', active: true },
  { code: 'FAMILY15', type: 'Percentage', value: '15%', minOrder: 800, uses: 34, maxUses: 100, expiry: '2025-10-31', active: true },
  { code: 'NEWUSER20', type: 'Percentage', value: '20%', minOrder: 400, uses: 67, maxUses: 150, expiry: '2025-09-30', active: true },
  { code: 'LOYALTY25', type: 'Percentage', value: '25%', minOrder: 1000, uses: 12, maxUses: 50, expiry: '2025-12-31', active: false },
  { code: 'BIRTHDAY', type: 'Flat Amount', value: '₹200', minOrder: 600, uses: 28, maxUses: 365, expiry: '2025-12-31', active: true },
]

export default function Coupons() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <AnimatedSection className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Coupons & Offers</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{COUPONS.length} coupons · {COUPONS.filter(c => c.active).length} active</p>
        </div>
        <button onClick={() => toast.success('Add coupon form')} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COUPONS.map(c => (
          <AnimatedSection key={c.code}>
            <div className={`card p-5 border-2 transition-all ${c.active ? 'border-gold-200 dark:border-gold-800' : 'border-gray-200 dark:border-charcoal-600 opacity-60'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-gold-500" />
                  <span className="font-mono font-bold text-charcoal-800 dark:text-cream">{c.code}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {c.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-2xl font-display font-bold text-gold-500 mb-2">{c.value} OFF</p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>Min order: ₹{c.minOrder}</p>
                <p>Used: {c.uses}/{c.maxUses} times</p>
                <p>Expires: {c.expiry}</p>
              </div>
              <div className="mt-3">
                <div className="h-1.5 bg-gray-100 dark:bg-charcoal-600 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-500 rounded-full" style={{ width: `${(c.uses / c.maxUses) * 100}%` }} />
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
