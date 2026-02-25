'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts'

interface VaccineData {
  name: string
  type: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
}

const COLORS = ['#0d9488', '#0891b2', '#f59e0b']

export default function CompareBarChart({ vaccines }: { vaccines: VaccineData[] }) {
  const metrics = [
    { key: 'reports', label: 'Total Reports' },
    { key: 'died', label: 'Deaths' },
    { key: 'hosp', label: 'Hospitalizations' },
    { key: 'er', label: 'ER Visits' },
    { key: 'disabled', label: 'Disabilities' },
  ]

  const chartData = metrics.map(m => {
    const point: Record<string, string | number> = { metric: m.label }
    vaccines.forEach(v => {
      point[v.type] = v[m.key as keyof VaccineData] as number
    })
    return point
  })

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="metric" tick={{ fontSize: 11 }} stroke="#9ca3af" />
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
          <Bar key={v.type} dataKey={v.type} name={v.type} fill={COLORS[i]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
