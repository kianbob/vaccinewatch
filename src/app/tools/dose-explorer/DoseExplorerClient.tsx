'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts'

interface DoseData {
  [vaccine: string]: {
    [dose: string]: { reports: number; died: number; hosp: number }
  }
}

const VACCINE_NAMES: Record<string, string> = {
  COVID19: 'COVID-19 Vaccine',
  FLU3: 'Influenza (Fluvirin)',
  FLU4: 'Influenza (Flulaval)',
  MMR: 'MMR',
  DTAP: 'DTaP',
  DTP: 'DTP',
  TDAP: 'Tdap',
  HPV9: 'HPV (Gardasil 9)',
  HIBV: 'Hib',
  HEP: 'Hepatitis B',
  HEPA: 'Hepatitis A',
  PPV: 'Pneumococcal',
  VARCEL: 'Varicella',
  IPV: 'IPV (Polio)',
  OPV: 'OPV (Oral Polio)',
  MNQ: 'Meningococcal',
  RAB: 'Rabies',
  VARZOS: 'Zoster (Zostavax)',
  RV5: 'Rotavirus',
}

export default function DoseExplorerClient() {
  const [data, setData] = useState<DoseData | null>(null)
  const [selectedVaccine, setSelectedVaccine] = useState('COVID19')
  const [metric, setMetric] = useState<'reports' | 'died' | 'hosp'>('reports')

  useEffect(() => {
    fetch('/data/dose-series.json')
      .then(r => r.json())
      .then(d => {
        setData(d)
        if (d.COVID19) setSelectedVaccine('COVID19')
        else setSelectedVaccine(Object.keys(d)[0])
      })
      .catch(console.error)
  }, [])

  const vaccines = useMemo(() => {
    if (!data) return []
    return Object.keys(data).sort((a, b) => {
      const aTotal = Object.values(data[a]).reduce((s, d) => s + d.reports, 0)
      const bTotal = Object.values(data[b]).reduce((s, d) => s + d.reports, 0)
      return bTotal - aTotal
    })
  }, [data])

  const chartData = useMemo(() => {
    if (!data || !data[selectedVaccine]) return []
    const vaxData = data[selectedVaccine]
    const doseOrder = ['1', '2', '3', '4', '5', '6', 'UNK']
    return doseOrder
      .filter(d => vaxData[d])
      .map(d => ({
        dose: d === 'UNK' ? 'Unknown' : `Dose ${d}`,
        reports: vaxData[d].reports,
        deaths: vaxData[d].died,
        hospitalizations: vaxData[d].hosp,
        deathRate: vaxData[d].reports > 0 ? ((vaxData[d].died / vaxData[d].reports) * 100).toFixed(2) : '0',
        hospRate: vaxData[d].reports > 0 ? ((vaxData[d].hosp / vaxData[d].reports) * 100).toFixed(2) : '0',
      }))
  }, [data, selectedVaccine])

  if (!data) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const metricKey = metric === 'reports' ? 'reports' : metric === 'died' ? 'deaths' : 'hospitalizations'
  const metricColor = metric === 'died' ? '#dc2626' : metric === 'hosp' ? '#0891b2' : '#0d9488'
  const displayName = VACCINE_NAMES[selectedVaccine] || selectedVaccine

  return (
    <div className="space-y-6">
      {/* Vaccine Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <label className="text-sm font-medium text-gray-700 block mb-2">Select Vaccine</label>
        <select
          value={selectedVaccine}
          onChange={e => setSelectedVaccine(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          {vaccines.map(v => (
            <option key={v} value={v}>{VACCINE_NAMES[v] || v}</option>
          ))}
        </select>
      </div>

      {/* Metric Toggle */}
      <div className="flex gap-2">
        {([
          { key: 'reports' as const, label: 'Reports', color: '#0d9488' },
          { key: 'died' as const, label: 'Deaths', color: '#dc2626' },
          { key: 'hosp' as const, label: 'Hospitalizations', color: '#0891b2' },
        ]).map(m => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              metric === m.key ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={metric === m.key ? { backgroundColor: m.color } : {}}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-1">{displayName} — {metric === 'reports' ? 'Reports' : metric === 'died' ? 'Deaths' : 'Hospitalizations'} by Dose</h2>
        <p className="text-sm text-gray-500 mb-4">Breakdown across dose series</p>
        {chartData.length > 0 ? (
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="dose" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
                <Tooltip
                  formatter={(value: any) => [Number(value).toLocaleString(), metricKey.charAt(0).toUpperCase() + metricKey.slice(1)]}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey={metricKey} fill={metricColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500 py-8 text-center">No dose data available for this vaccine.</p>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold mb-4">{displayName} — Dose Series Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Dose</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Reports</th>
                <th className="px-4 py-3 text-right font-medium text-danger">Deaths</th>
                <th className="px-4 py-3 text-right font-medium text-danger">Death Rate</th>
                <th className="px-4 py-3 text-right font-medium text-accent">Hospitalizations</th>
                <th className="px-4 py-3 text-right font-medium text-accent">Hosp. Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chartData.map(row => (
                <tr key={row.dose} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{row.dose}</td>
                  <td className="px-4 py-3 text-right">{row.reports.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-danger font-medium">{row.deaths.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-danger">{row.deathRate}%</td>
                  <td className="px-4 py-3 text-right text-accent">{row.hospitalizations.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-accent">{row.hospRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
