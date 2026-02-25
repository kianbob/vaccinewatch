'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface StateRow {
  abbreviation: string
  name: string
  reports: number
  died: number
  hosp: number
  er: number
  per100k: number | null
}

type SortKey = 'name' | 'reports' | 'died' | 'hosp' | 'er' | 'per100k'

export default function StatesList({ states }: { states: StateRow[] }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('reports')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const pageSize = 25

  const filtered = useMemo(() => {
    let result = states
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.abbreviation.toLowerCase().includes(q))
    }
    result = [...result].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av
      }
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })
    return result
  }, [states, search, sortKey, sortDir])

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sortIcon = (key: SortKey) => sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search states..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {search && <p className="text-sm text-gray-400 mt-2">{filtered.length} results</p>}
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {([['name', 'State'], ['reports', 'Total Reports'], ['per100k', 'Per 100K'], ['died', 'Deaths'], ['hosp', 'Hospitalizations'], ['er', 'ER Visits']] as [SortKey, string][]).map(([key, label]) => (
                <th key={key} onClick={() => handleSort(key)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  {label}<span className="text-primary">{sortIcon(key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginated.map(s => (
              <tr key={s.abbreviation} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  <Link href={`/states/${s.abbreviation.toLowerCase()}`} className="font-semibold text-primary hover:text-primary/80">
                    {s.name}
                  </Link>
                  <span className="text-gray-400 ml-1">({s.abbreviation})</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{s.reports.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-primary font-medium">{s.per100k != null ? s.per100k.toLocaleString() : '—'}</td>
                <td className="px-6 py-4 text-sm text-danger font-medium">{s.died.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{s.hosp.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{s.er.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-gray-700">
            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
