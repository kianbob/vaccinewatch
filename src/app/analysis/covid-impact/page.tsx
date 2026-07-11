import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { CovidImpactChartsClient as CovidImpactCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'COVID-19 Vaccine Impact on VAERS — 768K Adverse Event Reports Explained',
  description: 'How COVID-19 transformed vaccine safety reporting: 768,706 VAERS reports in 2021 alone, more than the prior decade combined. The data and essential context.',
  openGraph: {
    title: 'COVID-19 Vaccine Impact on VAERS — 768K Adverse Event Reports Explained',
    description: 'How COVID-19 transformed vaccine safety reporting: 768,706 VAERS reports in 2021 alone, more than the prior decade combined. The data and essential context.',
  },
}

export default function CovidImpactPage() {
  const yearlyStats = readJsonFile('yearly-stats.json')
  const vaccineIndex = readJsonFile('vaccine-index.json')

  // Find COVID vaccine data
  const covidVaccine = vaccineIndex.find((v: { type: string }) => v.type === 'COVID19')

  // Calculate pre-COVID average
  const preCovid = yearlyStats.filter((y: { year: number }) => y.year >= 2010 && y.year <= 2019)
  const preCovidAvg = Math.round(preCovid.reduce((s: number, y: { reports: number }) => s + y.reports, 0) / preCovid.length)

  // COVID era total
  const covidEra = yearlyStats.filter((y: { year: number }) => y.year >= 2020 && y.year <= 2022)
  const covidEraTotal = covidEra.reduce((s: number, y: { reports: number }) => s + y.reports, 0)

  const year2021 = yearlyStats.find((y: { year: number }) => y.year === 2021)

  // Manufacturer data for COVID vaccines
  const manufacturerIndex = readJsonFile('manufacturer-index.json')
  const covidManufacturers = manufacturerIndex
    .filter((m: { vaccines?: { type: string }[] }) => m.vaccines?.some((v: { type: string }) => v.type === 'COVID19' || v.type === 'COVID19-2'))
    .map((m: { name: string; vaccines?: { type: string; count: number }[] }) => ({
      name: m.name,
      count: m.vaccines?.filter((v: { type: string }) => v.type === 'COVID19' || v.type === 'COVID19-2').reduce((s: number, v: { count: number }) => s + v.count, 0) || 0,
    }))
    .sort((a: { count: number }, b: { count: number }) => b.count - a.count)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="The COVID-19 Impact on VAERS" description="How the COVID-19 pandemic changed vaccine adverse event reporting, with data analysis of the unprecedented spike in VAERS reports." slug="covid-impact" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'The COVID-19 Impact on VAERS' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-danger uppercase tracking-wider">8 min read</div><ShareButtons title="The COVID-19 Impact on VAERS - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          The COVID-19 Impact on VAERS
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The COVID-19 pandemic fundamentally changed vaccine adverse event reporting.
          In 2021, VAERS received more reports than in the previous decade combined.
        </p>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-danger mb-1">{formatNumber(year2021?.reports || 768706)}</div>
          <div className="text-gray-700">reports in 2021 alone — a <strong>{Math.round((year2021?.reports || 768706) / preCovidAvg)}x</strong> increase over the pre-COVID average of {formatNumber(preCovidAvg)}/year</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Unprecedented Spike</h2>
        <p>
          Between 1990 and 2019, VAERS received an average of about {formatNumber(preCovidAvg)} reports per year.
          Then came 2021. With the largest mass vaccination campaign in U.S. history, VAERS received
          {' '}<strong>{formatNumber(year2021?.reports || 768706)}</strong> reports in a single year —
          more than the entire period from 2005 to 2015 combined.
        </p>
        <p>
          The COVID-19 era ({formatNumber(covidEraTotal)} reports from 2020-2022) accounts for
          roughly <strong>{((covidEraTotal / 1983260) * 100).toFixed(0)}%</strong> of all VAERS reports ever submitted.
          This is a staggering concentration, but context is essential to understanding it.
        </p>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <CovidImpactCharts yearlyData={yearlyStats} manufacturerData={covidManufacturers} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why So Many Reports?</h2>
        <p>Several factors drove the unprecedented surge:</p>
        <ul>
          <li><strong>Scale of vaccination:</strong> Over 670 million COVID-19 doses were administered in the U.S. alone. More doses = more opportunities for temporal associations with adverse events.</li>
          <li><strong>Heightened awareness:</strong> The COVID-19 vaccines received unprecedented media attention. People were more aware of VAERS and more likely to report.</li>
          <li><strong>Reporting mandates:</strong> Healthcare providers were required to report certain events after COVID-19 vaccination, unlike many other vaccines.</li>
          <li><strong>EUA monitoring:</strong> Because the vaccines were initially under Emergency Use Authorization, there was intensified safety surveillance.</li>
          <li><strong>Public attention:</strong> Vaccines became a central topic of public discourse, driving more voluntary reporting.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Pfizer vs. Moderna vs. Janssen</h2>
        <p>
          COVID-19 vaccine reports are dominated by the two mRNA vaccines.
          {covidVaccine && (
            <> The combined COVID-19 vaccine category has {formatNumber(covidVaccine.reports)} total reports,
            making it by far the largest single vaccine category in VAERS history.</>
          )}
        </p>
        <p>
          Pfizer-BioNTech and Moderna together account for over 92% of all COVID-19 vaccine VAERS reports.
          This reflects their dominant market share — they administered the vast majority of doses. Janssen (Johnson & Johnson)
          has a smaller share, partly because its single-dose regimen was less widely used and was later deprioritized.
        </p>

        <h2 className={playfairDisplay.className}>The Denominator Problem</h2>
        <p>
          It&apos;s tempting to look at these numbers and draw conclusions about vaccine safety. But the most
          important number is the one VAERS doesn&apos;t provide: <strong>the denominator</strong>.
        </p>
        <p>
          With 670+ million doses administered, a report rate of roughly 1,000 per million doses puts COVID-19
          vaccines in line with historical VAERS reporting rates for other widely-administered vaccines.
          The raw numbers are large because the number of doses was unprecedented.
        </p>
      </div>

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>The 2021 VAERS spike is historically unprecedented but driven primarily by the scale of vaccination</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>COVID-19 vaccines account for ~{((covidEraTotal / 1983260) * 100).toFixed(0)}% of all VAERS reports ever filed</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>Heightened awareness, reporting mandates, and EUA monitoring all contributed to elevated reporting</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Without denominator data (doses administered), raw report counts cannot determine relative safety</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      
      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for COVID-19 impact on VAERS reporting
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
          COVID-19 impact on VAERS reporting across the full spectrum of vaccine safety surveillance.
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
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for COVID-19 impact on VAERS reporting
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
          COVID-19 impact on VAERS reporting across the full spectrum of vaccine safety surveillance.
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
          <Link href="/analysis/reporting-trends" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">35 Years of VAERS Reporting</div>
            <div className="text-sm text-gray-500">The full historical context</div>
          </Link>
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Understanding Death Reports</div>
            <div className="text-sm text-gray-500">What death reports actually mean</div>
          </Link>
          <Link href="/analysis/myocarditis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Myocarditis Deep Dive</div>
            <div className="text-sm text-gray-500">The most closely-watched COVID-era safety signal</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
