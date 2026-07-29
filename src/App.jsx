import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MarketingLayout from './components/layout/MarketingLayout'
import LoadingScreen from './components/ui/LoadingScreen'
import DemoCommandCenter from './components/demo/DemoCommandCenter'

// Marketing pages
const Home = lazy(() => import('./pages/Home'))
const BookTable = lazy(() => import('./pages/BookTable'))

// QR Ordering
const QRWelcome = lazy(() => import('./pages/QR/QRWelcome'))
const QRMenu = lazy(() => import('./pages/QR/QRMenu'))
const FoodDetail = lazy(() => import('./pages/QR/FoodDetail'))
const Cart = lazy(() => import('./pages/QR/Cart'))
const OrderSuccess = lazy(() => import('./pages/QR/OrderSuccess'))

// Staff
const Kitchen = lazy(() => import('./pages/Kitchen'))
const Staff = lazy(() => import('./pages/Staff'))

// Admin
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))
const AdminOrders = lazy(() => import('./pages/Admin/AdminOrders'))
const AdminMenu = lazy(() => import('./pages/Admin/AdminMenu'))
const Customers = lazy(() => import('./pages/Admin/Customers'))
const Reports = lazy(() => import('./pages/Admin/Reports'))
const Inventory = lazy(() => import('./pages/Admin/Inventory'))
const Tables = lazy(() => import('./pages/Admin/Tables'))
const Employees = lazy(() => import('./pages/Admin/Employees'))
const Coupons = lazy(() => import('./pages/Admin/Coupons'))
const Loyalty = lazy(() => import('./pages/Admin/Loyalty'))
const WhatsApp = lazy(() => import('./pages/Admin/WhatsApp'))
const Settings = lazy(() => import('./pages/Admin/Settings'))

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* ── Marketing Site ─────────────────────────────── */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/book-table" element={<BookTable />} />
        </Route>

        {/* ── QR Ordering Flow ───────────────────────────── */}
        <Route path="/qr" element={<QRWelcome />} />
        <Route path="/qr/menu" element={<QRMenu />} />
        <Route path="/qr/food/:id" element={<FoodDetail />} />
        <Route path="/qr/cart" element={<Cart />} />
        <Route path="/qr/success" element={<OrderSuccess />} />

        {/* ── Staff ──────────────────────────────────────── */}
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/staff" element={<Staff />} />

        {/* ── Admin Panel ────────────────────────────────── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="tables" element={<Tables />} />
          <Route path="employees" element={<Employees />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="whatsapp" element={<WhatsApp />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ── 404 ────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Floating Demo Panel — always visible */}
      <DemoCommandCenter />
    </Suspense>
  )
}
