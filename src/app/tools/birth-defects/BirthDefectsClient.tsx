'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { formatNumber, formatManufacturer } from '@/lib/utils'

interface BirthDefectEntry {
  type: string
  count: number
}

const COLORS = ['#0d9488', '#0891b2', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#10b981', '#f97316', '#06b6d4']

export default function BirthDefectsClient() {
  const [data, setData] = useState<BirthDefectEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetch('/data/birth-defects.json')
      .then(r => r.json())
      .then((d: BirthDefectEntry[]) => {
        setData(d.sort((a, b) => b.count - a.count))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const totalReports = useMemo(() => data.reduce((sum, d) => sum + d.count, 0), [data])
  const topVaccines = useMemo(() => showAll ? data : data.slice(0, 15), [data, showAll])
  const covidCount = useMemo(() => {
    const covid = data.find(d => d.type === 'COVID19')
    const covid2 = data.find(d => d.type === 'COVID19-2')
    return (covid?.count || 0) + (covid2?.count || 0)
  }, [data])
  const covidPercent = totalReports > 0 ? ((covidCount / totalReports) * 100).toFixed(1) : '0'

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading birth defect data...</div>
  }

  return (
    <div className="space-y-8">
      {/* Key stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{formatNumber(totalReports)}</div>
          <div className="text-sm text-gray-600 mt-1">Total birth defect reports</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{data.length}</div>
          <div className="text-sm text-gray-600 mt-1">Vaccines with reports</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{covidPercent}%</div>
          <div className="text-sm text-gray-600 mt-1">Attributed to COVID-19 vaccines</div>
        </div>
      </div>

      {/* Context box */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-semibold text-amber-900 mb-2">📊 Critical Context</h3>
        <ul className="text-sm text-amber-800 space-y-1.5">
          <li>• About <strong>3% of all U.S. births</strong> involve a birth defect (~120,000/year) — regardless of vaccination</li>
          <li>• VAERS reports show temporal association only — a report after vaccination does NOT mean causation</li>
          <li>• COVID-19 vaccines dominate because of enormous volume (670M+ doses) during peak reporting years</li>
          <li>• Many reports are filed during pregnancy when any vaccine exposure gets documented</li>
          <li>• These numbers are <strong>tiny</strong> relative to the millions of vaccinations given to pregnant individuals</li>
        </ul>
      </div>

      {/* Bar chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Birth Defect Reports by Vaccine</h2>
        <p className="text-sm text-gray-500 mb-4">Top {showAll ? data.length : 15} vaccines with birth defect reports in VAERS</p>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topVaccines} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="type" width={75} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: number) => [formatNumber(value), 'Reports']}
                labelFormatter={(label: string) => formatManufacturer(label)}
              />
              <Bar dataKey="count" fill="#0d9488" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {!showAll && data.length > 15 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Show all {data.length} vaccines →
          </button>
        )}
      </div>

      {/* Pie chart - top 10 share */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Share of Birth Defect Reports</h2>
        <p className="text-sm text-gray-500 mb-4">Top 10 vaccines by proportion of reports</p>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.slice(0, 10).map(d => ({ name: d.type, value: d.count }))}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }: { name: string; percent: number }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {data.slice(0, 10).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatNumber(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <h2 className="text-lg font-bold text-gray-900 p-5 pb-3">All Vaccines with Birth Defect Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">#</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Vaccine</th>
                <th className="text-right px-4 py-2.5 font-semibold text-gray-700">Reports</th>
                <th className="text-right px-4 py-2.5 font-semibold text-gray-700">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={row.type} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    <a href={`/vaccines/${row.type.toLowerCase()}`} className="text-primary hover:underline">
                      {row.type}
                    </a>
                  </td>
                  <td className="px-4 py-2 text-right text-gray-700">{formatNumber(row.count)}</td>
                  <td className="px-4 py-2 text-right text-gray-500">
                    {((row.count / totalReports) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Related links */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/analysis/birth-defects" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Birth Defects Analysis Article</div>
            <div className="text-sm text-gray-500">In-depth analysis with full context</div>
          </a>
          <a href="/tools/severity-profile" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Severity Profile Tool</div>
            <div className="text-sm text-gray-500">Compare outcome rates across vaccines</div>
          </a>
        </div>
      </div>
    </div>
  )
}
