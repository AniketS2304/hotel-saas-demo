import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, ShoppingCart, Phone, Star } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useCart } from '../../context/CartContext'
import { HOTEL_CONFIG } from '../../data/config'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Book Table', to: '/book-table' },
  { label: 'QR Menu', to: '/qr/menu' },
  { label: 'Kitchen', to: '/kitchen' },
  { label: 'Admin', to: '/admin' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggleTheme } = useTheme()
  const { itemCount } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 dark:bg-charcoal-800/95 backdrop-blur-md shadow-card py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-max flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
              <span className="text-white font-display font-bold text-xl">H</span>
            </div>
            <div className="hidden sm:block">
              <p className={`font-display font-bold text-lg leading-tight transition-colors ${scrolled || dark ? 'text-charcoal-800 dark:text-cream' : 'text-white'}`}>
                {HOTEL_CONFIG.name}
              </p>
              <p className={`text-xs transition-colors ${scrolled || dark ? 'text-gold-500' : 'text-gold-300'}`}>
                Digital Hotel System
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'bg-gold-500 text-white shadow-gold'
                    : scrolled || dark
                      ? 'text-charcoal-800 dark:text-cream hover:bg-gold-50 dark:hover:bg-charcoal-700 hover:text-gold-600'
                      : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Rating badge */}
            <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${scrolled || dark ? 'bg-gold-50 text-gold-600 dark:bg-charcoal-700 dark:text-gold-400' : 'bg-white/15 text-white backdrop-blur-sm'}`}>
              <Star className="w-3 h-3 fill-current" />
              <span>{HOTEL_CONFIG.rating} Rating</span>
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${scrolled || dark ? 'text-charcoal-800 dark:text-cream hover:bg-gray-100 dark:hover:bg-charcoal-700' : 'text-white hover:bg-white/15'}`}
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/qr/cart"
              className={`relative p-2 rounded-full transition-all ${scrolled || dark ? 'text-charcoal-800 dark:text-cream hover:bg-gray-100 dark:hover:bg-charcoal-700' : 'text-white hover:bg-white/15'}`}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-gold">
                  {itemCount}
                </span>
              )}
            </Link>

            <a
              href={`tel:${HOTEL_CONFIG.phone}`}
              className="hidden sm:flex btn-primary text-sm py-2 px-4"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className={`lg:hidden p-2 rounded-full transition-all ${scrolled || dark ? 'text-charcoal-800 dark:text-cream hover:bg-gray-100 dark:hover:bg-charcoal-700' : 'text-white hover:bg-white/15'}`}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-40 pt-20 pb-6 px-4 bg-white dark:bg-charcoal-800 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-gold-500 text-white'
                      : 'text-charcoal-800 dark:text-cream hover:bg-gold-50 dark:hover:bg-charcoal-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-charcoal-700 flex gap-3">
                <a href={`tel:${HOTEL_CONFIG.phone}`} className="btn-primary flex-1 justify-center text-sm">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <Link to="/book-table" className="btn-secondary flex-1 justify-center text-sm">
                  Book Table
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
