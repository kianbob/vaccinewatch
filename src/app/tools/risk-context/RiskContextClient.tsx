'use client'

import { useState, useEffect } from 'react'

interface VaccineStats {
  slug: string
  name: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
}

// Rough dose estimates for context (CDC data, approximate)
const DOSE_ESTIMATES: Record<string, { doses: number; source: string }> = {
  'COVID19': { doses: 672_000_000, source: 'CDC COVID Data Tracker (US doses administered through 2023)' },
  'FLU3': { doses: 150_000_000, source: 'Estimated annual US flu vaccinations' },
  'FLU4': { doses: 150_000_000, source: 'Estimated annual US flu vaccinations' },
  'MMR': { doses: 8_000_000, source: 'Estimated annual US childhood MMR doses' },
  'TDAP': { doses: 12_000_000, source: 'Estimated annual US Tdap doses' },
  'HPV9': { doses: 15_000_000, source: 'Estimated annual US HPV doses' },
  'PPV': { doses: 20_000_000, source: 'Estimated annual pneumococcal doses' },
}

const BACKGROUND_RATES: { condition: string; rate: string; source: string }[] = [
  { condition: 'Myocarditis (general population)', rate: '1-10 per 100,000/year', source: 'AHA' },
  { condition: 'Anaphylaxis (any cause)', rate: '50-200 per 100,000/year', source: 'WAO' },
  { condition: 'Guillain-Barré Syndrome', rate: '1-2 per 100,000/year', source: 'NINDS' },
  { condition: 'Blood clots (DVT/PE)', rate: '100-180 per 100,000/year', source: 'CDC' },
  { condition: 'Bell\'s Palsy', rate: '15-30 per 100,000/year', source: 'NINDS' },
  { condition: 'Sudden cardiac death (<35yo)', rate: '1-3 per 100,000/year', source: 'AHA' },
]

function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
  return value.toString()
}

export default function RiskContextClient() {
  const [vaccineData, setVaccineData] = useState<VaccineStats[]>([])
  const [selectedVaccine, setSelectedVaccine] = useState<string>('')
  const [customDoses, setCustomDoses] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/vaccine-index.json')
      .then(res => res.json())
      .then((data: VaccineStats[]) => {
        const sorted = data.sort((a, b) => b.reports - a.reports)
        setVaccineData(sorted)
        setSelectedVaccine(sorted[0]?.slug || '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />

  const selected = vaccineData.find(v => v.slug === selectedVaccine)
  const doseEstimate = DOSE_ESTIMATES[selectedVaccine]
  const doses = customDoses ? parseInt(customDoses) : (doseEstimate?.doses || 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Vaccine</label>
          <select
            value={selectedVaccine}
            onChange={e => { setSelectedVaccine(e.target.value); setCustomDoses('') }}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary"
          >
            {vaccineData.map(v => (
              <option key={v.slug} value={v.slug}>{v.name} ({formatNumber(v.reports)} reports)</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Doses Administered {doseEstimate && <span className="text-gray-400">(pre-filled)</span>}
          </label>
          <input
            type="number"
            value={customDoses || (doseEstimate?.doses || '')}
            onChange={e => setCustomDoses(e.target.value)}
            placeholder="Enter estimated total doses"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary"
          />
          {doseEstimate && !customDoses && (
            <p className="text-xs text-gray-500 mt-1">Source: {doseEstimate.source}</p>
          )}
        </div>
      </div>

      {selected && (
        <div className="space-y-6">
          {/* VAERS Numbers */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Raw VAERS Numbers: {selected.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{formatNumber(selected.reports)}</div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-700">{formatNumber(selected.died)}</div>
                <div className="text-sm text-gray-600">Death Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-700">{formatNumber(selected.hosp)}</div>
                <div className="text-sm text-gray-600">Hospitalizations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">{formatNumber(selected.disabled)}</div>
                <div className="text-sm text-gray-600">Disability Reports</div>
              </div>
            </div>
          </div>

          {/* With Context */}
          {doses > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                With Context: Per Million Doses ({formatNumber(doses)} estimated doses)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {((selected.reports / doses) * 1_000_000).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-700">Reports per 1M doses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-700">
                    {((selected.died / doses) * 1_000_000).toFixed(1)}
                  </div>
                  <div className="text-sm text-red-600">Deaths per 1M doses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-700">
                    {((selected.hosp / doses) * 1_000_000).toFixed(1)}
                  </div>
                  <div className="text-sm text-amber-600">Hospitalizations per 1M</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700">
                    {((selected.disabled / doses) * 1_000_000).toFixed(1)}
                  </div>
                  <div className="text-sm text-purple-600">Disabilities per 1M</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                ⚠️ These are VAERS report rates, not confirmed causation rates. VAERS accepts all reports regardless of causation.
              </p>
            </div>
          )}

          {!doses && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                Enter estimated doses administered above to calculate rates per million. Without a denominator, raw counts lack context.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Background Rates Reference */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Background Disease Rates (Reference)</h3>
        <p className="text-sm text-gray-600 mb-4">
          These conditions occur naturally in the population regardless of vaccination status.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Background Rate</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {BACKGROUND_RATES.map(rate => (
                <tr key={rate.condition}>
                  <td className="px-4 py-2 text-sm text-gray-900">{rate.condition}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{rate.rate}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{rate.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
