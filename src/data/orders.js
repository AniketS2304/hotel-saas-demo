import { MENU_ITEMS } from './menu'

const names = ['Rahul Sharma','Priya Mehta','Amit Patel','Sneha Reddy','Vikram Singh','Kavitha Nair','Rohit Jain','Ananya Das','Suresh Kumar','Meena Iyer','Arjun Gupta','Deepa Bose','Nikhil Shah','Swati Pillai','Kiran Rao','Farhan Sheikh','Pooja Agarwal','Manoj Tiwari','Reshma Khanna','Arun Venkat']

const statuses = ['COMPLETED','COMPLETED','COMPLETED','PREPARING','READY','NEW','COMPLETED','PREPARING']

const pickItems = (count) => {
  const items = []
  const pool = [...MENU_ITEMS]
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    const dish = pool[idx]
    items.push({ dishId: dish.id, name: dish.name, quantity: Math.ceil(Math.random() * 2), price: dish.price })
  }
  return items
}

const makeOrder = (id, tableNum, nameIdx, statusIdx, minutesAgo) => {
  const items = pickItems(Math.ceil(Math.random() * 3) + 1)
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const gst = Math.round(subtotal * 0.05)
  const serviceCharge = Math.round(subtotal * 0.1)
  const status = statuses[statusIdx % statuses.length]
  const placedAt = new Date(Date.now() - minutesAgo * 60000).toISOString()
  return {
    id: `ORD-${1000 + id}`,
    table: tableNum,
    customerName: names[nameIdx % names.length],
    status,
    items,
    subtotal,
    gst,
    serviceCharge,
    discount: 0,
    coupon: null,
    total: subtotal + gst + serviceCharge,
    paymentMethod: status === 'COMPLETED' ? ['cash','card','upi'][id % 3] : null,
    placedAt,
    notes: id % 5 === 0 ? 'No onion in the curry please' : '',
    priority: id % 7 === 0 ? 'high' : 'normal',
  }
}

export const ORDERS = [
  makeOrder(1, 2, 0, 3, 8),
  makeOrder(2, 5, 1, 4, 15),
  makeOrder(3, 7, 2, 0, 45),
  makeOrder(4, 3, 3, 0, 60),
  makeOrder(5, 9, 4, 0, 90),
  makeOrder(6, 12, 5, 5, 12),
  makeOrder(7, 1, 6, 0, 120),
  makeOrder(8, 8, 7, 2, 22),
  makeOrder(9, 15, 8, 0, 150),
  makeOrder(10, 4, 9, 6, 30),
  makeOrder(11, 18, 10, 0, 200),
  makeOrder(12, 6, 11, 3, 5),
  makeOrder(13, 11, 12, 0, 180),
  makeOrder(14, 13, 13, 4, 18),
  makeOrder(15, 20, 14, 0, 240),
]
