import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { HOTEL_CONFIG } from '../../data/config'

export default function Footer() {
  const [email, setEmail] = React.useState('')
  const handleNewsletter = (e) => {
    e.preventDefault()
    setEmail('')
    // toast handled by demo
  }

  return (
    <footer className="bg-charcoal-800 text-gray-300">
      {/* Top bar */}
      <div className="bg-gold-500/10 border-b border-gold-500/20">
        <div className="container-max px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-cream font-semibold text-lg">Ready to go digital?</p>
            <p className="text-gray-400 text-sm">Join 500+ hotels already using HotelOS</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`https://wa.me/${HOTEL_CONFIG.whatsapp}`} target="_blank" rel="noreferrer"
              className="btn-primary">
              WhatsApp Us
            </a>
            <a href={`tel:${HOTEL_CONFIG.phone}`} className="btn-secondary border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-white">
              {HOTEL_CONFIG.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container-max px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">H</span>
            </div>
            <div>
              <p className="font-display font-bold text-cream text-lg">{HOTEL_CONFIG.name}</p>
              <p className="text-xs text-gold-400">Digital Hotel System</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-5">
            A complete digital ecosystem for hotels and restaurants — from QR menus to kitchen management, billing, and analytics. All in one platform.
          </p>
          <div className="flex gap-3">
            {[
              { svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, href: HOTEL_CONFIG.social.instagram, label: 'Instagram' },
              { svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, href: HOTEL_CONFIG.social.facebook, label: 'Facebook' },
              { svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, href: HOTEL_CONFIG.social.twitter, label: 'Twitter' },
              { svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 002.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, href: HOTEL_CONFIG.social.youtube, label: 'YouTube' },
            ].map(({ svg, href, label }, i) => (
              <a key={i} href={href} aria-label={label}
                className="w-9 h-9 rounded-full bg-charcoal-700 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-white transition-all duration-200 hover:scale-110">
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Book a Table', to: '/book-table' },
              { label: 'QR Menu', to: '/qr/menu' },
              { label: 'Kitchen Display', to: '/kitchen' },
              { label: 'Staff Dashboard', to: '/staff' },
              { label: 'Admin Panel', to: '/admin' },
            ].map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-sm text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40 group-hover:bg-gold-500 transition-colors"></span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-400">{HOTEL_CONFIG.address}</span>
            </li>
            <li className="flex gap-3 text-sm">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a href={`tel:${HOTEL_CONFIG.phone}`} className="text-gray-400 hover:text-gold-400 transition-colors">{HOTEL_CONFIG.phone}</a>
            </li>
            <li className="flex gap-3 text-sm">
              <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a href={`mailto:${HOTEL_CONFIG.email}`} className="text-gray-400 hover:text-gold-400 transition-colors">{HOTEL_CONFIG.email}</a>
            </li>
            <li className="flex gap-3 text-sm">
              <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span className="text-gray-400">{HOTEL_CONFIG.hoursDisplay}</span>
            </li>
          </ul>
          <a
            href={HOTEL_CONFIG.mapLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            View on Google Maps →
          </a>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-display font-semibold text-cream mb-2">Stay Updated</h4>
          <p className="text-sm text-gray-400 mb-4">Get exclusive offers, seasonal menus, and event updates.</p>
          <form onSubmit={handleNewsletter} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 bg-charcoal-700 border border-charcoal-500 text-cream placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-gold-400 transition-colors"
              required
            />
            <button type="submit" className="p-2.5 bg-gold-500 hover:bg-gold-600 text-white rounded-xl transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Opening Hours */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-cream uppercase tracking-wider mb-2">Opening Hours</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li className="flex justify-between"><span>Breakfast</span><span>{HOTEL_CONFIG.hours.breakfast}</span></li>
              <li className="flex justify-between"><span>Lunch</span><span>{HOTEL_CONFIG.hours.lunch}</span></li>
              <li className="flex justify-between"><span>Dinner</span><span>{HOTEL_CONFIG.hours.dinner}</span></li>
              <li className="flex justify-between"><span>Bar</span><span>{HOTEL_CONFIG.hours.bar}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-charcoal-700">
        <div className="container-max px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2025 {HOTEL_CONFIG.name}. Powered by HotelOS Digital Solutions.</p>
          <p className="text-gold-500/60">Demo site — All data is fictional for presentation purposes.</p>
        </div>
      </div>
    </footer>
  )
}
