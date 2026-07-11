import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { RecoveryRatesChartsClient as RecoveryRatesCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Do Vaccine Side Effects Go Away? — VAERS Recovery Rate Data 2026',
  description: '68% of VAERS reports indicate recovery. What "not recovered" really means and how often vaccine side effects resolve, broken down by vaccine type.',
  openGraph: {
    title: 'Do Vaccine Side Effects Go Away? — VAERS Recovery Rate Data 2026',
    description: '68% of VAERS reports indicate recovery. What "not recovered" really means and how often vaccine side effects resolve, broken down by vaccine type.',
  },
}

export default function RecoveryRatesPage() {
  const recoveryData = readJsonFile('recovery-rates.json')

  // Get overall recovery stats across all vaccines
  const allVaccines = Object.keys(recoveryData)
  let totalRecovered = 0
  let totalNotRecovered = 0
  let totalUnknown = 0

  allVaccines.forEach(vaccine => {
    totalRecovered += recoveryData[vaccine].Y || 0
    totalNotRecovered += recoveryData[vaccine].N || 0
    totalUnknown += recoveryData[vaccine].U || 0
  })

  const totalWithStatus = totalRecovered + totalNotRecovered + totalUnknown
  const recoveredPercent = ((totalRecovered / totalWithStatus) * 100).toFixed(1)
  const notRecoveredPercent = ((totalNotRecovered / totalWithStatus) * 100).toFixed(1)
  const unknownPercent = ((totalUnknown / totalWithStatus) * 100).toFixed(1)

  // COVID-19 specific stats
  const covidData = recoveryData.COVID19 || { Y: 0, N: 0, U: 0 }
  const covidTotal = covidData.Y + covidData.N + covidData.U
  const covidRecoveredPercent = ((covidData.Y / covidTotal) * 100).toFixed(1)
  const covidNotRecoveredPercent = ((covidData.N / covidTotal) * 100).toFixed(1)

  // Find vaccines with highest non-recovery rates
  const vaccineRates = allVaccines.map(vaccine => {
    const data = recoveryData[vaccine]
    const total = data.Y + data.N + data.U
    return {
      vaccine,
      total,
      notRecoveredRate: total > 100 ? (data.N / total) * 100 : 0, // Only include vaccines with >100 reports
      notRecovered: data.N,
      recovered: data.Y,
      unknown: data.U
    }
  }).filter(v => v.total > 100).sort((a, b) => b.notRecoveredRate - a.notRecoveredRate)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="Do Vaccine Side Effects Go Away? - VAERS Recovery Rate Analysis" description="Analysis of recovery rates for vaccine adverse events in VAERS. What does " slug="recovery-rates" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Do Vaccine Side Effects Go Away?' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-primary uppercase tracking-wider">6 min read</div><ShareButtons title="Do Vaccine Side Effects Go Away? - VAERS Recovery Rate Analysis - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Do Vaccine Side Effects Go Away?
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Analysis of recovery status in VAERS reports. The majority of adverse events resolve, 
          but understanding what "not recovered" means requires important context.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-primary mb-1">{recoveredPercent}%</div>
          <div className="text-gray-700">of reports indicate <strong>recovery</strong> from the adverse event ({formatNumber(totalRecovered)} of {formatNumber(totalWithStatus)} reports with known status)</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why Recovery Data Matters</h2>
        <p>
          Recovery status is one of the most commonly cited — and most commonly misunderstood —
          fields in VAERS. Anti-vaccine advocates sometimes highlight the &quot;not recovered&quot;
          count as evidence of permanent vaccine damage. This analysis provides the context needed
          to understand what these numbers actually represent.
        </p>

        <h2 className={playfairDisplay.className}>Understanding Recovery Status</h2>
        <p>
          VAERS tracks whether people recover from reported adverse events, but this data comes with
          important caveats that are essential for correct interpretation. The recovery field is one of
          the most frequently misrepresented aspects of VAERS data.
        </p>
        <p>
          Of {formatNumber(totalWithStatus)} reports with recovery status information:
        </p>
        <ul>
          <li><strong>Recovered (Y):</strong> {formatNumber(totalRecovered)} ({recoveredPercent}%) — the person
          recovered from the reported adverse event</li>
          <li><strong>Not recovered (N):</strong> {formatNumber(totalNotRecovered)} ({notRecoveredPercent}%) —
          symptoms were ongoing at the time the report was filed (see context below)</li>
          <li><strong>Unknown (U):</strong> {formatNumber(totalUnknown)} ({unknownPercent}%) — recovery status
          was not provided or follow-up was not available</li>
        </ul>
        <p>
          However, "not recovered" doesn&apos;t necessarily mean permanent injury. It often means the condition 
          was ongoing at the time the report was filed, which could be days, weeks, or months after vaccination.
        </p>

        <h2 className={playfairDisplay.className}>The Follow-Up Gap</h2>
        <p>
          A key limitation of VAERS recovery data is that reporters are not required to submit
          updates. Someone who reports &quot;not recovered&quot; on day 3 and then fully recovers
          by day 7 will permanently show as &quot;not recovered&quot; in the database unless they
          voluntarily submit a follow-up report — which most people do not do.
        </p>

        <h2 className={playfairDisplay.className}>What "Not Recovered" Really Means</h2>
        <p>The "not recovered" category includes several scenarios:</p>
        <ul>
          <li><strong>Ongoing at time of report:</strong> Symptoms that hadn&apos;t resolved when the report was submitted</li>
          <li><strong>Chronic conditions:</strong> Pre-existing conditions that may have been exacerbated</li>
          <li><strong>Incomplete information:</strong> Cases where follow-up information wasn&apos;t available</li>
          <li><strong>Permanent sequelae:</strong> True permanent effects (the minority of cases)</li>
        </ul>
        <p>
          Importantly, VAERS is a passive surveillance system. Many people who recover completely may never 
          submit follow-up information to update their recovery status.
        </p>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <RecoveryRatesCharts recoveryData={recoveryData} vaccineRates={vaccineRates} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>COVID-19 Vaccine Recovery Patterns</h2>
        <p>
          For COVID-19 vaccines, {covidRecoveredPercent}% of reports indicate recovery, with {covidNotRecoveredPercent}% 
          listed as not recovered. This pattern is similar to other vaccines and likely reflects the high volume 
          of COVID-19 vaccine reports and the various types of symptoms reported.
        </p>
        <p>
          Many COVID-19 vaccine "not recovered" reports involve common symptoms like fatigue or headache that 
          were ongoing when the report was filed, rather than permanent disabilities.
        </p>

        <h2 className={playfairDisplay.className}>Vaccines with Higher Non-Recovery Rates</h2>
        {vaccineRates.length > 0 && (
          <p>
            Some vaccines show higher rates of "not recovered" status, but this often reflects the nature 
            of the population receiving them or the types of symptoms commonly reported:
          </p>
        )}
        <ul>
          {vaccineRates.slice(0, 5).map(vaccine => (
            <li key={vaccine.vaccine}>
              <strong>{vaccine.vaccine}:</strong> {vaccine.notRecoveredRate.toFixed(1)}% not recovered 
              ({formatNumber(vaccine.notRecovered)} of {formatNumber(vaccine.total)} reports)
            </li>
          ))}
        </ul>
        <p>
          These differences may reflect various factors including the age and health status of recipients, 
          the types of adverse events commonly reported for each vaccine, and reporting patterns rather 
          than inherent differences in recovery likelihood.
        </p>

        <h2 className={playfairDisplay.className}>The Reporting Timeline Factor</h2>
        <p>
          A critical limitation is timing. VAERS reports are often filed shortly after vaccination when 
          symptoms first appear. If someone experiences fatigue for a week after vaccination, they might 
          report "not recovered" on day 3, even though they fully recover by day 7.
        </p>
        <p>
          Unlike controlled clinical studies, VAERS doesn&apos;t systematically follow up with reporters 
          to update recovery status. This creates a bias toward "not recovered" classifications for 
          conditions that would eventually resolve.
        </p>

        <h2 className={playfairDisplay.className}>Recovery by Symptom Type</h2>
        <p>
          Recovery rates also vary significantly by the type of adverse event reported:
        </p>
        <ul>
          <li><strong>Local reactions</strong> (injection site pain, swelling): near-universal recovery
          within days, though often not updated in VAERS because reporters consider them trivial</li>
          <li><strong>Systemic reactions</strong> (fever, fatigue, headache): typically resolve within
          1–3 days; high recovery rates in clinical trial data</li>
          <li><strong>Allergic reactions</strong> (anaphylaxis, urticaria): most recover fully with
          treatment, though some may have lingering anxiety about future vaccinations</li>
          <li><strong>Neurological events</strong> (GBS, Bell&apos;s palsy): recovery rates vary;
          GBS patients typically improve over weeks to months, with most regaining full function</li>
          <li><strong>Cardiac events</strong> (myocarditis): vaccine-associated myocarditis shows
          favorable recovery, with most patients having normal cardiac function at follow-up</li>
        </ul>

        <h2 className={playfairDisplay.className}>What Families Should Know</h2>
        <p>
          If you or a family member experiences an adverse event after vaccination:
        </p>
        <ul>
          <li>Seek medical attention for any concerning symptoms, especially chest pain, difficulty
          breathing, severe allergic reactions, or neurological changes</li>
          <li>Most common side effects (soreness, fever, fatigue) resolve within 48 hours</li>
          <li>Report the event to VAERS at <a href="https://vaers.hhs.gov" target="_blank" rel="noopener noreferrer">vaers.hhs.gov</a> — this helps monitor vaccine safety</li>
          <li>Discuss future vaccination plans with your healthcare provider</li>
        </ul>

        <h2 className={playfairDisplay.className}>Clinical Context</h2>
        <p>
          Clinical trials and active surveillance studies generally show higher recovery rates than 
          VAERS suggests. For example:
        </p>
        <ul>
          <li>Most injection site reactions resolve within 1-3 days</li>
          <li>Systemic symptoms like fever and fatigue typically last 1-2 days</li>
          <li>Even more serious events like myocarditis often have good outcomes with treatment</li>
        </ul>
        <p>
          The controlled environment of clinical trials allows for better tracking of symptom resolution 
          compared to the voluntary, passive VAERS system.
        </p>
      </div>

      {/* V-safe comparison */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-12">
        <strong>Active surveillance comparison:</strong> The CDC&apos;s V-safe program, which actively
        followed up with COVID-19 vaccine recipients via smartphone, found that the vast majority of
        reported side effects resolved within 7 days. V-safe data consistently shows higher recovery
        rates than VAERS because it systematically checks in with participants, capturing resolution
        that VAERS misses. This reinforces that VAERS &quot;not recovered&quot; rates are inflated by
        the lack of follow-up, not by genuinely poor recovery outcomes. For more on how VAERS
        compares to active surveillance, see <Link href="/is-vaers-reliable" className="text-blue-700 underline">Is VAERS Reliable?</Link>
      </div>

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>{recoveredPercent}% of VAERS reports with known status indicate recovery</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>"Not recovered" often means "ongoing at time of report" rather than permanent injury</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>VAERS lacks systematic follow-up, creating bias toward "not recovered" classifications</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Clinical studies show higher recovery rates than suggested by VAERS data alone</span>
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-semibold text-gray-900">If someone doesn&apos;t recover, does that mean permanent injury?</div>
            <div className="text-gray-600 mt-1">Usually not. &quot;Not recovered&quot; in VAERS most often means symptoms were ongoing when the report was filed. Many people recover after their report is submitted but never update VAERS. True permanent injuries from vaccines are rare.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Can VAERS recovery data be updated?</div>
            <div className="text-gray-600 mt-1">Yes, but updates are voluntary and infrequent. VAERS allows follow-up reports, but most reporters do not submit them. This creates a systematic bias toward &quot;not recovered&quot; in the data.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Where can I find more reliable recovery data?</div>
            <div className="text-gray-600 mt-1">Clinical trials and active surveillance systems (like V-safe and VSD) provide more accurate recovery information because they systematically follow up with participants. These consistently show higher recovery rates than VAERS suggests.</div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious vs Non-Serious Outcomes</div>
            <div className="text-sm text-gray-500">Understanding severity classifications</div>
          </Link>
          <Link href="/analysis/onset-timing" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">When Do Side Effects Start?</div>
            <div className="text-sm text-gray-500">Timing patterns and recovery</div>
          </Link>
          <Link href="/analysis/hospital-stays" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Hospitalization Duration</div>
            <div className="text-sm text-gray-500">How long serious cases last</div>
          </Link>
        </div>
      </div>
    </div>
  )
}