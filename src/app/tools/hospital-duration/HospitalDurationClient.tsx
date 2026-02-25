'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { formatNumber } from '@/lib/utils'

type DurationData = Record<string, Record<string, number>>

const DURATION_ORDER = ['1', '2', '3', '4', '5', '6', '7', '8-14', '15-30', '31+']
const DURATION_LABELS: Record<string, string> = {
  '1': '1 day', '2': '2 days', '3': '3 days', '4': '4 days',
  '5': '5 days', '6': '6 days', '7': '7 days',
  '8-14': '8-14 days', '15-30': '15-30 days', '31+': '31+ days'
}

export default function HospitalDurationClient() {
  const [data, setData] = useState<DurationData>({})
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<string>('ALL')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/data/hospital-duration.json')
      .then(r => r.json())
      .then((d: DurationData) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Get aggregated data for selected vaccine (or all)
  const durationChart = useMemo(() => {
    const counts: Record<string, number> = {}
    DURATION_ORDER.forEach(d => { counts[d] = 0 })

    if (selected === 'ALL') {
      Object.values(data).forEach(vaccine => {
        Object.entries(vaccine).forEach(([dur, count]) => {
          counts[dur] = (counts[dur] || 0) + count
        })
      })
    } else if (data[selected]) {
      Object.entries(data[selected]).forEach(([dur, count]) => {
        counts[dur] = (counts[dur] || 0) + count
      })
    }

    return DURATION_ORDER.map(d => ({
      duration: DURATION_LABELS[d] || d,
      count: counts[d] || 0,
    }))
  }, [data, selected])

  const totalHosp = useMemo(() => durationChart.reduce((s, d) => s + d.count, 0), [durationChart])
  const shortStays = useMemo(() => {
    const first3 = durationChart.slice(0, 3)
    return first3.reduce((s, d) => s + d.count, 0)
  }, [durationChart])
  const shortPercent = totalHosp > 0 ? ((shortStays / totalHosp) * 100).toFixed(1) : '0'

  // Vaccine list sorted by total hospitalizations
  const vaccineList = useMemo(() => {
    return Object.entries(data).map(([vaccine, durations]) => {
      const total = Object.values(durations).reduce((s, c) => s + c, 0)
      const short = (durations['1'] || 0) + (durations['2'] || 0) + (durations['3'] || 0)
      return { vaccine, total, shortPercent: total > 0 ? (short / total) * 100 : 0 }
    })
      .filter(v => v.total > 0)
      .filter(v => !search || v.vaccine.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.total - a.total)
  }, [data, search])

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading hospital duration data...</div>
  }

  return (
    <div className="space-y-8">
      {/* Key stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{formatNumber(totalHosp)}</div>
          <div className="text-sm text-gray-600 mt-1">Hospitalizations{selected !== 'ALL' ? ` (${selected})` : ''}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-green-600">{shortPercent}%</div>
          <div className="text-sm text-gray-600 mt-1">Stay ≤ 3 days</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{Object.keys(data).length}</div>
          <div className="text-sm text-gray-600 mt-1">Vaccines with data</div>
        </div>
      </div>

      {/* Vaccine selector */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          <option value="ALL">All Vaccines Combined</option>
          {vaccineList.map(v => (
            <option key={v.vaccine} value={v.vaccine}>
              {v.vaccine} ({formatNumber(v.total)} hospitalizations)
            </option>
          ))}
        </select>
      </div>

      {/* Duration bar chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          Hospitalization Duration{selected !== 'ALL' ? `: ${selected}` : ''}
        </h2>
        <p className="text-sm text-gray-500 mb-4">Number of hospitalizations by length of stay</p>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={durationChart} margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
              <XAxis dataKey="duration" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip formatter={(value: number) => formatNumber(value)} />
              <Bar dataKey="count" fill="#0d9488" radius={[4, 4, 0, 0]} name="Hospitalizations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-5 pb-3">
          <h2 className="text-lg font-bold text-gray-900">Vaccines by Hospital Duration</h2>
          <p className="text-sm text-gray-500">Click a vaccine to see its duration breakdown</p>
        </div>
        <div className="px-5 pb-3">
          <input
            type="text"
            placeholder="Search vaccines..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Vaccine</th>
                <th className="text-right px-4 py-2.5 font-semibold text-gray-700">Hospitalizations</th>
                <th className="text-right px-4 py-2.5 font-semibold text-green-700">≤3 days</th>
              </tr>
            </thead>
            <tbody>
              {vaccineList.map((row, i) => (
                <tr
                  key={row.vaccine}
                  className={`cursor-pointer hover:bg-primary/5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} ${selected === row.vaccine ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelected(selected === row.vaccine ? 'ALL' : row.vaccine)}
                >
                  <td className="px-4 py-2 font-medium text-primary">{row.vaccine}</td>
                  <td className="px-4 py-2 text-right text-gray-700">{formatNumber(row.total)}</td>
                  <td className="px-4 py-2 text-right text-green-700">{row.shortPercent.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Context */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-2">📋 Understanding Hospital Duration Data</h3>
        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>• <strong>1-day stays</strong> are often overnight observation, not treatment for serious conditions</li>
          <li>• <strong>Short stays (≤3 days)</strong> typically indicate allergic reactions, fainting, or precautionary monitoring</li>
          <li>• <strong>Extended stays (31+ days)</strong> may involve pre-existing conditions or coincidental illness</li>
          <li>• Average U.S. hospital stay is ~4.5 days — vaccine-related stays tend to be shorter</li>
          <li>• Not all VAERS reports include precise duration information</li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/analysis/hospital-stays" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Hospital Stays Analysis</div>
            <div className="text-sm text-gray-500">In-depth article on hospitalization patterns</div>
          </a>
          <a href="/tools/recovery-explorer" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Recovery Explorer</div>
            <div className="text-sm text-gray-500">Do side effects go away?</div>
          </a>
        </div>
      </div>
    </div>
  )
}
