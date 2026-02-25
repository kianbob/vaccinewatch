'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { formatNumber, formatManufacturer } from '@/lib/utils'

type RecoveryData = Record<string, { Y: number; N: number; U: number }>

type SortKey = 'total' | 'recoveredRate' | 'notRecoveredRate' | 'unknownRate'

export default function RecoveryExplorerClient() {
  const [data, setData] = useState<RecoveryData>({})
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortKey>('total')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/recovery-rates.json')
      .then(r => r.json())
      .then((d: RecoveryData) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const vaccines = useMemo(() => {
    return Object.entries(data).map(([vaccine, counts]) => {
      const total = counts.Y + counts.N + counts.U
      return {
        vaccine,
        recovered: counts.Y,
        notRecovered: counts.N,
        unknown: counts.U,
        total,
        recoveredRate: total > 0 ? (counts.Y / total) * 100 : 0,
        notRecoveredRate: total > 0 ? (counts.N / total) * 100 : 0,
        unknownRate: total > 0 ? (counts.U / total) * 100 : 0,
      }
    })
      .filter(v => v.total > 0)
      .filter(v => !search || v.vaccine.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'recoveredRate') return b.recoveredRate - a.recoveredRate
        if (sortBy === 'notRecoveredRate') return b.notRecoveredRate - a.notRecoveredRate
        if (sortBy === 'unknownRate') return b.unknownRate - a.unknownRate
        return b.total - a.total
      })
  }, [data, sortBy, search])

  const totals = useMemo(() => {
    let y = 0, n = 0, u = 0
    Object.values(data).forEach(v => { y += v.Y; n += v.N; u += v.U })
    const t = y + n + u
    return { recovered: y, notRecovered: n, unknown: u, total: t }
  }, [data])

  const selectedVaccine = useMemo(() => {
    if (!selected) return null
    return vaccines.find(v => v.vaccine === selected) || null
  }, [selected, vaccines])

  const chartData = useMemo(() => {
    return vaccines.slice(0, 20).map(v => ({
      name: v.vaccine,
      Recovered: +v.recoveredRate.toFixed(1),
      'Not Recovered': +v.notRecoveredRate.toFixed(1),
      Unknown: +v.unknownRate.toFixed(1),
    }))
  }, [vaccines])

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading recovery data...</div>
  }

  return (
    <div className="space-y-8">
      {/* Overall stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{formatNumber(totals.total)}</div>
          <div className="text-sm text-gray-600 mt-1">Reports with status</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-green-600">
            {totals.total > 0 ? ((totals.recovered / totals.total) * 100).toFixed(1) : 0}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Recovered</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-red-500">
            {totals.total > 0 ? ((totals.notRecovered / totals.total) * 100).toFixed(1) : 0}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Not Recovered</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-gray-400">
            {totals.total > 0 ? ((totals.unknown / totals.total) * 100).toFixed(1) : 0}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Unknown</div>
        </div>
      </div>

      {/* Context */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-2">📊 What does &quot;Not Recovered&quot; mean?</h3>
        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>• <strong>Ongoing at time of report</strong> — symptoms hadn&apos;t resolved when the form was filed</li>
          <li>• <strong>No follow-up</strong> — VAERS doesn&apos;t systematically track people after filing</li>
          <li>• <strong>Chronic conditions</strong> — pre-existing issues that may have been exacerbated</li>
          <li>• <strong>Bias toward &quot;not recovered&quot;</strong> — people who recover often don&apos;t update their report</li>
        </ul>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search vaccines..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortKey)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          <option value="total">Sort by total reports</option>
          <option value="recoveredRate">Sort by recovery rate</option>
          <option value="notRecoveredRate">Sort by non-recovery rate</option>
          <option value="unknownRate">Sort by unknown rate</option>
        </select>
      </div>

      {/* Stacked bar chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Recovery Rates by Vaccine</h2>
        <p className="text-sm text-gray-500 mb-4">Top 20 vaccines (by current sort). Stacked percentage breakdown.</p>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
              <XAxis type="number" domain={[0, 100]} unit="%" />
              <YAxis type="category" dataKey="name" width={75} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
              <Bar dataKey="Recovered" stackId="a" fill="#10b981" />
              <Bar dataKey="Not Recovered" stackId="a" fill="#ef4444" />
              <Bar dataKey="Unknown" stackId="a" fill="#d1d5db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Selected vaccine detail */}
      {selectedVaccine && (
        <div className="bg-white border-2 border-primary rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            {formatManufacturer(selectedVaccine.vaccine)} — Recovery Breakdown
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{selectedVaccine.recoveredRate.toFixed(1)}%</div>
              <div className="text-xs text-gray-500">Recovered ({formatNumber(selectedVaccine.recovered)})</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">{selectedVaccine.notRecoveredRate.toFixed(1)}%</div>
              <div className="text-xs text-gray-500">Not Recovered ({formatNumber(selectedVaccine.notRecovered)})</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-400">{selectedVaccine.unknownRate.toFixed(1)}%</div>
              <div className="text-xs text-gray-500">Unknown ({formatNumber(selectedVaccine.unknown)})</div>
            </div>
          </div>
        </div>
      )}

      {/* Full table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Vaccine</th>
                <th className="text-right px-4 py-2.5 font-semibold text-gray-700">Total</th>
                <th className="text-right px-4 py-2.5 font-semibold text-green-700">Recovered</th>
                <th className="text-right px-4 py-2.5 font-semibold text-red-600">Not Recovered</th>
                <th className="text-right px-4 py-2.5 font-semibold text-gray-400">Unknown</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((row, i) => (
                <tr
                  key={row.vaccine}
                  className={`cursor-pointer hover:bg-primary/5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} ${selected === row.vaccine ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelected(selected === row.vaccine ? null : row.vaccine)}
                >
                  <td className="px-4 py-2 font-medium">
                    <a href={`/vaccines/${row.vaccine.toLowerCase()}`} className="text-primary hover:underline" onClick={e => e.stopPropagation()}>
                      {row.vaccine}
                    </a>
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">{formatNumber(row.total)}</td>
                  <td className="px-4 py-2 text-right text-green-700">{row.recoveredRate.toFixed(1)}%</td>
                  <td className="px-4 py-2 text-right text-red-600">{row.notRecoveredRate.toFixed(1)}%</td>
                  <td className="px-4 py-2 text-right text-gray-400">{row.unknownRate.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/analysis/recovery-rates" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Recovery Rates Analysis</div>
            <div className="text-sm text-gray-500">In-depth article on recovery patterns</div>
          </a>
          <a href="/tools/severity-profile" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Severity Profile</div>
            <div className="text-sm text-gray-500">Compare full outcome profiles</div>
          </a>
        </div>
      </div>
    </div>
  )
}
