import React from 'react'
import { TABLES, SECTIONS } from '../../data/tables'
import AnimatedSection from '../../components/ui/AnimatedSection'
import { useDemo } from '../../context/DemoContext'

const STATUS_STYLES = {
  available: { bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', dot: 'bg-green-500', text: 'text-green-600' },
  occupied:  { bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', dot: 'bg-amber-500 animate-pulse', text: 'text-amber-600' },
  billing:   { bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', dot: 'bg-blue-500', text: 'text-blue-600' },
  reserved:  { bg: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800', dot: 'bg-purple-500', text: 'text-purple-600' },
}

export default function Tables() {
  const { tableStatuses } = useDemo()
  const [section, setSection] = React.useState('All')
  const filtered = section === 'All' ? TABLES : TABLES.filter(t => t.section === section)

  const getStatus = (t) => tableStatuses[t.id] || t.status
  const counts = Object.fromEntries(['available','occupied','billing','reserved'].map(s => [s, TABLES.filter(t => getStatus(t) === s).length]))

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <AnimatedSection>
        <h1 className="font-display font-bold text-2xl text-charcoal-800 dark:text-cream">Table Management</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">20 tables across 3 sections</p>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(counts).map(([k, v]) => (
          <div key={k} className={`card p-4 text-center border ${STATUS_STYLES[k].bg}`}>
            <p className={`text-2xl font-display font-bold ${STATUS_STYLES[k].text}`}>{v}</p>
            <p className="text-xs text-gray-500 capitalize">{k}</p>
          </div>
        ))}
      </div>

      <AnimatedSection>
        <div className="flex gap-2 mb-4">
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setSection(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${section === s ? 'bg-gold-500 text-white' : 'bg-white dark:bg-charcoal-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-charcoal-600'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {filtered.map(table => {
            const status = getStatus(table)
            const style = STATUS_STYLES[status] || STATUS_STYLES.available
            return (
              <div key={table.id} className={`border-2 rounded-2xl p-3 text-center transition-all ${style.bg}`}>
                <div className={`w-2 h-2 rounded-full ${style.dot} mx-auto mb-2`}></div>
                <p className="font-display font-bold text-charcoal-800 dark:text-cream text-sm">{table.number}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{table.capacity}p</p>
                <p className={`text-xs font-semibold mt-1 capitalize ${style.text}`}>{status}</p>
                <p className="text-xs text-gray-400 mt-0.5">{table.waiter.split(' ')[0]}</p>
              </div>
            )
          })}
        </div>
      </AnimatedSection>
    </div>
  )
}
