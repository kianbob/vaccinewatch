'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

interface AgeGroup {
  group: string
  reports: number
  died: number
  hospitalized: number
}

interface AgeGenderData {
  ageGroups: AgeGroup[]
  gender: { M: number; F: number; U: number }
}

const GENDER_COLORS = ['#0891b2', '#ec4899', '#94a3b8']

export default function AgeExplorerClient() {
  const [data, setData] = useState<AgeGenderData | null>(null)
  const [view, setView] = useState<'reports' | 'deaths' | 'hospitalizations'>('reports')

  useEffect(() => {
    fetch('/data/age-gender.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const chartData = useMemo(() => {
    if (!data) return []
    return data.ageGroups.map(g => ({
      name: g.group,
      reports: g.reports,
      deaths: g.died,
      hospitalizations: g.hospitalized,
      deathRate: g.reports > 0 ? ((g.died / g.reports) * 100).toFixed(2) : '0',
      hospRate: g.reports > 0 ? ((g.hospitalized / g.reports) * 100).toFixed(2) : '0'
    }))
  }, [data])

  const genderData = useMemo(() => {
    if (!data) return []
    const total = data.gender.M + data.gender.F + data.gender.U
    return [
      { name: 'Male', value: data.gender.M, pct: ((data.gender.M / total) * 100).toFixed(1) },
      { name: 'Female', value: data.gender.F, pct: ((data.gender.F / total) * 100).toFixed(1) },
      { name: 'Unknown', value: data.gender.U, pct: ((data.gender.U / total) * 100).toFixed(1) }
    ]
  }, [data])

  if (!data) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const metricKey = view === 'reports' ? 'reports' : view === 'deaths' ? 'deaths' : 'hospitalizations'
  const metricColor = view === 'deaths' ? '#dc2626' : view === 'hospitalizations' ? '#0891b2' : '#0d9488'

  return (
    <div className="space-y-8">
      {/* View Toggle */}
      <div className="flex flex-wrap gap-2">
        {(['reports', 'deaths', 'hospitalizations'] as const).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              view === v
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Age Distribution Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-1">
          {view === 'reports' ? 'Reports' : view === 'deaths' ? 'Death Reports' : 'Hospitalizations'} by Age Group
        </h2>
        <p className="text-sm text-gray-500 mb-4">Distribution across all vaccines in VAERS</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
            <Tooltip formatter={(value: any) => [Number(value).toLocaleString(), view.charAt(0).toUpperCase() + view.slice(1)]} />
            <Bar dataKey={metricKey} fill={metricColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Rate Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-1">Severity Rates by Age Group</h2>
        <p className="text-sm text-gray-500 mb-4">Death and hospitalization rates as percentage of reports</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Age Group</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Reports</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Deaths</th>
                <th className="px-4 py-3 text-right font-medium text-danger">Death Rate</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Hospitalizations</th>
                <th className="px-4 py-3 text-right font-medium text-accent">Hosp. Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chartData.map(row => (
                <tr key={row.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-right">{row.reports.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-danger font-medium">{row.deaths.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-danger">{row.deathRate}%</td>
                  <td className="px-4 py-3 text-right">{row.hospitalizations.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-accent">{row.hospRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-1">Gender Distribution</h2>
        <p className="text-sm text-gray-500 mb-4">Women report adverse events at nearly 2x the rate of men.</p>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label={({ name, pct }: any) => `${name} (${pct}%)`}
              >
                {genderData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={GENDER_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {genderData.map((g, i) => (
              <div key={g.name} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: GENDER_COLORS[i] }} />
                <span className="font-medium">{g.name}:</span>
                <span className="text-gray-600">{g.value.toLocaleString()} ({g.pct}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
