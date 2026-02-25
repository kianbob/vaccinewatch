'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'

const CompareCharts = dynamic(() => import('@/components/CompareCharts'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
})

interface VaccineData {
  name: string
  type: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
  yearly: { year: number; count: number }[]
}

export default function ComparePage() {
  const [vaccines, setVaccines] = useState<VaccineData[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/vaccine-index.json')
      .then(r => r.json())
      .then(data => {
        setVaccines(data)
        setLoading(false)
      })
  }, [])

  const selectedVaccines = vaccines.filter(v => selected.includes(v.type))

  const handleToggle = (type: string) => {
    setSelected(prev => {
      if (prev.includes(type)) return prev.filter(t => t !== type)
      if (prev.length >= 3) return prev
      return [...prev, type]
    })
  }

  const handleRemove = (type: string) => {
    setSelected(prev => prev.filter(t => t !== type))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Compare Vaccines
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Select 2-3 vaccines to compare their VAERS report statistics side by side.
          Remember that report counts reflect reporting patterns, not relative safety.
        </p>
      </div>

      {/* Selector */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Select Vaccines to Compare (max 3)
        </h2>

        {/* Selected chips */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedVaccines.map(v => (
              <span
                key={v.type}
                className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {v.name.length > 40 ? v.name.substring(0, 40) + '...' : v.name}
                <button
                  onClick={() => handleRemove(v.type)}
                  className="ml-2 text-primary/60 hover:text-primary font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {loading ? (
          <div className="animate-pulse text-gray-400 py-4">Loading vaccines...</div>
        ) : (
          <VaccineSelector
            vaccines={vaccines}
            selected={selected}
            onToggle={handleToggle}
          />
        )}
      </div>

      {/* Comparison */}
      {selectedVaccines.length >= 2 ? (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
                    {selectedVaccines.map(v => (
                      <th key={v.type} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        {v.type}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { label: 'Total Reports', key: 'reports' },
                    { label: 'Deaths Reported', key: 'died' },
                    { label: 'Hospitalizations', key: 'hosp' },
                    { label: 'ER Visits', key: 'er' },
                    { label: 'Disabilities', key: 'disabled' },
                  ].map(metric => (
                    <tr key={metric.key} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{metric.label}</td>
                      {selectedVaccines.map(v => (
                        <td key={v.type} className={`px-6 py-4 text-sm text-right font-semibold ${metric.key === 'died' ? 'text-danger' : 'text-gray-900'}`}>
                          {(v[metric.key as keyof VaccineData] as number).toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Death Rate (per report)</td>
                    {selectedVaccines.map(v => (
                      <td key={v.type} className="px-6 py-4 text-sm text-right text-gray-600">
                        {((v.died / v.reports) * 100).toFixed(2)}%
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Hospitalization Rate (per report)</td>
                    {selectedVaccines.map(v => (
                      <td key={v.type} className="px-6 py-4 text-sm text-right text-gray-600">
                        {((v.hosp / v.reports) * 100).toFixed(2)}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Yearly Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Yearly Report Trends</h3>
            <CompareCharts vaccines={selectedVaccines} />
          </div>

          {/* Context */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">Interpreting This Comparison</h3>
            <div className="text-amber-800 space-y-2 text-sm">
              <div className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span><strong>Denominator matters:</strong> These are raw report counts, not rates per dose administered. A vaccine given to 100 million people will naturally have more reports than one given to 1 million.</span>
              </div>
              <div className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span><strong>Reporting era:</strong> Vaccines introduced during the COVID era benefited from heightened VAERS awareness, potentially inflating report counts.</span>
              </div>
              <div className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span><strong>Not a safety ranking:</strong> Comparing raw VAERS numbers between vaccines does not tell you which vaccine is safer or more dangerous.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            Select at least 2 vaccines above to see a comparison
          </p>
        </div>
      )}
    </div>
  )
}

function VaccineSelector({
  vaccines,
  selected,
  onToggle,
}: {
  vaccines: VaccineData[]
  selected: string[]
  onToggle: (type: string) => void
}) {
  const [search, setSearch] = useState('')

  const filtered = search.length >= 2
    ? vaccines.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase()))
    : vaccines.sort((a, b) => b.reports - a.reports).slice(0, 20)

  return (
    <div>
      <input
        type="text"
        placeholder="Search vaccines..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-3"
      />
      <div className="max-h-60 overflow-y-auto space-y-1">
        {filtered.map(v => {
          const isSelected = selected.includes(v.type)
          const isDisabled = !isSelected && selected.length >= 3
          return (
            <button
              key={v.type}
              onClick={() => !isDisabled && onToggle(v.type)}
              disabled={isDisabled}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex justify-between items-center ${
                isSelected ? 'bg-primary/10 text-primary' : isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              <span>{v.name}</span>
              <span className="text-xs text-gray-400">{v.reports.toLocaleString()} reports</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
