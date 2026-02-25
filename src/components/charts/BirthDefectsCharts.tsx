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

interface BirthDefectsChartsProps {
  birthDefectsData: any[];
}

const COLORS = {
  danger: '#dc2626'
};

function formatNumber(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

export default function BirthDefectsCharts({ birthDefectsData }: BirthDefectsChartsProps) {
  const chartData = birthDefectsData.map(item => ({
    vaccine: item.type.length > 15 ? item.type.substring(0, 15) + '...' : item.type,
    count: item.count
  }));

  return (
    <div className="space-y-8">
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-sm text-red-800">
          <strong>Critical Context:</strong> 3-4% of all births involve birth defects regardless of vaccination. 
          These reports show temporal association, not causation.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Birth Defect Reports by Vaccine Type</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="vaccine" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              <Bar dataKey="count" fill={COLORS.danger} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}