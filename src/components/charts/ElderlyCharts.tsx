'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#2563eb', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6', '#ec4899']

export default function ElderlyCharts({ ageComparison, outcomeData }: { ageComparison: any[]; outcomeData: any[] }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports by Age Group: Elderly vs Others</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis tickFormatter={(v) => v.toLocaleString()} />
            <Tooltip formatter={(v: number) => [v.toLocaleString(), '']} />
            <Bar dataKey="reports" fill="#2563eb" name="Reports" radius={[4, 4, 0, 0]} />
            <Bar dataKey="died" fill="#ef4444" name="Deaths" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {outcomeData.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Outcome Severity: 65+ vs All Ages</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={outcomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`, '']} />
              <Bar dataKey="elderly" fill="#ef4444" name="65+" radius={[4, 4, 0, 0]} />
              <Bar dataKey="allAges" fill="#2563eb" name="All Ages" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
