'use client';

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  PieChart,
  Pie,
} from 'recharts';

interface YearlyData {
  year: number;
  reports: number;
  died: number;
  hospitalized: number;
  er: number;
}

interface ManufacturerData {
  name: string;
  count: number;
}

interface CovidImpactChartsProps {
  yearlyData: YearlyData[];
  manufacturerData: ManufacturerData[];
}

const COLORS = {
  primary: '#0d9488',
  accent: '#0891b2',
  danger: '#dc2626',
  warning: '#f59e0b',
  spike: '#dc2626',
  normal: '#0d9488',
  pfizer: '#0d9488',
  moderna: '#0891b2',
  janssen: '#f59e0b',
  other: '#94a3b8',
};

function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return String(value);
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
      <p className="font-semibold text-gray-900 mb-1">Year: {label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export function YearlySpikeChart({ data }: { data: YearlyData[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Annual VAERS Reports (1990-2026)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11 }}
            stroke="#9ca3af"
            interval={2}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            tickFormatter={formatYAxis}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="reports" name="Reports" radius={[2, 2, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.year}
                fill={entry.year >= 2020 && entry.year <= 2022 ? COLORS.spike : COLORS.normal}
                opacity={entry.year === 2021 ? 1 : 0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 text-center mt-2">
        Red bars highlight the COVID-era surge (2020-2022). The 2021 bar towers over all other years.
      </p>
    </div>
  );
}

export function ManufacturerBreakdownChart({ data }: { data: ManufacturerData[] }) {
  const chartData = data
    .filter((d) => d.name !== 'UNKNOWN MANUFACTURER')
    .map((d) => ({
      name: d.name === 'PFIZER\\BIONTECH' ? 'Pfizer-BioNTech' : d.name === 'MODERNA' ? 'Moderna' : d.name === 'JANSSEN' ? 'Janssen (J&J)' : d.name === 'NOVAVAX' ? 'Novavax' : d.name,
      count: d.count,
      fill:
        d.name === 'PFIZER\\BIONTECH'
          ? COLORS.pfizer
          : d.name === 'MODERNA'
            ? COLORS.moderna
            : d.name === 'JANSSEN'
              ? COLORS.janssen
              : COLORS.other,
    }));

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">COVID-19 Vaccine Reports by Manufacturer</h3>
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={140}
            innerRadius={60}
            paddingAngle={2}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 text-center mt-2">
        Pfizer-BioNTech and Moderna together account for over 92% of all COVID-19 vaccine VAERS reports.
      </p>
    </div>
  );
}

export function CovidVsHistoricalChart({ data }: { data: YearlyData[] }) {
  const chartData = data.map((d) => ({
    year: d.year,
    reports: d.reports,
    deaths: d.died,
    hospitalizations: d.hospitalized,
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Serious Outcomes Over Time</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="gradDeaths" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.danger} stopOpacity={0.3} />
              <stop offset="95%" stopColor={COLORS.danger} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradHosp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.3} />
              <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" interval={3} />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="hospitalizations"
            name="Hospitalizations"
            stroke={COLORS.accent}
            strokeWidth={2}
            fill="url(#gradHosp)"
          />
          <Area
            type="monotone"
            dataKey="deaths"
            name="Deaths Reported"
            stroke={COLORS.danger}
            strokeWidth={2}
            fill="url(#gradDeaths)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 text-center mt-2">
        Both death reports and hospitalizations followed the same dramatic spike pattern during the COVID era.
      </p>
    </div>
  );
}

export default function CovidImpactCharts({ yearlyData, manufacturerData }: CovidImpactChartsProps) {
  return (
    <div className="space-y-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <YearlySpikeChart data={yearlyData} />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ManufacturerBreakdownChart data={manufacturerData} />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <CovidVsHistoricalChart data={yearlyData} />
      </div>
    </div>
  );
}
