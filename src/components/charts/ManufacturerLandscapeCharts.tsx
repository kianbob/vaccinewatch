'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#2563eb', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

export default function ManufacturerLandscapeCharts({ topManufacturers, marketShare }: { topManufacturers: any[]; marketShare: any[] }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Manufacturers by Report Volume</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topManufacturers.slice(0, 10)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => v.toLocaleString()} />
            <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [v.toLocaleString(), '']} />
            <Bar dataKey="reports" fill="#2563eb" name="Reports" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {marketShare.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Share by Reports</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={marketShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {marketShare.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Reports']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
