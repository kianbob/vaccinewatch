'use client'

import dynamic from 'next/dynamic'

// Homepage yearly trend
export const YearlyTrendChartClient = dynamic(
  () => import('@/components/YearlyTrendChart'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

// Vaccine detail chart
export const VaccineYearlyChartClient = dynamic(
  () => import('@/components/VaccineYearlyChart'),
  { ssr: false, loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg"></div> }
)

// Symptom detail chart
export const SymptomVaccinesChartClient = dynamic(
  () => import('@/components/SymptomVaccinesChart'),
  { ssr: false, loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg"></div> }
)

// Manufacturer charts
export const ManufacturerBarChartClient = dynamic(
  () => import('@/components/ManufacturerBarChart'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const ManufacturerPieChartClient = dynamic(
  () => import('@/components/ManufacturerPieChart'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

// Analysis charts
export const CovidImpactChartsClient = dynamic(
  () => import('@/components/charts/CovidImpactCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const AgeChartsClient = dynamic(
  () => import('@/components/charts/AgeCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const GenderChartsClient = dynamic(
  () => import('@/components/charts/GenderCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const ReportingTrendsChartsClient = dynamic(
  () => import('@/components/charts/ReportingTrendsCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const MyocarditisChartsClient = dynamic(
  () => import('@/components/charts/MyocarditisCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const DeathReportsChartsClient = dynamic(
  () => import('@/components/charts/DeathReportsCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const TopSymptomsChartClient = dynamic(
  () => import('@/components/charts/TopSymptomsCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

// Symptom yearly trend chart
export const SymptomYearlyChartClient = dynamic(
  () => import('@/components/SymptomYearlyChart'),
  { ssr: false, loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg"></div> }
)

// New analysis charts
export const PediatricChartsClient = dynamic(
  () => import('@/components/charts/PediatricCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const ElderlyChartsClient = dynamic(
  () => import('@/components/charts/ElderlyCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const CovidVsFluChartsClient = dynamic(
  () => import('@/components/charts/CovidVsFluCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const ManufacturerLandscapeChartsClient = dynamic(
  () => import('@/components/charts/ManufacturerLandscapeCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const GeographicChartsClient = dynamic(
  () => import('@/components/charts/GeographicCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export const SeriousOutcomesChartsClient = dynamic(
  () => import('@/components/charts/SeriousOutcomesCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div> }
)
