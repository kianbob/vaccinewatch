import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, formatManufacturer } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Vaccine Deaths Reported to VAERS — Complete Data & Context',
  description: 'Analysis of 27,732 death reports in VAERS (1990-2026). Critical context: a VAERS death report does NOT mean the vaccine caused the death. Full data with proper interpretation.',
  openGraph: {
    title: 'Vaccine Deaths Reported to VAERS — Data with Context',
    description: '27,732 death reports analyzed with critical context about what VAERS data means.',
  },
}

export default function VaccineDeathsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')

  const stats = readJsonFile('stats.json')
  const totalDeaths = stats?.totalDied || 27732
  const totalReports = stats?.totalReports || 1983260

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How many deaths are reported to VAERS?', acceptedAnswer: { '@type': 'Answer', text: `As of 2026, VAERS contains ${totalDeaths.toLocaleString()} death reports out of ${totalReports.toLocaleString()} total reports. However, a death report in VAERS does not mean the vaccine caused the death. These are temporal associations — deaths that occurred after vaccination.` }},
      { '@type': 'Question', name: 'Does a VAERS death report mean the vaccine killed someone?', acceptedAnswer: { '@type': 'Answer', text: 'No. VAERS accepts all reports of death occurring after vaccination regardless of cause. Many reported deaths, especially in elderly populations, reflect background mortality rates — deaths that would have occurred regardless of vaccination. Only controlled studies can determine if vaccines cause deaths.' }},
      { '@type': 'Question', name: 'What is the background death rate?', acceptedAnswer: { '@type': 'Answer', text: 'In the United States, approximately 8,000-9,000 people die every day from all causes. When hundreds of millions of people are vaccinated, some will die shortly after by pure coincidence. This background mortality must be considered when interpreting VAERS death reports.' }},
    ],
  }

  // Top vaccines by death reports
  const topByDeaths = [...vaccineIndex]
    .sort((a: any, b: any) => b.died - a.died)
    .slice(0, 15)

  // COVID deaths
  const covidVax = vaccineIndex.find((v: any) => v.type === 'COVID19')
  const covidDeaths = (covidVax?.died || 0) + (vaccineIndex.find((v: any) => v.type === 'COVID19-2')?.died || 0)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Vaccine Deaths' }]} />

      {/* Extra-strong disclaimer */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-8">
        <div className="flex">
          <div className="text-red-500 text-xl mr-3">⚠️</div>
          <div>
            <p className="text-red-800 font-bold mb-1">Critical Context Required</p>
            <p className="text-red-700 text-sm">
              A death report in VAERS does <strong>NOT</strong> mean a vaccine caused the death. 
              VAERS accepts all reports of death following vaccination, including deaths from 
              pre-existing conditions, accidents, and natural causes. The elderly population 
              that receives many vaccines has a high background death rate regardless of vaccination.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">8 min read</div>
          <ShareButtons title="Vaccine Deaths Reported to VAERS" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Deaths Reported After Vaccination
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          VAERS contains {formatNumber(totalDeaths)} death reports following vaccination (1990–2026). 
          This page presents the data transparently while providing the context necessary to 
          interpret it correctly.
        </p>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h2 className={`text-xl font-bold text-amber-900 mb-4 ${playfairDisplay.className}`}>💡 Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900">
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>{formatNumber(totalDeaths)} death reports out of {formatNumber(totalReports)} total</strong> — that&apos;s {((totalDeaths / totalReports) * 100).toFixed(1)}%. But &quot;reported after&quot; does not mean &quot;caused by.&quot;</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>~8,000 Americans die every day from all causes.</strong> When hundreds of millions are vaccinated, thousands will die in the days following by pure statistical coincidence.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>COVID vaccines account for ~{((covidDeaths / totalDeaths) * 100).toFixed(0)}% of death reports</strong> — driven by 670M+ doses administered, elderly-first rollout, and mandatory provider reporting.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>CDC reviews every COVID death report.</strong> Confirmed vaccine-caused deaths are extremely rare — limited to TTS (J&amp;J) and anaphylaxis cases.</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{formatNumber(totalDeaths)}</div>
          <div className="text-xs text-red-500">Total Death Reports</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{((totalDeaths / totalReports) * 100).toFixed(1)}%</div>
          <div className="text-xs text-gray-500">Of All Reports</div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{formatNumber(covidDeaths)}</div>
          <div className="text-xs text-red-500">COVID Vaccine Deaths</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalDeaths - covidDeaths)}</div>
          <div className="text-xs text-gray-500">All Other Vaccines</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What Does a VAERS Death Report Mean?</h2>
        <p>
          A VAERS death report means someone died at some point after receiving a vaccine and 
          a report was filed. It does <strong>NOT</strong> mean:
        </p>
        <ul>
          <li>The vaccine caused the death</li>
          <li>The death was related to vaccination</li>
          <li>The death was unexpected</li>
        </ul>
        <p>
          VAERS death reports include people who died of heart attacks, cancer, car accidents, 
          and other causes that happened to occur after vaccination. In clinical trials, death 
          rates in vaccinated groups are typically similar to or lower than death rates in placebo groups.
        </p>

        <h2 className={playfairDisplay.className}>The Background Death Rate</h2>
        <p>
          Approximately <strong>8,000 Americans die every day</strong> from all causes. When millions 
          of people are vaccinated in a short period, some will inevitably die within days or weeks 
          of vaccination by pure coincidence.
        </p>
        <p>
          Example: If 10 million elderly Americans receive a vaccine in one month, roughly 
          <strong>100,000 of them would be expected to die within that month anyway</strong> 
          based on normal mortality rates — completely unrelated to the vaccine.
        </p>
        <p>
          This is why raw VAERS death counts are misleading without comparison to expected 
          background rates. See our{' '}
          <Link href="/analysis/denominator-problem">denominator problem analysis</Link> for more.
        </p>

        <h2 className={playfairDisplay.className}>Deaths by Vaccine</h2>
        <p>
          The table below shows vaccines with the most death reports. Higher numbers primarily 
          reflect the population receiving the vaccine and the intensity of reporting — not 
          relative danger.
        </p>
      </div>

      {/* Deaths table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Vaccine</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Death Reports</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Total Reports</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Death Rate</th>
            </tr>
          </thead>
          <tbody>
            {topByDeaths.map((v: any, i: number) => (
              <tr key={v.type} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-3">
                  <Link href={`/vaccines/${v.type.toLowerCase()}`} className="text-primary hover:underline font-medium">
                    {formatManufacturer(v.name)}
                  </Link>
                </td>
                <td className="text-right px-4 py-3 font-mono text-red-600">{formatNumber(v.died)}</td>
                <td className="text-right px-4 py-3 font-mono text-gray-600">{formatNumber(v.reports)}</td>
                <td className="text-right px-4 py-3 font-mono text-gray-600">
                  {v.reports > 0 ? ((v.died / v.reports) * 100).toFixed(1) : 0}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>COVID-19 Vaccine Deaths</h2>
        <p>
          COVID-19 vaccines account for {formatNumber(covidDeaths)} of {formatNumber(totalDeaths)} death 
          reports ({((covidDeaths / totalDeaths) * 100).toFixed(0)}%). This disproportionate share 
          reflects several factors:
        </p>
        <ul>
          <li><strong>Unprecedented scale:</strong> 670+ million doses administered in the U.S.</li>
          <li><strong>Mandatory reporting:</strong> Healthcare providers were required to report deaths after COVID vaccination</li>
          <li><strong>Elderly recipients:</strong> Early rollout prioritized the elderly, who have higher baseline mortality</li>
          <li><strong>Heightened awareness:</strong> More attention on COVID vaccines led to more reporting of coincidental deaths</li>
        </ul>
        <p>
          CDC reviews every VAERS death report for COVID-19 vaccines. After reviewing thousands 
          of reports, the CDC has confirmed that deaths causally linked to COVID vaccines are 
          extremely rare — limited primarily to a small number of cases involving thrombosis 
          with thrombocytopenia syndrome (TTS) after the J&amp;J vaccine and anaphylaxis.
        </p>

        <h2 className={playfairDisplay.className}>How Death Reports Are Investigated</h2>
        <p>
          VAERS death reports trigger a review process:
        </p>
        <ol>
          <li><strong>Report received:</strong> VAERS staff process and code the report</li>
          <li><strong>Medical review:</strong> Healthcare professionals review medical records when available</li>
          <li><strong>Follow-up:</strong> CDC/FDA may request autopsy reports, death certificates, and additional medical records</li>
          <li><strong>Assessment:</strong> Clinical experts determine if the evidence supports a causal relationship</li>
        </ol>
        <p>
          The vast majority of death reports, upon investigation, are found to be unrelated to vaccination.
        </p>

        <h2 className={playfairDisplay.className}>What the Research Shows</h2>
        <p>
          Large-scale epidemiological studies consistently show that vaccinated populations do 
          not have higher death rates than unvaccinated populations. In fact, some studies show 
          <em>lower</em> all-cause mortality in vaccinated groups — likely because healthier 
          individuals are more likely to get vaccinated (the &quot;healthy vaccinee&quot; effect).
        </p>
      </div>

      {/* Key takeaway */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700 text-sm">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>A VAERS death report ≠ a vaccine-caused death</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>~8,000 Americans die daily; temporal coincidence with vaccination is expected</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>CDC investigates every COVID vaccine death report; confirmed causal deaths are extremely rare</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Death report rates reflect recipient demographics and reporting patterns, not relative vaccine danger</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Death Reports Deep Dive</div>
            <div className="text-sm text-gray-500">Detailed analysis with charts</div>
          </Link>
          <Link href="/analysis/denominator-problem" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">The Denominator Problem</div>
            <div className="text-sm text-gray-500">Why raw numbers mislead</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious Outcomes</div>
            <div className="text-sm text-gray-500">Understanding severity data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
