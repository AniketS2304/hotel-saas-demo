import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.item.id)
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i) }
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QTY': {
      if (action.qty <= 0) return { ...state, items: state.items.filter(i => i.id !== action.id) }
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, quantity: action.qty } : i) }
    }
    case 'APPLY_COUPON':
      return { ...state, coupon: action.coupon, discount: action.discount }
    case 'SET_TABLE':
      return { ...state, table: action.table }
    case 'SET_INSTRUCTIONS':
      return { ...state, instructions: action.instructions }
    case 'CLEAR_CART':
      return { ...initialState, table: state.table }
    default:
      return state
  }
}

const initialState = { items: [], coupon: null, discount: 0, table: null, instructions: '' }

const VALID_COUPONS = {
  'WELCOME10': { type: 'percent', value: 10, label: '10% off' },
  'FLAT50':    { type: 'flat', value: 50, label: '₹50 off' },
  'NEWUSER20': { type: 'percent', value: 20, label: '20% off' },
  'FAMILY15':  { type: 'percent', value: 15, label: '15% off' },
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('hotel_cart')
      return saved ? JSON.parse(saved) : init
    } catch { return init }
  })

  useEffect(() => {
    localStorage.setItem('hotel_cart', JSON.stringify(state))
  }, [state])

  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0)
  const gst = Math.round(subtotal * 0.05)
  const serviceCharge = Math.round(subtotal * 0.1)
  const discountAmount = state.coupon
    ? state.coupon.type === 'percent'
      ? Math.round(subtotal * state.coupon.value / 100)
      : state.coupon.value
    : 0
  const total = subtotal + gst + serviceCharge - discountAmount
  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0)

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', item })
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id })
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const setTable = (table) => dispatch({ type: 'SET_TABLE', table })
  const setInstructions = (instructions) => dispatch({ type: 'SET_INSTRUCTIONS', instructions })

  const applyCoupon = (code) => {
    const coupon = VALID_COUPONS[code.toUpperCase()]
    if (coupon) {
      dispatch({ type: 'APPLY_COUPON', coupon, discount: 0 })
      return { success: true, message: `Coupon applied: ${coupon.label}` }
    }
    return { success: false, message: 'Invalid coupon code' }
  }

  return (
    <CartContext.Provider value={{
      items: state.items, coupon: state.coupon, table: state.table,
      instructions: state.instructions,
      subtotal, gst, serviceCharge, discountAmount, total, itemCount,
      addItem, removeItem, updateQty, clearCart, setTable, setInstructions, applyCoupon,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
