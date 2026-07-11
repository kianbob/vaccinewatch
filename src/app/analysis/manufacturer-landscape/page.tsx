import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify, formatManufacturer } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { ManufacturerLandscapeChartsClient as ManufacturerLandscapeCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Vaccine Manufacturers Ranked by VAERS Reports — Pfizer, Moderna, J&J Data 2026',
  description: 'Which vaccine manufacturers dominate VAERS adverse event reports? Market-share analysis showing how a few companies account for most reports, in context.',
  openGraph: {
    title: 'Vaccine Manufacturers Ranked by VAERS Reports — Pfizer, Moderna, J&J Data 2026',
    description: 'Which vaccine manufacturers dominate VAERS adverse event reports? Market-share analysis showing how a few companies account for most reports, in context.',
  },
}

export default function ManufacturerLandscapePage() {
  const manufacturers = readJsonFile('manufacturer-index.json')

  const sorted = [...manufacturers].sort((a: any, b: any) => b.reports - a.reports)
  const totalReports = sorted.reduce((s: number, m: any) => s + m.reports, 0)
  const totalDeaths = sorted.reduce((s: number, m: any) => s + m.died, 0)

  const top5 = sorted.slice(0, 5)
  const top5Reports = top5.reduce((s: number, m: any) => s + m.reports, 0)
  const top5Pct = totalReports > 0 ? (top5Reports / totalReports * 100).toFixed(0) : '0'

  const topManufacturers = sorted.slice(0, 10).map((m: any) => {
    const formatted = formatManufacturer(m.name)
    return {
    name: formatted.length > 20 ? formatted.substring(0, 20) + '...' : formatted,
    fullName: formatted,
    reports: m.reports,
  }})

  const marketShare = sorted.slice(0, 6).map((m: any) => {
    const formatted = formatManufacturer(m.name)
    return {
    name: formatted.length > 15 ? formatted.substring(0, 15) + '...' : formatted,
    value: m.reports,
  }})
  const othersReports = sorted.slice(6).reduce((s: number, m: any) => s + m.reports, 0)
  if (othersReports > 0) {
    marketShare.push({ name: 'Others', value: othersReports })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="Manufacturer Landscape - Who Dominates VAERS Reporting" description="Analysis of vaccine manufacturer market share in VAERS reports. How a few companies account for the majority of adverse event reports." slug="manufacturer-landscape" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'The Manufacturer Landscape' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-accent uppercase tracking-wider">6 min read</div><ShareButtons title="Manufacturer Landscape - Who Dominates VAERS Reporting - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          The Manufacturer Landscape
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A small number of companies dominate VAERS reporting. The top 5 manufacturers account
          for {top5Pct}% of all reports — but this tells us more about market share than safety.
        </p>
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-accent mb-1">{top5Pct}%</div>
          <div className="text-gray-700">of all VAERS reports come from just 5 manufacturers out of {manufacturers.length} total</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Market Concentration</h2>
        <p>
          VAERS tracks reports from <strong>{manufacturers.length}</strong> manufacturers, but the market is
          heavily concentrated. The top manufacturer, <strong>{formatManufacturer(sorted[0]?.name || '')}</strong>, alone accounts for{' '}
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

      <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-12">
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

      
      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for manufacturer landscape and market concentration
          is shifting. Annual VAERS reports in 2025-2026 have returned to the 35,000-45,000 range typical of
          the pre-pandemic era (2015-2019), making year-over-year comparisons more meaningful again.
        </p>
        <p>
          The HHS administration has signaled increased focus on vaccine safety data analysis, including
          the development of AI-powered tools for pattern detection in VAERS reports. While these tools
          are still under development, they represent a potential evolution in how adverse event data
          is analyzed and interpreted.
        </p>
        <p>
          New vaccines entering the market — including RSV vaccines for older adults and pregnant women,
          updated COVID-19 formulations, and potential H5N1 avian flu vaccines — continue to add new
          data streams to VAERS. Each new vaccine type provides additional context for understanding
          manufacturer landscape and market concentration across the full spectrum of vaccine safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Limitations of This Analysis</h2>
        <p>
          This analysis is based entirely on VAERS passive surveillance data, which carries important
          limitations that must be understood:
        </p>
        <ul>
          <li><strong>Underreporting:</strong> Studies estimate that only 1-10% of adverse events are
          reported to VAERS. This means the true number of events is likely much higher than what
          appears in the data.</li>
          <li><strong>Stimulated reporting:</strong> Media coverage and public awareness can temporarily
          increase reporting rates for specific vaccines, independent of any change in actual safety.</li>
          <li><strong>No control group:</strong> VAERS does not include a comparison group of unvaccinated
          individuals, making it impossible to determine whether reported events occurred at a higher
          rate than expected.</li>
          <li><strong>Variable data quality:</strong> VAERS reports range from detailed medical records
          submitted by healthcare providers to brief descriptions from patients. Not all reports
          are verified for medical accuracy.</li>
          <li><strong>Duplicate reports:</strong> The same event may be reported by multiple people
          (patient, doctor, manufacturer), and some duplicates may remain in the data.</li>
        </ul>
        <p>
          For these reasons, VAERS data is best used for signal detection — identifying potential safety
          concerns that warrant further investigation — rather than for definitive risk assessment. When
          VAERS surfaces a potential signal, it is investigated using more rigorous systems like the
          Vaccine Safety Datalink (VSD) and controlled epidemiological studies.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About This Data</h3>
        <p className="text-gray-600 text-sm mb-3">
          All data on VaccineWatch comes from the official VAERS public-use datasets published by the CDC and FDA.
          Our current dataset covers reports from 1990 through early 2026. We process the raw data without
          filtering or editorializing — every metric is a transparent aggregation of official government data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/methodology" className="text-sm text-primary hover:underline font-medium">Our Methodology →</Link>
          <Link href="/faq" className="text-sm text-primary hover:underline font-medium">FAQ →</Link>
          <Link href="/disclaimer" className="text-sm text-primary hover:underline font-medium">Disclaimer →</Link>
        </div>
      </div>


      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for manufacturer landscape and market concentration
          is shifting. Annual VAERS reports in 2025-2026 have returned to the 35,000-45,000 range typical of
          the pre-pandemic era (2015-2019), making year-over-year comparisons more meaningful again.
        </p>
        <p>
          The HHS administration has signaled increased focus on vaccine safety data analysis, including
          the development of AI-powered tools for pattern detection in VAERS reports. While these tools
          are still under development, they represent a potential evolution in how adverse event data
          is analyzed and interpreted.
        </p>
        <p>
          New vaccines entering the market — including RSV vaccines for older adults and pregnant women,
          updated COVID-19 formulations, and potential H5N1 avian flu vaccines — continue to add new
          data streams to VAERS. Each new vaccine type provides additional context for understanding
          manufacturer landscape and market concentration across the full spectrum of vaccine safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Limitations of This Analysis</h2>
        <p>
          This analysis is based entirely on VAERS passive surveillance data, which carries important
          limitations that must be understood:
        </p>
        <ul>
          <li><strong>Underreporting:</strong> Studies estimate that only 1-10% of adverse events are
          reported to VAERS. This means the true number of events is likely much higher than what
          appears in the data.</li>
          <li><strong>Stimulated reporting:</strong> Media coverage and public awareness can temporarily
          increase reporting rates for specific vaccines, independent of any change in actual safety.</li>
          <li><strong>No control group:</strong> VAERS does not include a comparison group of unvaccinated
          individuals, making it impossible to determine whether reported events occurred at a higher
          rate than expected.</li>
          <li><strong>Variable data quality:</strong> VAERS reports range from detailed medical records
          submitted by healthcare providers to brief descriptions from patients. Not all reports
          are verified for medical accuracy.</li>
          <li><strong>Duplicate reports:</strong> The same event may be reported by multiple people
          (patient, doctor, manufacturer), and some duplicates may remain in the data.</li>
        </ul>
        <p>
          For these reasons, VAERS data is best used for signal detection — identifying potential safety
          concerns that warrant further investigation — rather than for definitive risk assessment. When
          VAERS surfaces a potential signal, it is investigated using more rigorous systems like the
          Vaccine Safety Datalink (VSD) and controlled epidemiological studies.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About This Data</h3>
        <p className="text-gray-600 text-sm mb-3">
          All data on VaccineWatch comes from the official VAERS public-use datasets published by the CDC and FDA.
          Our current dataset covers reports from 1990 through early 2026. We process the raw data without
          filtering or editorializing — every metric is a transparent aggregation of official government data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/methodology" className="text-sm text-primary hover:underline font-medium">Our Methodology →</Link>
          <Link href="/faq" className="text-sm text-primary hover:underline font-medium">FAQ →</Link>
          <Link href="/disclaimer" className="text-sm text-primary hover:underline font-medium">Disclaimer →</Link>
        </div>
      </div>


      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for manufacturer landscape and market concentration
          is shifting. Annual VAERS reports in 2025-2026 have returned to the 35,000-45,000 range typical of
          the pre-pandemic era (2015-2019), making year-over-year comparisons more meaningful again.
        </p>
        <p>
          The HHS administration has signaled increased focus on vaccine safety data analysis, including
          the development of AI-powered tools for pattern detection in VAERS reports. While these tools
          are still under development, they represent a potential evolution in how adverse event data
          is analyzed and interpreted.
        </p>
        <p>
          New vaccines entering the market — including RSV vaccines for older adults and pregnant women,
          updated COVID-19 formulations, and potential H5N1 avian flu vaccines — continue to add new
          data streams to VAERS. Each new vaccine type provides additional context for understanding
          manufacturer landscape and market concentration across the full spectrum of vaccine safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Limitations of This Analysis</h2>
        <p>
          This analysis is based entirely on VAERS passive surveillance data, which carries important
          limitations that must be understood:
        </p>
        <ul>
          <li><strong>Underreporting:</strong> Studies estimate that only 1-10% of adverse events are
          reported to VAERS. This means the true number of events is likely much higher than what
          appears in the data.</li>
          <li><strong>Stimulated reporting:</strong> Media coverage and public awareness can temporarily
          increase reporting rates for specific vaccines, independent of any change in actual safety.</li>
          <li><strong>No control group:</strong> VAERS does not include a comparison group of unvaccinated
          individuals, making it impossible to determine whether reported events occurred at a higher
          rate than expected.</li>
          <li><strong>Variable data quality:</strong> VAERS reports range from detailed medical records
          submitted by healthcare providers to brief descriptions from patients. Not all reports
          are verified for medical accuracy.</li>
          <li><strong>Duplicate reports:</strong> The same event may be reported by multiple people
          (patient, doctor, manufacturer), and some duplicates may remain in the data.</li>
        </ul>
        <p>
          For these reasons, VAERS data is best used for signal detection — identifying potential safety
          concerns that warrant further investigation — rather than for definitive risk assessment. When
          VAERS surfaces a potential signal, it is investigated using more rigorous systems like the
          Vaccine Safety Datalink (VSD) and controlled epidemiological studies.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About This Data</h3>
        <p className="text-gray-600 text-sm mb-3">
          All data on VaccineWatch comes from the official VAERS public-use datasets published by the CDC and FDA.
          Our current dataset covers reports from 1990 through early 2026. We process the raw data without
          filtering or editorializing — every metric is a transparent aggregation of official government data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/methodology" className="text-sm text-primary hover:underline font-medium">Our Methodology →</Link>
          <Link href="/faq" className="text-sm text-primary hover:underline font-medium">FAQ →</Link>
          <Link href="/disclaimer" className="text-sm text-primary hover:underline font-medium">Disclaimer →</Link>
        </div>
      </div>

<div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 Impact</div>
            <div className="text-sm text-gray-500">How the pandemic changed reporting</div>
          </Link>
          <Link href="/manufacturers" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">All Manufacturers</div>
            <div className="text-sm text-gray-500">Browse all manufacturer data</div>
          </Link>
          <Link href="/analysis/covid-vs-flu" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 vs Influenza Vaccines</div>
            <div className="text-sm text-gray-500">Comparing the two largest categories</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
