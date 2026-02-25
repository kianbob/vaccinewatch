'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatNumber } from '@/lib/utils'

interface YearlyData {
  year: number
  reports: number
  died: number
  hospitalized: number
  er: number
  disabled: number
  lifeThreatening: number
}

interface YearlyTrendChartProps {
  data: YearlyData[]
}

export default function YearlyTrendChart({ data }: YearlyTrendChartProps) {
  const formatTooltip = (value: number, name: string) => {
    const names: { [key: string]: string } = {
      reports: 'Total Reports',
      died: 'Deaths',
      hospitalized: 'Hospitalizations',
      er: 'ER Visits',
      disabled: 'Disabilities',
      lifeThreatening: 'Life-threatening'
    }
    return [formatNumber(value), names[name] || name]
  }

  const formatXAxisTick = (tickItem: number) => {
    // Show every 5th year for cleaner display
    return tickItem % 5 === 0 ? tickItem.toString() : ''
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          VAERS Reports Over Time (1990-2026)
        </h3>
        <p className="text-sm text-gray-600">
          Note the dramatic spike in 2021 with COVID-19 vaccine introduction. 
          Hover over the chart to see detailed yearly breakdowns.
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            tickFormatter={formatXAxisTick}
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
          <Area 
            type="monotone" 
            dataKey="reports" 
            stackId="1"
            stroke="var(--color-primary, #0d9488)" 
            fill="var(--color-primary, #0d9488)"
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="died" 
            stackId="2"
            stroke="var(--color-danger, #dc2626)" 
            fill="var(--color-danger, #dc2626)"
            fillOpacity={0.8}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-primary rounded mr-2"></div>
          <span className="text-gray-600">Total Reports</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-danger rounded mr-2"></div>
          <span className="text-gray-600">Deaths (overlaid)</span>
        </div>
      </div>
    </div>
  )
}