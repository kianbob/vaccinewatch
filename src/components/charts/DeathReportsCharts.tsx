'use client'

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface YearlyData {
  year: number
  reports: number
  died: number
}

interface AgeGroup {
  group: string
  reports: number
  died: number
  hospitalized: number
}

export default function DeathReportsCharts({ yearlyStats, ageGroups }: { yearlyStats: YearlyData[]; ageGroups: AgeGroup[] }) {
  const yearlyData = yearlyStats.map(y => ({
    year: y.year,
    deaths: y.died,
  }))

  const ageData = ageGroups
    .filter(g => g.group !== 'Unknown')
    .map(g => ({
      name: g.group,
      deaths: g.died,
      rate: parseFloat(((g.died / g.reports) * 100).toFixed(1)),
    }))

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Death Reports by Year</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={yearlyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="gradDeathsRpt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" interval={3} />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              formatter={(value: number) => [value.toLocaleString(), 'Death Reports']}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Area type="monotone" dataKey="deaths" stroke="#dc2626" strokeWidth={2} fill="url(#gradDeathsRpt)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Death Reports by Age Group</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={ageData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              formatter={(value: number, name: string) => [value.toLocaleString(), name === 'deaths' ? 'Death Reports' : 'Rate']}
            />
            <Bar dataKey="deaths" name="Death Reports" radius={[4, 4, 0, 0]}>
              {ageData.map((entry, i) => (
                <Cell key={i} fill={entry.name === '65+' ? '#dc2626' : i === ageData.length - 1 ? '#94a3b8' : '#0d9488'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 text-center mt-2">
          The 65+ bar is highlighted in red because it dominates death reports, mirroring natural mortality patterns.
        </p>
      </div>
    </div>
  )
}
