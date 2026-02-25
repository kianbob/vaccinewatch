import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { ElderlyChartsClient as ElderlyCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Elderly VAERS Analysis - Adults 65+',
  description: 'Deep dive into VAERS adverse event reports for adults 65 and older. Why this age group has the highest serious outcome rates.'
}

export default function ElderlyPage() {
  const ageGender = readJsonFile('age-gender.json')
  const stats = readJsonFile('stats.json')

  const elderly = ageGender.ageGroups.find((g: any) => g.group === '65+')
  const totalReports = ageGender.ageGroups.reduce((s: number, g: any) => s + g.reports, 0)
  const totalDeaths = ageGender.ageGroups.reduce((s: number, g: any) => s + (g.died || 0), 0)

  const elderlyReports = elderly?.reports || 0
  const elderlyDeaths = elderly?.died || 0
  const elderlyHosp = elderly?.hospitalized || 0

  const elderlyPct = (elderlyReports / totalReports * 100).toFixed(1)
  const elderlyDeathPct = totalDeaths > 0 ? (elderlyDeaths / totalDeaths * 100).toFixed(0) : '0'
  const elderlyMortalityRate = elderlyReports > 0 ? (elderlyDeaths / elderlyReports * 100).toFixed(1) : '0'
  const overallMortalityRate = totalReports > 0 ? (totalDeaths / totalReports * 100).toFixed(1) : '0'

  const ageComparison = ageGender.ageGroups.filter((g: any) => g.group !== 'Unknown')

  const outcomeData = [
    {
      metric: 'Death Rate',
      elderly: elderlyReports > 0 ? elderlyDeaths / elderlyReports * 100 : 0,
      allAges: totalReports > 0 ? totalDeaths / totalReports * 100 : 0,
    },
    {
      metric: 'Hosp. Rate',
      elderly: elderlyReports > 0 ? elderlyHosp / elderlyReports * 100 : 0,
      allAges: totalReports > 0 ? stats.totalHospitalized / totalReports * 100 : 0,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'The 65+ Age Group' }]} />

      <div className="mb-12">
        <div className="text-xs font-medium text-danger uppercase tracking-wider mb-2">7 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          The 65+ Age Group in VAERS
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Adults 65 and older represent {elderlyPct}% of all VAERS reports but account for
          a disproportionate {elderlyDeathPct}% of death reports. Understanding why requires context.
        </p>
        <div className="bg-danger/5 border border-danger/20 rounded-lg p-6">
          <div className="text-3xl font-bold text-danger mb-1">{elderlyDeathPct}%</div>
          <div className="text-gray-700">of all death reports come from the 65+ age group, despite being only {elderlyPct}% of total reports</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why the Elderly Are Different</h2>
        <p>
          The 65+ age group has <strong>{formatNumber(elderlyReports)}</strong> VAERS reports with a
          mortality rate of <strong>{elderlyMortalityRate}%</strong> — significantly higher than the
          overall rate of {overallMortalityRate}%. Several factors explain this disparity:
        </p>
        <ul>
          <li><strong>Higher baseline mortality:</strong> Older adults have higher rates of death from all causes. Events that coincide temporally with vaccination are more common.</li>
          <li><strong>Comorbidities:</strong> Chronic conditions like heart disease, diabetes, and cancer are more prevalent, increasing vulnerability to any health event.</li>
          <li><strong>Flu and COVID-19 campaigns:</strong> Annual influenza vaccination and COVID-19 boosters mean elderly adults receive more doses, creating more opportunities for temporal associations.</li>
          <li><strong>Nursing home reporting:</strong> Deaths in long-term care facilities are more systematically reported to VAERS, especially during COVID-19.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Hospitalization Patterns</h2>
        <p>
          <strong>{formatNumber(elderlyHosp)}</strong> reports for the 65+ group involved hospitalization,
          a rate of {(elderlyHosp / elderlyReports * 100).toFixed(1)}% compared to the overall
          rate of {(stats.totalHospitalized / totalReports * 100).toFixed(1)}%. Again, this reflects the
          higher baseline hospitalization rate for older adults, not necessarily vaccine-caused events.
        </p>

        <h2 className={playfairDisplay.className}>The Denominator Problem</h2>
        <p>
          Without knowing how many doses were administered to people 65+, we cannot calculate true adverse event
          rates. The elderly receive a disproportionate share of certain vaccines (influenza, pneumococcal,
          shingles, COVID-19 boosters), which inflates their raw report numbers.
        </p>
      </div>

      <div className="mb-12">
        <ElderlyCharts ageComparison={ageComparison} outcomeData={outcomeData} />
      </div>

      <div className="bg-danger/5 border border-danger/20 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">1.</span>
            <span>Adults 65+ account for {elderlyDeathPct}% of death reports despite being {elderlyPct}% of total reports</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">2.</span>
            <span>Higher baseline mortality and comorbidities drive higher serious outcome rates</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">3.</span>
            <span>Systematic reporting from nursing homes inflates elderly report counts</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">4.</span>
            <span>Per-dose rates (which VAERS cannot provide) are essential for meaningful safety comparisons</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/age-patterns" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Age Patterns in VAERS</div>
            <div className="text-sm text-gray-500">Full age group analysis</div>
          </Link>
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Understanding Death Reports</div>
            <div className="text-sm text-gray-500">What death reports mean</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
