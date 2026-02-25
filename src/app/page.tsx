import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, getCleanVaccineName } from '@/lib/utils'

interface VaccineIndex {
  name: string
  type: string
  reports: number
  died: number
  hosp: number
}
import StatCard from '@/components/StatCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import { YearlyTrendChartClient as YearlyTrendChart } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'VaccineWatch — VAERS Adverse Event Reports Exposed, Explored, Explained',
  description: 'Comprehensive analysis of 1.98 million vaccine adverse event reports from VAERS. Transparent data on 104 vaccines, 500 symptoms, and 35 years of reporting history.',
}

const recentArticles = [
  {
    slug: 'denominator-problem',
    title: 'Why Raw VAERS Numbers Can Be Misleading',
    subtitle: 'The most critical limitation: 670M+ COVID doses make raw counts meaningless without context',
    readTime: 9,
  },
  {
    slug: 'onset-timing',
    title: 'When Do Vaccine Side Effects Start?',
    subtitle: '73% of adverse events occur within 3 days — the timing patterns explained',
    readTime: 7,
  },
  {
    slug: 'lot-analysis',
    title: 'Understanding Vaccine Lot Numbers',
    subtitle: '4,414 COVID lots tracked — why comparing lots by report counts is misleading',
    readTime: 8,
  },
  {
    slug: 'dose-comparison',
    title: 'First Dose vs Second Dose vs Booster',
    subtitle: 'How adverse event patterns change across COVID-19 vaccine doses',
    readTime: 6,
  },
  {
    slug: 'covid-impact',
    title: 'The COVID-19 Impact on VAERS',
    subtitle: 'How the pandemic changed vaccine adverse event reporting forever',
    readTime: 8,
  },
  {
    slug: 'serious-outcomes',
    title: 'Serious vs Non-Serious Outcomes',
    subtitle: 'Understanding the spectrum of adverse event severity',
    readTime: 7,
  },
]

export default function HomePage() {
  const stats = readJsonFile('stats.json')
  const yearlyStats = readJsonFile('yearly-stats.json')
  const vaccines: VaccineIndex[] = readJsonFile('vaccine-index.json')
  const topVaccines = [...vaccines].sort((a, b) => b.reports - a.reports).slice(0, 10)

  // Quick Stats: COVID vs all other vaccines
  const covidVaccines = vaccines.filter(v => v.type.startsWith('COVID'))
  const otherVaccines = vaccines.filter(v => !v.type.startsWith('COVID'))
  const covidReports = covidVaccines.reduce((s, v) => s + v.reports, 0)
  const covidDeaths = covidVaccines.reduce((s, v) => s + v.died, 0)
  const otherReports = otherVaccines.reduce((s, v) => s + v.reports, 0)
  const otherDeaths = otherVaccines.reduce((s, v) => s + v.died, 0)

  return (
    <div className="min-h-screen">
      <DisclaimerBanner />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>
            {formatNumber(stats.totalReports)} Vaccine Adverse Event Reports
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            <span className="text-primary font-semibold">Exposed.</span>{' '}
            <span className="text-accent font-semibold">Explored.</span>{' '}
            <span className="text-gray-900 font-semibold">Explained.</span>
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Transparent access to 35 years of VAERS data (1990–2026).
            We present the numbers with context, not conclusions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vaccines"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Explore Vaccines
            </Link>
            <Link
              href="/analysis"
              className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Read Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
              Key Numbers at a Glance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These are the raw numbers from VAERS. Remember: reports don&apos;t prove causation,
              but transparency is essential for informed decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard
              title="Total Reports"
              value={stats.totalReports}
              subtitle="Since 1990"
              color="primary"
            />
            <StatCard
              title="Deaths Reported"
              value={stats.totalDied}
              subtitle="Correlation ≠ causation"
              color="danger"
            />
            <StatCard
              title="Hospitalizations"
              value={stats.totalHospitalized}
              subtitle="Serious adverse events"
              color="accent"
            />
            <StatCard
              title="ER Visits"
              value={stats.totalER}
              subtitle="Emergency department"
              color="gray"
            />
            <StatCard
              title="Disabilities"
              value={stats.totalDisabled}
              subtitle="Reported disabilities"
              color="gray"
            />
          </div>
        </div>
      </section>

      {/* Quick Stats: COVID vs All Other Vaccines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
              COVID-19 vs All Other Vaccines
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              COVID-19 vaccines fundamentally changed VAERS reporting. Here&apos;s the scale of the difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="text-sm font-semibold text-danger uppercase tracking-wide mb-4">COVID-19 Vaccines</div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{formatNumber(covidReports)}</div>
                  <div className="text-sm text-gray-500">total reports ({(covidReports / stats.totalReports * 100).toFixed(0)}% of all)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-danger">{formatNumber(covidDeaths)}</div>
                  <div className="text-sm text-gray-500">death reports</div>
                </div>
                <div className="text-sm text-gray-500">{covidVaccines.length} vaccine products</div>
              </div>
              <Link href="/analysis/covid-impact" className="mt-4 inline-block text-sm text-primary font-medium hover:text-primary/80">
                Read the COVID impact analysis →
              </Link>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">All Other Vaccines</div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{formatNumber(otherReports)}</div>
                  <div className="text-sm text-gray-500">total reports ({(otherReports / stats.totalReports * 100).toFixed(0)}% of all)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-danger">{formatNumber(otherDeaths)}</div>
                  <div className="text-sm text-gray-500">death reports</div>
                </div>
                <div className="text-sm text-gray-500">{otherVaccines.length} vaccine products (1990–2026)</div>
              </div>
              <Link href="/analysis/covid-vs-flu" className="mt-4 inline-block text-sm text-primary font-medium hover:text-primary/80">
                Compare COVID vs flu vaccines →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Yearly Trend */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
              35 Years of VAERS Reporting
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how adverse event reporting has changed over time.
              Note the dramatic spike in 2021 with COVID-19 vaccine rollout.
            </p>
          </div>
          <YearlyTrendChart data={yearlyStats} />
        </div>
      </section>

      {/* Top 10 Vaccines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
              Top 10 Vaccines by Reports
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The most-reported vaccines in VAERS. Higher counts primarily reflect widespread use,
              not higher risk.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topVaccines.map((v, i) => (
              <Link
                key={v.type}
                href={`/vaccines/${v.type.toLowerCase()}`}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="text-xs text-gray-400 mb-1">#{i + 1}</div>
                <div className="font-medium text-gray-900 text-sm mb-1 truncate">{getCleanVaccineName(v.name)}</div>
                <div className="text-xs text-gray-500 mb-2">{v.type}</div>
                <div className="text-sm font-semibold text-primary">{formatNumber(v.reports)}</div>
                <div className="text-xs text-gray-400">reports</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/vaccines"
              className="text-primary font-semibold hover:text-primary/80"
            >
              View all 104 vaccines →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Analysis */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
              Recent Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              In-depth articles exploring trends and patterns in VAERS data with full context.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/analysis/${article.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <h3 className={`text-lg font-bold text-gray-900 mb-2 ${playfairDisplay.className}`}>
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{article.subtitle}</p>
                <span className="text-xs text-gray-400">{article.readTime} min read</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/analysis" className="text-primary font-semibold hover:text-primary/80">
              View all analysis articles →
            </Link>
          </div>
        </div>
      </section>

      {/* What is VAERS? */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>
                What is VAERS?
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  The <strong>Vaccine Adverse Event Reporting System (VAERS)</strong> is a passive surveillance system
                  jointly managed by the CDC and FDA. It accepts reports of adverse events following vaccination.
                </p>
                <p>
                  <strong>Anyone can report to VAERS</strong> — healthcare providers, vaccine manufacturers, patients,
                  or family members. This openness is both a strength (captures a wide range of potential signals)
                  and a limitation (reports aren&apos;t verified).
                </p>
                <p>
                  <strong>Key limitations:</strong> Reports alone don&apos;t prove causation. They might be coincidental,
                  incomplete, or inaccurate. But they&apos;re still valuable for safety signal detection.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center mt-6 text-primary font-semibold hover:text-primary/80"
              >
                Learn more about our methodology
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-accent/5 to-primary/10 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why This Matters</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>Transparency:</strong> The public deserves access to this data</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>Context:</strong> Raw numbers need proper interpretation</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>Education:</strong> Understanding helps informed decisions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>Balance:</strong> Neither pro-vax nor anti-vax — just data</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
              Explore the Data
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dive deep into vaccines, symptoms, and analysis. Every number tells a story,
              but context is everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/vaccines"
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">104 Vaccines</h3>
              <p className="text-gray-600">From COVID-19 to measles, explore adverse event reports for every vaccine in VAERS.</p>
            </Link>

            <Link
              href="/symptoms"
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">500 Symptoms</h3>
              <p className="text-gray-600">Which symptoms get reported most? Discover patterns in adverse event descriptions.</p>
            </Link>

            <Link
              href="/analysis"
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Deep Analysis</h3>
              <p className="text-gray-600">COVID impact, age patterns, myocarditis, and more. Context-rich analysis of the data.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final Disclaimer */}
      <section className="py-12 bg-amber-50 border-t border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl mr-3">⚠️</span>
            <h3 className="text-lg font-bold text-amber-800">Important Reminder</h3>
          </div>
          <p className="text-amber-700 leading-relaxed">
            This website presents VAERS data for transparency and education.
            <strong> Reports in VAERS do not prove that vaccines caused the reported adverse events.</strong>
            Always consult healthcare professionals for medical decisions.
            Our goal is informed transparency, not medical advice.
          </p>
        </div>
      </section>
    </div>
  )
}
