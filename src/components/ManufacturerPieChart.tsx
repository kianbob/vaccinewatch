'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface ManufacturerData {
  name: string
  reports: number
  died: number
  hosp: number
}

const COLORS = ['#0d9488', '#0891b2', '#0e7490', '#14b8a6', '#22d3ee', '#2dd4bf', '#06b6d4', '#0f766e']

export default function ManufacturerPieChart({ data }: { data: ManufacturerData[] }) {
  const totalReports = data.reduce((sum, d) => sum + d.reports, 0)
  const chartData = data.map(d => ({
    name: d.name.length > 25 ? d.name.substring(0, 25) + '...' : d.name,
    value: d.reports,
    share: ((d.reports / totalReports) * 100).toFixed(1),
  }))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Share by Reports</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={55}
            paddingAngle={2}
            label={({ name, share }) => `${name} (${share}%)`}
            labelLine={{ strokeWidth: 1 }}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 text-center mt-2">
        Market share calculated as percentage of total VAERS reports attributed to each manufacturer.
      </p>
    </div>
  )
}
