'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function GeographicCharts({ topStates, perCapitaStates }: { topStates: any[]; perCapitaStates: any[] }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top States by Total Reports</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topStates.slice(0, 15)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => v.toLocaleString()} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => [v.toLocaleString(), '']} />
            <Bar dataKey="reports" fill="#2563eb" name="Reports" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {perCapitaStates.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top States by Reports Per 100K Population</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={perCapitaStates.slice(0, 15)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), 'per 100K']} />
              <Bar dataKey="per100k" fill="#f59e0b" name="Per 100K" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
