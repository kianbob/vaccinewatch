'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'

interface ComboEntry {
  vaccines: string[]
  reports: number
  died: number
  hosp: number
}

type SortKey = 'reports' | 'died' | 'hosp'

export default function MultiVaccineClient() {
  const [data, setData] = useState<ComboEntry[]>([])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortKey>('reports')
  const [sortAsc, setSortAsc] = useState(false)

  useEffect(() => {
    fetch('/data/multi-vaccine.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const filtered = useMemo(() => {
    let items = data
    if (search.trim()) {
      const q = search.toUpperCase().trim()
      items = items.filter(d => d.vaccines.some(v => v.includes(q)) || d.vaccines.join(' + ').includes(q))
    }
    return [...items].sort((a, b) => sortAsc ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy])
  }, [data, search, sortBy, sortAsc])

  const top20 = useMemo(() => {
    return [...data]
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 20)
      .map(d => ({
        name: d.vaccines.join(' + '),
        reports: d.reports,
        deaths: d.died,
        hospitalizations: d.hosp,
      }))
  }, [data])

  const totalReports = useMemo(() => data.reduce((s, d) => s + d.reports, 0), [data])
  const totalDeaths = useMemo(() => data.reduce((s, d) => s + d.died, 0), [data])

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setSortAsc(!sortAsc)
    else { setSortBy(key); setSortAsc(false) }
  }

  const sortIcon = (key: SortKey) => sortBy === key ? (sortAsc ? ' ↑' : ' ↓') : ''

  if (!data.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">{data.length.toLocaleString()}</p>
          <p className="text-sm text-gray-500">vaccine combinations</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">{totalReports.toLocaleString()}</p>
          <p className="text-sm text-gray-500">total co-admin reports</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">{totalDeaths.toLocaleString()}</p>
          <p className="text-sm text-gray-500">deaths in multi-vax reports</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Top 20 Vaccine Combinations by Reports</h2>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top20} layout="vertical" margin={{ left: 120, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: any) => value.toLocaleString()} />
              <Bar dataKey="reports" fill="#0891b2" name="Reports" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search + Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">All Vaccine Combinations</h2>
        <input
          type="text"
          placeholder="Search vaccine combos (e.g. FLU3, MMR, COVID19)..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-primary/30 focus:border-primary"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="text-sm text-gray-500 mb-3">
          Showing {filtered.length.toLocaleString()} of {data.length.toLocaleString()} combinations
        </div>
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-gray-700">Vaccines</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-700 cursor-pointer select-none" onClick={() => handleSort('reports')}>
                  Reports{sortIcon('reports')}
                </th>
                <th className="text-right px-3 py-2 font-semibold text-gray-700 cursor-pointer select-none" onClick={() => handleSort('died')}>
                  Deaths{sortIcon('died')}
                </th>
                <th className="text-right px-3 py-2 font-semibold text-gray-700 cursor-pointer select-none" onClick={() => handleSort('hosp')}>
                  Hospitalizations{sortIcon('hosp')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.slice(0, 200).map((d, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-gray-900">{d.vaccines.join(' + ')}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{d.reports.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{d.died.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{d.hosp.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length > 200 && (
            <p className="text-sm text-gray-500 mt-2 text-center">Showing first 200 results. Refine your search to see more.</p>
          )}
        </div>
      </div>
    </div>
  )
}
