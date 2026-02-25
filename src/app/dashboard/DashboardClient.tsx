'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { formatNumber, formatManufacturer } from '@/lib/utils'

interface Vaccine {
  name: string
  type: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
}

type SortKey = 'name' | 'reports' | 'died' | 'hosp' | 'er' | 'disabled' | 'deathRate' | 'hospRate'
type SortDir = 'asc' | 'desc'

export default function DashboardClient() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('reports')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [search, setSearch] = useState('')
  const [minReports, setMinReports] = useState(100)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/vaccine-index.json')
      .then(r => r.json())
      .then((data: Vaccine[]) => {
        setVaccines(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return vaccines
      .filter(v => v.reports >= minReports)
      .filter(v => !q || v.name.toLowerCase().includes(q) || v.type.toLowerCase().includes(q))
      .sort((a, b) => {
        let aVal: number | string, bVal: number | string
        switch (sortKey) {
          case 'name': aVal = formatManufacturer(a.name); bVal = formatManufacturer(b.name); break
          case 'deathRate': aVal = a.reports > 0 ? a.died / a.reports : 0; bVal = b.reports > 0 ? b.died / b.reports : 0; break
          case 'hospRate': aVal = a.reports > 0 ? a.hosp / a.reports : 0; bVal = b.reports > 0 ? b.hosp / b.reports : 0; break
          default: aVal = a[sortKey]; bVal = b[sortKey]
        }
        if (typeof aVal === 'string') {
          return sortDir === 'asc' ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal)
        }
        return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
      })
  }, [vaccines, sortKey, sortDir, search, minReports])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="text-gray-300 ml-1">↕</span>
    return <span className="text-primary ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const rate = (num: number, denom: number) => {
    if (denom === 0) return '0%'
    const pct = (num / denom) * 100
    return pct < 0.1 ? '<0.1%' : `${Math.min(pct, 100).toFixed(1)}%`
  }

  const rateColor = (num: number, denom: number, threshold: number) => {
    if (denom === 0) return ''
    const pct = (num / denom) * 100
    if (pct >= threshold * 2) return 'text-red-600 font-semibold'
    if (pct >= threshold) return 'text-amber-600'
    return 'text-gray-600'
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded-xl flex-1 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-48 animate-pulse"></div>
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search vaccines..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">Min reports:</label>
          <select
            value={minReports}
            onChange={e => setMinReports(Number(e.target.value))}
            className="px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary"
          >
            <option value={0}>All</option>
            <option value={10}>10+</option>
            <option value={100}>100+</option>
            <option value={1000}>1,000+</option>
            <option value={10000}>10,000+</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Showing {filtered.length} of {vaccines.length} vaccines · Click column headers to sort
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-100 min-w-[200px]" onClick={() => handleSort('name')}>
                Vaccine <SortIcon col="name" />
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('reports')}>
                Reports <SortIcon col="reports" />
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('died')}>
                Deaths <SortIcon col="died" />
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('deathRate')}>
                Death % <SortIcon col="deathRate" />
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('hosp')}>
                Hosp. <SortIcon col="hosp" />
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('hospRate')}>
                Hosp. % <SortIcon col="hospRate" />
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('er')}>
                ER Visits <SortIcon col="er" />
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('disabled')}>
                Disabilities <SortIcon col="disabled" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => {
              const slug = v.type.toLowerCase()
              return (
                <tr key={v.type} className={`border-t border-gray-100 hover:bg-primary/5 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-4 py-3">
                    <Link href={`/vaccines/${slug}`} className="text-primary hover:underline font-medium">
                      {formatManufacturer(v.name)}
                    </Link>
                    <div className="text-xs text-gray-400">{v.type}</div>
                  </td>
                  <td className="text-right px-4 py-3 font-mono text-gray-900">{formatNumber(v.reports)}</td>
                  <td className={`text-right px-4 py-3 font-mono ${v.died > 0 ? 'text-red-600' : 'text-gray-400'}`}>{formatNumber(v.died)}</td>
                  <td className={`text-right px-4 py-3 font-mono ${rateColor(v.died, v.reports, 2)}`}>{rate(v.died, v.reports)}</td>
                  <td className={`text-right px-4 py-3 font-mono ${v.hosp > 0 ? 'text-amber-600' : 'text-gray-400'}`}>{formatNumber(v.hosp)}</td>
                  <td className={`text-right px-4 py-3 font-mono ${rateColor(v.hosp, v.reports, 10)}`}>{rate(v.hosp, v.reports)}</td>
                  <td className="text-right px-4 py-3 font-mono text-gray-600">{formatNumber(v.er)}</td>
                  <td className="text-right px-4 py-3 font-mono text-gray-600">{formatNumber(v.disabled)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Context note */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>⚠️ Important context:</strong> Higher numbers do NOT mean a vaccine is more dangerous. 
        Vaccines with more reports are typically those given to more people. Death and hospitalization 
        rates from VAERS cannot be compared to actual risk rates because VAERS is a passive reporting 
        system subject to significant biases. See our{' '}
        <Link href="/analysis/denominator-problem" className="underline font-medium">Denominator Problem</Link>{' '}
        and{' '}
        <Link href="/analysis/reporting-bias" className="underline font-medium">Reporting Bias</Link>{' '}
        analyses for more context.
      </div>
    </div>
  )
}
