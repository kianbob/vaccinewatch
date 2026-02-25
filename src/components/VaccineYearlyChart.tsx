'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatNumber } from '@/lib/utils'

interface YearlyData {
  year: number
  count?: number
  reports?: number
  died?: number
  hosp?: number
  er?: number
  disabled?: number
}

interface VaccineYearlyChartProps {
  data: YearlyData[]
  vaccineName: string
}

export default function VaccineYearlyChart({ data, vaccineName }: VaccineYearlyChartProps) {
  // Normalize: some data uses 'count', some uses 'reports'
  const normalized = data.map(d => ({
    ...d,
    reports: d.reports ?? d.count ?? 0,
  }))
  const filteredData = normalized.filter(d => d.reports > 0)
  const hasDetailedData = normalized.some(d => d.died != null)

  const formatTooltip = (value: number, name: string) => {
    const names: { [key: string]: string } = {
      reports: 'Total Reports',
      died: 'Deaths',
      hosp: 'Hospitalizations', 
      er: 'ER Visits',
      disabled: 'Disabilities'
    }
    return [formatNumber(value), names[name] || name]
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {vaccineName} Reports by Year
        </h3>
        <p className="text-sm text-gray-600">
          Yearly breakdown of VAERS reports for {vaccineName}. 
          Hover over lines to see detailed yearly data.
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(value >= 10000 ? 0 : 1)}K` : value.toLocaleString()}
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={formatTooltip}
            labelFormatter={(label) => `Year ${label}`}
            labelStyle={{ color: '#0f172a', fontWeight: 'bold', marginBottom: 4 }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              padding: '12px 16px',
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: 16 }}
          />
          <Line
            type="monotone"
            dataKey="reports"
            stroke="#0d9488"
            strokeWidth={3}
            name="Total Reports"
            dot={{ fill: '#0d9488', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          {hasDetailedData && (
            <Line
              type="monotone"
              dataKey="died"
              stroke="#dc2626"
              strokeWidth={2}
              name="Deaths"
              strokeDasharray="5 5"
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          )}
          {hasDetailedData && (
            <Line
              type="monotone"
              dataKey="hosp"
              stroke="#0891b2"
              strokeWidth={2}
              name="Hospitalizations"
              dot={{ fill: '#0891b2', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}