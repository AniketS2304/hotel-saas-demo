import React, { useState } from 'react'
import { Globe, Palette, Phone, MapPin, Clock, Save, Check } from 'lucide-react'
import AnimatedSection from '../../components/ui/AnimatedSection'
import { HOTEL_CONFIG } from '../../data/config'
import toast from 'react-hot-toast'

export default function Settings() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ name: HOTEL_CONFIG.name, tagline: HOTEL_CONFIG.tagline, phone: HOTEL_CONFIG.phone, email: HOTEL_CONFIG.email, address: HOTEL_CONFIG.address, whatsapp: HOTEL_CONFIG.whatsapp, gst: '12%', currency: '₹', minOrder: '300' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    setSaved(true)
    toast.success('Settings saved successfully!')
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <AnimatedSection>
        <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Configure your hotel's information and preferences</p>
      </AnimatedSection>

      <AnimatedSection className="card p-6 space-y-5">
        <h3 className="font-display font-bold text-charcoal-800 dark:text-cream flex items-center gap-2"><Globe className="w-4 h-4 text-gold-500" /> Hotel Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Hotel Name</label>
            <input className="input-field" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className="input-label">Tagline</label>
            <input className="input-field" value={form.tagline} onChange={e => set('tagline', e.target.value)} />
          </div>
          <div>
            <label className="input-label">Phone</label>
            <input className="input-field" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="input-label">Email</label>
            <input className="input-field" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div>
            <label className="input-label">WhatsApp Number</label>
            <input className="input-field" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} />
          </div>
          <div>
            <label className="input-label">GST Rate</label>
            <input className="input-field" value={form.gst} onChange={e => set('gst', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="input-label">Address</label>
          <textarea className="input-field resize-none" rows={2} value={form.address} onChange={e => set('address', e.target.value)} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="card p-6">
        <h3 className="font-display font-bold text-charcoal-800 dark:text-cream flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-gold-500" /> Operating Hours</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(HOTEL_CONFIG.hours).map(([k, v]) => (
            <div key={k}>
              <label className="input-label capitalize">{k}</label>
              <input className="input-field" defaultValue={v} />
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="card p-6">
        <h3 className="font-display font-bold text-charcoal-800 dark:text-cream flex items-center gap-2 mb-4"><Palette className="w-4 h-4 text-gold-500" /> Ordering Preferences</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="input-label">Minimum Order (₹)</label>
            <input className="input-field" value={form.minOrder} onChange={e => set('minOrder', e.target.value)} />
          </div>
          <div>
            <label className="input-label">Currency Symbol</label>
            <input className="input-field" value={form.currency} onChange={e => set('currency', e.target.value)} />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {[
            { label: 'Enable Table Ordering', desc: 'Allow guests to order from their table via QR code', enabled: true },
            { label: 'Enable Pre-paid Billing', desc: 'Guests must pay when placing order (no tab)', enabled: false },
            { label: 'Kitchen Notifications', desc: 'Play sound when new order arrives at KDS', enabled: true },
            { label: 'WhatsApp Auto-send', desc: 'Automatically send order confirmations via WhatsApp', enabled: true },
          ].map(s => (
            <div key={s.label} className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 dark:border-charcoal-700 last:border-0">
              <div>
                <p className="text-sm font-semibold text-charcoal-800 dark:text-cream">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full flex-shrink-0 cursor-pointer transition-all ${s.enabled ? 'bg-gold-500' : 'bg-gray-300 dark:bg-charcoal-600'}`}
                onClick={() => toast('Toggle updated!')}
              >
                <div className={`w-4 h-4 rounded-full bg-white m-1 transition-transform ${s.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <button onClick={handleSave} className={`btn-primary w-full justify-center py-4 text-base transition-all ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}>
          {saved ? <><Check className="w-5 h-5" /> Settings Saved!</> : <><Save className="w-5 h-5" /> Save All Changes</>}
        </button>
      </AnimatedSection>
    </div>
  )
}
