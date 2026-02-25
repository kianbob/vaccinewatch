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
