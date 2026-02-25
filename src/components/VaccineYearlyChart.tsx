'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatNumber } from '@/lib/utils'

interface YearlyData {
  year: number
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
}

interface VaccineYearlyChartProps {
  data: YearlyData[]
  vaccineName: string
}

export default function VaccineYearlyChart({ data, vaccineName }: VaccineYearlyChartProps) {
  // Filter out years with zero reports to clean up the chart
  const filteredData = data.filter(d => d.reports > 0)

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
    <div className="bg-white p-6 rounded-lg shadow-sm border">
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
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            tickFormatter={(value) => value >= 1000 ? `${Math.round(value/1000)}K` : value.toString()}
            stroke="#666"
            fontSize={12}
          />
          <Tooltip 
            formatter={formatTooltip}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="reports" 
            stroke="var(--color-primary, #0d9488)" 
            strokeWidth={3}
            name="Total Reports"
            dot={{ fill: 'var(--color-primary, #0d9488)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="died" 
            stroke="var(--color-danger, #dc2626)" 
            strokeWidth={2}
            name="Deaths"
            strokeDasharray="5 5"
            dot={{ fill: 'var(--color-danger, #dc2626)', strokeWidth: 2, r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="hosp" 
            stroke="var(--color-accent, #0891b2)" 
            strokeWidth={2}
            name="Hospitalizations"
            dot={{ fill: 'var(--color-accent, #0891b2)', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}