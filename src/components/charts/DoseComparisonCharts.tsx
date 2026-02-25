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
  LineChart,
  Line,
  PieChart,
  Pie,
  Legend
} from 'recharts';

interface DoseData {
  reports: number;
  died: number;
  hosp: number;
}

interface DoseComparisonChartsProps {
  doseData: {
    "1": DoseData;
    "2": DoseData;
    "3": DoseData;
    "UNK": DoseData;
  };
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

export default function DoseComparisonCharts({ doseData }: DoseComparisonChartsProps) {
  // Prepare data for charts
  const doseComparison = [
    {
      dose: 'First Dose',
      reports: doseData["1"]?.reports || 0,
      deaths: doseData["1"]?.died || 0,
      hospitalizations: doseData["1"]?.hosp || 0
    },
    {
      dose: 'Second Dose', 
      reports: doseData["2"]?.reports || 0,
      deaths: doseData["2"]?.died || 0,
      hospitalizations: doseData["2"]?.hosp || 0
    },
    {
      dose: 'Third Dose/Booster',
      reports: doseData["3"]?.reports || 0,
      deaths: doseData["3"]?.died || 0,
      hospitalizations: doseData["3"]?.hosp || 0
    }
  ];

  // Calculate rates per 1000 reports for comparison
  const rateComparison = doseComparison.map(item => ({
    dose: item.dose,
    deathRate: item.reports > 0 ? (item.deaths / item.reports) * 1000 : 0,
    hospRate: item.reports > 0 ? (item.hospitalizations / item.reports) * 1000 : 0
  }));

  // Data for pie chart showing distribution of reports by dose
  const pieData = doseComparison.map((item, index) => ({
    name: item.dose,
    value: item.reports,
    color: [COLORS.primary, COLORS.accent, COLORS.info][index]
  }));

  return (
    <div className="space-y-8">
      {/* Total Reports by Dose */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Total Reports by Dose Number</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={doseComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dose" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              <Bar dataKey="reports" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Death and Hospitalization Reports by Dose */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Serious Outcomes by Dose Number</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={doseComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dose" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              <Legend />
              <Bar dataKey="deaths" fill={COLORS.danger} name="Death Reports" />
              <Bar dataKey="hospitalizations" fill={COLORS.warning} name="Hospitalizations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rates per 1000 Reports */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Serious Outcome Rates (per 1,000 reports)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rateComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dose" />
              <YAxis />
              <Tooltip formatter={(value: number) => [value.toFixed(1), 'per 1,000 reports']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="deathRate" 
                stroke={COLORS.danger} 
                strokeWidth={3}
                name="Death Rate"
              />
              <Line 
                type="monotone" 
                dataKey="hospRate" 
                stroke={COLORS.warning} 
                strokeWidth={3}
                name="Hospitalization Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Rates help account for the different total numbers of reports per dose.
        </p>
      </div>

      {/* Distribution Pie Chart */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Distribution of Reports by Dose</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${((entry.value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Second doses show the highest reporting numbers, consistent with stronger immune responses.
        </p>
      </div>
    </div>
  );
}