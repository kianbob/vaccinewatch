'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#ef4444', '#f59e0b', '#2563eb', '#10b981', '#8b5cf6']

export default function SeriousOutcomesCharts({ outcomeBreakdown, topVaccinesBySeverity }: { outcomeBreakdown: any[]; topVaccinesBySeverity: any[] }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Outcome Types Across All Reports</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={outcomeBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}>
              {outcomeBreakdown.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => [v.toLocaleString(), '']} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {topVaccinesBySeverity.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vaccines by Serious Outcome Rate</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topVaccinesBySeverity.slice(0, 12)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`, '']} />
              <Bar dataKey="rate" fill="#ef4444" name="Serious %" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
