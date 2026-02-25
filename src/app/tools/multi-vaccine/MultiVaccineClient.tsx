'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'

/* eslint-disable @typescript-eslint/no-explicit-any */
const BarChart = dynamic(() => import('recharts').then(m => m.BarChart) as any, { ssr: false }) as any
const Bar = dynamic(() => import('recharts').then(m => m.Bar) as any, { ssr: false }) as any
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis) as any, { ssr: false }) as any
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis) as any, { ssr: false }) as any
const CartesianGrid = dynamic(() => import('recharts').then(m => m.CartesianGrid) as any, { ssr: false }) as any
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip) as any, { ssr: false }) as any
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer) as any, { ssr: false }) as any

interface Combo {
  reports: number
  died: number
  hosp: number
  vaccines: string[]
}

export default function MultiVaccineClient() {
  const [data, setData] = useState<Combo[]>([])
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<'reports' | 'died' | 'hosp'>('reports')

  useEffect(() => {
    fetch('/data/multi-vaccine.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const filtered = useMemo(() => {
    let result = data
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(c => c.vaccines.some(v => v.toLowerCase().includes(q)))
    }
    return [...result].sort((a, b) => b[sortKey] - a[sortKey])
  }, [data, search, sortKey])

  const top20 = useMemo(() => {
    return [...data].sort((a, b) => b.reports - a.reports).slice(0, 20).map(c => ({
      name: c.vaccines.join(' + '),
      reports: c.reports,
      deaths: c.died,
      hospitalizations: c.hosp
    }))
  }, [data])

  if (!data.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top 20 Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-1">Top 20 Vaccine Combinations</h2>
        <p className="text-sm text-gray-500 mb-4">Most frequently co-administered vaccines in VAERS reports</p>
        <div style={{ width: '100%', height: 500 }}>
          <ResponsiveContainer>
            <BarChart data={top20} layout="vertical" margin={{ left: 120 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
              <Tooltip
                formatter={(value: any) => [Number(value).toLocaleString(), 'Reports']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="reports" fill="#0d9488" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search for a vaccine (e.g., COVID, MMR, FLU)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            {(['reports', 'died', 'hosp'] as const).map(k => (
              <button
                key={k}
                onClick={() => setSortKey(k)}
                className={`px-3 py-2 rounded-xl text-xs font-medium ${
                  sortKey === k ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {k === 'reports' ? 'Reports' : k === 'died' ? 'Deaths' : 'Hospitalizations'}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Showing {filtered.length} of {data.length} combinations
        </p>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Vaccines</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Reports</th>
                <th className="px-4 py-3 text-right font-medium text-danger">Deaths</th>
                <th className="px-4 py-3 text-right font-medium text-accent">Hospitalizations</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Death Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.slice(0, 100).map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">
                    <div className="flex flex-wrap gap-1">
                      {c.vaccines.map(v => (
                        <span key={v} className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-lg">
                          {v}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">{c.reports.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-danger font-medium">{c.died.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-accent">{c.hosp.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-gray-600">
                    {c.reports > 0 ? ((c.died / c.reports) * 100).toFixed(1) : '0'}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 100 && (
          <p className="text-sm text-gray-400 mt-2">Showing first 100 results. Use search to narrow down.</p>
        )}
      </div>
    </div>
  )
}
