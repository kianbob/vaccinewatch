'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

const ADMIN_LABELS: Record<string, string> = {
  PVT: 'Private Doctor/Office',
  PUB: 'Public Health Clinic',
  MIL: 'Military',
  OTH: 'Other/Unknown',
  PHM: 'Pharmacy',
  WRK: 'Workplace',
  SCH: 'School',
  SEN: 'Senior Care/Nursing',
}

const ROUTE_LABELS: Record<string, string> = {
  IM: 'Intramuscular',
  PO: 'Oral',
  SC: 'Subcutaneous',
  ID: 'Intradermal',
  SYR: 'Syringe (unspecified)',
  IN: 'Intranasal',
  OT: 'Other/Unknown',
}

const COLORS = ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#155e75', '#164e63', '#083344']

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
    return Object.entries(data.adminBy)
      .map(([code, count]) => ({ code, name: ADMIN_LABELS[code] || code, count }))
      .sort((a, b) => b.count - a.count)
  }, [data])

  const routeData = useMemo(() => {
    if (!data) return []
    return Object.entries(data.vaxRoute)
      .map(([code, count]) => ({ code, name: ROUTE_LABELS[code] || code, count }))
      .sort((a, b) => b.count - a.count)
  }, [data])

  const adminTotal = useMemo(() => adminData.reduce((s, d) => s + d.count, 0), [adminData])
  const routeTotal = useMemo(() => routeData.reduce((s, d) => s + d.count, 0), [routeData])

  if (!data) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const activeData = view === 'admin' ? adminData : routeData
  const activeTotal = view === 'admin' ? adminTotal : routeTotal

  const pieData = activeData.map(d => ({
    name: d.name,
    value: d.count,
    pct: ((d.count / activeTotal) * 100).toFixed(1),
  }))

  const barData = activeData.map(d => ({
    name: d.name,
    count: d.count,
    pct: ((d.count / activeTotal) * 100).toFixed(1),
  }))

  return (
    <div className="space-y-8">
      {/* Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('admin')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            view === 'admin' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Who Administers
        </button>
        <button
          onClick={() => setView('route')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            view === 'route' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Administration Routes
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {view === 'admin' ? 'Who Administers Vaccines' : 'How Vaccines Are Given'}
          </h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, pct }: any) => `${name.length > 15 ? name.slice(0, 15) + '…' : name} (${pct}%)`}
                  labelLine={{ strokeWidth: 1 }}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => value.toLocaleString()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Report Count by Category</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
                <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: any) => value.toLocaleString()} />
                <Bar dataKey="count" fill="#0891b2" name="Reports" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Detailed Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-gray-700">Code</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-700">Description</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-700">Reports</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-700">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeData.map(d => (
                <tr key={d.code} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono text-gray-600">{d.code}</td>
                  <td className="px-3 py-2 font-medium text-gray-900">{d.name}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{d.count.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{((d.count / activeTotal) * 100).toFixed(1)}%</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="px-3 py-2" colSpan={2}>Total</td>
                <td className="px-3 py-2 text-right">{activeTotal.toLocaleString()}</td>
                <td className="px-3 py-2 text-right">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Context */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-3">What This Tells Us About Reporting</h3>
        <div className="text-sm text-blue-800 space-y-2">
          {view === 'admin' ? (
            <>
              <p>The &ldquo;who administers&rdquo; field reveals important patterns about VAERS reporting:</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Private doctors</strong> account for a significant share — these are routine visits where reporting is integrated</li>
                <li>• <strong>Pharmacies</strong> became major reporters during COVID-19 as they administered millions of doses</li>
                <li>• <strong>&ldquo;Other/Unknown&rdquo;</strong> is the largest category, reflecting how often this field goes unfilled</li>
                <li>• <strong>Military</strong> reports reflect mandatory vaccination programs and structured reporting</li>
                <li>• <strong>School &amp; workplace</strong> programs have low numbers — many events may be reported by the patient&apos;s doctor instead</li>
              </ul>
            </>
          ) : (
            <>
              <p>How vaccines are given affects both the type and reporting of adverse events:</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Intramuscular (IM)</strong> dominates because most modern vaccines use this route</li>
                <li>• <strong>Subcutaneous (SC)</strong> is used for vaccines like MMR and varicella</li>
                <li>• <strong>Oral (PO)</strong> includes rotavirus and older oral polio vaccines</li>
                <li>• <strong>Intranasal (IN)</strong> is primarily FluMist nasal spray flu vaccine</li>
                <li>• <strong>Syringe (SYR)</strong> means a needle injection where the specific route wasn&apos;t recorded</li>
                <li>• <strong>Intradermal (ID)</strong> is rare — some flu vaccines and TB tests use this route</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
