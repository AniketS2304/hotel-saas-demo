import React from 'react'
import { Send, Check, MessageCircle, Users, TrendingUp, Zap } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../../components/ui/AnimatedSection'
import toast from 'react-hot-toast'

const TEMPLATES = [
  { id: 1, name: 'New Order Confirmation', trigger: 'Auto — on order placed', preview: 'Hi {name}! Your order #{id} has been placed. Estimated time: 20 min. Thank you! 🍽️', sent: 2840 },
  { id: 2, name: 'Bill Receipt', trigger: 'Auto — on payment', preview: 'Hi {name}! Your bill for Table {table} is ₹{amount}. Thank you for dining with us! 🧾', sent: 2196 },
  { id: 3, name: 'Birthday Offer', trigger: 'Auto — on birthday', preview: '🎂 Happy Birthday {name}! Celebrate with us and get 20% OFF your entire bill today! Call: {phone}', sent: 145 },
  { id: 4, name: 'Table Reservation', trigger: 'Auto — on booking', preview: '✅ Your table for {guests} is reserved on {date} at {time}. Booking ref: {ref}. See you soon!', sent: 312 },
  { id: 5, name: 'Festival Promotion', trigger: 'Manual — campaigns', preview: '🪔 Happy Diwali from {hotel}! Celebrate with a special festive menu. Book now: {link}', sent: 890 },
  { id: 6, name: 'Loyalty Points Update', trigger: 'Auto — on earn', preview: '⭐ {name}, you just earned {points} loyalty points! Your total: {total} pts. Redeem on your next visit.', sent: 1560 },
]

const STATS = [
  { label: 'Messages Sent', value: '8,143', icon: Send, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Delivery Rate', value: '98.4%', icon: Check, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  { label: 'Customers Reached', value: '1,240', icon: Users, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  { label: 'Revenue from WA', value: '₹1.2L', icon: TrendingUp, color: 'text-gold-500 bg-gold-50 dark:bg-gold-900/20' },
]

export default function WhatsApp() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <AnimatedSection>
        <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">WhatsApp Automation</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Auto-send confirmations, bills, offers, and updates via WhatsApp</p>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(s => (
          <AnimatedSection key={s.label}>
            <div className="card p-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon className="w-4.5 h-4.5" />
              </div>
              <p className="text-xl font-display font-bold text-charcoal-800 dark:text-cream">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <p className="font-semibold text-green-800 dark:text-green-300">WhatsApp Business Integration</p>
          </div>
          <p className="text-sm text-green-700 dark:text-green-400">Connected to {'{your hotel}'} WhatsApp Business account. All templates are pre-approved and compliant with WhatsApp policies.</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/40 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Connected
            </span>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">6 active templates</span>
          </div>
        </div>
      </AnimatedSection>

      <StaggerContainer className="grid md:grid-cols-2 gap-4">
        {TEMPLATES.map(t => (
          <StaggerItem key={t.id}>
            <div className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-charcoal-800 dark:text-cream">{t.name}</h3>
                  <p className="text-xs text-gold-500 mt-0.5">⚡ {t.trigger}</p>
                </div>
                <span className="text-xs text-gray-400">{t.sent.toLocaleString('en-IN')} sent</span>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-mono">{t.preview}</p>
              </div>
              <button
                onClick={() => toast.success(`${t.name} template opened for editing`)}
                className="text-xs text-gold-500 font-semibold hover:text-gold-600"
              >
                Edit Template →
              </button>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedSection>
        <div className="card p-5">
          <h3 className="font-display font-bold text-charcoal-800 dark:text-cream mb-3">Send Campaign</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Target Audience</label>
              <select className="input-field">
                <option>All Customers (1,240)</option>
                <option>Gold + Platinum Members (120)</option>
                <option>Customers with Birthday This Month (28)</option>
                <option>Haven't visited in 30+ days (340)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Message</label>
              <textarea className="input-field resize-none" rows={3} placeholder="Type your promotional message..." />
            </div>
            <button onClick={() => toast.success('Campaign scheduled! Messages will be sent shortly.')} className="btn-primary">
              <Send className="w-4 h-4" /> Send Campaign
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
