'use client'

import { useState, useEffect } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

interface YearData {
  year: number
  reports: number
  died: number
  hospitalized: number
  er: number
  disabled: number
  lifeThreatening: number
}

type MetricKey = 'reports' | 'died' | 'hospitalized' | 'er' | 'disabled'
type ChartType = 'area' | 'bar'

const METRICS: { key: MetricKey; label: string; color: string }[] = [
  { key: 'reports', label: 'Total Reports', color: '#0d9488' },
  { key: 'died', label: 'Deaths', color: '#dc2626' },
  { key: 'hospitalized', label: 'Hospitalizations', color: '#0891b2' },
  { key: 'er', label: 'ER Visits', color: '#7c3aed' },
  { key: 'disabled', label: 'Disabilities', color: '#d97706' }
]

export default function TimelineClient() {
  const [data, setData] = useState<YearData[]>([])
  const [metric, setMetric] = useState<MetricKey>('reports')
  const [chartType, setChartType] = useState<ChartType>('area')
  const [range, setRange] = useState<[number, number]>([1990, 2026])

  useEffect(() => {
    fetch('/data/yearly-stats.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const filtered = data.filter(d => d.year >= range[0] && d.year <= range[1])
  const currentMetric = METRICS.find(m => m.key === metric)!
  const maxYear = Math.max(...data.map(d => d.year))
  const minYear = Math.min(...data.map(d => d.year))

  const fmtNum = (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Metric</label>
            <div className="flex flex-wrap gap-1">
              {METRICS.map(m => (
                <button
                  key={m.key}
                  onClick={() => setMetric(m.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    metric === m.key
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={metric === m.key ? { backgroundColor: m.color } : {}}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Chart Type</label>
            <div className="flex gap-1">
              <button
                onClick={() => setChartType('area')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${chartType === 'area' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                📈 Area
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${chartType === 'bar' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                📊 Bar
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 self-center">Quick ranges:</span>
          {[
            { label: 'All Time', range: [minYear, maxYear] as [number, number] },
            { label: 'Pre-COVID', range: [1990, 2019] as [number, number] },
            { label: 'COVID Era', range: [2020, maxYear] as [number, number] },
            { label: 'Last 10 Years', range: [maxYear - 10, maxYear] as [number, number] },
            { label: '2000s', range: [2000, 2009] as [number, number] },
            { label: '2010s', range: [2010, 2019] as [number, number] }
          ].map(preset => (
            <button
              key={preset.label}
              onClick={() => setRange(preset.range)}
              className={`px-2 py-1 rounded text-xs ${
                range[0] === preset.range[0] && range[1] === preset.range[1]
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-1">{currentMetric.label} Over Time</h2>
        <p className="text-sm text-gray-500 mb-4">{range[0]}–{range[1]} ({filtered.length} years)</p>
        <ResponsiveContainer width="100%" height={450}>
          {chartType === 'area' ? (
            <AreaChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={fmtNum} />
              <Tooltip
                formatter={(value: any) => [Number(value).toLocaleString(), currentMetric.label]}
                labelFormatter={(label: any) => `Year: ${label}`}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
              />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={currentMetric.color}
                fill={currentMetric.color}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <BarChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={fmtNum} />
              <Tooltip
                formatter={(value: any) => [Number(value).toLocaleString(), currentMetric.label]}
                labelFormatter={(label: any) => `Year: ${label}`}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey={metric} fill={currentMetric.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Year-by-Year Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4">Year-by-Year Data</h2>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Year</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Reports</th>
                <th className="px-4 py-3 text-right font-medium text-danger">Deaths</th>
                <th className="px-4 py-3 text-right font-medium text-accent">Hospitalizations</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">ER Visits</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Disabilities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...filtered].reverse().map(row => (
                <tr key={row.year} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{row.year}</td>
                  <td className="px-4 py-2 text-right">{row.reports.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-danger">{row.died.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-accent">{row.hospitalized.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{row.er.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{row.disabled.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
