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
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface AgeGroup {
  group: string
  reports: number
  died: number
  hospitalized: number
}

const COLORS = ['#0d9488', '#0891b2', '#14b8a6', '#0e7490', '#22d3ee', '#94a3b8']

export default function AgeCharts({ ageGroups }: { ageGroups: AgeGroup[] }) {
  const knownGroups = ageGroups.filter(g => g.group !== 'Unknown')

  const barData = knownGroups.map(g => ({
    name: g.group,
    Reports: g.reports,
    Deaths: g.died,
    Hospitalizations: g.hospitalized,
  }))

  const pieData = knownGroups.map(g => ({
    name: g.group,
    value: g.died,
  }))

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports by Age Group</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={barData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)}
            />
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend />
            <Bar dataKey="Reports" fill="#0d9488" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Hospitalizations" fill="#0891b2" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Deaths" fill="#dc2626" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Death Reports by Age Group</h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              innerRadius={50}
              paddingAngle={2}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 text-center mt-2">
          The 65+ age group dominates death reports, reflecting higher baseline mortality rates in the elderly.
        </p>
      </div>
    </div>
  )
}
