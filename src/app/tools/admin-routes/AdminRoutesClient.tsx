'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'

const BarChart = dynamic(() => import('recharts').then(m => m.BarChart) as any, { ssr: false }) as any
const Bar = dynamic(() => import('recharts').then(m => m.Bar) as any, { ssr: false }) as any
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis) as any, { ssr: false }) as any
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis) as any, { ssr: false }) as any
const CartesianGrid = dynamic(() => import('recharts').then(m => m.CartesianGrid) as any, { ssr: false }) as any
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip) as any, { ssr: false }) as any
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer) as any, { ssr: false }) as any
const PieChart = dynamic(() => import('recharts').then(m => m.PieChart) as any, { ssr: false }) as any
const Pie = dynamic(() => import('recharts').then(m => m.Pie) as any, { ssr: false }) as any
const Cell = dynamic(() => import('recharts').then(m => m.Cell) as any, { ssr: false }) as any

const ADMIN_LABELS: Record<string, string> = {
  PVT: 'Private Doctor/Office',
  PUB: 'Public Health Clinic',
  MIL: 'Military',
  OTH: 'Other/Unknown',
  PHM: 'Pharmacy',
  WRK: 'Workplace',
  SCH: 'School',
  SEN: 'Senior Care/Nursing'
}

const ROUTE_LABELS: Record<string, string> = {
  IM: 'Intramuscular (injection)',
  PO: 'Oral',
  SC: 'Subcutaneous',
  ID: 'Intradermal',
  SYR: 'Syringe (unspecified)',
  IN: 'Intranasal',
  OT: 'Other'
}

const COLORS = ['#0d9488', '#0891b2', '#059669', '#0284c7', '#7c3aed', '#d97706', '#dc2626', '#94a3b8']

interface AdminData {
  adminBy: Record<string, number>
  vaxRoute: Record<string, number>
}

export default function AdminRoutesClient() {
  const [data, setData] = useState<AdminData | null>(null)
  const [view, setView] = useState<'admin' | 'route'>('admin')

  useEffect(() => {
    fetch('/data/admin-context.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const adminData = useMemo(() => {
    if (!data) return []
    const total = Object.values(data.adminBy).reduce((a, b) => a + b, 0)
    return Object.entries(data.adminBy)
      .map(([key, value]) => ({
        name: ADMIN_LABELS[key] || key,
        code: key,
        value,
        pct: ((value / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value)
  }, [data])

  const routeData = useMemo(() => {
    if (!data) return []
    const total = Object.values(data.vaxRoute).reduce((a, b) => a + b, 0)
    return Object.entries(data.vaxRoute)
      .map(([key, value]) => ({
        name: ROUTE_LABELS[key] || key,
        code: key,
        value,
        pct: ((value / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value)
  }, [data])

  if (!data) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const currentData = view === 'admin' ? adminData : routeData
  const total = currentData.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="space-y-8">
      {/* Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('admin')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            view === 'admin' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🏥 Who Administers
        </button>
        <button
          onClick={() => setView('route')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            view === 'route' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          💉 How It&apos;s Given
        </button>
      </div>

      {/* Charts side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-4">
            {view === 'admin' ? 'Administration Setting' : 'Route of Administration'}
          </h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={currentData} layout="vertical" margin={{ left: 140 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
                <Tooltip
                  formatter={(value: any) => [Number(value).toLocaleString(), 'Reports']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="value" fill="#0d9488" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-4">Distribution</h2>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={currentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  dataKey="value"
                  label={({ name, pct }: any) => `${name.split(' ')[0]} (${pct}%)`}
                  labelLine={{ strokeWidth: 1 }}
                >
                  {currentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold mb-4">Detailed Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  {view === 'admin' ? 'Setting' : 'Route'}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Code</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Reports</th>
                <th className="px-4 py-3 text-right font-medium text-primary">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((row, i) => (
                <tr key={row.code} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.code}</td>
                  <td className="px-4 py-3 text-right">{row.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-primary font-medium">{row.pct}%</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="px-4 py-3" colSpan={2}>Total</td>
                <td className="px-4 py-3 text-right">{total.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-primary">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold mb-3">Key Insights</h2>
        {view === 'admin' ? (
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <strong>Private doctors/offices</strong> account for the largest identifiable share of vaccine administration, followed by pharmacies.</li>
            <li>• <strong>Pharmacies</strong> became major vaccination sites during COVID-19 — their share is heavily influenced by pandemic-era reporting.</li>
            <li>• <strong>&quot;Other/Unknown&quot;</strong> is a large category because many VAERS reports don&apos;t specify the administration setting.</li>
            <li>• <strong>Military</strong> has its own reporting pathway, reflecting mandatory vaccination programs.</li>
            <li>• <strong>School-based</strong> vaccination programs generate relatively few VAERS reports despite vaccinating millions of children.</li>
          </ul>
        ) : (
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <strong>Intramuscular injection (IM)</strong> dominates because most vaccines — including COVID-19, flu, and childhood vaccines — are given this way.</li>
            <li>• <strong>Subcutaneous (SC)</strong> is used for vaccines like MMR and varicella.</li>
            <li>• <strong>Oral (PO)</strong> includes rotavirus vaccine, the primary oral vaccine in the U.S.</li>
            <li>• <strong>Intranasal (IN)</strong> represents FluMist, the nasal spray flu vaccine.</li>
            <li>• <strong>&quot;Syringe&quot; (SYR)</strong> is a generic classification when the specific injection method wasn&apos;t recorded.</li>
          </ul>
        )}
      </div>
    </div>
  )
}
