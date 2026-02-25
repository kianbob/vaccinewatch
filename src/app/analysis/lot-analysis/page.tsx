import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { LotAnalysisChartsClient as LotAnalysisCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Understanding Vaccine Lot Numbers in VAERS',
  description: 'Analysis of COVID-19 vaccine lot numbers in VAERS reports. Why lot analysis can be misleading without proper context about manufacturing and distribution.'
}

export default function LotAnalysisPage() {
  const lotData = readJsonFile('lot-numbers.json')

  // Calculate basic statistics
  const totalLots = lotData.length
  const totalReports = lotData.reduce((sum: number, lot: any) => sum + lot.reports, 0)
  const totalDeaths = lotData.reduce((sum: number, lot: any) => sum + lot.died, 0)
  const totalHosp = lotData.reduce((sum: number, lot: any) => sum + lot.hosp, 0)

  // Top lots by reports
  const topLotsByReports = [...lotData].sort((a: any, b: any) => b.reports - a.reports).slice(0, 20)
  const topLot = topLotsByReports[0]

  // Distribution analysis
  const reportCounts = lotData.map((lot: any) => lot.reports)
  const avgReportsPerLot = (totalReports / totalLots).toFixed(1)
  const medianReports = reportCounts.sort((a: any, b: any) => a - b)[Math.floor(reportCounts.length / 2)]

  // Lots with different report levels
  const lotsUnder10 = lotData.filter((lot: any) => lot.reports < 10).length
  const lots10to50 = lotData.filter((lot: any) => lot.reports >= 10 && lot.reports < 50).length
  const lots50Plus = lotData.filter((lot: any) => lot.reports >= 50).length

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="Understanding Vaccine Lot Numbers in VAERS" description="Analysis of COVID-19 vaccine lot numbers in VAERS reports. Why lot analysis can be misleading without proper context about manufacturing and distribution." slug="lot-analysis" />
      
      {/* Extra Warning Banner for Lot Analysis */}
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-red-500 text-xl">🚨</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-800">
              <strong>Critical Warning:</strong> Lot analysis is extremely misleading without knowing lot sizes. 
              A lot with more reports could simply be a larger lot that was distributed more widely. 
              Raw report counts by lot number CANNOT determine safety without distribution data.
            </p>
          </div>
        </div>
      </div>

      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Understanding Vaccine Lot Numbers in VAERS' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-danger uppercase tracking-wider">8 min read</div><ShareButtons title="Understanding Vaccine Lot Numbers in VAERS - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Understanding Vaccine Lot Numbers in VAERS
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Analysis of {formatNumber(totalLots)} COVID-19 vaccine lots in VAERS. Why comparing lots by 
          report counts alone is misleading and what the data actually tells us.
        </p>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-danger mb-1">{formatNumber(totalLots)}</div>
          <div className="text-gray-700">COVID-19 vaccine lots with 5+ reports in VAERS, representing {formatNumber(totalReports)} total reports</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Critical Context Missing from VAERS</h2>
        <p>
          When analyzing vaccine lot numbers, we immediately encounter what epidemiologists call "the denominator problem." 
          VAERS tells us how many adverse events were reported for each lot, but it doesn&apos;t tell us how many 
          doses from each lot were actually administered.
        </p>
        <p>
          This creates a fundamental issue: <strong>a lot with 100 reports could represent 0.1% of a 100,000-dose 
          lot or 10% of a 1,000-dose lot.</strong> Without knowing lot sizes and distribution patterns, 
          comparing raw report counts is meaningless and potentially dangerous.
        </p>

        <h2 className={playfairDisplay.className}>The Distribution Landscape</h2>
        <p>
          Among the {formatNumber(totalLots)} lots with 5+ reports, the distribution is highly variable:
        </p>
        <ul>
          <li><strong>Lots with 5-9 reports:</strong> {formatNumber(lotsUnder10)} lots</li>
          <li><strong>Lots with 10-49 reports:</strong> {formatNumber(lots10to50)} lots</li>
          <li><strong>Lots with 50+ reports:</strong> {formatNumber(lots50Plus)} lots</li>
        </ul>
        <p>
          The average lot has {avgReportsPerLot} reports, while the median is {medianReports} — indicating 
          that a small number of lots have disproportionately high report counts, likely reflecting 
          their large size and wide distribution.
        </p>

        <h2 className={playfairDisplay.className}>Why Some Lots Have More Reports</h2>
        <p>Several factors influence how many VAERS reports a lot generates:</p>
        <ul>
          <li><strong>Lot size:</strong> Larger lots naturally generate more reports simply due to volume</li>
          <li><strong>Distribution breadth:</strong> Lots distributed to high-reporting areas (urban centers, academic medical centers) may have more reports</li>
          <li><strong>Timing:</strong> Lots distributed during periods of heightened VAERS awareness</li>
          <li><strong>Demographics:</strong> Lots administered to populations more likely to report (healthcare workers, older adults)</li>
          <li><strong>Storage and handling:</strong> While rare, true quality issues could theoretically affect specific lots</li>
        </ul>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <LotAnalysisCharts lotData={topLotsByReports} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Top-Reporting Lots</h2>
        <p>
          Lot {topLot.lot} has the most reports with {formatNumber(topLot.reports)}, including {formatNumber(topLot.died)} 
          death reports and {formatNumber(topLot.hosp)} hospitalizations. But before drawing conclusions, 
          consider that this could easily be explained by:
        </p>
        <ul>
          <li>Being one of the largest lots produced</li>
          <li>Wide distribution to major metropolitan areas</li>
          <li>Administration during peak vaccination periods when awareness was highest</li>
          <li>Use in healthcare settings with mandatory reporting protocols</li>
        </ul>

        <h2 className={playfairDisplay.className}>What Legitimate Lot Analysis Requires</h2>
        <p>
          Proper lot analysis would need:
        </p>
        <ul>
          <li><strong>Denominator data:</strong> How many doses from each lot were distributed and administered</li>
          <li><strong>Geographic distribution:</strong> Where each lot was sent and used</li>
          <li><strong>Temporal distribution:</strong> When doses from each lot were administered</li>
          <li><strong>Population demographics:</strong> Who received doses from each lot</li>
          <li><strong>Storage conditions:</strong> How lots were stored and handled throughout the cold chain</li>
        </ul>
        <p>
          Without this information, raw report counts by lot number are not just useless — they&apos;re actively misleading.
        </p>

        <h2 className={playfairDisplay.className}>Regulatory Oversight of Lot Safety</h2>
        <p>
          Vaccine manufacturers and regulators already have robust systems for monitoring lot safety:
        </p>
        <ul>
          <li>Every lot undergoes extensive quality testing before release</li>
          <li>Lot-specific adverse event monitoring through various surveillance systems</li>
          <li>Recall procedures for any lots showing safety signals</li>
          <li>Regular inspections of manufacturing facilities</li>
        </ul>
        <p>
          If a lot had genuine safety issues, it would be detected and addressed through these systems 
          long before patterns became apparent in VAERS.
        </p>

        <h2 className={playfairDisplay.className}>The Harm of Misinterpreting Lot Data</h2>
        <p>
          Misinterpreting lot data has real-world consequences:
        </p>
        <ul>
          <li>People may refuse vaccination based on misleading "hot lot" claims</li>
          <li>Healthcare providers may be reluctant to use certain lots</li>
          <li>Public confidence in vaccine safety systems can be undermined</li>
          <li>Resources may be diverted from real safety monitoring to investigate false signals</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Critical Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">1.</span>
            <span>Raw report counts by lot number are meaningless without knowing lot sizes and distribution</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">2.</span>
            <span>The highest-reporting lot ({topLot.lot}) likely represents a large, widely-distributed lot</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">3.</span>
            <span>Multiple non-safety factors influence how many reports a lot generates</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">4.</span>
            <span>Regulatory systems already monitor lot safety through proper statistical methods</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/denominator-problem" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Why Raw VAERS Numbers Can Be Misleading</div>
            <div className="text-sm text-gray-500">Understanding the denominator problem</div>
          </Link>
          <Link href="/tools/lot-lookup" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Lot Lookup Tool</div>
            <div className="text-sm text-gray-500">Search specific lot numbers</div>
          </Link>
        </div>
      </div>
    </div>
  )
}