'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface VaccineData {
  name: string
  type: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
  yearly: { year: number; count: number }[]
}

const COLORS = ['#0d9488', '#0891b2', '#f59e0b']

export default function CompareCharts({ vaccines }: { vaccines: VaccineData[] }) {
  // Merge yearly data into a single array keyed by year
  const yearSet = new Set<number>()
  vaccines.forEach(v => v.yearly.forEach(y => yearSet.add(y.year)))

  const years = Array.from(yearSet).sort((a, b) => a - b)

  const chartData = years.map(year => {
    const point: Record<string, number> = { year }
    vaccines.forEach(v => {
      const match = v.yearly.find(y => y.year === year)
      point[v.type] = match ? match.count : 0
    })
    return point
  })

  // Filter to years where at least one vaccine has data
  const filteredData = chartData.filter(d =>
    vaccines.some(v => (d[v.type] || 0) > 0)
  )

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#9ca3af"
          tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)}
        />
        <Tooltip
          contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
          formatter={(value: number, name: string) => [value.toLocaleString(), name]}
        />
        <Legend />
        {vaccines.map((v, i) => (
          <Line
            key={v.type}
            type="monotone"
            dataKey={v.type}
            name={v.type}
            stroke={COLORS[i]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
