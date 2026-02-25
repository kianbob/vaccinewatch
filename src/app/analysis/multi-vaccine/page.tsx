import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { MultiVaccineChartsClient as MultiVaccineCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'When Multiple Vaccines Are Given Together - VAERS Co-Administration Analysis',
  description: 'Analysis of VAERS reports when multiple vaccines are administered simultaneously. Understanding co-administration safety patterns and common vaccine combinations.'
}

export default function MultiVaccinePage() {
  const multiVaccineData = readJsonFile('multi-vaccine.json')

  // Sort by total reports and get top combinations
  const sortedCombinations = [...multiVaccineData].sort((a: any, b: any) => b.reports - a.reports)
  const top20Combinations = sortedCombinations.slice(0, 20)
  const totalCombinations = multiVaccineData.length

  // Calculate totals
  const totalReports = multiVaccineData.reduce((sum: number, combo: any) => sum + combo.reports, 0)
  const totalDeaths = multiVaccineData.reduce((sum: number, combo: any) => sum + combo.died, 0)
  const totalHosp = multiVaccineData.reduce((sum: number, combo: any) => sum + combo.hosp, 0)

  // Find pediatric combinations (common childhood vaccines)
  const pediatricKeywords = ['DTaP', 'IPV', 'PCV', 'HIB', 'MMR', 'VARICELLA', 'HEPATITIS A', 'HEPATITIS B', 'ROTAVIRUS', 'INFLUENZA']
  const pediatricCombos = multiVaccineData.filter((combo: any) => 
    combo.vaccines.some((vaccine: string) => 
      pediatricKeywords.some(keyword => vaccine.toUpperCase().includes(keyword))
    )
  ).sort((a: any, b: any) => b.reports - a.reports).slice(0, 10)

  // Find COVID combinations
  const covidCombos = multiVaccineData.filter((combo: any) =>
    combo.vaccines.some((vaccine: string) => vaccine.includes('COVID'))
  ).sort((a: any, b: any) => b.reports - a.reports).slice(0, 10)

  // Most common combination
  const topCombo = top20Combinations[0]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="When Multiple Vaccines Are Given Together - VAERS Co-Administration Analysis" description="Analysis of VAERS reports when multiple vaccines are administered simultaneously. Understanding co-administration safety patterns and common vaccine combinations." slug="multi-vaccine" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'When Multiple Vaccines Are Given Together' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-accent uppercase tracking-wider">7 min read</div><ShareButtons title="When Multiple Vaccines Are Given Together - VAERS Co-Administration Analysis - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          When Multiple Vaccines Are Given Together
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Analysis of {formatNumber(totalCombinations)} vaccine combinations in VAERS reports. 
          Understanding co-administration patterns, from pediatric schedules to COVID-19 combinations.
        </p>
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-accent mb-1">{formatNumber(totalCombinations)}</div>
          <div className="text-gray-700">different vaccine combinations reported in VAERS, accounting for {formatNumber(totalReports)} total reports</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Co-Administration is Standard Practice</h2>
        <p>
          Administering multiple vaccines during a single visit is routine medical practice, especially 
          for children following the CDC&apos;s recommended immunization schedule. The {formatNumber(totalCombinations)} 
          different vaccine combinations in VAERS reflect this standard approach to vaccination.
        </p>
        <p>
          Co-administration offers several advantages: fewer clinic visits, better adherence to vaccination 
          schedules, reduced costs, and earlier protection. Extensive studies have shown that giving multiple 
          vaccines together is safe and effective.
        </p>

        <h2 className={playfairDisplay.className}>The Most Common Combinations</h2>
        <p>
          The most frequently reported combination involves {topCombo.vaccines.join(' + ')}, with {formatNumber(topCombo.reports)} 
          VAERS reports. This high number likely reflects both the frequency of this combination and the 
          volume of reports during specific time periods.
        </p>
        <p>
          Many of the top combinations involve routine childhood vaccines or seasonal influenza vaccines 
          given alongside other routine immunizations.
        </p>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <MultiVaccineCharts 
          top20Data={top20Combinations} 
          pediatricData={pediatricCombos}
          covidData={covidCombos}
        />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Pediatric Vaccination Combinations</h2>
        <p>
          Pediatric vaccine combinations represent a significant portion of co-administration reports. 
          The CDC&apos;s childhood immunization schedule often calls for multiple vaccines at single visits:
        </p>
        <ul>
          <li>2-month visit: DTaP, IPV, Hib, PCV13, and Rotavirus</li>
          <li>4-month visit: Same combination as 2 months</li>
          <li>12-15 month visit: MMR, Varicella, Hib, PCV13</li>
        </ul>
        <p>
          These combinations have been extensively studied and are designed to provide optimal protection 
          while minimizing the number of healthcare visits required.
        </p>

        <h2 className={playfairDisplay.className}>COVID-19 Vaccine Combinations</h2>
        <p>
          COVID-19 vaccines have been administered alongside other vaccines, particularly seasonal influenza 
          vaccines. Initially, CDC recommended spacing between COVID-19 vaccines and other vaccines, 
          but this guidance was updated to allow co-administration based on safety data.
        </p>
        {covidCombos.length > 0 && (
          <p>
            The most common COVID-19 combination reported involves {covidCombos[0].vaccines.join(' + ')}, 
            with {formatNumber(covidCombos[0].reports)} reports.
          </p>
        )}

        <h2 className={playfairDisplay.className}>Safety Considerations</h2>
        <p>
          When evaluating adverse events after multiple vaccines, determining attribution becomes more complex. 
          Key considerations include:
        </p>
        <ul>
          <li><strong>Expected reactions:</strong> Each vaccine can cause its own set of expected side effects</li>
          <li><strong>Immune system stimulation:</strong> Multiple vaccines may temporarily increase inflammatory responses</li>
          <li><strong>Injection site reactions:</strong> Multiple injection sites can mean multiple areas of local reactions</li>
          <li><strong>Temporal associations:</strong> Adverse events may be attributed to the combination when they might have occurred with any single vaccine</li>
        </ul>

        <h2 className={playfairDisplay.className}>Clinical Trial Evidence</h2>
        <p>
          Before vaccines are approved for co-administration, clinical trials specifically study combination safety:
        </p>
        <ul>
          <li>Immune response studies ensure vaccines don&apos;t interfere with each other</li>
          <li>Safety studies compare side effect rates for combinations vs. individual vaccines</li>
          <li>Long-term follow-up assesses for any delayed effects</li>
        </ul>
        <p>
          These studies consistently show that co-administration is as safe as giving vaccines separately, 
          with similar immune responses and side effect profiles.
        </p>

        <h2 className={playfairDisplay.className}>Interpreting Co-Administration Reports</h2>
        <p>
          VAERS reports involving multiple vaccines require careful interpretation:
        </p>
        <ul>
          <li>The total number of reports may be higher simply because more vaccines are involved</li>
          <li>Mild reactions like fever may be more common but are still generally expected</li>
          <li>Serious adverse events need evaluation to determine if they&apos;re related to any specific vaccine or the combination</li>
          <li>Background rates of health events in the vaccinated population must be considered</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">1.</span>
            <span>{formatNumber(totalCombinations)} different vaccine combinations have been reported to VAERS</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">2.</span>
            <span>Co-administration is standard practice supported by extensive safety studies</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">3.</span>
            <span>Pediatric combinations follow established CDC immunization schedules</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">4.</span>
            <span>Clinical trials specifically study combination safety before approval</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/pediatric" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Pediatric VAERS Analysis</div>
            <div className="text-sm text-gray-500">Focus on children&apos;s vaccination safety</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious vs Non-Serious Outcomes</div>
            <div className="text-sm text-gray-500">Understanding adverse event severity</div>
          </Link>
        </div>
      </div>
    </div>
  )
}