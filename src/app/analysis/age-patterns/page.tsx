import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { AgeChartsClient as AgeCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Age Patterns in VAERS Reports',
  description: 'Analysis of VAERS adverse event reports by age group, exploring who reports most and who has the most serious outcomes.'
}

export default function AgePatternsPage() {
  const ageGender = readJsonFile('age-gender.json')
  const ageGroups = ageGender.ageGroups

  const totalReports = ageGroups.reduce((s: number, g: { reports: number }) => s + g.reports, 0)
  const totalDeaths = ageGroups.reduce((s: number, g: { died: number }) => s + g.died, 0)

  const elderly = ageGroups.find((g: { group: string }) => g.group === '65+')
  const infants = ageGroups.find((g: { group: string }) => g.group === '0-2')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Age Patterns in VAERS Reports' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">6 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Age Patterns in VAERS Reports
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Who reports the most adverse events, and who experiences the most serious outcomes?
          Age is one of the most important factors in understanding VAERS data.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-primary mb-1">{formatNumber(elderly?.died || 15591)}</div>
          <div className="text-gray-700">
            death reports in the 65+ age group — <strong>{((elderly?.died / totalDeaths) * 100).toFixed(0)}%</strong> of all death reports,
            despite being {((elderly?.reports / totalReports) * 100).toFixed(0)}% of total reports
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Age Distribution</h2>
        <p>
          VAERS reports span all ages, from newborns to the elderly. But the distribution is far from uniform.
          Adults aged 18-49 file the most reports ({formatNumber(ageGroups.find((g: { group: string }) => g.group === '18-49')?.reports || 0)}),
          which makes sense given this is the largest demographic group.
        </p>
        <p>
          However, when we look at <strong>serious outcomes</strong>, the picture shifts dramatically.
          The 65+ age group accounts for {((elderly?.died / totalDeaths) * 100).toFixed(0)}% of all death reports
          and {((elderly?.hospitalized / ageGroups.reduce((s: number, g: { hospitalized: number }) => s + g.hospitalized, 0)) * 100).toFixed(0)}% of hospitalizations,
          despite representing just {((elderly?.reports / totalReports) * 100).toFixed(0)}% of total reports.
        </p>
      </div>

      {/* Chart */}
      <div className="mb-12">
        <AgeCharts ageGroups={ageGroups} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Infant Question (0-2 Years)</h2>
        <p>
          The 0-2 age group has {formatNumber(infants?.reports || 0)} reports with {formatNumber(infants?.died || 0)} death reports.
          This is a significant number that requires careful context:
        </p>
        <ul>
          <li><strong>Intensive vaccination schedule:</strong> Infants receive more vaccine doses in their first two years than any other period, creating more temporal associations</li>
          <li><strong>SIDS overlap:</strong> Sudden Infant Death Syndrome (SIDS) naturally peaks in the 2-4 month age range — the same period as many infant vaccinations. Temporal coincidence is expected</li>
          <li><strong>Mandatory reporting:</strong> Healthcare providers are required to report certain events in this age group, increasing the reporting rate</li>
          <li><strong>Heightened parental vigilance:</strong> Parents of young children may be more likely to report any health concern following vaccination</li>
        </ul>

        <h2 className={playfairDisplay.className}>Why the Elderly Have More Serious Outcomes</h2>
        <p>
          The concentration of death reports in the 65+ group reflects a fundamental reality:
          older adults have higher baseline mortality rates. When millions of elderly people are vaccinated,
          some will experience serious health events purely by coincidence in the days and weeks following vaccination.
        </p>
        <p>
          During the COVID-19 vaccination campaign, the elderly were prioritized for early vaccination.
          This population was already at highest risk for COVID-19 and had the highest baseline mortality rate.
          The temporal proximity of vaccination and natural health events creates inevitable coincidental reports.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {ageGroups
          .filter((g: { group: string }) => g.group !== 'Unknown')
          .map((g: { group: string; reports: number; died: number; hospitalized: number }) => (
          <div key={g.group} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-lg font-bold text-gray-900">{g.group}</div>
            <div className="text-sm text-gray-500 mt-1">
              <div>{formatNumber(g.reports)} reports</div>
              <div className="text-danger">{formatNumber(g.died)} deaths</div>
              <div>{formatNumber(g.hospitalized)} hospitalizations</div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Death rate: {((g.died / g.reports) * 100).toFixed(1)}% of reports
            </div>
          </div>
        ))}
      </div>

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>Adults 65+ have the highest rate of serious outcomes in VAERS, reflecting higher baseline health risks</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Infant reports are driven by intensive vaccination schedules and mandatory reporting, not necessarily higher risk</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>Age-related patterns in VAERS largely mirror age-related patterns in general health outcomes</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Understanding Death Reports</div>
            <div className="text-sm text-gray-500">Context for death reports in VAERS</div>
          </Link>
          <Link href="/analysis/gender-patterns" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Gender Disparities</div>
            <div className="text-sm text-gray-500">Why women report more often</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
