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

interface Symptom {
  name: string
  reports: number
  died: number
  hosp: number
}

const COLORS = ['#0d9488', '#0891b2', '#0e7490', '#14b8a6', '#22d3ee', '#2dd4bf', '#06b6d4', '#0f766e', '#155e75', '#115e59']

export default function TopSymptomsCharts({ symptoms }: { symptoms: Symptom[] }) {
  const chartData = symptoms.map(s => ({
    name: s.name.length > 18 ? s.name.substring(0, 18) + '...' : s.name,
    fullName: s.name,
    reports: s.reports,
    deaths: s.died,
    hospitalizations: s.hosp,
  }))

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 20 Most Reported Symptoms</h3>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)}
            />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#9ca3af" width={95} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              formatter={(value: number, name: string) => [value.toLocaleString(), name]}
              labelFormatter={(label: string, payload: Array<{ payload?: { fullName?: string } }>) => payload?.[0]?.payload?.fullName || label}
            />
            <Bar dataKey="reports" name="Reports" radius={[0, 4, 4, 0]} maxBarSize={24}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 text-center mt-2">
          Most top symptoms are expected immune responses like fever, headache, and pain.
        </p>
      </div>
    </div>
  )
}
