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
  PieChart,
  Pie,
  Legend
} from 'recharts';

interface VaccineRate {
  vaccine: string;
  total: number;
  notRecoveredRate: number;
  notRecovered: number;
  recovered: number;
  unknown: number;
}

interface RecoveryRatesChartsProps {
  recoveryData: { [vaccine: string]: { Y: number; N: number; U: number } };
  vaccineRates: VaccineRate[];
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

export default function RecoveryRatesCharts({ recoveryData, vaccineRates }: RecoveryRatesChartsProps) {
  // Calculate overall recovery statistics
  const allVaccines = Object.keys(recoveryData);
  let totalRecovered = 0;
  let totalNotRecovered = 0;
  let totalUnknown = 0;

  allVaccines.forEach(vaccine => {
    totalRecovered += recoveryData[vaccine].Y || 0;
    totalNotRecovered += recoveryData[vaccine].N || 0;
    totalUnknown += recoveryData[vaccine].U || 0;
  });

  const totalWithStatus = totalRecovered + totalNotRecovered + totalUnknown;

  // Overall recovery pie chart data
  const overallData = [
    { name: 'Recovered', value: totalRecovered, color: COLORS.success },
    { name: 'Not Recovered', value: totalNotRecovered, color: COLORS.danger },
    { name: 'Unknown', value: totalUnknown, color: COLORS.gray }
  ];

  // Top vaccines by non-recovery rate (limit to top 8 for readability)
  const topNonRecovery = vaccineRates.slice(0, 8).map(item => ({
    vaccine: item.vaccine.length > 12 ? item.vaccine.substring(0, 12) + '...' : item.vaccine,
    rate: item.notRecoveredRate,
    count: item.notRecovered
  }));

  // COVID-19 specific breakdown
  const covidData = recoveryData.COVID19 || { Y: 0, N: 0, U: 0 };
  const covidTotal = covidData.Y + covidData.N + covidData.U;
  const covidBreakdown = [
    { name: 'Recovered', value: covidData.Y, color: COLORS.success },
    { name: 'Not Recovered', value: covidData.N, color: COLORS.danger },
    { name: 'Unknown', value: covidData.U, color: COLORS.gray }
  ];

  return (
    <div className="space-y-8">
      {/* Overall Recovery Status */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Overall Recovery Status in VAERS</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={overallData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${((entry.value / totalWithStatus) * 100).toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {overallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vaccines with Highest Non-Recovery Rates */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Vaccines with Highest "Not Recovered" Rates</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topNonRecovery} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="vaccine" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis label={{ value: '% Not Recovered', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'rate' ? `${value.toFixed(1)}%` : formatNumber(value),
                  name === 'rate' ? 'Not Recovered Rate' : 'Count'
                ]}
              />
              <Bar dataKey="rate" fill={COLORS.danger} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Higher rates may reflect vaccine-specific factors, population differences, or reporting patterns rather than recovery likelihood.
        </p>
      </div>

      {/* COVID-19 Vaccine Recovery Breakdown */}
      {covidTotal > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">COVID-19 Vaccine Recovery Status</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={covidBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${((entry.value / covidTotal) * 100).toFixed(1)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {covidBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            COVID-19 vaccine recovery patterns are similar to other vaccines, with most reports indicating recovery.
          </p>
        </div>
      )}

      {/* Recovery Status Comparison */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Recovery Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">
              {((totalRecovered / totalWithStatus) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-green-600">Reports Indicate Recovery</div>
            <div className="text-xs text-gray-500 mt-1">{formatNumber(totalRecovered)} reports</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-700">
              {((totalNotRecovered / totalWithStatus) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-red-600">Not Recovered at Time of Report</div>
            <div className="text-xs text-gray-500 mt-1">{formatNumber(totalNotRecovered)} reports</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-700">
              {((totalUnknown / totalWithStatus) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Unknown Status</div>
            <div className="text-xs text-gray-500 mt-1">{formatNumber(totalUnknown)} reports</div>
          </div>
        </div>
      </div>
    </div>
  );
}