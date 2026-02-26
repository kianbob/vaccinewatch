'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts'

interface VaccineInfo {
  name: string
  slug: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
}

interface RecoveryInfo {
  Y: number
  N: number
  U: number
}

export default function SeverityProfileClient() {
  const [vaccines, setVaccines] = useState<VaccineInfo[]>([])
  const [recovery, setRecovery] = useState<Record<string, RecoveryInfo>>({})
  const [selected, setSelected] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/data/vaccine-index.json').then(r => r.json()),
      fetch('/data/recovery-rates.json').then(r => r.json())
    ]).then(([vax, rec]) => {
      const sorted = vax.sort((a: VaccineInfo, b: VaccineInfo) => b.reports - a.reports)
      setVaccines(sorted)
      setRecovery(rec)
      if (sorted.length > 0) setSelected(sorted[0].slug)
    }).catch(console.error)
  }, [])

  const vax = useMemo(() => vaccines.find(v => v.slug === selected), [vaccines, selected])

  const averages = useMemo(() => {
    if (!vaccines.length) return { deathRate: 0, hospRate: 0, erRate: 0, disabledRate: 0 }
    const totals = vaccines.reduce((acc, v) => ({
      reports: acc.reports + v.reports,
      died: acc.died + v.died,
      hosp: acc.hosp + v.hosp,
      er: acc.er + v.er,
      disabled: acc.disabled + v.disabled,
    }), { reports: 0, died: 0, hosp: 0, er: 0, disabled: 0 })
    return {
      deathRate: (totals.died / totals.reports) * 100,
      hospRate: (totals.hosp / totals.reports) * 100,
      erRate: (totals.er / totals.reports) * 100,
      disabledRate: (totals.disabled / totals.reports) * 100,
    }
  }, [vaccines])

  const rec = useMemo(() => {
    if (!selected || !recovery[selected.toUpperCase()]) return null
    const r = recovery[selected.toUpperCase()]
    const total = r.Y + r.N + r.U
    return {
      recovered: ((r.Y / total) * 100).toFixed(1),
      notRecovered: ((r.N / total) * 100).toFixed(1),
      unknown: ((r.U / total) * 100).toFixed(1),
      total
    }
  }, [selected, recovery])

  if (!vaccines.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const deathRate = vax && vax.reports > 0 ? (vax.died / vax.reports) * 100 : 0
  const hospRate = vax && vax.reports > 0 ? (vax.hosp / vax.reports) * 100 : 0
  const erRate = vax && vax.reports > 0 ? (vax.er / vax.reports) * 100 : 0
  const disabledRate = vax && vax.reports > 0 ? (vax.disabled / vax.reports) * 100 : 0

  const comparisonData = [
    { metric: 'Death Rate', selected: Number(deathRate.toFixed(2)), average: Number(averages.deathRate.toFixed(2)) },
    { metric: 'Hosp. Rate', selected: Number(hospRate.toFixed(2)), average: Number(averages.hospRate.toFixed(2)) },
    { metric: 'ER Rate', selected: Number(erRate.toFixed(2)), average: Number(averages.erRate.toFixed(2)) },
    { metric: 'Disability Rate', selected: Number(disabledRate.toFixed(2)), average: Number(averages.disabledRate.toFixed(2)) },
  ]

  return (
    <div className="space-y-6">
      {/* Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <label className="text-sm font-medium text-gray-700 block mb-2">Select Vaccine</label>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          {vaccines.map(v => (
            <option key={v.slug} value={v.slug}>{v.name} ({v.reports.toLocaleString()} reports)</option>
          ))}
        </select>
      </div>

      {vax && (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold">{vax.reports.toLocaleString()}</p>
              <p className="text-xs text-primary">Total Reports</p>
            </div>
            <div className="bg-white rounded-xl border border-red-200 p-4 text-center">
              <p className="text-2xl font-bold text-danger">{deathRate.toFixed(1)}%</p>
              <p className="text-xs text-danger">Death Rate</p>
            </div>
            <div className="bg-white rounded-xl border border-cyan-200 p-4 text-center">
              <p className="text-2xl font-bold text-accent">{hospRate.toFixed(1)}%</p>
              <p className="text-xs text-accent">Hosp. Rate</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold">{erRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-500">ER Visit Rate</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold">{disabledRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-500">Disability Rate</p>
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-1">{vax.name} vs Average (all vaccines)</h2>
            <p className="text-sm text-gray-500 mb-4">Severity rates as % of reports</p>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <YAxis unit="%" />
                  <Tooltip
                    formatter={(value: any) => [`${value}%`]}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Bar dataKey="selected" name={vax.name} fill="#0d9488" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="average" name="All Vaccines Avg" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recovery Data */}
          {rec && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Recovery Outcomes</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-3xl font-bold text-green-600">{rec.recovered}%</p>
                  <p className="text-sm text-green-700">Recovered</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <p className="text-3xl font-bold text-danger">{rec.notRecovered}%</p>
                  <p className="text-sm text-red-700">Not Recovered</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-gray-500">{rec.unknown}%</p>
                  <p className="text-sm text-gray-600">Unknown/No Follow-up</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Based on {rec.total.toLocaleString()} reports with recovery status data. 
                &quot;Unknown&quot; typically means no follow-up report was submitted — not that recovery didn&apos;t occur.
              </p>
            </div>
          )}

          {/* View Full Page Link */}
          <div className="text-center">
            <a
              href={`/vaccines/${vax.slug}`}
              className="inline-block px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              View Full {vax.name} Page →
            </a>
          </div>
        </>
      )}
    </div>
  )
}
