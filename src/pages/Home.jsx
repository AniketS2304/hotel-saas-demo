import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, UtensilsCrossed, QrCode, Phone, Star, ChevronDown, Award, Wifi, Car, Music, Leaf, Users } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import { IMAGES } from '../data/images'
import { HOTEL_CONFIG } from '../data/config'
import { REVIEWS, CELEBRITIES, NEARBY_ATTRACTIONS } from '../data/reviews'
import { getPopularDishes } from '../data/menu'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

// ─── Value Pill ──────────────────────────────────────────────────────────────
const ValuePill = ({ text }) => (
  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
    <span>✔</span> {text}
  </span>
)

// ─── Star Rating ─────────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} className={`w-4 h-4 ${i <= rating ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`} />
    ))}
  </div>
)

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  { q: 'Is parking available?', a: 'Yes, we offer complimentary valet parking for all restaurant and hotel guests. Our parking lot accommodates 200+ vehicles.' },
  { q: 'How do I make a table reservation?', a: 'You can book a table through our website, WhatsApp, or by calling us. We recommend booking at least 2 hours in advance for dinner.' },
  { q: 'Do you allow outside food or cake?', a: 'Outside food is not permitted. However, we offer a custom cake ordering service for celebrations. Cake cutting charge of ₹250 applies if you bring a cake from outside.' },
  { q: 'Are pets allowed?', a: 'Pets are welcome in our outdoor seating area. We even have a dedicated pet menu! Service animals are welcome everywhere.' },
  { q: 'Do you offer home delivery?', a: 'Yes! We deliver within a 5 km radius. Scan our QR code to access the digital menu and place your order. Minimum order value ₹300.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major UPI apps (GPay, PhonePe, Paytm), credit/debit cards (Visa, Mastercard, Rupay), and cash. Split bill option available.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 dark:border-charcoal-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white dark:bg-charcoal-700 hover:bg-gold-50 dark:hover:bg-charcoal-600 transition-colors"
      >
        <span className="font-semibold text-charcoal-800 dark:text-cream text-sm md:text-base">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-6 pb-4 bg-white dark:bg-charcoal-700 text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
        >
          {a}
        </motion.div>
      )}
    </div>
  )
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
const GALLERY_CATS = ['all', 'rooms', 'restaurant', 'food', 'events', 'amenities']

function Gallery() {
  const [cat, setCat] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const filtered = cat === 'all' ? IMAGES.gallery : IMAGES.gallery.filter(g => g.cat === cat)

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {GALLERY_CATS.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              cat === c ? 'bg-gold-500 text-white shadow-gold' : 'bg-white dark:bg-charcoal-700 text-gray-600 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-charcoal-600 border border-gray-200 dark:border-charcoal-600'
            }`}
          >
            {c === 'all' ? 'All Photos' : c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map(img => (
          <motion.div
            key={img.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(img)}
            className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-card"
          >
            <img src={img.url} alt={img.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <span className="text-white text-sm font-semibold">{img.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={lightbox.url}
            alt={lightbox.label}
            className="max-w-4xl max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full">
            {lightbox.label}
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ─── Digital Solutions ────────────────────────────────────────────────────────
const SOLUTIONS = [
  { icon: '🌐', title: 'Professional Website', benefit: 'Attract more guests online', value: 'Increase walk-ins by 30%', desc: 'Beautiful, mobile-first website with SEO optimization, booking integration, and your brand.' },
  { icon: '📱', title: 'QR Menu System', benefit: 'Zero printing costs', value: 'Save ₹8,000/month on menus', desc: 'Guests scan and browse your menu instantly. Update items in real-time — no reprinting ever.' },
  { icon: '🛒', title: 'QR Table Ordering', benefit: 'Staff work faster', value: 'Serve 40% more tables/shift', desc: 'Guests order directly from their phone. Orders go straight to the kitchen — no errors, no delays.' },
  { icon: '🧾', title: 'Smart Billing POS', benefit: 'Zero billing errors', value: 'Save 2 hours/day on billing', desc: 'Automatic GST calculation, split bills, UPI/card/cash. Professional invoices in seconds.' },
  { icon: '👨‍🍳', title: 'Kitchen Display System', benefit: 'Kitchen runs itself', value: 'Cut order errors by 80%', desc: 'Orders appear on kitchen screen instantly. Timers, priorities, and status updates in real-time.' },
  { icon: '📊', title: 'Inventory Management', benefit: 'Stop wastage', value: 'Cut food waste by 25%', desc: 'Track ingredients, get low-stock alerts, and auto-calculate daily usage vs purchases.' },
  { icon: '🪑', title: 'Table Management', benefit: 'Maximum occupancy', value: 'Recover ₹15,000/month', desc: 'Visual floor map with real-time table status. Reduce wait time and turn tables 30% faster.' },
  { icon: '💛', title: 'Customer Loyalty Program', benefit: 'Customers return more', value: 'Increase repeat visits by 45%', desc: 'Reward points, tiers, birthday offers, and personalized coupons that keep guests coming back.' },
  { icon: '💬', title: 'WhatsApp Automation', benefit: 'Zero customer service cost', value: 'Save 3 hours/day', desc: 'Auto-send order confirmations, bills, table bookings, and promotional offers via WhatsApp.' },
  { icon: '📈', title: 'Reports & Analytics', benefit: 'Make better decisions', value: 'Spot ₹50,000/month in hidden revenue', desc: 'Revenue trends, top dishes, peak hours, customer retention — all in one beautiful dashboard.' },
  { icon: '👥', title: 'Staff Management', benefit: 'Hold staff accountable', value: 'Cut overtime by 30%', desc: 'Assign roles, track performance, manage shifts, and view per-staff sales reports.' },
  { icon: '📍', title: 'Google Business Setup', benefit: 'Dominate local search', value: '3x more Google impressions', desc: 'Full GMB optimization, review management, and local SEO so guests find you first.' },
]

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  const { addItem } = useCart()
  const popularDishes = getPopularDishes()

  const handleAddToCart = (dish) => {
    addItem({ id: dish.id, name: dish.name, price: dish.price, image: dish.image })
    toast.success(`${dish.name} added to cart!`, { icon: '🛒' })
  }

  return (
    <div>
      {/* ──── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="Hotel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              LIVE DEMO — Hotel Digital Ecosystem
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {HOTEL_CONFIG.tagline}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-3 font-light">
              {HOTEL_CONFIG.subTagline}
            </p>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />)}
              </div>
              <span className="text-white/80 text-sm">{HOTEL_CONFIG.rating} ({HOTEL_CONFIG.totalReviews.toLocaleString('en-IN')} reviews)</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 flex-wrap">
              <Link to="/book-table" className="btn-primary text-base px-8 py-4">
                <Calendar className="w-5 h-5" /> Book a Table
              </Link>
              <Link to="/qr/menu" className="flex items-center gap-2 bg-white/15 backdrop-blur-sm hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base">
                <UtensilsCrossed className="w-5 h-5" /> View Menu
              </Link>
              <Link to="/qr" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base">
                <QrCode className="w-5 h-5" /> QR Experience
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              {HOTEL_CONFIG.stats.map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-bold text-2xl text-gold-400">{s.value}</p>
                  <p className="text-xs text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </section>

      {/* ──── STATS BAR ─────────────────────────────────────────────────── */}
      <section className="bg-charcoal-800 py-8">
        <div className="container-max px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Happy Guests', value: 48200 },
              { label: 'Dishes Served', value: 320000 },
              { label: 'Awards Won', value: 24 },
              { label: 'Years of Excellence', value: new Date().getFullYear() - HOTEL_CONFIG.estYear },
            ].map(s => (
              <AnimatedSection key={s.label}>
                <p className="font-display font-bold text-3xl md:text-4xl text-gold-400">
                  <AnimatedCounter to={s.value} />
                  {s.value > 100 ? '+' : ''}
                </p>
                <p className="text-gray-400 text-sm mt-1">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──── ABOUT ─────────────────────────────────────────────────────── */}
      <section className="section-pad bg-cream dark:bg-charcoal-900">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-gold-500 font-semibold uppercase tracking-widest text-sm mb-3">About Us</p>
              <h2 className="section-title mb-4">A Legacy of Warmth & Excellence</h2>
              <div className="gold-divider" />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Established in {HOTEL_CONFIG.estYear}, {HOTEL_CONFIG.name} has been the city's most beloved destination for luxury stays and unforgettable dining. Our kitchen blends traditional recipes with modern culinary artistry, while our rooms offer a sanctuary of comfort and elegance.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                From intimate dinners to grand weddings, our team of dedicated professionals ensures every experience exceeds expectations. We believe hospitality is not a service — it is an art form.
              </p>
              <div className="flex flex-wrap gap-3">
                <ValuePill text="ISO 9001 Certified Kitchen" />
                <ValuePill text="100% Fresh Ingredients Daily" />
                <ValuePill text="Award-Winning Chefs" />
                <ValuePill text="Zero Artificial Flavors" />
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-2 gap-4">
              {[
                { img: IMAGES.lobby, label: 'Grand Lobby' },
                { img: IMAGES.restaurantInt, label: 'Fine Dining' },
                { img: IMAGES.room1, label: 'Luxury Rooms' },
                { img: IMAGES.banquet, label: 'Banquet Hall' },
              ].map(item => (
                <StaggerItem key={item.label}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-card group">
                    <img src={item.img} alt={item.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent flex items-end p-3">
                      <span className="text-white text-xs font-semibold">{item.label}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ──── HIGHLIGHTS ─────────────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-charcoal-800">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <p className="text-gold-500 font-semibold uppercase tracking-widest text-sm mb-3">What We Offer</p>
            <h2 className="section-title">Hotel Highlights</h2>
            <div className="gold-divider mx-auto" />
            <p className="section-subtitle mx-auto text-center mt-2">Everything you need for a perfect stay or celebration</p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Award, title: 'Luxury Rooms', desc: '120 elegantly furnished rooms with premium amenities, king-size beds, and city-view balconies.', img: IMAGES.room1 },
              { icon: UtensilsCrossed, title: 'Family Restaurant', desc: 'Multi-cuisine dining serving North Indian, South Indian, Chinese, and Continental dishes daily.', img: IMAGES.restaurant },
              { icon: Users, title: 'Banquet Hall', desc: '2 grand halls seating up to 500 guests. Perfect for weddings, receptions, and corporate events.', img: IMAGES.banquet },
              { icon: Car, title: 'Free Valet Parking', desc: 'Complimentary parking for all guests. Our attendants ensure your vehicle is safe at all times.', img: IMAGES.lobby },
              { icon: Wifi, title: 'High-Speed WiFi', desc: 'Seamless connectivity throughout the property. 1 Gbps fiber, free for all guests without any time limit.', img: IMAGES.room2 },
              { icon: Music, title: 'Live Music', desc: 'Live performances every Friday and Saturday evening. Local and international artists curated monthly.', img: IMAGES.restaurantInt },
            ].map(h => (
              <StaggerItem key={h.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card group overflow-hidden cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={h.img} alt={h.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
                        <h.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-charcoal-800 dark:text-cream mb-1">{h.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ──── SPECIAL OFFERS ─────────────────────────────────────────────── */}
      <section className="section-pad bg-cream dark:bg-charcoal-900">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <p className="text-gold-500 font-semibold uppercase tracking-widest text-sm mb-3">Limited Time</p>
            <h2 className="section-title">Special Offers</h2>
            <div className="gold-divider mx-auto" />
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: 'WEEKEND SPECIAL',
                title: 'Weekend Family Feast',
                desc: 'Unlimited lunch buffet for family of 4. Includes starters, main course, desserts, and welcome drinks.',
                price: '₹1,299',
                original: '₹2,100',
                saving: 'Save ₹801',
                img: IMAGES.restaurantInt,
                valid: 'Valid Sat–Sun, 12 PM – 4 PM',
                color: 'from-amber-600/80',
              },
              {
                tag: 'FESTIVAL OFFER',
                title: 'Festive Grand Dinner',
                desc: 'Special thali with 18 dishes, live music, and a complimentary dessert plate. Only on festival days.',
                price: '₹899',
                original: '₹1,400',
                saving: 'Save ₹501',
                img: IMAGES.banquet,
                valid: 'Festival days only, 7 PM – 11 PM',
                color: 'from-purple-600/80',
              },
              {
                tag: 'COUPLE\'S OFFER',
                title: 'Romantic Candlelight Dinner',
                desc: 'Private table, 4-course meal, wine pairing, a personalized cake, and room of rose petals.',
                price: '₹3,499',
                original: '₹5,000',
                saving: 'Save ₹1,501',
                img: IMAGES.pool,
                valid: 'Advance booking required, 7 PM onwards',
                color: 'from-rose-600/80',
              },
            ].map(o => (
              <StaggerItem key={o.title}>
                <motion.div whileHover={{ y: -6 }} className="card overflow-hidden group cursor-pointer">
                  <div className="relative h-48">
                    <img src={o.img} alt={o.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${o.color} to-transparent`} />
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">{o.tag}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 text-right">
                      <span className="text-white font-display font-bold text-2xl">{o.price}</span>
                      <p className="text-white/70 text-xs line-through">{o.original}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-charcoal-800 dark:text-cream text-lg">{o.title}</h3>
                      <span className="value-pill flex-shrink-0 text-xs">{o.saving}</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 leading-relaxed">{o.desc}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">📅 {o.valid}</p>
                    <Link to="/book-table" className="btn-primary w-full justify-center text-sm">
                      Book This Offer
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ──── GALLERY ────────────────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-charcoal-800">
        <div className="container-max">
          <AnimatedSection className="text-center mb-10">
            <p className="text-gold-500 font-semibold uppercase tracking-widest text-sm mb-3">Our Spaces</p>
            <h2 className="section-title">Photo Gallery</h2>
            <div className="gold-divider mx-auto" />
          </AnimatedSection>
          <AnimatedSection>
            <Gallery />
          </AnimatedSection>
        </div>
      </section>

      {/* ──── POPULAR DISHES ─────────────────────────────────────────────── */}
      <section className="section-pad bg-cream dark:bg-charcoal-900">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <p className="text-gold-500 font-semibold uppercase tracking-widest text-sm mb-3">Chef's Selection</p>
            <h2 className="section-title">Most Loved Dishes</h2>
            <div className="gold-divider mx-auto" />
            <p className="section-subtitle mx-auto text-center mt-2">Voted by 10,000+ guests. Freshly prepared every day.</p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {popularDishes.map(dish => (
              <StaggerItem key={dish.id}>
                <motion.div whileHover={{ y: -4 }} className="card group overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <img src={dish.image} alt={dish.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {dish.isBestSeller && (
                      <span className="absolute top-3 left-3 badge-bestseller">★ Best Seller</span>
                    )}
                    <span className={`absolute top-3 right-3 ${dish.isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
                      {dish.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-charcoal-800 dark:text-cream mb-1">{dish.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-2 line-clamp-2">{dish.description}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                      <span className="text-xs font-semibold text-charcoal-800 dark:text-cream">{dish.rating}</span>
                      <span className="text-xs text-gray-400">({dish.ratingCount})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-charcoal-800 dark:text-cream">₹{dish.price}</span>
                        {dish.mrp > dish.price && (
                          <span className="text-xs text-gray-400 line-through ml-1.5">₹{dish.mrp}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(dish)}
                        className="bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-10">
            <Link to="/qr/menu" className="btn-primary text-base px-10 py-4">
              <QrCode className="w-5 h-5" /> View Full Menu
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ──── REVIEWS ────────────────────────────────────────────────────── */}
      <section className="section-pad bg-charcoal-800 overflow-hidden">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <p className="text-gold-400 font-semibold uppercase tracking-widest text-sm mb-3">Guest Experiences</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-2">What Our Guests Say</h2>
            <div className="w-16 h-1 bg-gold-500 rounded-full mx-auto" />
            <p className="text-gray-400 mt-3 text-sm">Based on {HOTEL_CONFIG.totalReviews.toLocaleString('en-IN')} verified reviews</p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {REVIEWS.slice(0, 9).map(r => (
              <StaggerItem key={r.id}>
                <motion.div whileHover={{ y: -4 }} className="glass-dark p-5 rounded-2xl border border-white/10 hover:border-gold-500/30 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-cream text-sm">{r.name}</p>
                      <p className="text-gray-500 text-xs">{r.location} · {r.date}</p>
                    </div>
                    <span className="text-xs bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full flex-shrink-0">{r.tag}</span>
                  </div>
                  <Stars rating={r.rating} />
                  <p className="text-gray-300 text-sm leading-relaxed mt-3 line-clamp-4">&ldquo;{r.review}&rdquo;</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ──── CELEBRITIES ────────────────────────────────────────────────── */}
      <section className="section-pad bg-cream dark:bg-charcoal-900">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <p className="text-gold-500 font-semibold uppercase tracking-widest text-sm mb-3">Notable Guests</p>
            <h2 className="section-title">Guests Who Loved Visiting</h2>
            <div className="gold-divider mx-auto" />
            <p className="section-subtitle mx-auto text-center mt-2">From Bollywood stars to cricket legends — everyone loves the experience.</p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-16">
            {CELEBRITIES.map(c => (
              <StaggerItem key={c.id}>
                <motion.div whileHover={{ y: -4 }} className="card p-5 flex flex-col items-center text-center group">
                  <div className="relative mb-4">
                    <img src={c.image} alt={c.name} className="w-20 h-20 rounded-full object-cover shadow-card border-4 border-gold-500/20 group-hover:border-gold-500/60 transition-all" />
                    <span className="absolute -bottom-1 -right-1 text-2xl">{c.icon}</span>
                  </div>
                  <h3 className="font-display font-bold text-charcoal-800 dark:text-cream">{c.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{c.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-3">&ldquo;{c.quote}&rdquo;</p>
                  <span className="text-xs text-gold-500 font-semibold">{c.visits} visits</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Nearby Attractions */}
          <AnimatedSection className="text-center mb-10">
            <p className="text-gold-500 font-semibold uppercase tracking-widest text-sm mb-3">Location</p>
            <h2 className="section-title">Nearby Attractions</h2>
            <div className="gold-divider mx-auto" />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {NEARBY_ATTRACTIONS.map(a => (
              <StaggerItem key={a.name}>
                <div className="card p-4 flex items-center gap-4">
                  <span className="text-3xl">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-charcoal-800 dark:text-cream text-sm">{a.name}</p>
                    <p className="text-xs text-gray-400">{a.distance} · {a.time} away</p>
                  </div>
                  <a href={a.mapLink} target="_blank" rel="noreferrer"
                    className="text-xs text-gold-500 font-semibold hover:text-gold-600 flex-shrink-0">
                    Map →
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ──── DIGITAL SOLUTIONS ──────────────────────────────────────────── */}
      <section className="section-pad bg-charcoal-800">
        <div className="container-max">
          <AnimatedSection className="text-center mb-6">
            <p className="text-gold-400 font-semibold uppercase tracking-widest text-sm mb-3">Complete Ecosystem</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">Our Digital Solutions</h2>
            <div className="w-16 h-1 bg-gold-500 rounded-full mx-auto mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto text-base">
              One platform. Every tool your hotel needs to modernize operations, increase revenue, and delight guests.
            </p>
          </AnimatedSection>

          {/* Value summary bar */}
          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
            <ValuePill text="Save 4+ hours daily on operations" />
            <ValuePill text="Reduce errors by 80%" />
            <ValuePill text="Increase revenue by 30%" />
            <ValuePill text="Improve customer retention by 45%" />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SOLUTIONS.map(s => (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.6)' }}
                  className="bg-charcoal-700 border border-white/10 rounded-2xl p-5 h-full flex flex-col gap-3 transition-all cursor-pointer group"
                >
                  <div className="text-3xl">{s.icon}</div>
                  <div>
                    <h3 className="font-display font-bold text-cream group-hover:text-gold-400 transition-colors">{s.title}</h3>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-auto pt-3 border-t border-white/10 flex flex-col gap-1.5">
                    <span className="value-pill self-start">{s.value}</span>
                    <span className="text-xs text-green-400 font-medium">✔ {s.benefit}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-14 space-y-4">
            <p className="text-gray-300 text-lg font-medium">Ready to transform your hotel?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${HOTEL_CONFIG.whatsapp}?text=Hi! I saw your demo and I'm interested in the hotel management system.`}
                target="_blank" rel="noreferrer"
                className="btn-primary text-base px-10 py-4"
              >
                Request a Free Demo
              </a>
              <Link to="/admin" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-10 py-4 rounded-full transition-all">
                View Admin Dashboard →
              </Link>
            </div>
            <p className="text-gray-500 text-xs">Setup in 48 hours · No technical knowledge required · Free onboarding</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ──── FAQ ────────────────────────────────────────────────────────── */}
      <section className="section-pad bg-cream dark:bg-charcoal-900">
        <div className="container-max max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <p className="text-gold-500 font-semibold uppercase tracking-widest text-sm mb-3">Got Questions?</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="gold-divider mx-auto" />
          </AnimatedSection>

          <AnimatedSection>
            <div className="space-y-3">
              {FAQ_DATA.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-10">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Still have questions?</p>
            <a href={`tel:${HOTEL_CONFIG.phone}`} className="btn-primary">
              <Phone className="w-4 h-4" /> Call Us Now
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
