'use client'

import { useState, useEffect } from 'react'

interface DoseData {
  [vaccine: string]: {
    [dose: string]: { reports: number; died: number; hosp: number }
  }
}

function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
  return value.toString()
}

export default function DoseComparisonClient() {
  const [doseData, setDoseData] = useState<DoseData | null>(null)
  const [selectedVaccine, setSelectedVaccine] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/dose-series.json')
      .then(res => res.json())
      .then(data => {
        setDoseData(data)
        // Default to COVID19 if available, else first vaccine
        const vaccines = Object.keys(data).sort()
        setSelectedVaccine(vaccines.includes('COVID19') ? 'COVID19' : vaccines[0] || '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />
  if (!doseData) return <div className="text-gray-600">Unable to load dose data.</div>

  const vaccines = Object.keys(doseData).sort()
  const vaccineData = selectedVaccine ? doseData[selectedVaccine] : null

  const DOSE_LABELS: Record<string, string> = {
    '1': '1st Dose',
    '2': '2nd Dose',
    '3': '3rd Dose',
    '4': '4th Dose',
    '5': '5th Dose',
    '6': '6th Dose+',
    'UNK': 'Unknown',
  }

  const DOSE_ORDER = ['1', '2', '3', '4', '5', '6', 'UNK']

  const doses = vaccineData
    ? DOSE_ORDER.filter(d => vaccineData[d])
    : []

  const totalReports = doses.reduce((sum, d) => sum + (vaccineData?.[d]?.reports || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="vaccine-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Vaccine
        </label>
        <select
          id="vaccine-select"
          value={selectedVaccine}
          onChange={e => setSelectedVaccine(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
        >
          {vaccines.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {vaccineData && (
        <>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              Showing <strong>{formatNumber(totalReports)}</strong> total reports for <strong>{selectedVaccine}</strong> across {doses.length} dose categories.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dose</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Deaths</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Death Rate</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hospitalizations</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hosp Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doses.map(dose => {
                  const d = vaccineData[dose]
                  return (
                    <tr key={dose} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{DOSE_LABELS[dose] || `Dose ${dose}`}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatNumber(d.reports)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 text-right">{totalReports > 0 ? ((d.reports / totalReports) * 100).toFixed(1) : 0}%</td>
                      <td className="px-4 py-3 text-sm text-red-700 text-right font-medium">{formatNumber(d.died)}</td>
                      <td className="px-4 py-3 text-sm text-red-700 text-right">{d.reports > 0 ? ((d.died / d.reports) * 100).toFixed(2) : 0}%</td>
                      <td className="px-4 py-3 text-sm text-amber-700 text-right font-medium">{formatNumber(d.hosp)}</td>
                      <td className="px-4 py-3 text-sm text-amber-700 text-right">{d.reports > 0 ? ((d.hosp / d.reports) * 100).toFixed(2) : 0}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Visual bar comparison */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">Visual Comparison</h3>
            {doses.filter(d => d !== 'UNK').map(dose => {
              const d = vaccineData[dose]
              const maxReports = Math.max(...doses.map(dd => vaccineData[dd]?.reports || 0))
              const width = maxReports > 0 ? (d.reports / maxReports) * 100 : 0
              return (
                <div key={dose} className="flex items-center gap-3">
                  <span className="w-20 text-sm text-gray-600 text-right">{DOSE_LABELS[dose] || dose}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${Math.max(width, 2)}%` }}
                    >
                      {width > 15 && (
                        <span className="text-xs text-white font-medium">{formatNumber(d.reports)}</span>
                      )}
                    </div>
                  </div>
                  {width <= 15 && <span className="text-xs text-gray-500">{formatNumber(d.reports)}</span>}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
