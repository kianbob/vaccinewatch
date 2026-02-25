import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { OnsetTimingChartsClient as OnsetTimingCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'When Do Vaccine Side Effects Start? - VAERS Onset Timing Analysis',
  description: 'Analysis of when vaccine adverse events occur after vaccination. Most side effects start within 0-3 days, with detailed timing by vaccine type and outcome severity.'
}

export default function OnsetTimingPage() {
  const onsetData = readJsonFile('onset-timing.json')

  // Calculate overall statistics
  const allOutcomes = onsetData.byOutcome.all
  const totalReports = Object.values(allOutcomes).reduce((sum: number, count: any) => sum + count, 0)
  
  // Calculate within 3 days
  const within3Days = (allOutcomes["0"] + allOutcomes["1"] + allOutcomes["2"] + allOutcomes["3"]) || 0
  const within3DaysPercent = ((within3Days / totalReports) * 100).toFixed(1)

  // COVID vs other vaccines
  const covidOnset = onsetData.byVaccine.COVID19
  const covidTotal = Object.values(covidOnset).reduce((sum: number, count: any) => sum + count, 0)
  const covidWithin3Days = (covidOnset["0"] + covidOnset["1"] + covidOnset["2"] + covidOnset["3"]) || 0
  const covidWithin3DaysPercent = ((covidWithin3Days / covidTotal) * 100).toFixed(1)

  // Death reports timing
  const deathReports = onsetData.byOutcome.died
  const deathTotal = Object.values(deathReports).reduce((sum: number, count: any) => sum + count, 0)
  const deathWithin3Days = (deathReports["0"] + deathReports["1"] + deathReports["2"] + deathReports["3"]) || 0
  const deathWithin3DaysPercent = ((deathWithin3Days / deathTotal) * 100).toFixed(1)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'When Do Vaccine Side Effects Start?' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">7 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          When Do Vaccine Side Effects Start?
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Analysis of onset timing for vaccine adverse events in VAERS. The data reveals clear patterns: 
          most side effects occur within the first few days after vaccination.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="text-3xl font-bold text-primary mb-1">{within3DaysPercent}%</div>
          <div className="text-gray-700">of all adverse event reports occur within <strong>3 days</strong> of vaccination ({formatNumber(within3Days)} of {formatNumber(totalReports)} reports)</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Pattern is Clear</h2>
        <p>
          When analyzing {formatNumber(totalReports)} VAERS reports with known onset timing, a clear pattern emerges: 
          the vast majority of adverse events occur within the first few days after vaccination.
        </p>
        <p>
          This timing pattern makes biological sense. Most vaccine reactions are immediate immune responses — 
          fever, pain at the injection site, fatigue, and muscle aches. These typically begin within hours to days 
          as the immune system recognizes and responds to the vaccine antigens.
        </p>

        <h2 className={playfairDisplay.className}>Day-by-Day Breakdown</h2>
        <p>Looking at the specific timing:</p>
        <ul>
          <li><strong>Same day (Day 0):</strong> {formatNumber(allOutcomes["0"])} reports ({((allOutcomes["0"] / totalReports) * 100).toFixed(1)}%)</li>
          <li><strong>Day 1:</strong> {formatNumber(allOutcomes["1"])} reports ({((allOutcomes["1"] / totalReports) * 100).toFixed(1)}%)</li>
          <li><strong>Day 2:</strong> {formatNumber(allOutcomes["2"])} reports ({((allOutcomes["2"] / totalReports) * 100).toFixed(1)}%)</li>
          <li><strong>Day 3:</strong> {formatNumber(allOutcomes["3"])} reports ({((allOutcomes["3"] / totalReports) * 100).toFixed(1)}%)</li>
        </ul>
        <p>
          The highest concentration is on Day 1, when people are most likely to notice and report symptoms that 
          developed after their vaccination appointment.
        </p>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <OnsetTimingCharts onsetData={onsetData} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>COVID-19 vs Other Vaccines</h2>
        <p>
          COVID-19 vaccines show similar timing patterns to other vaccines, with {covidWithin3DaysPercent}% 
          of reports occurring within 3 days. This similarity suggests that COVID-19 vaccine reactions 
          follow typical immune response timing patterns.
        </p>

        <h2 className={playfairDisplay.className}>Serious Outcomes and Timing</h2>
        <p>
          Even for the most serious outcomes — death reports — the timing pattern holds. {deathWithin3DaysPercent}% 
          of death reports occur within 3 days of vaccination. However, it&apos;s crucial to understand that 
          proximity in time does not establish causation.
        </p>
        <p>
          For elderly individuals or those with serious underlying conditions, deaths may occur coincidentally 
          after vaccination without being caused by the vaccine. The temporal association captured in VAERS 
          is the starting point for investigation, not a conclusion.
        </p>

        <h2 className={playfairDisplay.className}>Why This Timing Matters</h2>
        <p>Understanding onset timing helps in several ways:</p>
        <ul>
          <li><strong>Patient counseling:</strong> Healthcare providers can inform patients when to expect potential side effects</li>
          <li><strong>Safety monitoring:</strong> Events occurring weeks or months later are less likely to be vaccine-related</li>
          <li><strong>Reporting patterns:</strong> The concentration within 3 days reflects both biological plausibility and reporting behavior</li>
        </ul>

        <h2 className={playfairDisplay.className}>Limitations</h2>
        <p>
          Several factors can affect onset timing data:
        </p>
        <ul>
          <li>Not all VAERS reports include precise onset timing information</li>
          <li>People may not immediately connect symptoms to recent vaccination</li>
          <li>Some conditions have delayed presentations that still fall within VAERS reporting windows</li>
          <li>Stimulated reporting after media coverage can affect timing patterns</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>{within3DaysPercent}% of adverse events are reported within 3 days of vaccination</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Day 1 after vaccination shows the highest concentration of reported adverse events</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>COVID-19 vaccines show similar timing patterns to other vaccines</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Even serious outcomes like death reports cluster within the first few days</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/recovery-rates" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Do Vaccine Side Effects Go Away?</div>
            <div className="text-sm text-gray-500">Recovery rate analysis</div>
          </Link>
          <Link href="/tools/onset-calculator" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Onset Calculator Tool</div>
            <div className="text-sm text-gray-500">Interactive onset timing by vaccine</div>
          </Link>
        </div>
      </div>
    </div>
  )
}