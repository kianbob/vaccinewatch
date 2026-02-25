'use client'

import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface OnsetData {
  byVaccine: { [vaccine: string]: { [day: string]: number } }
}

const COLORS = {
  primary: '#0d9488',
  accent: '#0891b2',
  danger: '#dc2626'
}

function formatNumber(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toString()
}

export default function OnsetCalculatorClient() {
  const [onsetData, setOnsetData] = useState<OnsetData | null>(null)
  const [selectedVaccine, setSelectedVaccine] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/onset-timing.json')
      .then(res => res.json())
      .then((data: OnsetData) => {
        setOnsetData(data)
        // Set default vaccine to first one with data
        const vaccines = Object.keys(data.byVaccine)
        if (vaccines.length > 0) {
          setSelectedVaccine(vaccines[0])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading onset data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="h-96 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading onset timing data...</span>
      </div>
    )
  }

  if (!onsetData) {
    return (
      <div className="h-96 bg-red-50 rounded-lg flex items-center justify-center">
        <span className="text-red-600">Error loading onset timing data</span>
      </div>
    )
  }

  const vaccines = Object.keys(onsetData.byVaccine).sort()
  const selectedData = selectedVaccine ? onsetData.byVaccine[selectedVaccine] : {}

  // Prepare chart data
  const chartData = Object.entries(selectedData).map(([day, count]) => ({
    day: day === '0' ? 'Same day' : day === '1' ? 'Day 1' : day === '2' ? 'Day 2' : day === '3' ? 'Day 3' : 
         day.includes('-') ? `Days ${day}` : `Day ${day}`,
    count,
    dayKey: day
  })).sort((a, b) => {
    const order = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15-30', '31-90', '91-180', '181-365']
    return order.indexOf(a.dayKey) - order.indexOf(b.dayKey)
  })

  // Calculate statistics
  const totalReports = Object.values(selectedData).reduce((sum: number, count: any) => sum + count, 0)
  const within3Days = (selectedData['0'] || 0) + (selectedData['1'] || 0) + (selectedData['2'] || 0) + (selectedData['3'] || 0)
  const within3DaysPercent = totalReports > 0 ? ((within3Days / totalReports) * 100).toFixed(1) : '0'

  return (
    <div className="space-y-6">
      {/* Vaccine Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Vaccine Type
        </label>
        <select
          value={selectedVaccine}
          onChange={(e) => setSelectedVaccine(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          {vaccines.map(vaccine => (
            <option key={vaccine} value={vaccine}>
              {vaccine}
            </option>
          ))}
        </select>
      </div>

      {/* Key Statistics */}
      {totalReports > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{formatNumber(totalReports)}</div>
            <div className="text-sm text-gray-600">Total Reports with Timing Data</div>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">{within3DaysPercent}%</div>
            <div className="text-sm text-gray-600">Reports Within 3 Days</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-700">{formatNumber(within3Days)}</div>
            <div className="text-sm text-gray-600">Reports in First 3 Days</div>
          </div>
        </div>
      )}

      {/* Chart */}
      {chartData.length > 0 ? (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Onset Timing for {selectedVaccine}
          </h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="day" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  fontSize={12}
                />
                <YAxis tickFormatter={formatNumber} />
                <Tooltip 
                  formatter={(value: number) => [formatNumber(value), 'Reports']}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar dataKey="count" fill={COLORS.primary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No timing data available for {selectedVaccine}</span>
        </div>
      )}

      {/* Interpretation */}
      {totalReports > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2">What This Means</h4>
          <p className="text-sm text-blue-700">
            For <strong>{selectedVaccine}</strong> vaccines, {within3DaysPercent}% of adverse events with known timing 
            are reported within 3 days of vaccination. This pattern is consistent with expected immune responses, 
            where most side effects occur as the immune system recognizes and responds to the vaccine.
          </p>
        </div>
      )}
    </div>
  )
}