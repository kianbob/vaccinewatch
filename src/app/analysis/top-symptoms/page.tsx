import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { TopSymptomsChartClient as TopSymptomsChart } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Most Common Vaccine Side Effects — Top 20 Symptoms Reported to VAERS 2026',
  description: 'The 20 most reported vaccine adverse event symptoms in VAERS: fever, headache, pain, fatigue and more, each with clinical context on what they mean.',
  openGraph: {
    title: 'Most Common Vaccine Side Effects — Top 20 Symptoms Reported to VAERS 2026',
    description: 'The 20 most reported vaccine adverse event symptoms in VAERS: fever, headache, pain, fatigue and more, each with clinical context on what they mean.',
  },
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
      <ArticleSchema title="Most Reported Symptoms in VAERS" description="The 20 most commonly reported adverse symptoms in VAERS, with context on what these symptoms mean." slug="top-symptoms" />
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

      
      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for commonly reported symptoms
          is shifting. Annual VAERS reports in 2025-2026 have returned to the 35,000-45,000 range typical of
          the pre-pandemic era (2015-2019), making year-over-year comparisons more meaningful again.
        </p>
        <p>
          The HHS administration has signaled increased focus on vaccine safety data analysis, including
          the development of AI-powered tools for pattern detection in VAERS reports. While these tools
          are still under development, they represent a potential evolution in how adverse event data
          is analyzed and interpreted.
        </p>
        <p>
          New vaccines entering the market — including RSV vaccines for older adults and pregnant women,
          updated COVID-19 formulations, and potential H5N1 avian flu vaccines — continue to add new
          data streams to VAERS. Each new vaccine type provides additional context for understanding
          commonly reported symptoms across the full spectrum of vaccine safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Limitations of This Analysis</h2>
        <p>
          This analysis is based entirely on VAERS passive surveillance data, which carries important
          limitations that must be understood:
        </p>
        <ul>
          <li><strong>Underreporting:</strong> Studies estimate that only 1-10% of adverse events are
          reported to VAERS. This means the true number of events is likely much higher than what
          appears in the data.</li>
          <li><strong>Stimulated reporting:</strong> Media coverage and public awareness can temporarily
          increase reporting rates for specific vaccines, independent of any change in actual safety.</li>
          <li><strong>No control group:</strong> VAERS does not include a comparison group of unvaccinated
          individuals, making it impossible to determine whether reported events occurred at a higher
          rate than expected.</li>
          <li><strong>Variable data quality:</strong> VAERS reports range from detailed medical records
          submitted by healthcare providers to brief descriptions from patients. Not all reports
          are verified for medical accuracy.</li>
          <li><strong>Duplicate reports:</strong> The same event may be reported by multiple people
          (patient, doctor, manufacturer), and some duplicates may remain in the data.</li>
        </ul>
        <p>
          For these reasons, VAERS data is best used for signal detection — identifying potential safety
          concerns that warrant further investigation — rather than for definitive risk assessment. When
          VAERS surfaces a potential signal, it is investigated using more rigorous systems like the
          Vaccine Safety Datalink (VSD) and controlled epidemiological studies.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About This Data</h3>
        <p className="text-gray-600 text-sm mb-3">
          All data on VaccineWatch comes from the official VAERS public-use datasets published by the CDC and FDA.
          Our current dataset covers reports from 1990 through early 2026. We process the raw data without
          filtering or editorializing — every metric is a transparent aggregation of official government data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/methodology" className="text-sm text-primary hover:underline font-medium">Our Methodology →</Link>
          <Link href="/faq" className="text-sm text-primary hover:underline font-medium">FAQ →</Link>
          <Link href="/disclaimer" className="text-sm text-primary hover:underline font-medium">Disclaimer →</Link>
        </div>
      </div>


      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for commonly reported symptoms
          is shifting. Annual VAERS reports in 2025-2026 have returned to the 35,000-45,000 range typical of
          the pre-pandemic era (2015-2019), making year-over-year comparisons more meaningful again.
        </p>
        <p>
          The HHS administration has signaled increased focus on vaccine safety data analysis, including
          the development of AI-powered tools for pattern detection in VAERS reports. While these tools
          are still under development, they represent a potential evolution in how adverse event data
          is analyzed and interpreted.
        </p>
        <p>
          New vaccines entering the market — including RSV vaccines for older adults and pregnant women,
          updated COVID-19 formulations, and potential H5N1 avian flu vaccines — continue to add new
          data streams to VAERS. Each new vaccine type provides additional context for understanding
          commonly reported symptoms across the full spectrum of vaccine safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Limitations of This Analysis</h2>
        <p>
          This analysis is based entirely on VAERS passive surveillance data, which carries important
          limitations that must be understood:
        </p>
        <ul>
          <li><strong>Underreporting:</strong> Studies estimate that only 1-10% of adverse events are
          reported to VAERS. This means the true number of events is likely much higher than what
          appears in the data.</li>
          <li><strong>Stimulated reporting:</strong> Media coverage and public awareness can temporarily
          increase reporting rates for specific vaccines, independent of any change in actual safety.</li>
          <li><strong>No control group:</strong> VAERS does not include a comparison group of unvaccinated
          individuals, making it impossible to determine whether reported events occurred at a higher
          rate than expected.</li>
          <li><strong>Variable data quality:</strong> VAERS reports range from detailed medical records
          submitted by healthcare providers to brief descriptions from patients. Not all reports
          are verified for medical accuracy.</li>
          <li><strong>Duplicate reports:</strong> The same event may be reported by multiple people
          (patient, doctor, manufacturer), and some duplicates may remain in the data.</li>
        </ul>
        <p>
          For these reasons, VAERS data is best used for signal detection — identifying potential safety
          concerns that warrant further investigation — rather than for definitive risk assessment. When
          VAERS surfaces a potential signal, it is investigated using more rigorous systems like the
          Vaccine Safety Datalink (VSD) and controlled epidemiological studies.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About This Data</h3>
        <p className="text-gray-600 text-sm mb-3">
          All data on VaccineWatch comes from the official VAERS public-use datasets published by the CDC and FDA.
          Our current dataset covers reports from 1990 through early 2026. We process the raw data without
          filtering or editorializing — every metric is a transparent aggregation of official government data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/methodology" className="text-sm text-primary hover:underline font-medium">Our Methodology →</Link>
          <Link href="/faq" className="text-sm text-primary hover:underline font-medium">FAQ →</Link>
          <Link href="/disclaimer" className="text-sm text-primary hover:underline font-medium">Disclaimer →</Link>
        </div>
      </div>


      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for commonly reported symptoms
          is shifting. Annual VAERS reports in 2025-2026 have returned to the 35,000-45,000 range typical of
          the pre-pandemic era (2015-2019), making year-over-year comparisons more meaningful again.
        </p>
        <p>
          The HHS administration has signaled increased focus on vaccine safety data analysis, including
          the development of AI-powered tools for pattern detection in VAERS reports. While these tools
          are still under development, they represent a potential evolution in how adverse event data
          is analyzed and interpreted.
        </p>
        <p>
          New vaccines entering the market — including RSV vaccines for older adults and pregnant women,
          updated COVID-19 formulations, and potential H5N1 avian flu vaccines — continue to add new
          data streams to VAERS. Each new vaccine type provides additional context for understanding
          commonly reported symptoms across the full spectrum of vaccine safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Limitations of This Analysis</h2>
        <p>
          This analysis is based entirely on VAERS passive surveillance data, which carries important
          limitations that must be understood:
        </p>
        <ul>
          <li><strong>Underreporting:</strong> Studies estimate that only 1-10% of adverse events are
          reported to VAERS. This means the true number of events is likely much higher than what
          appears in the data.</li>
          <li><strong>Stimulated reporting:</strong> Media coverage and public awareness can temporarily
          increase reporting rates for specific vaccines, independent of any change in actual safety.</li>
          <li><strong>No control group:</strong> VAERS does not include a comparison group of unvaccinated
          individuals, making it impossible to determine whether reported events occurred at a higher
          rate than expected.</li>
          <li><strong>Variable data quality:</strong> VAERS reports range from detailed medical records
          submitted by healthcare providers to brief descriptions from patients. Not all reports
          are verified for medical accuracy.</li>
          <li><strong>Duplicate reports:</strong> The same event may be reported by multiple people
          (patient, doctor, manufacturer), and some duplicates may remain in the data.</li>
        </ul>
        <p>
          For these reasons, VAERS data is best used for signal detection — identifying potential safety
          concerns that warrant further investigation — rather than for definitive risk assessment. When
          VAERS surfaces a potential signal, it is investigated using more rigorous systems like the
          Vaccine Safety Datalink (VSD) and controlled epidemiological studies.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About This Data</h3>
        <p className="text-gray-600 text-sm mb-3">
          All data on VaccineWatch comes from the official VAERS public-use datasets published by the CDC and FDA.
          Our current dataset covers reports from 1990 through early 2026. We process the raw data without
          filtering or editorializing — every metric is a transparent aggregation of official government data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/methodology" className="text-sm text-primary hover:underline font-medium">Our Methodology →</Link>
          <Link href="/faq" className="text-sm text-primary hover:underline font-medium">FAQ →</Link>
          <Link href="/disclaimer" className="text-sm text-primary hover:underline font-medium">Disclaimer →</Link>
        </div>
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
          <Link href="/analysis/onset-timing" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">When Do Side Effects Start?</div>
            <div className="text-sm text-gray-500">Onset timing of common symptoms</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
