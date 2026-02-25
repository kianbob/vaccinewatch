'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import DisclaimerBanner from '@/components/DisclaimerBanner'

interface Vaccine {
  name: string
  type: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
}

type SortKey = 'name' | 'reports' | 'died' | 'hosp' | 'er'

export default function VaccinesList({ vaccines }: { vaccines: Vaccine[] }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('reports')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filtered = useMemo(() => {
    let result = vaccines
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(v => v.name.toLowerCase().includes(q) || v.type.toLowerCase().includes(q))
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
  }, [vaccines, search, sortKey, sortDir])

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
          placeholder="Search vaccines by name or type..."
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
              {([['name', 'Vaccine'], ['reports', 'Reports'], ['died', 'Deaths'], ['hosp', 'Hospitalizations'], ['er', 'ER Visits']] as [SortKey, string][]).map(([key, label]) => (
                <th key={key} onClick={() => handleSort(key)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  {label}<span className="text-primary">{sortIcon(key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map(v => (
              <tr key={v.type} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  <Link href={`/vaccines/${v.type.toLowerCase()}`} className="text-primary hover:underline font-medium">
                    {v.name.split('(')[0].trim()}
                  </Link>
                  <span className="block text-xs text-gray-400">{v.type}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{v.reports.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-danger font-medium">{v.died.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{v.hosp.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{v.er.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
