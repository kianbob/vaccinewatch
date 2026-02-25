import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { MyocarditisChartsClient as MyocarditisCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Myocarditis Deep Dive - VAERS Analysis',
  description: 'In-depth analysis of myocarditis reports in VAERS, the most closely-watched vaccine safety signal of the COVID era.'
}

export default function MyocarditisPage() {
  const symptomData = readJsonFile('symptoms/myocarditis.json')

  const covidAssociation = symptomData.vaccines.find((v: { type: string }) => v.type === 'COVID19')
  const severityRate = ((symptomData.hosp / symptomData.reports) * 100).toFixed(1)
  const mortalityRate = ((symptomData.died / symptomData.reports) * 100).toFixed(1)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Myocarditis Deep Dive' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-danger uppercase tracking-wider">7 min read</div><ShareButtons title="Myocarditis Deep Dive - VAERS Analysis - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Myocarditis Deep Dive
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Understanding the most closely-watched vaccine safety signal of the COVID-19 era.
          Myocarditis (inflammation of the heart muscle) became a major focus of vaccine safety surveillance.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-danger">{formatNumber(symptomData.reports)}</div>
            <div className="text-xs text-gray-600">Total Reports</div>
          </div>
          <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-danger">{formatNumber(symptomData.died)}</div>
            <div className="text-xs text-gray-600">Death Reports</div>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-accent">{formatNumber(symptomData.hosp)}</div>
            <div className="text-xs text-gray-600">Hospitalizations</div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{severityRate}%</div>
            <div className="text-xs text-gray-600">Hospitalization Rate</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What is Myocarditis?</h2>
        <p>
          Myocarditis is inflammation of the heart muscle (myocardium). It can be caused by viral infections,
          autoimmune diseases, drugs, and other factors. Symptoms range from mild chest pain to heart failure.
          Most cases resolve on their own, though some can be serious.
        </p>
        <p>
          After the rollout of COVID-19 mRNA vaccines, myocarditis emerged as a recognized rare side effect,
          particularly in young males after the second dose. The FDA and CDC added a warning label to
          the Pfizer and Moderna vaccines in June 2021 after reviewing VAERS data and clinical evidence.
        </p>
      </div>

      <div className="mb-12">
        <MyocarditisCharts vaccineData={symptomData.vaccines} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The COVID-19 Connection</h2>
        <p>
          COVID-19 vaccines account for {formatNumber(covidAssociation?.count || 7695)} of the vaccine-myocarditis
          associations in VAERS — the overwhelming majority. This is not surprising given:
        </p>
        <ul>
          <li>COVID-19 vaccines were administered to hundreds of millions of people in a short timeframe</li>
          <li>Myocarditis was identified as a recognized rare side effect, leading to targeted reporting</li>
          <li>Healthcare providers were specifically instructed to watch for and report myocarditis cases</li>
        </ul>

        <h2 className={playfairDisplay.className}>Context: The FDA/CDC Safety Signal</h2>
        <p>
          The myocarditis safety signal is actually a <strong>success story</strong> for vaccine safety surveillance.
          Here&apos;s how it played out:
        </p>
        <ol>
          <li>VAERS detected an unusual number of myocarditis reports in young males after mRNA vaccination</li>
          <li>The signal was investigated through more rigorous studies (VSD, clinical review)</li>
          <li>The risk was confirmed as real but rare — estimated at 12.6 cases per million second doses in 12-39 year old males</li>
          <li>The FDA added warning labels, and the CDC updated its guidance</li>
          <li>Most cases were mild and resolved quickly</li>
        </ol>

        <h2 className={playfairDisplay.className}>Other Vaccines and Myocarditis</h2>
        <p>
          While COVID-19 dominates the data, myocarditis has been reported with other vaccines as well.
          Smallpox vaccine ({formatNumber(symptomData.vaccines.find((v: { type: string }) => v.type === 'SMALL')?.count || 0)} associations)
          has a well-documented association with myocarditis. This was known before COVID-19 and
          is one reason smallpox vaccination is limited to specific populations.
        </p>

        <h2 className={playfairDisplay.className}>Severity</h2>
        <p>
          Among myocarditis VAERS reports, {severityRate}% involved hospitalization and {mortalityRate}% reported death.
          The high hospitalization rate reflects that myocarditis is inherently a condition requiring medical attention.
          However, it&apos;s important to note that most vaccine-associated myocarditis cases in clinical studies were
          mild and resolved within days to weeks.
        </p>
      </div>

      <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">1.</span>
            <span>Myocarditis is a recognized rare side effect of mRNA COVID-19 vaccines, primarily affecting young males</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">2.</span>
            <span>VAERS played a critical role in detecting this signal, demonstrating the system works as intended</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">3.</span>
            <span>The risk is real but rare (~12.6 per million doses) and most cases resolved quickly</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">4.</span>
            <span>COVID-19 itself also causes myocarditis at higher rates than the vaccines</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 Impact</div>
            <div className="text-sm text-gray-500">The broader COVID effect on VAERS</div>
          </Link>
          <Link href="/symptoms/myocarditis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Myocarditis Symptom Page</div>
            <div className="text-sm text-gray-500">Full data for myocarditis reports</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
