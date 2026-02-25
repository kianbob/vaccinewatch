import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { PediatricChartsClient as PediatricCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Pediatric VAERS Analysis - Children 0-17',
  description: 'Analysis of VAERS adverse event reports for children ages 0-17. Age patterns, vaccine types, and outcome severity in pediatric populations.'
}

export default function PediatricPage() {
  const ageGender = readJsonFile('age-gender.json')
  const vaccineIndex = readJsonFile('vaccine-index.json')

  const group0to2 = ageGender.ageGroups.find((g: any) => g.group === '0-2')
  const group3to17 = ageGender.ageGroups.find((g: any) => g.group === '3-17')

  const pediatricReports = (group0to2?.reports || 0) + (group3to17?.reports || 0)
  const pediatricDeaths = (group0to2?.died || 0) + (group3to17?.died || 0)
  const pediatricHosp = (group0to2?.hospitalized || 0) + (group3to17?.hospitalized || 0)

  const totalReports = ageGender.ageGroups.reduce((s: number, g: any) => s + g.reports, 0)
  const pediatricPct = totalReports > 0 ? (pediatricReports / totalReports * 100).toFixed(1) : '0'

  const pediatricAgeData = [group0to2, group3to17].filter(Boolean)

  // Common pediatric vaccines
  const pediatricVaccineTypes = ['DTAP', 'DTAPIPV', 'DTAPIPVHIB', 'MMR', 'MMRV', 'VARCEL', 'IPV', 'HIBV', 'PNC', 'PNC13', 'ROTAV', 'HEPB', 'HEPA']
  const topPediatricVaccines = vaccineIndex
    .filter((v: any) => pediatricVaccineTypes.includes(v.type))
    .sort((a: any, b: any) => b.reports - a.reports)
    .slice(0, 10)
    .map((v: any) => ({ type: v.type, reports: v.reports }))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Pediatric VAERS Analysis' }]} />

      <div className="mb-12">
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">6 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Pediatric VAERS Reports
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Children ages 0-17 represent a unique population in VAERS reporting. With distinct vaccination
          schedules and physiology, their adverse event profiles differ from adults.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-primary mb-1">{formatNumber(pediatricReports)}</div>
          <div className="text-gray-700">pediatric reports (0-17) — <strong>{pediatricPct}%</strong> of all VAERS reports</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Pediatric Landscape</h2>
        <p>
          Children ages 0-17 account for <strong>{formatNumber(pediatricReports)}</strong> VAERS reports,
          representing {pediatricPct}% of the total. The youngest group (0-2) has{' '}
          <strong>{formatNumber(group0to2?.reports || 0)}</strong> reports, while children 3-17 account for{' '}
          <strong>{formatNumber(group3to17?.reports || 0)}</strong>.
        </p>
        <p>
          Notably, infants (0-2) have a disproportionately high number of death reports ({formatNumber(group0to2?.died || 0)})
          relative to their total reports. This reflects the tragic reality of Sudden Infant Death Syndrome (SIDS)
          and other conditions that can occur in infancy, some of which may be temporally associated with routine
          vaccination without being caused by it.
        </p>

        <h2 className={playfairDisplay.className}>Childhood Vaccination Schedule</h2>
        <p>
          The CDC recommends a standard childhood vaccination schedule that covers dozens of doses in the first few
          years of life. Vaccines like DTaP, MMR, varicella, and pneumococcal are routinely administered. Because
          so many doses are given to young children, a significant portion of VAERS reports naturally come from this age group.
        </p>

        <h2 className={playfairDisplay.className}>Outcome Severity</h2>
        <p>
          Among pediatric reports, <strong className="text-danger">{formatNumber(pediatricDeaths)}</strong> mentioned
          death and <strong className="text-accent">{formatNumber(pediatricHosp)}</strong> involved hospitalization.
          The death rate among 0-2 year old reports ({((group0to2?.died || 0) / (group0to2?.reports || 1) * 100).toFixed(1)}%)
          is notably higher than for 3-17 year olds ({((group3to17?.died || 0) / (group3to17?.reports || 1) * 100).toFixed(1)}%),
          again reflecting SIDS and neonatal conditions.
        </p>
      </div>

      <div className="mb-12">
        <PediatricCharts ageData={pediatricAgeData} topVaccines={topPediatricVaccines} />
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>Children 0-17 account for {pediatricPct}% of all VAERS reports</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Infants (0-2) have higher death report rates, largely reflecting SIDS and neonatal conditions</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>The intensive childhood vaccination schedule means more temporal associations with common conditions</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>VAERS reports alone cannot establish that vaccines caused any observed adverse event</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/age-patterns" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Age Patterns in VAERS</div>
            <div className="text-sm text-gray-500">Full age group analysis</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious Outcomes Analysis</div>
            <div className="text-sm text-gray-500">Severity across all demographics</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
