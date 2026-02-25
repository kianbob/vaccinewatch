'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const RechartsChart = dynamic(
  () => import('./HomeChartsInner'),
  { ssr: false, loading: () => <div className="h-80 bg-gray-50 rounded-xl animate-pulse" /> }
);

interface YearlyData {
  year: number;
  reports: number;
  died: number;
  hospitalized: number;
  er: number;
}

export default function HomeCharts({ data }: { data: YearlyData[] }) {
  const [metric, setMetric] = useState<'reports' | 'died' | 'hospitalized' | 'er'>('reports');

  const metricLabels = {
    reports: 'Total Reports',
    died: 'Deaths Reported',
    hospitalized: 'Hospitalizations',
    er: 'ER Visits',
  };

  const metricColors = {
    reports: '#0d9488',
    died: '#dc2626',
    hospitalized: '#0891b2',
    er: '#f59e0b',
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(metricLabels) as Array<keyof typeof metricLabels>).map((key) => (
          <button
            key={key}
            onClick={() => setMetric(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              metric === key
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {metricLabels[key]}
          </button>
        ))}
      </div>
      <RechartsChart data={data as unknown as Record<string, number>[]} metric={metric} color={metricColors[metric]} label={metricLabels[metric]} />
    </div>
  );
}
