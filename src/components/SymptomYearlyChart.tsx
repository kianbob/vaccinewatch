'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SymptomYearData {
  year: number
  count: number
  died: number
  hosp: number
}

export default function SymptomYearlyChart({ data, symptomName }: { data: SymptomYearData[]; symptomName: string }) {
  if (!data || data.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {symptomName} Reports by Year
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString()} />
          <Tooltip
            formatter={(value: number) => [value.toLocaleString(), '']}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Bar dataKey="count" fill="#2563eb" name="Reports" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
