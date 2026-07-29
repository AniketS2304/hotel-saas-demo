import React, { createContext, useContext, useState, useCallback } from 'react'
import { ORDERS } from '../data/orders'

const DemoContext = createContext(null)

let orderCounter = 1016

const NEW_ORDER_NAMES = ['Rahul S.','Priya M.','Ankit V.','Sneha K.','Vikram J.','Kavitha R.','Rohan P.']
const DISH_NAMES = ['Butter Chicken','Paneer Tikka','Chicken Biryani','Dal Makhani','Garlic Naan','Mango Lassi','Gulab Jamun']

export const DemoProvider = ({ children }) => {
  const [demoOrders, setDemoOrders] = useState(ORDERS)
  const [revenue, setRevenue] = useState(48240)
  const [notifications, setNotifications] = useState([])
  const [tableStatuses, setTableStatuses] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTable, setSelectedTable] = useState(5)

  const addNotification = useCallback((msg, type = 'info') => {
    const id = Date.now()
    setNotifications(n => [{ id, msg, type, ts: new Date() }, ...n].slice(0, 10))
  }, [])

  const triggerNewOrder = useCallback(() => {
    const id = ++orderCounter
    const tableNum = selectedTable
    const name = NEW_ORDER_NAMES[id % NEW_ORDER_NAMES.length]
    const dish = DISH_NAMES[id % DISH_NAMES.length]
    const price = 180 + (id % 10) * 30
    const subtotal = price * (1 + id % 2)
    const newOrder = {
      id: `ORD-${id}`,
      table: tableNum,
      customerName: name,
      status: 'NEW',
      items: [{ dishId: `dish-00${id % 5 + 1}`, name: dish, quantity: 1 + id % 2, price }],
      subtotal,
      gst: Math.round(subtotal * 0.05),
      serviceCharge: Math.round(subtotal * 0.1),
      discount: 0,
      coupon: null,
      total: Math.round(subtotal * 1.15),
      paymentMethod: null,
      placedAt: new Date().toISOString(),
      notes: '',
      priority: 'normal',
    }
    setDemoOrders(prev => [newOrder, ...prev])
    setRevenue(r => r + newOrder.total)
    addNotification(`New order from Table ${tableNum} — ${name}`, 'order')
  }, [selectedTable, addNotification])

  const triggerOrderReady = useCallback(() => {
    setDemoOrders(prev => {
      const idx = prev.findIndex(o => o.status === 'PREPARING' || o.status === 'NEW')
      if (idx === -1) return prev
      const updated = [...prev]
      updated[idx] = { ...updated[idx], status: 'READY' }
      addNotification(`Order ${updated[idx].id} is ready for Table ${updated[idx].table}!`, 'ready')
      return updated
    })
  }, [addNotification])

  const triggerRevenueTick = useCallback(() => {
    const amount = 500 + Math.floor(Math.random() * 1500)
    setRevenue(r => r + amount)
    addNotification(`Payment received: ₹${amount.toLocaleString('en-IN')}`, 'payment')
  }, [addNotification])

  const triggerTableChange = useCallback((tableId, status) => {
    setTableStatuses(prev => ({ ...prev, [tableId]: status }))
    addNotification(`Table ${tableId} is now ${status}`, 'table')
  }, [addNotification])

  return (
    <DemoContext.Provider value={{
      demoOrders, setDemoOrders,
      revenue, setRevenue,
      notifications, addNotification,
      tableStatuses,
      isOpen, setIsOpen,
      selectedTable, setSelectedTable,
      triggerNewOrder, triggerOrderReady, triggerRevenueTick, triggerTableChange,
    }}>
      {children}
    </DemoContext.Provider>
  )
}

export const useDemo = () => useContext(DemoContext)
