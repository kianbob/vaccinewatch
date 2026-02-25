'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

interface GenderData {
  M: number
  F: number
  U: number
}

const COLORS = { F: '#0891b2', M: '#0d9488', U: '#94a3b8' }

export default function GenderCharts({ genderData }: { genderData: GenderData }) {
  const pieData = [
    { name: 'Female', value: genderData.F, color: COLORS.F },
    { name: 'Male', value: genderData.M, color: COLORS.M },
    { name: 'Unknown', value: genderData.U, color: COLORS.U },
  ]

  const barData = [
    { name: 'Female', reports: genderData.F },
    { name: 'Male', reports: genderData.M },
    { name: 'Unknown', reports: genderData.U },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Gender Distribution of VAERS Reports</h3>
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
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports by Gender</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 13 }} stroke="#9ca3af" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)}
            />
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Bar dataKey="reports" name="Reports" radius={[4, 4, 0, 0]}>
              <Cell fill={COLORS.F} />
              <Cell fill={COLORS.M} />
              <Cell fill={COLORS.U} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
