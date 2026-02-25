'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface VaccineAssociation {
  type: string;
  count: number;
}

interface MyocarditisChartsProps {
  vaccineData: VaccineAssociation[];
}

const VACCINE_LABELS: Record<string, string> = {
  COVID19: 'COVID-19',
  SMALL: 'Smallpox',
  ANTH: 'Anthrax',
  TYP: 'Typhoid',
  UNK: 'Unknown',
  HEP: 'Hepatitis',
  'COVID19-2': 'COVID-19 (bivalent)',
  FLUX: 'Influenza',
  VARCEL: 'Varicella',
  HIBV: 'Hib',
};

function getVaccineLabel(type: string): string {
  return VACCINE_LABELS[type] || type;
}

const COLORS = [
  '#0d9488',
  '#0891b2',
  '#0e7490',
  '#14b8a6',
  '#22d3ee',
  '#2dd4bf',
  '#06b6d4',
  '#0f766e',
  '#155e75',
  '#115e59',
];

export default function MyocarditisCharts({ vaccineData }: MyocarditisChartsProps) {
  const chartData = vaccineData.map((v) => ({
    name: getVaccineLabel(v.type),
    count: v.count,
    type: v.type,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Vaccine Types Associated with Myocarditis Reports
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Number of myocarditis-vaccine associations by vaccine type in VAERS
        </p>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K` : String(v)
                }
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 13 }}
                stroke="#9ca3af"
                width={75}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Associations']}
                cursor={{ fill: 'rgba(13, 148, 136, 0.05)' }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={32}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Note: A single VAERS report can list multiple vaccines. Association counts reflect
          vaccine-symptom pairs, not unique reports.
        </p>
      </div>
    </div>
  );
}
