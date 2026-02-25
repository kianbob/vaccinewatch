'use client'

import dynamic from 'next/dynamic'

// Homepage yearly trend
export const YearlyTrendChartClient = dynamic(
  () => import('@/components/YearlyTrendChart'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

// Vaccine detail chart
export const VaccineYearlyChartClient = dynamic(
  () => import('@/components/VaccineYearlyChart'),
  { ssr: false, loading: () => <div className="h-80 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

// Symptom detail chart
export const SymptomVaccinesChartClient = dynamic(
  () => import('@/components/SymptomVaccinesChart'),
  { ssr: false, loading: () => <div className="h-80 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

// Manufacturer charts
export const ManufacturerBarChartClient = dynamic(
  () => import('@/components/ManufacturerBarChart'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const ManufacturerPieChartClient = dynamic(
  () => import('@/components/ManufacturerPieChart'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

// Analysis charts
export const CovidImpactChartsClient = dynamic(
  () => import('@/components/charts/CovidImpactCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const AgeChartsClient = dynamic(
  () => import('@/components/charts/AgeCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const GenderChartsClient = dynamic(
  () => import('@/components/charts/GenderCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const ReportingTrendsChartsClient = dynamic(
  () => import('@/components/charts/ReportingTrendsCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const MyocarditisChartsClient = dynamic(
  () => import('@/components/charts/MyocarditisCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const DeathReportsChartsClient = dynamic(
  () => import('@/components/charts/DeathReportsCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const TopSymptomsChartClient = dynamic(
  () => import('@/components/charts/TopSymptomsCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

// Symptom yearly trend chart
export const SymptomYearlyChartClient = dynamic(
  () => import('@/components/SymptomYearlyChart'),
  { ssr: false, loading: () => <div className="h-80 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

// New analysis charts
export const PediatricChartsClient = dynamic(
  () => import('@/components/charts/PediatricCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const ElderlyChartsClient = dynamic(
  () => import('@/components/charts/ElderlyCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const CovidVsFluChartsClient = dynamic(
  () => import('@/components/charts/CovidVsFluCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const ManufacturerLandscapeChartsClient = dynamic(
  () => import('@/components/charts/ManufacturerLandscapeCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const GeographicChartsClient = dynamic(
  () => import('@/components/charts/GeographicCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const SeriousOutcomesChartsClient = dynamic(
  () => import('@/components/charts/SeriousOutcomesCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

// New analysis charts for the 10 new articles
export const OnsetTimingChartsClient = dynamic(
  () => import('@/components/charts/OnsetTimingCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const DoseComparisonChartsClient = dynamic(
  () => import('@/components/charts/DoseComparisonCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const RecoveryRatesChartsClient = dynamic(
  () => import('@/components/charts/RecoveryRatesCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const LotAnalysisChartsClient = dynamic(
  () => import('@/components/charts/LotAnalysisCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const MultiVaccineChartsClient = dynamic(
  () => import('@/components/charts/MultiVaccineCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const ReportingBiasChartsClient = dynamic(
  () => import('@/components/charts/ReportingBiasCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const BirthDefectsChartsClient = dynamic(
  () => import('@/components/charts/BirthDefectsCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const HospitalStaysChartsClient = dynamic(
  () => import('@/components/charts/HospitalStaysCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const WhoReportsChartsClient = dynamic(
  () => import('@/components/charts/WhoReportsCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)

export const DenominatorProblemChartsClient = dynamic(
  () => import('@/components/charts/DenominatorProblemCharts'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 rounded-xl animate-pulse flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> }
)
