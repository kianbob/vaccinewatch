'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface AdminEntry {
  type: string;
  count: number;
  percent: string;
  name: string;
}

interface RouteEntry {
  route: string;
  count: number;
  percent: string;
  name: string;
}

interface WhoReportsChartsProps {
  adminData: AdminEntry[];
  routeData: RouteEntry[];
}

const COLORS = {
  primary: '#0d9488',
  accent: '#0891b2',
  danger: '#dc2626',
  warning: '#f59e0b',
  success: '#10b981',
  info: '#3b82f6',
  gray: '#6b7280',
  purple: '#8b5cf6',
};

const PIE_COLORS = ['#0d9488', '#0891b2', '#3b82f6', '#f59e0b', '#dc2626', '#10b981', '#8b5cf6', '#6b7280'];

const ADMIN_LABELS: Record<string, string> = {
  PVT: 'Private Doctor/Office',
  PUB: 'Public Health Clinic',
  MIL: 'Military',
  OTH: 'Other/Unknown',
  PHM: 'Pharmacy',
  WRK: 'Workplace Clinic',
  SCH: 'School',
  SEN: 'Senior Living/Nursing',
};

const ROUTE_LABELS: Record<string, string> = {
  IM: 'Intramuscular',
  PO: 'Oral',
  SC: 'Subcutaneous',
  ID: 'Intradermal',
  SYR: 'Syringe (unspecified)',
  IN: 'Intranasal',
  OT: 'Other',
};

function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

export default function WhoReportsCharts({ adminData, routeData }: WhoReportsChartsProps) {
  const adminPieData = adminData.map((entry, i) => ({
    name: entry.name || ADMIN_LABELS[entry.type] || entry.type,
    value: entry.count,
    color: PIE_COLORS[i % PIE_COLORS.length],
  }));

  const routeBarData = routeData.map(entry => ({
    route: entry.name || ROUTE_LABELS[entry.route] || entry.route,
    count: entry.count,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Reports by Administration Setting</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={adminPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name.split('/')[0].split(' ')[0]}: ${((entry.value / adminPieData.reduce((s, e) => s + e.value, 0)) * 100).toFixed(1)}%`}
                outerRadius={120}
                dataKey="value"
              >
                {adminPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Administration setting indicates where the vaccine was given, which influences who files the report.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Vaccine Administration Routes</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={routeBarData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="route" angle={-45} textAnchor="end" height={100} fontSize={12} />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              <Bar dataKey="count" fill={COLORS.primary}>
                {routeBarData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Intramuscular injection is by far the most common route, consistent with most vaccine formulations.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Administration Setting Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminData.slice(0, 8).map((entry) => (
            <div key={entry.type} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-lg font-bold text-gray-900">{formatNumber(entry.count)}</div>
              <div className="text-sm text-gray-600">{entry.name || ADMIN_LABELS[entry.type] || entry.type}</div>
              <div className="text-xs text-gray-400 mt-1">{entry.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
