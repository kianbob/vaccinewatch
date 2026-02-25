'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ReferenceLine
} from 'recharts';

interface YearlyData {
  year: number;
  reports: number;
  died: number;
  hospitalized: number;
  er: number;
}

interface ReportingBiasChartsProps {
  yearlyData: YearlyData[];
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

export default function ReportingBiasCharts({ yearlyData }: ReportingBiasChartsProps) {
  // Calculate pre-COVID average (2010-2019)
  const preCovid = yearlyData.filter(y => y.year >= 2010 && y.year <= 2019);
  const preCovidAvg = Math.round(preCovid.reduce((sum, y) => sum + y.reports, 0) / preCovid.length);

  // Add bias indicators to data
  const dataWithBias = yearlyData.map(year => {
    let biasLevel = 'normal';
    let biasReason = '';
    
    if (year.year === 2021) {
      biasLevel = 'extreme';
      biasReason = 'COVID-19 stimulated reporting';
    } else if (year.year === 2020 || year.year === 2022) {
      biasLevel = 'high';
      biasReason = 'COVID-19 awareness effect';
    } else if (year.reports > preCovidAvg * 1.5) {
      biasLevel = 'moderate';
      biasReason = 'Above normal reporting';
    }

    return {
      ...year,
      biasLevel,
      biasReason,
      ratio: year.reports / preCovidAvg,
      baseline: preCovidAvg
    };
  });

  // Focus on the dramatic change around COVID
  const covidEraData = yearlyData.filter(y => y.year >= 2018 && y.year <= 2023);
  
  // Calculate year-over-year percent changes
  const changeData = yearlyData.map((year, index) => {
    if (index === 0) return { year: year.year, change: 0, reports: year.reports };
    const prevYear = yearlyData[index - 1];
    const change = ((year.reports - prevYear.reports) / prevYear.reports) * 100;
    return {
      year: year.year,
      change,
      reports: year.reports
    };
  }).filter(item => item.year >= 2015); // Start from 2015 for readability

  return (
    <div className="space-y-8">
      {/* Historical Reporting with Bias Markers */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">VAERS Reports Over Time: The Bias Story</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataWithBias} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip 
                formatter={(value: number, name: string) => [formatNumber(value), name]}
                labelFormatter={(year: number, payload: any[]) => {
                  const item = payload[0]?.payload;
                  return item ? `${year} - ${item.biasReason || 'Normal reporting'}` : year;
                }}
              />
              <ReferenceLine 
                y={preCovidAvg} 
                stroke={COLORS.gray} 
                strokeDasharray="5 5"
                label={{ value: 'Pre-COVID Average', position: 'top' }}
              />
              <Area 
                type="monotone" 
                dataKey="reports" 
                stroke={COLORS.danger} 
                fill={COLORS.danger}
                fillOpacity={0.3}
                name="Annual Reports"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          The 2021 spike demonstrates classic "stimulated reporting" — dramatic increases due to awareness, not necessarily increased adverse events.
        </p>
      </div>

      {/* COVID Era Focus */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">The COVID-19 Reporting Phenomenon (2018-2023)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={covidEraData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              <Line 
                type="monotone" 
                dataKey="reports" 
                stroke={COLORS.danger} 
                strokeWidth={4}
                dot={{ r: 6 }}
                name="Annual Reports"
              />
              <ReferenceLine 
                x={2020} 
                stroke={COLORS.warning} 
                strokeDasharray="5 5"
                label={{ value: 'COVID-19 Era Begins', angle: -90, position: 'top' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Year-over-Year Changes */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Year-over-Year Reporting Changes</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={changeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: '% Change', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value: number) => [`${value > 0 ? '+' : ''}${value.toFixed(1)}%`, 'Change from Previous Year']}
              />
              <Bar dataKey="change" fill={COLORS.info} />
              <ReferenceLine 
                y={0} 
                stroke={COLORS.gray}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Massive year-over-year increases around 2020-2021 followed by sharp declines show the temporary nature of stimulated reporting.
        </p>
      </div>

      {/* Ratio to Baseline */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Reporting Intensity vs. Historical Baseline</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataWithBias.filter(d => d.year >= 2010)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Multiple of Baseline', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}x`, 'Multiple of Baseline']}
                labelFormatter={(year: number) => `${year} (${Math.round(dataWithBias.find(d => d.year === year)?.reports || 0).toLocaleString()} reports)`}
              />
              <ReferenceLine 
                y={1} 
                stroke={COLORS.gray} 
                strokeDasharray="5 5"
                label={{ value: 'Baseline (1x)', position: 'top' }}
              />
              <Area 
                type="monotone" 
                dataKey="ratio" 
                stroke={COLORS.primary} 
                fill={COLORS.primary}
                fillOpacity={0.3}
                name="Reporting Intensity"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          2021 reached nearly 25x the historical baseline, demonstrating extreme stimulated reporting that returned toward normal levels.
        </p>
      </div>

      {/* Key Insights */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Evidence of Reporting Bias</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-700">
              {Math.round(Math.max(...dataWithBias.map(d => d.ratio)))}x
            </div>
            <div className="text-sm text-red-600">Peak Reporting Multiple</div>
            <div className="text-xs text-gray-500 mt-1">vs. historical baseline</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">
              {((1 - (dataWithBias.find(d => d.year === 2023)?.reports || 0) / Math.max(...dataWithBias.map(d => d.reports))) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-blue-600">Decline from Peak</div>
            <div className="text-xs text-gray-500 mt-1">Evidence bias was temporary</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-700">
              {formatNumber(preCovidAvg)}
            </div>
            <div className="text-sm text-green-600">Historical Baseline</div>
            <div className="text-xs text-gray-500 mt-1">2010-2019 average</div>
          </div>
        </div>
      </div>
    </div>
  );
}