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

interface OnsetTimingChartsProps {
  onsetData: {
    byVaccine: { [vaccine: string]: { [day: string]: number } };
    byOutcome: { [outcome: string]: { [day: string]: number } };
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

const DAY_COLORS = [
  '#0d9488', '#0891b2', '#3b82f6', '#10b981', '#f59e0b', '#dc2626', '#9333ea', '#ec4899'
];

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

export default function OnsetTimingCharts({ onsetData }: OnsetTimingChartsProps) {
  // Prepare overall timing data
  const overallData = Object.entries(onsetData.byOutcome.all || {}).map(([day, count]) => ({
    day: day === '0' ? 'Same day' : day === '1' ? 'Day 1' : day === '2' ? 'Day 2' : day === '3' ? 'Day 3' : 
         day.includes('-') ? `Days ${day}` : `Day ${day}`,
    count,
    dayKey: day
  })).sort((a, b) => {
    // Sort by day order
    const order = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15-30', '31-90', '91-180', '181-365'];
    return order.indexOf(a.dayKey) - order.indexOf(b.dayKey);
  });

  // Compare COVID vs others for first 7 days
  const covidData = onsetData.byVaccine.COVID19 || {};
  const firstWeekData = ['0', '1', '2', '3', '4', '5', '6'].map(day => {
    const covidCount = covidData[day] || 0;
    
    // Calculate non-COVID total
    let nonCovidTotal = 0;
    Object.entries(onsetData.byVaccine).forEach(([vaccine, data]) => {
      if (vaccine !== 'COVID19') {
        nonCovidTotal += data[day] || 0;
      }
    });

    return {
      day: day === '0' ? 'Same day' : `Day ${day}`,
      covid: covidCount,
      nonCovid: nonCovidTotal
    };
  });

  // Outcome comparison (died vs all) for first week
  const outcomeData = ['0', '1', '2', '3', '4', '5', '6'].map(day => ({
    day: day === '0' ? 'Same day' : `Day ${day}`,
    deaths: onsetData.byOutcome.died?.[day] || 0,
    allReports: onsetData.byOutcome.all?.[day] || 0
  }));

  return (
    <div className="space-y-8">
      {/* Overall Onset Distribution */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">When Adverse Events Are Reported After Vaccination</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overallData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                fontSize={12}
              />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              <Bar dataKey="count" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* COVID vs Non-COVID First Week */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">COVID-19 vs Other Vaccines (First Week)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={firstWeekData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              <Legend />
              <Bar dataKey="covid" fill={COLORS.danger} name="COVID-19 Vaccines" />
              <Bar dataKey="nonCovid" fill={COLORS.primary} name="Other Vaccines" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Death Reports vs All Reports Timing */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Death Reports vs All Reports (First Week)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={outcomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value: number) => [formatNumber(value), 'Reports']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="allReports" 
                stroke={COLORS.primary} 
                strokeWidth={3}
                name="All Reports"
              />
              <Line 
                type="monotone" 
                dataKey="deaths" 
                stroke={COLORS.danger} 
                strokeWidth={3}
                name="Death Reports"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Both serious and non-serious adverse events show similar timing patterns, clustering in the first few days after vaccination.
        </p>
      </div>
    </div>
  );
}