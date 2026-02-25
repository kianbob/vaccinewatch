import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'COVID-19 Vaccine Side Effects — VAERS Data Analysis | VaccineWatch',
  description: 'Complete analysis of COVID-19 vaccine side effects reported to VAERS. 1.1M+ reports covering Pfizer, Moderna, J&J, and Novavax with full context and disclaimers.',
  openGraph: {
    title: 'COVID-19 Vaccine Side Effects — VAERS Data Analysis',
    description: '1.1M+ COVID vaccine adverse event reports analyzed with context.',
  },
}

export default function CovidSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const covidVaccine = vaccineIndex.find((v: any) => v.type === 'COVID19')
  const covidVaccine2 = vaccineIndex.find((v: any) => v.type === 'COVID19-2')

  // Combine COVID data
  const totalReports = (covidVaccine?.reports || 0) + (covidVaccine2?.reports || 0)
  const totalDeaths = (covidVaccine?.died || 0) + (covidVaccine2?.died || 0)
  const totalHosp = (covidVaccine?.hosp || 0) + (covidVaccine2?.hosp || 0)
  const totalER = (covidVaccine?.er || 0) + (covidVaccine2?.er || 0)
  const totalDisabled = (covidVaccine?.disabled || 0) + (covidVaccine2?.disabled || 0)

  // Top symptoms
  const symptoms = covidVaccine?.symptoms || []
  const topSymptoms = symptoms.slice(0, 15)

  // Manufacturers
  const manufacturers = covidVaccine?.manufacturers || []

  // Age distribution
  const ageGroups = covidVaccine?.ageGroups || {}

  // Year breakdown
  const yearly = covidVaccine?.yearly || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'COVID-19 Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">8 min read</div>
          <ShareButtons title="COVID-19 Vaccine Side Effects — VAERS Analysis | VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          COVID-19 Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A data-driven look at adverse events reported after COVID-19 vaccination. With over {formatNumber(totalReports)} VAERS 
          reports, COVID vaccines generated more reports than all other vaccines combined — but context matters.
        </p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-xs text-primary">Total Reports</div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-red-600">{formatNumber(totalDeaths)}</div>
          <div className="text-xs text-red-500">Deaths Reported</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-amber-600">{formatNumber(totalHosp)}</div>
          <div className="text-xs text-amber-500">Hospitalizations</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-gray-900">{formatNumber(totalER)}</div>
          <div className="text-xs text-gray-500">ER Visits</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-gray-900">{formatNumber(totalDisabled)}</div>
          <div className="text-xs text-gray-500">Disabilities</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why So Many Reports?</h2>
        <p>
          COVID-19 vaccines generated an unprecedented volume of VAERS reports for several reasons:
        </p>
        <ul>
          <li><strong>Massive scale:</strong> Over 670 million COVID vaccine doses administered in the U.S. alone</li>
          <li><strong>Heightened awareness:</strong> Public and media attention led to higher reporting rates</li>
          <li><strong>Healthcare provider mandates:</strong> Providers were required to report certain adverse events for COVID vaccines</li>
          <li><strong>V-safe parallel system:</strong> CDC&apos;s active monitoring caught more events</li>
          <li><strong>Rapid timeline:</strong> Emergency Use Authorization meant active safety monitoring was critical</li>
        </ul>
        <p>
          The high report count reflects <em>reporting intensity</em>, not necessarily higher risk. 
          A vaccine given to 270+ million Americans will naturally generate more reports than one 
          given to 4 million children. See our{' '}
          <Link href="/analysis/denominator-problem">denominator problem analysis</Link>.
        </p>

        <h2 className={playfairDisplay.className}>Most Common COVID Vaccine Side Effects</h2>
        <p>The most frequently reported symptoms after COVID-19 vaccination:</p>
      </div>

      {/* Symptoms list */}
      <div className="space-y-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/covid19/symptoms/${slugify(s.name)}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-primary/60 w-6">#{i + 1}</span>
              <span className="font-medium text-gray-900">{s.name}</span>
            </div>
            <span className="text-sm text-gray-500 font-mono">{formatNumber(s.count)} reports</span>
          </Link>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <p>
          Most of these are <strong>expected, mild reactions</strong> — headache, fatigue, fever, and 
          pain are normal signs of immune response. They typically resolve within 1-3 days.
        </p>

        <h2 className={playfairDisplay.className}>COVID Vaccines by Manufacturer</h2>
        <p>Reports are distributed across manufacturers proportional to their market share:</p>
      </div>

      {/* Manufacturer breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {manufacturers.map((m: any) => {
          const pct = totalReports > 0 ? ((m.count / totalReports) * 100).toFixed(1) : '0'
          return (
            <div key={m.name} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="font-medium text-gray-900 mb-1">{m.name.replace(/\\/g, ' / ')}</div>
              <div className="text-2xl font-bold text-primary">{formatNumber(m.count)}</div>
              <div className="text-sm text-gray-500">{pct}% of COVID reports</div>
              <div className="mt-2 bg-gray-100 rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: `${Math.min(Number(pct), 100)}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Reports by Year</h2>
        <p>
          COVID vaccine reports peaked in 2021 during the initial mass vaccination campaign 
          and have declined steadily as booster uptake decreased:
        </p>
      </div>

      {/* Year breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {yearly.filter((y: any) => y.count > 0).map((y: any) => (
          <Link
            key={y.year}
            href={`/vaccines/covid19/${y.year}`}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-lg font-bold text-gray-900">{y.year}</div>
            <div className="text-primary font-mono">{formatNumber(y.count)}</div>
            <div className="text-xs text-gray-400">reports</div>
          </Link>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Age Distribution</h2>
        <p>COVID vaccine reports span all age groups, reflecting the broad eligibility:</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
        {Object.entries(ageGroups).map(([group, count]) => (
          <div key={group} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">{group}</div>
            <div className="text-xl font-bold text-gray-900">{formatNumber(count as number)}</div>
            <div className="text-xs text-gray-400">{totalReports > 0 ? ((count as number / totalReports) * 100).toFixed(1) : 0}%</div>
          </div>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Serious but Rare: Myocarditis</h2>
        <p>
          One of the confirmed rare side effects of mRNA COVID vaccines (Pfizer and Moderna) is 
          myocarditis — inflammation of the heart muscle — particularly in young males after the 
          second dose. While the risk is real, it&apos;s important to note:
        </p>
        <ul>
          <li>Most cases are mild and resolve with treatment</li>
          <li>The risk is highest in males aged 12-29</li>
          <li>COVID-19 infection itself carries a higher myocarditis risk than vaccination</li>
        </ul>
        <p>
          Read our full <Link href="/analysis/myocarditis">myocarditis analysis</Link> for detailed data.
        </p>

        <h2 className={playfairDisplay.className}>The Bottom Line</h2>
        <p>
          COVID-19 vaccines have the most VAERS reports of any vaccine by far, but this reflects 
          an unprecedented vaccination campaign with enhanced reporting requirements — not 
          necessarily higher risk per dose. When adjusted for the hundreds of millions of doses 
          administered, the adverse event rates are consistent with clinical trial data.
        </p>
        <p>
          This page presents the raw data transparently. For medical advice about COVID vaccination, 
          consult your healthcare provider.
        </p>
      </div>

      {/* CTA */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore COVID-19 Vaccine Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/vaccines/covid19" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">COVID-19 Vaccine Detail Page →</div>
            <div className="text-sm text-gray-500">Full VAERS profile with charts</div>
          </Link>
          <Link href="/analysis/covid-impact" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">COVID Impact Analysis →</div>
            <div className="text-sm text-gray-500">How COVID changed VAERS reporting</div>
          </Link>
          <Link href="/analysis/covid-vs-flu" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">COVID vs Flu Comparison →</div>
            <div className="text-sm text-gray-500">Side-by-side vaccine analysis</div>
          </Link>
          <Link href="/tools/severity-profile" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Severity Profile Tool →</div>
            <div className="text-sm text-gray-500">Compare COVID to other vaccines</div>
          </Link>
        </div>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Side Effect Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/side-effects" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">All Vaccine Side Effects</div>
            <div className="text-sm text-gray-500">Overview across all vaccines</div>
          </Link>
          <Link href="/analysis/myocarditis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Myocarditis Deep Dive</div>
            <div className="text-sm text-gray-500">Heart inflammation data</div>
          </Link>
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Death Reports Analysis</div>
            <div className="text-sm text-gray-500">Understanding mortality data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
