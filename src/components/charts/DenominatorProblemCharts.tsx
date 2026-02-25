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
  Cell,
  ComposedChart,
  Line,
  LineChart
} from 'recharts';

interface VaccineData {
  vaccine: string;
  reports: number;
  estimatedDoses: number;
}

interface DenominatorProblemChartsProps {
  vaccineData: VaccineData[];
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

const VACCINE_COLORS: { [key: string]: string } = {
  'COVID-19': COLORS.danger,
  'Influenza': COLORS.primary,
  'MMR': COLORS.accent,
  'DTaP': COLORS.info
};

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

function formatDoses(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
}

export default function DenominatorProblemCharts({ vaccineData }: DenominatorProblemChartsProps) {
  // Calculate rates per million doses
  const dataWithRates = vaccineData.map(item => ({
    ...item,
    reportsPerMillion: item.estimatedDoses > 0 ? (item.reports / item.estimatedDoses) * 1000000 : 0,
    color: VACCINE_COLORS[item.vaccine] || COLORS.gray
  }));

  // Data for raw numbers comparison (misleading)
  const rawComparison = dataWithRates.map(item => ({
    vaccine: item.vaccine,
    reports: item.reports,
    color: item.color
  })).sort((a, b) => b.reports - a.reports);

  // Data for rate comparison (proper)
  const rateComparison = dataWithRates.map(item => ({
    vaccine: item.vaccine,
    rate: item.reportsPerMillion,
    color: item.color
  })).sort((a, b) => b.rate - a.rate);

  // Scatter plot showing relationship between doses and reports
  const scatterData = dataWithRates.map(item => ({
    doses: item.estimatedDoses,
    reports: item.reports,
    vaccine: item.vaccine,
    rate: item.reportsPerMillion
  }));

  // Example showing why denominators matter
  const exampleData = [
    { scenario: 'Vaccine A\n(Raw View)', value: 1000, type: 'reports', color: COLORS.danger },
    { scenario: 'Vaccine B\n(Raw View)', value: 100, type: 'reports', color: COLORS.success },
    { scenario: 'Vaccine A\n(With Context)', value: 0.1, type: 'rate', color: COLORS.success },
    { scenario: 'Vaccine B\n(With Context)', value: 10, type: 'rate', color: COLORS.danger }
  ];

  return (
    <div className="space-y-8">
      {/* The Misleading Raw Comparison */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">❌ Misleading: Raw Report Numbers</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rawComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vaccine" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              <Bar dataKey="reports" fill={COLORS.danger} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-red-600 mt-2">
          ⚠️ Without context, this suggests COVID-19 vaccines are more dangerous. This is misleading!
        </p>
      </div>

      {/* The Proper Rate Comparison */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Proper: Reports per Million Doses</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rateComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vaccine" />
              <YAxis label={{ value: 'Reports per Million Doses', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: number) => [value.toFixed(0), 'per Million Doses']} />
              <Bar dataKey="rate" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-green-600 mt-2">
          ✅ With proper denominators, reporting rates are more similar across vaccines.
        </p>
      </div>

      {/* Doses vs Reports Relationship */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">The Dose-Report Relationship</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="doses" 
                type="number" 
                tickFormatter={formatDoses}
                label={{ value: 'Estimated Doses Administered', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                dataKey="reports" 
                type="number"
                tickFormatter={formatNumber}
                label={{ value: 'VAERS Reports', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'reports' ? formatNumber(value) : formatDoses(value),
                  name === 'reports' ? 'Reports' : 'Doses'
                ]}
                labelFormatter={(label: string, payload: any[]) => {
                  const item = payload[0]?.payload;
                  return item ? `${item.vaccine}: ${item.rate.toFixed(0)} reports/million doses` : '';
                }}
              />
              <Scatter data={scatterData} fill={COLORS.primary} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Higher doses administered naturally lead to more absolute reports, but rates remain relatively consistent.
        </p>
      </div>

      {/* Example: Why Denominators Matter */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Why Context Changes Everything</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Raw numbers view */}
          <div>
            <h4 className="font-bold text-red-700 mb-2">Without Context (Misleading)</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span>Vaccine A</span>
                <span className="font-bold text-red-700">1,000 reports</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span>Vaccine B</span>
                <span className="font-bold text-green-700">100 reports</span>
              </div>
              <p className="text-sm text-red-600">❌ Vaccine A looks worse</p>
            </div>
          </div>

          {/* With context view */}
          <div>
            <h4 className="font-bold text-green-700 mb-2">With Context (Accurate)</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span>Vaccine A</span>
                <span className="font-bold text-green-700">0.1% rate</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span>Vaccine B</span>
                <span className="font-bold text-red-700">10% rate</span>
              </div>
              <p className="text-sm text-green-600">✅ Vaccine A is actually safer</p>
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>The revelation:</strong> Vaccine A was given to 1,000,000 people (0.1% adverse event rate) 
            while Vaccine B was given to 1,000 people (10% adverse event rate). 
            Raw numbers told the opposite story!
          </p>
        </div>
      </div>

      {/* Key Statistics */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">COVID-19 Context: Why Numbers Matter</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-700">
              {formatNumber(dataWithRates.find(d => d.vaccine === 'COVID-19')?.reports || 0)}
            </div>
            <div className="text-sm text-red-600">COVID-19 VAERS Reports</div>
            <div className="text-xs text-gray-500 mt-1">Looks scary without context</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">
              {formatDoses(dataWithRates.find(d => d.vaccine === 'COVID-19')?.estimatedDoses || 0)}
            </div>
            <div className="text-sm text-blue-600">Estimated Doses Given</div>
            <div className="text-xs text-gray-500 mt-1">The missing context</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">
              {Math.round(dataWithRates.find(d => d.vaccine === 'COVID-19')?.reportsPerMillion || 0)}
            </div>
            <div className="text-sm text-green-600">Reports per Million</div>
            <div className="text-xs text-gray-500 mt-1">Normal safety rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}