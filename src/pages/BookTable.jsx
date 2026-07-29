import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, MessageSquare, Check, Phone, Star } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection'
import { HOTEL_CONFIG } from '../data/config'
import toast from 'react-hot-toast'

const timeSlots = ['12:00 PM','12:30 PM','1:00 PM','1:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM']
const occasions = ['Birthday', 'Anniversary', 'Business Dinner', 'Family Gathering', 'Date Night', 'Other']

const ValuePill = ({ text }) => (
  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
    <span>✔</span> {text}
  </span>
)

export default function BookTable() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: '', guests: 2, occasion: '', notes: '' })
  const [step, setStep] = useState(1) // 1=form, 2=confirm
  const [bookingRef, setBookingRef] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error('Please fill all required fields')
      return
    }
    const ref = `HTL-${Math.floor(10000 + Math.random() * 90000)}`
    setBookingRef(ref)
    setStep(2)
    toast.success('Table booked successfully!', { icon: '🎉' })
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal-900 pt-24 pb-16">
      <div className="container-max px-4 md:px-8">

        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold-500 font-semibold uppercase tracking-widest text-sm mb-3">Reserve Your Seat</p>
          <h1 className="section-title">Book a Table</h1>
          <div className="gold-divider mx-auto" />
          <p className="section-subtitle mx-auto text-center mt-2">Secure your spot in minutes. Free cancellation up to 2 hours before.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <ValuePill text="Instant confirmation" />
            <ValuePill text="Free cancellation" />
            <ValuePill text="Special occasion setups" />
          </div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* Form / Success */}
          <div className="lg:col-span-2">
            {step === 1 ? (
              <AnimatedSection>
                <div className="card p-6 md:p-8">
                  <h2 className="font-display font-bold text-xl text-charcoal-800 dark:text-cream mb-6">Reservation Details</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-800 dark:text-cream mb-1.5">Full Name *</label>
                        <input className="input-field" placeholder="Rahul Sharma" value={form.name} onChange={e => set('name', e.target.value)} required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-800 dark:text-cream mb-1.5">Phone Number *</label>
                        <input className="input-field" placeholder="+91 98765 43210" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-800 dark:text-cream mb-1.5">Email Address</label>
                      <input className="input-field" placeholder="rahul@example.com" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-800 dark:text-cream mb-1.5">Date *</label>
                        <div className="relative">
                          <input className="input-field" type="date" min={today} value={form.date} onChange={e => set('date', e.target.value)} required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-800 dark:text-cream mb-1.5">Number of Guests *</label>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => set('guests', Math.max(1, form.guests - 1))}
                            className="w-10 h-10 rounded-xl border border-gray-200 dark:border-charcoal-600 flex items-center justify-center text-xl font-bold hover:bg-gold-50 dark:hover:bg-charcoal-600 transition-colors text-charcoal-800 dark:text-cream">
                            −
                          </button>
                          <span className="text-xl font-bold text-charcoal-800 dark:text-cream w-8 text-center">{form.guests}</span>
                          <button type="button" onClick={() => set('guests', Math.min(20, form.guests + 1))}
                            className="w-10 h-10 rounded-xl border border-gray-200 dark:border-charcoal-600 flex items-center justify-center text-xl font-bold hover:bg-gold-50 dark:hover:bg-charcoal-600 transition-colors text-charcoal-800 dark:text-cream">
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-800 dark:text-cream mb-2">Preferred Time *</label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {timeSlots.map(t => (
                          <button key={t} type="button" onClick={() => set('time', t)}
                            className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${
                              form.time === t ? 'bg-gold-500 text-white shadow-gold' : 'bg-gray-100 dark:bg-charcoal-600 text-gray-600 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-charcoal-500'
                            }`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-800 dark:text-cream mb-2">Occasion</label>
                      <div className="flex flex-wrap gap-2">
                        {occasions.map(o => (
                          <button key={o} type="button" onClick={() => set('occasion', o)}
                            className={`py-1.5 px-3 rounded-full text-sm transition-all ${
                              form.occasion === o ? 'bg-gold-500 text-white' : 'bg-gray-100 dark:bg-charcoal-600 text-gray-600 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-charcoal-500'
                            }`}>
                            {o}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-800 dark:text-cream mb-1.5">Special Requests</label>
                      <textarea className="input-field resize-none" rows={3} placeholder="Any dietary requirements, seating preferences, or special arrangements?" value={form.notes} onChange={e => set('notes', e.target.value)} />
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                      <Calendar className="w-5 h-5" /> Confirm Reservation
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                  <motion.div animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5 }}>
                    <Check className="w-10 h-10 text-green-600" />
                  </motion.div>
                </div>
                <h2 className="font-display font-bold text-3xl text-charcoal-800 dark:text-cream mb-2">Table Booked!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Your reservation is confirmed. We look forward to hosting you.</p>
                <div className="bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800 rounded-2xl p-6 mb-6 text-left space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Booking Ref</span>
                    <span className="font-bold text-charcoal-800 dark:text-cream font-mono">{bookingRef}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Name</span>
                    <span className="font-semibold text-charcoal-800 dark:text-cream">{form.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="font-semibold text-charcoal-800 dark:text-cream">{form.date} at {form.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Guests</span>
                    <span className="font-semibold text-charcoal-800 dark:text-cream">{form.guests} persons</span>
                  </div>
                  {form.occasion && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Occasion</span>
                      <span className="font-semibold text-gold-500">{form.occasion}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">A confirmation will be sent to your WhatsApp & email within minutes.</p>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center text-sm">
                    Make Another Booking
                  </button>
                  <a href={`https://wa.me/${HOTEL_CONFIG.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary flex-1 justify-center text-sm">
                    WhatsApp Us
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-5">
              <div className="card p-5">
                <h3 className="font-display font-bold text-charcoal-800 dark:text-cream mb-4">Dining Hours</h3>
                <ul className="space-y-3 text-sm">
                  {Object.entries(HOTEL_CONFIG.hours).map(([k, v]) => (
                    <li key={k} className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gold-500" />
                      <div>
                        <span className="font-medium text-charcoal-800 dark:text-cream capitalize">{k}</span>
                        <p className="text-gray-500 text-xs">{v}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  <span className="font-semibold text-charcoal-800 dark:text-cream">{HOTEL_CONFIG.rating} Rating</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Based on {HOTEL_CONFIG.totalReviews.toLocaleString('en-IN')} guest reviews on Google, Zomato & TripAdvisor.</p>
              </div>

              <div className="bg-gold-500 rounded-2xl p-5 text-white">
                <p className="font-display font-bold text-lg mb-2">Need Help?</p>
                <p className="text-sm text-white/80 mb-4">Our team is available to assist with special bookings.</p>
                <a href={`tel:${HOTEL_CONFIG.phone}`} className="flex items-center gap-2 bg-white text-gold-600 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-gold-50 transition-colors">
                  <Phone className="w-4 h-4" /> {HOTEL_CONFIG.phone}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
