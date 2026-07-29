import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Calendar, UtensilsCrossed } from 'lucide-react'
import { HOTEL_CONFIG } from '../../data/config'

const actions = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: `https://wa.me/${HOTEL_CONFIG.whatsapp}?text=Hello! I'd like to enquire about your services.`,
    bg: 'bg-green-500 hover:bg-green-600',
    external: true,
  },
  {
    icon: Phone,
    label: 'Call',
    href: `tel:${HOTEL_CONFIG.phone}`,
    bg: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    icon: Calendar,
    label: 'Book Table',
    to: '/book-table',
    bg: 'bg-gold-500 hover:bg-gold-600',
  },
  {
    icon: UtensilsCrossed,
    label: 'Order Food',
    to: '/qr/menu',
    bg: 'bg-charcoal-800 hover:bg-charcoal-700',
  },
]

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {actions.map((action, i) => {
        const Icon = action.icon
        const content = (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-center gap-0 hover:gap-2 overflow-hidden"
          >
            <span className={`
              hidden group-hover:flex items-center px-3 py-2 rounded-l-full text-xs font-semibold text-white whitespace-nowrap
              ${action.bg} transition-all duration-300
            `}>
              {action.label}
            </span>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${action.bg} group-hover:rounded-r-full group-hover:rounded-l-none`}>
              <Icon className="w-5 h-5" />
            </div>
          </motion.div>
        )

        if (action.to) {
          return <Link key={action.label} to={action.to}>{content}</Link>
        }
        return (
          <a key={action.label} href={action.href} target={action.external ? '_blank' : undefined} rel="noreferrer">
            {content}
          </a>
        )
      })}
    </div>
  )
}
