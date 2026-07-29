// Tables data — 20 tables with realistic statuses
const TABLE_STATUSES = ['available', 'occupied', 'billing', 'reserved', 'available']

export const TABLES = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1
  const statusCycle = ['available', 'occupied', 'occupied', 'billing', 'reserved', 'available', 'available', 'occupied', 'available', 'occupied']
  return {
    id: n,
    number: String(n).padStart(2, '0'),
    capacity: [2, 2, 4, 4, 4, 6, 6, 2, 4, 8][i % 10],
    status: statusCycle[i % 10], // available | occupied | billing | reserved
    section: n <= 8 ? 'Main Hall' : n <= 14 ? 'Garden' : 'Rooftop',
    currentOrder: null,
    waiter: ['Ramesh K.', 'Sunita P.', 'Mohan D.', 'Kavitha R.'][i % 4],
  }
})

export const SECTIONS = ['All', 'Main Hall', 'Garden', 'Rooftop']
