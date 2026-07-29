import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, ShoppingBag, ChefHat, Users, BarChart3, Package,
  TableProperties, UserCheck, Ticket, Award, MessageCircle, Settings,
  Menu, X, Bell, Search, Moon, Sun, ChevronDown, LogOut, Globe
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useDemo } from '../../context/DemoContext'
import { HOTEL_CONFIG } from '../../data/config'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard', group: 'main' },
  { icon: ShoppingBag, label: 'Orders', to: '/admin/orders', group: 'main' },
  { icon: ChefHat, label: 'Menu', to: '/admin/menu', group: 'main' },
  { icon: Users, label: 'Customers', to: '/admin/customers', group: 'main' },
  { icon: BarChart3, label: 'Reports', to: '/admin/reports', group: 'analytics' },
  { icon: Package, label: 'Inventory', to: '/admin/inventory', group: 'operations' },
  { icon: TableProperties, label: 'Tables', to: '/admin/tables', group: 'operations' },
  { icon: UserCheck, label: 'Employees', to: '/admin/employees', group: 'operations' },
  { icon: Ticket, label: 'Coupons', to: '/admin/coupons', group: 'marketing' },
  { icon: Award, label: 'Loyalty', to: '/admin/loyalty', group: 'marketing' },
  { icon: MessageCircle, label: 'WhatsApp', to: '/admin/whatsapp', group: 'marketing' },
  { icon: Settings, label: 'Settings', to: '/admin/settings', group: 'settings' },
]

const GROUPS = [
  { key: 'main', label: 'Management' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'operations', label: 'Operations' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'settings', label: 'System' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { dark, toggleTheme } = useTheme()
  const { notifications, revenue } = useDemo()
  const navigate = useNavigate()

  const unreadCount = Math.min(notifications.length, 9)

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-charcoal-700 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gold-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-display font-bold text-lg">H</span>
        </div>
        {!collapsed && (
          <div>
            <p className="font-display font-bold text-cream text-sm leading-tight">HotelOS Admin</p>
            <p className="text-xs text-gold-400">Management Suite</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 hide-scrollbar">
        {GROUPS.map(group => {
          const items = NAV_ITEMS.filter(n => n.group === group.key)
          return (
            <div key={group.key} className="mb-4">
              {!collapsed && (
                <p className="text-xs font-bold uppercase tracking-widest text-charcoal-500 px-2 mb-2">{group.label}</p>
              )}
              <div className="space-y-0.5">
                {items.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
                  >
                    <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
                    {!collapsed && <span className="text-sm">{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          )
        })}
      </nav>

      {/* External links */}
      {!collapsed && (
        <div className="px-3 pb-4 border-t border-charcoal-700 pt-3 space-y-1">
          <button onClick={() => navigate('/')}
            className="sidebar-link w-full text-sm">
            <Globe className="w-4 h-4" /> View Website
          </button>
          <button className="sidebar-link w-full text-sm text-red-400 hover:text-red-400 hover:bg-red-900/20">
            <LogOut className="w-4 h-4" /> Exit Admin
          </button>
        </div>
      )}
    </>
  )

  return (
    <div className="flex h-screen bg-cream dark:bg-charcoal-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col bg-charcoal-800 flex-shrink-0 overflow-hidden"
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(c => !c)}
          className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-full bg-charcoal-700 border border-charcoal-600 rounded-r-lg p-1 text-gray-400 hover:text-white transition-colors z-20"
          style={{ left: collapsed ? 64 : 240 }}
        >
          <ChevronDown className={`w-3 h-3 transition-transform ${collapsed ? '-rotate-90' : 'rotate-90'}`} />
        </button>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden" />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 flex flex-col bg-charcoal-800 lg:hidden"
            >
              <div className="flex items-center justify-between px-4 py-5 border-b border-charcoal-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
                    <span className="text-white font-bold">H</span>
                  </div>
                  <span className="font-display font-bold text-cream text-sm">HotelOS Admin</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-3 hide-scrollbar">
                {NAV_ITEMS.map(item => (
                  <NavLink key={item.to} to={item.to} onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `sidebar-link mb-0.5 ${isActive ? 'active' : ''}`}>
                    <item.icon className="w-4.5 h-4.5" />
                    <span className="text-sm">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-charcoal-800 border-b border-gray-200 dark:border-charcoal-700 px-4 md:px-6 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 dark:text-gray-400">
            <Menu className="w-5 h-5" />
          </button>

          {/* Revenue ticker */}
          <div className="hidden md:flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-green-700 dark:text-green-400">
              Today's Revenue: ₹{revenue.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-charcoal-700 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input className="bg-transparent text-sm text-charcoal-800 dark:text-cream placeholder-gray-400 outline-none w-40" placeholder="Search..." />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-charcoal-800 dark:hover:text-cream">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Theme */}
          <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:text-charcoal-800 dark:hover:text-cream">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-sm">O</div>
            <span className="hidden sm:block text-sm font-medium text-charcoal-800 dark:text-cream">Owner</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
