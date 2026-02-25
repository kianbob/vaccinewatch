'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import DisclaimerBanner from '@/components/DisclaimerBanner'

interface Symptom {
  name: string
  reports: number
  died: number
  hosp: number
}

type SortKey = 'name' | 'reports' | 'died' | 'hosp'

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function SymptomsList({ symptoms }: { symptoms: Symptom[] }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('reports')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filtered = useMemo(() => {
    let result = symptoms
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(s => s.name.toLowerCase().includes(q))
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
  }, [symptoms, search, sortKey, sortDir])

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
      <DisclaimerBanner />
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search symptoms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {search && <p className="text-sm text-gray-400 mt-2">{filtered.length} results</p>}
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {([['name', 'Symptom'], ['reports', 'Reports'], ['died', 'Deaths'], ['hosp', 'Hospitalizations']] as [SortKey, string][]).map(([key, label]) => (
                <th key={key} onClick={() => handleSort(key)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  {label}<span className="text-primary">{sortIcon(key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map(s => (
              <tr key={s.name} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  <Link href={`/symptoms/${slugify(s.name)}`} className="text-primary hover:underline font-medium">
                    {s.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{s.reports.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-danger font-medium">{s.died.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{s.hosp.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
