import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import { DoseComparisonChartsClient as DoseComparisonCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'First Dose vs Second Dose vs Booster - VAERS Dose Series Analysis',
  description: 'Analysis comparing adverse event rates between first dose, second dose, and booster COVID-19 vaccinations. Does the second dose really cause more side effects?'
}

export default function DoseComparisonPage() {
  const doseData = readJsonFile('dose-series.json')

  // Focus on COVID-19 data
  const covidData = doseData.COVID19 || {}
  
  const dose1 = covidData["1"] || { reports: 0, died: 0, hosp: 0 }
  const dose2 = covidData["2"] || { reports: 0, died: 0, hosp: 0 }
  const dose3 = covidData["3"] || { reports: 0, died: 0, hosp: 0 }
  const doseUnk = covidData["UNK"] || { reports: 0, died: 0, hosp: 0 }

  const totalReports = dose1.reports + dose2.reports + dose3.reports + doseUnk.reports
  const totalDeaths = dose1.died + dose2.died + dose3.died + doseUnk.died
  const totalHosp = dose1.hosp + dose2.hosp + dose3.hosp + doseUnk.hosp

  // Calculate rates (deaths per 1000 reports)
  const dose1DeathRate = dose1.reports > 0 ? ((dose1.died / dose1.reports) * 1000).toFixed(1) : '0'
  const dose2DeathRate = dose2.reports > 0 ? ((dose2.died / dose2.reports) * 1000).toFixed(1) : '0'
  const dose3DeathRate = dose3.reports > 0 ? ((dose3.died / dose3.reports) * 1000).toFixed(1) : '0'

  // Hospitalization rates
  const dose1HospRate = dose1.reports > 0 ? ((dose1.hosp / dose1.reports) * 1000).toFixed(1) : '0'
  const dose2HospRate = dose2.reports > 0 ? ((dose2.hosp / dose2.reports) * 1000).toFixed(1) : '0'
  const dose3HospRate = dose3.reports > 0 ? ((dose3.hosp / dose3.reports) * 1000).toFixed(1) : '0'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'First Dose vs Second Dose vs Booster' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">6 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          First Dose vs Second Dose vs Booster
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Comparing adverse event patterns across COVID-19 vaccine doses. Does the second dose really 
          cause more side effects? The data reveals important patterns in how our immune system responds.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="text-3xl font-bold text-primary mb-1">{formatNumber(dose2.reports)}</div>
          <div className="text-gray-700">reports for <strong>second doses</strong> vs {formatNumber(dose1.reports)} for first doses — a {((dose2.reports / dose1.reports) * 100).toFixed(0)}% increase</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The "Second Dose Effect"</h2>
        <p>
          Among COVID-19 vaccines, a clear pattern emerges: second doses generate more VAERS reports than first doses. 
          With {formatNumber(dose2.reports)} second-dose reports compared to {formatNumber(dose1.reports)} first-dose reports, 
          the second dose accounts for a disproportionate share of adverse event reports.
        </p>
        <p>
          This pattern aligns with what immunologists expect. The first dose "primes" the immune system, 
          and the second dose often triggers a more robust immune response as memory cells rapidly recognize 
          and respond to the familiar antigen.
        </p>

        <h2 className={playfairDisplay.className}>Breaking Down the Numbers</h2>
        <p>Here&apos;s how the doses compare across key metrics:</p>
        
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{formatNumber(dose1.reports)}</div>
            <div className="text-sm text-gray-500 mb-2">First Dose Reports</div>
            <div className="text-xs text-gray-600">
              Deaths: {formatNumber(dose1.died)} ({dose1DeathRate}/1000)<br/>
              Hospitalizations: {formatNumber(dose1.hosp)} ({dose1HospRate}/1000)
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">{formatNumber(dose2.reports)}</div>
            <div className="text-sm text-gray-500 mb-2">Second Dose Reports</div>
            <div className="text-xs text-gray-600">
              Deaths: {formatNumber(dose2.died)} ({dose2DeathRate}/1000)<br/>
              Hospitalizations: {formatNumber(dose2.hosp)} ({dose2HospRate}/1000)
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{formatNumber(dose3.reports)}</div>
            <div className="text-sm text-gray-500 mb-2">Third Dose/Booster Reports</div>
            <div className="text-xs text-gray-600">
              Deaths: {formatNumber(dose3.died)} ({dose3DeathRate}/1000)<br/>
              Hospitalizations: {formatNumber(dose3.hosp)} ({dose3HospRate}/1000)
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <DoseComparisonCharts doseData={covidData} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why Second Doses Hit Harder</h2>
        <p>The biological explanation for increased second-dose reactions is well-established:</p>
        <ul>
          <li><strong>Immune priming:</strong> The first dose prepares the immune system by creating memory cells</li>
          <li><strong>Faster recognition:</strong> Memory cells quickly recognize the antigen upon second exposure</li>
          <li><strong>Amplified response:</strong> The primed immune system mounts a more vigorous response</li>
          <li><strong>Cytokine release:</strong> Higher levels of inflammatory signals can cause more noticeable symptoms</li>
        </ul>
        <p>
          This is actually a sign that the vaccine is working as intended — generating a strong immune memory 
          that will protect against future infection.
        </p>

        <h2 className={playfairDisplay.className}>Booster Patterns</h2>
        <p>
          Third doses (boosters) show {formatNumber(dose3.reports)} reports, which is fewer than second doses 
          but still significant. Several factors may influence this pattern:
        </p>
        <ul>
          <li>Boosters were administered to fewer people initially (prioritizing older adults and high-risk groups)</li>
          <li>Many booster recipients had already experienced vaccine side effects, potentially reducing reporting likelihood</li>
          <li>Immune responses may be somewhat different after longer intervals between doses</li>
        </ul>

        <h2 className={playfairDisplay.className}>Serious Outcomes Across Doses</h2>
        <p>
          When examining serious outcomes like death and hospitalization reports, the patterns are more complex. 
          The death rate per 1,000 reports is {dose1DeathRate} for first doses, {dose2DeathRate} for second doses, 
          and {dose3DeathRate} for third doses.
        </p>
        <p>
          These differences likely reflect several factors including the demographics of people receiving each dose, 
          the timing of rollout, and underlying health conditions rather than inherent differences in vaccine safety by dose.
        </p>

        <h2 className={playfairDisplay.className}>Clinical Trial vs Real-World Data</h2>
        <p>
          The VAERS pattern aligns with clinical trial findings. In Pfizer and Moderna trials, participants 
          consistently reported more side effects after their second dose. Common symptoms like fatigue, 
          headache, muscle pain, and fever were all more frequent and intense after dose two.
        </p>
      </div>

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>Second doses generate {((dose2.reports / dose1.reports) * 100).toFixed(0)}% more VAERS reports than first doses</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>This pattern reflects normal immune system priming and response amplification</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>Booster dose reports are fewer but still significant at {formatNumber(dose3.reports)}</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Increased second-dose reactions are actually a positive sign of immune system activation</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/onset-timing" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">When Do Vaccine Side Effects Start?</div>
            <div className="text-sm text-gray-500">Timing patterns across all doses</div>
          </Link>
          <Link href="/tools/dose-comparison" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Dose Comparison Tool</div>
            <div className="text-sm text-gray-500">Interactive dose comparisons</div>
          </Link>
        </div>
      </div>
    </div>
  )
}