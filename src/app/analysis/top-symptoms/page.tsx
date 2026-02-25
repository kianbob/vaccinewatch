import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { TopSymptomsChartClient as TopSymptomsChart } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Most Reported Symptoms in VAERS',
  description: 'The 20 most commonly reported adverse symptoms in VAERS, with context on what these symptoms mean.'
}

interface Symptom {
  name: string
  reports: number
  died: number
  hosp: number
}

export default function TopSymptomsPage() {
  const symptoms: Symptom[] = readJsonFile('symptom-index.json')

  const top20 = symptoms
    .sort((a, b) => b.reports - a.reports)
    .slice(0, 20)

  const totalSymptomReports = symptoms.reduce((s, sym) => s + sym.reports, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Most Reported Symptoms' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-accent uppercase tracking-wider">5 min read</div><ShareButtons title="Most Reported Symptoms in VAERS - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Most Reported Symptoms
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The 20 most commonly reported adverse symptoms in VAERS.
          Most of the top symptoms are expected immune responses — fever, headache, pain at the injection site.
        </p>
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-accent mb-1">{formatNumber(top20[0]?.reports || 0)}</div>
          <div className="text-gray-700">
            reports for <strong>{top20[0]?.name || 'Pyrexia (Fever)'}</strong> — the most commonly reported symptom, representing a normal immune response to vaccination
          </div>
        </div>
      </div>

      <div className="mb-12">
        <TopSymptomsChart symptoms={top20} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What the Top Symptoms Tell Us</h2>
        <p>
          The most reported symptoms in VAERS are largely what you&apos;d expect from normal immune responses:
        </p>
        <ul>
          <li><strong>Pyrexia (fever):</strong> The #1 reported symptom. Fever is a sign the immune system is responding to the vaccine — exactly what it&apos;s supposed to do.</li>
          <li><strong>Headache, fatigue, pain:</strong> Common side effects of almost all vaccines, usually resolving within 1-3 days.</li>
          <li><strong>Injection site reactions:</strong> Redness, swelling, and pain at the injection site are among the most common and expected side effects.</li>
        </ul>
        <p>
          The prevalence of mild, expected symptoms at the top of the list actually provides reassurance:
          it shows that VAERS is capturing the full spectrum of post-vaccination experiences, not just serious events.
        </p>

        <h2 className={playfairDisplay.className}>Severity Breakdown</h2>
        <p>
          While most top symptoms are mild, some have significant hospitalization rates. This reflects that
          even common symptoms can sometimes be severe enough to require medical attention, particularly
          in vulnerable populations.
        </p>
      </div>

      {/* Top 20 Table */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top 20 Symptoms</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symptom</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Reports</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Deaths</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Hosp.</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {top20.map((symptom, i) => {
                const slug = symptom.name.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
                const severity = ((symptom.hosp / symptom.reports) * 100).toFixed(1)
                return (
                  <tr key={symptom.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 text-sm">
                      <Link href={`/symptoms/${slug}`} className="text-primary hover:underline font-medium">
                        {symptom.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">{formatNumber(symptom.reports)}</td>
                    <td className="px-4 py-3 text-sm text-right text-danger">{formatNumber(symptom.died)}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">{formatNumber(symptom.hosp)}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-500">{severity}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">1.</span>
            <span>The most commonly reported symptoms are expected immune responses (fever, headache, pain)</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">2.</span>
            <span>A single VAERS report typically lists multiple symptoms, so symptom counts exceed report counts</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">3.</span>
            <span>The dominance of mild symptoms at the top confirms VAERS captures the full spectrum of experiences</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/myocarditis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Myocarditis Deep Dive</div>
            <div className="text-sm text-gray-500">A closely-watched safety signal</div>
          </Link>
          <Link href="/symptoms" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">All 500 Symptoms</div>
            <div className="text-sm text-gray-500">Browse the complete symptom database</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
