'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

interface Manufacturer {
  name: string
  reports: number
  died: number
  hosp: number
}

type SortKey = 'name' | 'reports' | 'died' | 'hosp'

export default function ManufacturersList({ manufacturers }: { manufacturers: Manufacturer[] }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('reports')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const pageSize = 20

  const totalReports = useMemo(() => manufacturers.reduce((sum, m) => sum + m.reports, 0), [manufacturers])

  const filtered = useMemo(() => {
    let result = manufacturers
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(m => m.name.toLowerCase().includes(q))
    }
    result = [...result].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av
      }
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })
    return result
  }, [manufacturers, search, sortKey, sortDir])

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
          placeholder="Search manufacturers..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="w-full max-w-md px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {search && <p className="text-sm text-gray-400 mt-2">{filtered.length} results</p>}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {([['name', 'Manufacturer'], ['reports', 'Total Reports'], ['died', 'Deaths'], ['hosp', 'Hospitalizations']] as [SortKey, string][]).map(([key, label]) => (
                <th key={key} onClick={() => handleSort(key)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  {label}<span className="text-primary">{sortIcon(key)}</span>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Share
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginated.map(m => {
              const share = totalReports > 0 ? (m.reports / totalReports * 100).toFixed(1) : '0.0'
              return (
                <tr key={m.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">
                          <Link href={`/manufacturers/${slugify(m.name)}`} className="text-primary hover:text-primary/80">
                            {m.name}
                          </Link>
                        </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{m.reports.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-danger font-medium">{m.died.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{m.hosp.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-primary font-medium">{share}%</td>
                </tr>
              )
            })}
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
