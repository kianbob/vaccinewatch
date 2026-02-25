'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface MultiVaccineChartsProps {
  top20Data: any[];
  pediatricData: any[];
  covidData: any[];
}

const COLORS = {
  primary: '#0d9488',
  accent: '#0891b2',
  danger: '#dc2626',
  warning: '#f59e0b'
};

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

export default function MultiVaccineCharts({ top20Data, pediatricData, covidData }: MultiVaccineChartsProps) {
  // Prepare top combinations data
  const chartData = top20Data.slice(0, 10).map((combo, index) => ({
    combination: `Combo ${index + 1}`,
    reports: combo.reports,
    vaccines: combo.vaccines.join(' + ')
  }));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top 10 Vaccine Combinations</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="combination" 
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip 
                formatter={(value: number) => [formatNumber(value), 'Reports']}
                labelFormatter={(label: string, payload: any[]) => {
                  const item = payload[0]?.payload;
                  return item ? item.vaccines : label;
                }}
              />
              <Bar dataKey="reports" fill={COLORS.accent} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-bold text-blue-800 mb-2">Co-Administration Safety</h4>
        <p className="text-sm text-blue-700">
          Multiple vaccines given together have been extensively studied and are considered safe. 
          The CDC recommends co-administration to reduce clinic visits and improve vaccination coverage.
        </p>
      </div>
    </div>
  );
}