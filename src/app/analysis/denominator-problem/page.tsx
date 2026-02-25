import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { DenominatorProblemChartsClient as DenominatorProblemCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Why Raw VAERS Numbers Can Be Misleading - The Denominator Problem',
  description: 'The most critical limitation of VAERS data: raw report counts are meaningless without knowing how many doses were administered. Understanding rates vs. raw numbers.'
}

export default function DenominatorProblemPage() {
  const stats = readJsonFile('stats.json')
  const vaccineIndex = readJsonFile('vaccine-index.json')

  // Find COVID-19 vaccine data
  const covidVaccine = vaccineIndex.find((v: any) => v.type === 'COVID19')
  
  // Estimate COVID-19 doses (670+ million as mentioned in brief)
  const estimatedCovidDoses = 670000000
  const covidReports = covidVaccine?.reports || 0
  const covidDeaths = covidVaccine?.deaths || 0
  
  // Calculate rates per million doses
  const covidReportRate = ((covidReports / estimatedCovidDoses) * 1000000).toFixed(0)
  const covidDeathRate = ((covidDeaths / estimatedCovidDoses) * 1000000).toFixed(1)

  // Get other major vaccines for comparison
  const fluVaccine = vaccineIndex.find((v: any) => v.type === 'FLU')
  const mmrVaccine = vaccineIndex.find((v: any) => v.type === 'MMR')
  const dtapVaccine = vaccineIndex.find((v: any) => v.type === 'DTAP')

  // Compare raw numbers vs context
  const totalReports = stats.totalReports || 1983260
  const covidShare = ((covidReports / totalReports) * 100).toFixed(0)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Why Raw VAERS Numbers Can Be Misleading' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-danger uppercase tracking-wider">9 min read</div><ShareButtons title="Why Raw VAERS Numbers Can Be Misleading - The Denominator Problem - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Why Raw VAERS Numbers Can Be Misleading
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The most critical limitation of VAERS: raw numbers are meaningless without context. 
          Understanding why 1,000 reports from Vaccine A could be safer than 100 reports from Vaccine B.
        </p>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-danger mb-1">{covidReportRate}</div>
          <div className="text-gray-700">reports per million COVID-19 doses — context that transforms {formatNumber(covidReports)} raw reports into a meaningful safety rate</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Missing Number That Changes Everything</h2>
        <p>
          VAERS&apos; greatest limitation isn&apos;t what it contains — it&apos;s what it&apos;s missing: 
          <strong>denominators</strong>. A denominator is the total number of doses administered of each vaccine. 
          Without this crucial number, comparing adverse event rates across vaccines is not just difficult — 
          it&apos;s impossible and potentially dangerous.
        </p>
        <p>
          Consider this example: Vaccine A has 1,000 VAERS reports while Vaccine B has 100. 
          Which is safer? Without knowing how many doses of each were given, you cannot tell. 
          If Vaccine A was given to 10 million people and Vaccine B to 1,000 people, 
          then Vaccine A is actually much safer (0.01% vs 10% adverse event rate).
        </p>

        <h2 className={playfairDisplay.className}>COVID-19: A Perfect Case Study</h2>
        <p>
          COVID-19 vaccines provide the perfect illustration of the denominator problem. They account for 
          roughly {covidShare}% of all VAERS reports ever filed — a staggering proportion that, without 
          context, might suggest unusual safety concerns.
        </p>
        <p>
          But context changes everything. With an estimated {formatNumber(estimatedCovidDoses)}+ doses 
          administered in the U.S., COVID-19 vaccines have a VAERS reporting rate of approximately 
          {covidReportRate} reports per million doses. This rate is actually within the typical range 
          for vaccines in VAERS.
        </p>

        <div className="not-prose bg-gray-50 rounded-xl p-6 my-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">The Calculation That Changes Perspective</h3>
          <div className="space-y-2 text-sm">
            <div><strong>Raw numbers:</strong> {formatNumber(covidReports)} COVID-19 VAERS reports</div>
            <div><strong>Estimated doses:</strong> {formatNumber(estimatedCovidDoses)}+ administered</div>
            <div><strong>Rate calculation:</strong> ({formatNumber(covidReports)} ÷ {formatNumber(estimatedCovidDoses)}) × 1,000,000</div>
            <div><strong>Result:</strong> {covidReportRate} reports per million doses</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <DenominatorProblemCharts 
          vaccineData={[
            { vaccine: 'COVID-19', reports: covidReports, estimatedDoses: estimatedCovidDoses },
            { vaccine: 'Influenza', reports: fluVaccine?.reports || 0, estimatedDoses: 150000000 },
            { vaccine: 'MMR', reports: mmrVaccine?.reports || 0, estimatedDoses: 50000000 },
            { vaccine: 'DTaP', reports: dtapVaccine?.reports || 0, estimatedDoses: 60000000 }
          ]} 
        />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why Denominators Are So Hard to Get</h2>
        <p>
          If denominators are so important, why doesn&apos;t VAERS include them? Several challenges make 
          precise denominator data difficult to obtain:
        </p>
        <ul>
          <li><strong>Fragmented healthcare system:</strong> No single source tracks all vaccinations across providers</li>
          <li><strong>Private vs. public data:</strong> Pharmacy chains, private clinics, and public health departments all maintain separate records</li>
          <li><strong>Timing mismatches:</strong> Dose distribution data may not align with administration data</li>
          <li><strong>Lot-level complexity:</strong> Vaccines may be distributed but not immediately administered</li>
          <li><strong>International variations:</strong> Some vaccines are used differently in different countries</li>
        </ul>

        <h2 className={playfairDisplay.className}>Examples of Misleading Raw Comparisons</h2>
        <p>Here are some examples of how raw VAERS numbers can mislead:</p>
        
        <h3>Example 1: Seasonal vs. Pandemic Vaccines</h3>
        <p>
          Pandemic vaccines often have more VAERS reports than seasonal vaccines — not because they&apos;re 
          more dangerous, but because they&apos;re administered to more people in shorter timeframes with 
          heightened public attention.
        </p>

        <h3>Example 2: Adult vs. Pediatric Vaccines</h3>
        <p>
          Adult vaccines may appear to have higher adverse event rates because adults are more likely 
          to report symptoms and have more complex medical histories that can complicate attribution.
        </p>

        <h3>Example 3: New vs. Established Vaccines</h3>
        <p>
          New vaccines often have higher reporting rates due to increased vigilance, media attention, 
          and healthcare provider awareness — regardless of their actual safety profile.
        </p>

        <h2 className={playfairDisplay.className}>Death Reports and the Denominator Problem</h2>
        <p>
          The denominator problem is especially critical for death reports. COVID-19 vaccines have 
          approximately {covidDeathRate} death reports per million doses administered. While each death 
          represents a tragedy and warrants investigation, this rate provides crucial context.
        </p>
        <p>
          For comparison, the background death rate in the U.S. population is approximately 8.7 deaths 
          per 1,000 people per year. Among elderly populations (who received vaccines first), 
          background death rates are much higher. This context is essential for interpreting death reports.
        </p>

        <h2 className={playfairDisplay.className}>What Proper Rate Calculations Show</h2>
        <p>
          When researchers calculate adverse event rates using proper denominators, they consistently find:
        </p>
        <ul>
          <li>Most vaccines have similar adverse event rates when adjusted for doses administered</li>
          <li>Apparent &quot;hot&quot; vaccines often have high reporting due to high usage, not high risk</li>
          <li>Background disease rates often explain temporal associations in VAERS</li>
          <li>True safety signals are rare but can be detected through proper statistical analysis</li>
        </ul>

        <h2 className={playfairDisplay.className}>How Regulators Address the Denominator Problem</h2>
        <p>
          Regulatory agencies use multiple strategies to address denominator limitations:
        </p>
        <ul>
          <li><strong>Active surveillance systems:</strong> VSD, PRISM, and other systems with known denominator populations</li>
          <li><strong>Manufacturer data:</strong> Companies report doses distributed and track safety signals</li>
          <li><strong>Population surveys:</strong> CDC conducts surveys to estimate vaccination coverage</li>
          <li><strong>Electronic health records:</strong> Large healthcare systems provide denominator data for their populations</li>
        </ul>

        <h2 className={playfairDisplay.className}>The Media and Public Understanding Challenge</h2>
        <p>
          Raw VAERS numbers are frequently misused in media coverage and public discourse:
        </p>
        <ul>
          <li>Headlines focus on absolute numbers rather than rates</li>
          <li>Social media amplifies scary-sounding raw numbers without context</li>
          <li>Advocacy groups selectively cite raw numbers to support predetermined conclusions</li>
          <li>The complexity of rate calculations makes them less &quot;clickable&quot; than raw numbers</li>
        </ul>

        <h2 className={playfairDisplay.className}>Why This Article Matters Most</h2>
        <p>
          Understanding the denominator problem is perhaps the most important concept for anyone 
          interpreting VAERS data. It explains:
        </p>
        <ul>
          <li>Why COVID-19 vaccines don&apos;t necessarily have worse safety profiles despite high raw report numbers</li>
          <li>Why comparing raw VAERS numbers across vaccines can be dangerously misleading</li>
          <li>Why proper epidemiological studies always include denominator data</li>
          <li>Why regulatory decisions are based on rates, not raw numbers</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Critical Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">1.</span>
            <span>Raw VAERS numbers are meaningless without knowing doses administered (denominators)</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">2.</span>
            <span>COVID-19&apos;s {covidReportRate} reports per million doses shows normal safety rates despite high raw numbers</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">3.</span>
            <span>Comparing raw VAERS numbers across vaccines can be dangerously misleading</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">4.</span>
            <span>Proper safety assessment requires rates, background disease rates, and controlled studies</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/reporting-bias" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Understanding VAERS Reporting Bias</div>
            <div className="text-sm text-gray-500">Why reporting rates vary</div>
          </Link>
          <Link href="/tools/risk-context" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Risk Context Calculator</div>
            <div className="text-sm text-gray-500">Put VAERS numbers in perspective</div>
          </Link>
        </div>
      </div>
    </div>
  )
}