import React from 'react'
import { Award, TrendingUp } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../../components/ui/AnimatedSection'

const TIERS = [
  { name: 'Silver', icon: '🥈', color: 'text-gray-600', bg: 'bg-gray-50 dark:bg-gray-900/30 border-gray-300', min: 0, max: 999, benefits: ['5% cashback on every order', 'Birthday discount 10%', 'Priority reservations'], members: 124 },
  { name: 'Gold', icon: '⭐', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30 border-amber-300', min: 1000, max: 2999, benefits: ['10% cashback on every order', 'Birthday discount 20%', 'Free dessert on every visit', 'Monthly exclusive offer'], members: 86 },
  { name: 'Platinum', icon: '💎', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/30 border-purple-300', min: 3000, max: Infinity, benefits: ['15% cashback on every order', 'Birthday dinner complimentary', 'Dedicated relationship manager', 'Early access to new menu', 'Free room upgrade (hotel)'], members: 34 },
]

const ACTIVITIES = [
  { name: 'Rahul Sharma', action: 'Earned 240 points', time: '2 hrs ago', tier: 'Platinum' },
  { name: 'Priya Mehta', action: 'Redeemed 500 points', time: '4 hrs ago', tier: 'Gold' },
  { name: 'Sneha Reddy', action: 'Upgraded to Platinum', time: '1 day ago', tier: 'Platinum' },
  { name: 'Amit Patel', action: 'Earned 120 points', time: '2 days ago', tier: 'Silver' },
]

export default function Loyalty() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <AnimatedSection>
        <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Loyalty Program</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Reward your best customers and keep them coming back</p>
      </AnimatedSection>

      <AnimatedSection className="bg-gradient-to-r from-gold-500/10 to-gold-300/5 border border-gold-500/20 rounded-2xl p-5">
        <div className="flex flex-wrap gap-6">
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-gold-500">244</p>
            <p className="text-xs text-gray-500">Total Members</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-gold-500">18,420</p>
            <p className="text-xs text-gray-500">Points Issued</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-gold-500">68%</p>
            <p className="text-xs text-gray-500">Return Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-gold-500">40%</p>
            <p className="text-xs text-gray-500">Higher Avg Spend</p>
          </div>
        </div>
      </AnimatedSection>

      <StaggerContainer className="grid md:grid-cols-3 gap-5">
        {TIERS.map(tier => (
          <StaggerItem key={tier.name}>
            <div className={`border-2 rounded-2xl p-6 h-full flex flex-col ${tier.bg}`}>
              <div className="text-4xl mb-3">{tier.icon}</div>
              <h3 className={`font-display font-bold text-xl mb-1 ${tier.color}`}>{tier.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{tier.min.toLocaleString()} – {tier.max === Infinity ? '∞' : tier.max.toLocaleString()} points</p>
              <ul className="space-y-2 flex-1">
                {tier.benefits.map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-green-500 mt-0.5">✔</span> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-charcoal-600">
                <p className={`text-xl font-bold ${tier.color}`}>{tier.members}</p>
                <p className="text-xs text-gray-400">Current members</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedSection className="card p-5">
        <h3 className="font-display font-bold text-charcoal-800 dark:text-cream mb-4">Recent Loyalty Activity</h3>
        <div className="space-y-3">
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-charcoal-700 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center">
                  <Award className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-800 dark:text-cream text-sm">{a.name}</p>
                  <p className="text-xs text-gray-400">{a.action}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">{a.tier}</span>
                <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  )
}
