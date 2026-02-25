'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts'

interface YearlyData {
  year: number
  reports: number
  died: number
  hospitalized: number
  er: number
}

export default function ReportingTrendsCharts({ yearlyStats }: { yearlyStats: YearlyData[] }) {
  const chartData = yearlyStats.map(y => ({
    year: y.year,
    reports: y.reports,
    deaths: y.died,
  }))

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Annual VAERS Reports (1990-2026)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="gradReports" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" interval={3} />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              tickFormatter={(v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              formatter={(value: number, name: string) => [value.toLocaleString(), name === 'reports' ? 'Reports' : 'Deaths']}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <ReferenceLine x={2020} stroke="#dc2626" strokeDasharray="5 5" label={{ value: 'COVID', position: 'top', fill: '#dc2626', fontSize: 11 }} />
            <Area
              type="monotone"
              dataKey="reports"
              name="Reports"
              stroke="#0d9488"
              strokeWidth={2}
              fill="url(#gradReports)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 text-center mt-2">
          The red dashed line marks the start of the COVID-19 era. Note the dramatic spike and subsequent decline.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Death Reports Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="gradDeathsTrend" x1="0" y1="0" x2="0" y2="1">
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
            <Legend />
            <Area
              type="monotone"
              dataKey="deaths"
              name="Death Reports"
              stroke="#dc2626"
              strokeWidth={2}
              fill="url(#gradDeathsTrend)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
