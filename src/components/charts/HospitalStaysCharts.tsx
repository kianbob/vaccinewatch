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

interface HospitalStaysChartsProps {
  hospitalData: { [vaccine: string]: { [duration: string]: number } };
}

const COLORS = {
  primary: '#0d9488',
  accent: '#0891b2',
  danger: '#dc2626',
  warning: '#f59e0b',
  success: '#10b981',
  gray: '#6b7280',
};

const PIE_COLORS = ['#0d9488', '#0891b2', '#3b82f6', '#f59e0b', '#dc2626', '#10b981', '#6b7280', '#8b5cf6'];

function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

const DURATION_ORDER = ['1', '2', '3', '4', '5', '6', '7', '8-14', '15-30', '31+'];

export default function HospitalStaysCharts({ hospitalData }: HospitalStaysChartsProps) {
  // Aggregate duration counts across all vaccines
  const durationCounts: { [key: string]: number } = {};
  const vaccinetotals: { vaccine: string; total: number; shortStay: number; longStay: number }[] = [];

  Object.entries(hospitalData).forEach(([vaccine, durations]) => {
    let total = 0, shortStay = 0, longStay = 0;
    Object.entries(durations).forEach(([dur, count]) => {
      durationCounts[dur] = (durationCounts[dur] || 0) + count;
      total += count;
      if (['1', '2', '3'].includes(dur)) shortStay += count;
      if (['8-14', '15-30', '31+'].includes(dur)) longStay += count;
    });
    vaccinetotals.push({ vaccine, total, shortStay, longStay });
  });

  const topVaccines = vaccinetotals.sort((a, b) => b.total - a.total);

  const barData = DURATION_ORDER
    .filter(d => durationCounts[d])
    .map(d => ({
      duration: d === '31+' ? '31+ days' : d === '8-14' ? '8-14 days' : d === '15-30' ? '15-30 days' : `${d} day${d === '1' ? '' : 's'}`,
      count: durationCounts[d],
    }));

  const pieData = topVaccines.slice(0, 8).map((v, i) => ({
    name: v.vaccine,
    value: v.total,
    color: PIE_COLORS[i % PIE_COLORS.length],
  }));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Distribution of Hospital Stay Length</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="duration" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Hospitalizations']} />
              <Bar dataKey="count" fill={COLORS.primary}>
                {barData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index < 3 ? COLORS.primary : index < 7 ? COLORS.accent : COLORS.danger} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Most vaccine-related hospitalizations are brief, with the majority lasting 1-3 days.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Hospitalizations by Vaccine Type</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={120}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Hospitalizations']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Short vs Extended Stays by Vaccine</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topVaccines.slice(0, 10)} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vaccine" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Hospitalizations']} />
              <Bar dataKey="shortStay" stackId="a" fill={COLORS.success} name="1-3 days" />
              <Bar dataKey="longStay" stackId="a" fill={COLORS.danger} name="8+ days" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          "Short stay" = 1-3 days; "Extended stay" = 8+ days. Some vaccines are associated with longer hospitalizations.
        </p>
      </div>
    </div>
  );
}
