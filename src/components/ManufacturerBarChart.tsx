'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface ManufacturerData {
  name: string
  reports: number
  died: number
  hosp: number
}

const COLORS = ['#0d9488', '#0891b2', '#0e7490', '#14b8a6', '#22d3ee', '#2dd4bf', '#06b6d4', '#0f766e', '#155e75', '#115e59']

function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
  return String(value)
}

export default function ManufacturerBarChart({ data }: { data: ManufacturerData[] }) {
  const chartData = data.map(d => ({
    name: d.name.length > 20 ? d.name.substring(0, 20) + '...' : d.name,
    fullName: d.name,
    reports: d.reports,
  }))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 10 Manufacturers by Reports</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={formatYAxis} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#9ca3af" width={95} />
          <Tooltip
            formatter={(value: number) => [value.toLocaleString(), 'Reports']}
            labelFormatter={(label: string, payload: Array<{ payload?: { fullName?: string } }>) => payload?.[0]?.payload?.fullName || label}
            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px 16px' }}
          />
          <Bar dataKey="reports" radius={[0, 4, 4, 0]} maxBarSize={28}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
