'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';

interface LotData {
  lot: string;
  reports: number;
  died: number;
  hosp: number;
}

interface LotAnalysisChartsProps {
  lotData: LotData[];
}

const COLORS = {
  primary: '#0d9488',
  accent: '#0891b2',
  danger: '#dc2626',
  warning: '#f59e0b',
  info: '#3b82f6',
  success: '#10b981',
  gray: '#6b7280'
};

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

export default function LotAnalysisCharts({ lotData }: LotAnalysisChartsProps) {
  // Top 15 lots by reports for better readability
  const topLots = lotData.slice(0, 15).map((lot, index) => ({
    ...lot,
    rank: index + 1,
    lotDisplay: lot.lot.length > 10 ? lot.lot.substring(0, 10) + '...' : lot.lot
  }));

  // Distribution analysis - group lots by report count ranges
  const distributionRanges = [
    { range: '5-10 reports', min: 5, max: 10 },
    { range: '11-25 reports', min: 11, max: 25 },
    { range: '26-50 reports', min: 26, max: 50 },
    { range: '51-100 reports', min: 51, max: 100 },
    { range: '101-200 reports', min: 101, max: 200 },
    { range: '201+ reports', min: 201, max: Infinity }
  ];

  const distributionData = distributionRanges.map(range => ({
    range: range.range,
    count: lotData.filter(lot => lot.reports >= range.min && lot.reports <= range.max).length
  }));

  // Scatter plot data showing reports vs deaths for top lots
  const scatterData = topLots.map(lot => ({
    reports: lot.reports,
    deaths: lot.died,
    lot: lot.lot,
    size: Math.max(50, lot.reports / 5) // Size bubbles based on reports
  }));

  return (
    <div className="space-y-8">
      {/* Warning Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="text-sm text-red-800">
          <strong>Critical Reminder:</strong> These charts show raw report counts by lot number. 
          Without knowing lot sizes and distribution data, these numbers cannot determine safety. 
          Higher reports often indicate larger lots, not safety problems.
        </div>
      </div>

      {/* Top Lots by Reports */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top 15 Lots by Total Reports</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topLots} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="lotDisplay" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip 
                formatter={(value: number, name: string) => [formatNumber(value), name]}
                labelFormatter={(label: string, payload: any[]) => {
                  const item = payload[0]?.payload;
                  return item ? `Lot: ${item.lot}` : label;
                }}
              />
              <Bar dataKey="reports" fill={COLORS.danger} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          High report counts likely reflect large lot sizes and wide distribution, not safety issues.
        </p>
      </div>

      {/* Distribution of Lots by Report Count */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Distribution of Lots by Report Count</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="range" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis label={{ value: 'Number of Lots', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: number) => [value, 'Lots']} />
              <Bar dataKey="count" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Most lots have relatively few reports, while a small number have many — typical of size distribution.
        </p>
      </div>

      {/* Reports vs Deaths Scatter */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Reports vs Death Reports (Top 15 Lots)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="reports" 
                type="number" 
                tickFormatter={formatNumber}
                label={{ value: 'Total Reports', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                dataKey="deaths" 
                type="number"
                label={{ value: 'Death Reports', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [formatNumber(value), name]}
                labelFormatter={(label: string, payload: any[]) => {
                  const item = payload[0]?.payload;
                  return item ? `Lot: ${item.lot}` : '';
                }}
              />
              <Scatter data={scatterData} fill={COLORS.danger} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          The relationship between total reports and death reports appears proportional, consistent with background occurrence.
        </p>
      </div>

      {/* Summary Stats */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Lot Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-700">
              {formatNumber(lotData.length)}
            </div>
            <div className="text-sm text-gray-600">Total Lots (5+ reports)</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">
              {formatNumber(lotData.reduce((sum, lot) => sum + lot.reports, 0))}
            </div>
            <div className="text-sm text-blue-600">Total Reports</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-700">
              {Math.round(lotData.reduce((sum, lot) => sum + lot.reports, 0) / lotData.length)}
            </div>
            <div className="text-sm text-orange-600">Average Reports per Lot</div>
          </div>
        </div>
      </div>
    </div>
  );
}