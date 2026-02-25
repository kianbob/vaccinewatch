'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatNumber } from '@/lib/utils'

interface VaccineData {
  type: string
  count: number
}

interface SymptomVaccinesChartProps {
  data: VaccineData[]
  symptomName: string
}

export default function SymptomVaccinesChart({ data, symptomName }: SymptomVaccinesChartProps) {
  // Show top 15 vaccines to keep chart readable
  const chartData = data
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
    .map(item => ({
      ...item,
      // Truncate long vaccine names for better display
      displayName: item.type.length > 25 ? item.type.substring(0, 22) + '...' : item.type
    }))

  const formatTooltip = (value: number, name: string, props: any) => {
    return [formatNumber(value), `Reports with ${symptomName}`]
  }

  const formatXAxisTick = (tickItem: string) => {
    // Rotate text for better readability
    return tickItem
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Vaccines Most Associated with {symptomName}
        </h3>
        <p className="text-sm text-gray-600">
          Top vaccines mentioned in reports containing {symptomName}. 
          Higher numbers may reflect vaccine usage patterns, not causation.
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="displayName" 
            stroke="#666"
            fontSize={11}
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis 
            tickFormatter={(value) => value >= 1000 ? `${Math.round(value/1000)}K` : value.toString()}
            stroke="#666"
            fontSize={12}
          />
          <Tooltip 
            formatter={formatTooltip}
            labelFormatter={(label) => {
              // Show full vaccine name in tooltip
              const fullData = data.find(d => d.type.startsWith(label.replace('...', '')))
              return fullData ? fullData.type : label
            }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="count" 
            fill="var(--color-primary, #0d9488)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>
          <strong>Note:</strong> This shows temporal association, not causation. 
          Vaccines with high usage (like COVID-19 vaccines) appear more frequently in all symptom categories.
        </p>
      </div>
    </div>
  )
}