import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ManufacturerLandscapeChartsClient as ManufacturerLandscapeCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Manufacturer Landscape - Who Dominates VAERS Reporting',
  description: 'Analysis of vaccine manufacturer market share in VAERS reports. How a few companies account for the majority of adverse event reports.'
}

export default function ManufacturerLandscapePage() {
  const manufacturers = readJsonFile('manufacturer-index.json')

  const sorted = [...manufacturers].sort((a: any, b: any) => b.reports - a.reports)
  const totalReports = sorted.reduce((s: number, m: any) => s + m.reports, 0)
  const totalDeaths = sorted.reduce((s: number, m: any) => s + m.died, 0)

  const top5 = sorted.slice(0, 5)
  const top5Reports = top5.reduce((s: number, m: any) => s + m.reports, 0)
  const top5Pct = totalReports > 0 ? (top5Reports / totalReports * 100).toFixed(0) : '0'

  const topManufacturers = sorted.slice(0, 10).map((m: any) => ({
    name: m.name.length > 20 ? m.name.substring(0, 20) + '...' : m.name,
    fullName: m.name,
    reports: m.reports,
  }))

  const marketShare = sorted.slice(0, 6).map((m: any) => ({
    name: m.name.length > 15 ? m.name.substring(0, 15) + '...' : m.name,
    value: m.reports,
  }))
  const othersReports = sorted.slice(6).reduce((s: number, m: any) => s + m.reports, 0)
  if (othersReports > 0) {
    marketShare.push({ name: 'Others', value: othersReports })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'The Manufacturer Landscape' }]} />

      <div className="mb-12">
        <div className="text-xs font-medium text-accent uppercase tracking-wider mb-2">6 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          The Manufacturer Landscape
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A small number of companies dominate VAERS reporting. The top 5 manufacturers account
          for {top5Pct}% of all reports — but this tells us more about market share than safety.
        </p>
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
          <div className="text-3xl font-bold text-accent mb-1">{top5Pct}%</div>
          <div className="text-gray-700">of all VAERS reports come from just 5 manufacturers out of {manufacturers.length} total</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Market Concentration</h2>
        <p>
          VAERS tracks reports from <strong>{manufacturers.length}</strong> manufacturers, but the market is
          heavily concentrated. The top manufacturer, <strong>{sorted[0]?.name}</strong>, alone accounts for{' '}
          <strong>{formatNumber(sorted[0]?.reports || 0)}</strong> reports ({totalReports > 0 ? (sorted[0]?.reports / totalReports * 100).toFixed(1) : 0}%).
        </p>
        <p>
          This concentration is almost entirely driven by COVID-19 vaccines. Pfizer-BioNTech and Moderna together
          produced the vast majority of the 670+ million COVID-19 doses administered in the U.S., so their
          dominance in VAERS reports is a direct reflection of their market presence.
        </p>

        <h2 className={playfairDisplay.className}>Beyond COVID: The Traditional Players</h2>
        <p>
          Before the pandemic, companies like Merck, GlaxoSmithKline, and Sanofi Pasteur dominated the vaccine
          market with products covering childhood immunizations, flu vaccines, and travel vaccines. Their VAERS
          report counts are substantial but dwarfed by the COVID-19 era surge.
        </p>

        <h2 className={playfairDisplay.className}>What Market Share Means</h2>
        <p>
          High report counts for a manufacturer primarily reflect how many doses they&apos;ve distributed.
          A company with 50% market share would be expected to have roughly 50% of reports, all else being equal.
          Comparing manufacturers on raw report counts without adjusting for doses administered is misleading.
        </p>
      </div>

      <div className="mb-12">
        <ManufacturerLandscapeCharts topManufacturers={topManufacturers} marketShare={marketShare} />
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">1.</span>
            <span>Top 5 of {manufacturers.length} manufacturers account for {top5Pct}% of all VAERS reports</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">2.</span>
            <span>COVID-19 vaccine manufacturers dominate due to unprecedented dose volumes</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">3.</span>
            <span>Report volume reflects market share and public awareness, not relative safety</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">4.</span>
            <span>All manufacturers must meet the same FDA safety and efficacy standards</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 Impact</div>
            <div className="text-sm text-gray-500">How the pandemic changed reporting</div>
          </Link>
          <Link href="/manufacturers" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">All Manufacturers</div>
            <div className="text-sm text-gray-500">Browse all manufacturer data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
