import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { ReportingBiasChartsClient as ReportingBiasCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'VAERS Reporting Bias Explained — Stimulated Reporting & Media Effects',
  description: 'Stimulated reporting, awareness bias, and media influence on VAERS data. 2021 saw a 25x spike in reports, showing how bias shapes vaccine safety numbers.',
  openGraph: {
    title: 'VAERS Reporting Bias Explained — Stimulated Reporting & Media Effects',
    description: 'Stimulated reporting, awareness bias, and media influence on VAERS data. 2021 saw a 25x spike in reports, showing how bias shapes vaccine safety numbers.',
  },
}

export default function ReportingBiasPage() {
  const yearlyStats = readJsonFile('yearly-stats.json')

  // Calculate pre-COVID baseline
  const preCovid = yearlyStats.filter((y: any) => y.year >= 2010 && y.year <= 2019)
  const preCovidAvg = Math.round(preCovid.reduce((s: number, y: any) => s + y.reports, 0) / preCovid.length)

  // Key years for bias analysis
  const year2021 = yearlyStats.find((y: any) => y.year === 2021) || { reports: 768706 }
  const year2020 = yearlyStats.find((y: any) => y.year === 2020) || { reports: 0 }
  const year2022 = yearlyStats.find((y: any) => y.year === 2022) || { reports: 0 }
  const year2023 = yearlyStats.find((y: any) => y.year === 2023) || { reports: 0 }

  // Calculate the spike and decline
  const spike2021 = Math.round(year2021.reports / preCovidAvg)
  const decline2023 = year2023.reports > 0 ? Math.round(((year2021.reports - year2023.reports) / year2021.reports) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="Understanding VAERS Reporting Bias" description="Analysis of factors that influence VAERS reporting patterns: stimulated reporting, awareness bias, media influence, and the healthy vaccinee effect." slug="reporting-bias" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Understanding VAERS Reporting Bias' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-primary uppercase tracking-wider">8 min read</div><ShareButtons title="Understanding VAERS Reporting Bias - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Understanding VAERS Reporting Bias
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Why VAERS reports don&apos;t tell the whole story. Understanding stimulated reporting, 
          awareness bias, and other factors that influence what gets reported to VAERS.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-primary mb-1">{spike2021}x</div>
          <div className="text-gray-700">increase in 2021 reports vs pre-COVID average — a clear example of <strong>stimulated reporting</strong></div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why Understanding Bias Is Essential</h2>
        <p>
          Reporting bias is arguably the most important concept for anyone interpreting VAERS data.
          Without understanding how and why reporting rates change, raw VAERS numbers can lead to
          dangerously wrong conclusions about vaccine safety. This analysis provides the framework
          needed to interpret VAERS data responsibly.
        </p>

        <h2 className={playfairDisplay.className}>What is Reporting Bias?</h2>
        <p>
          VAERS is a passive surveillance system that depends on voluntary reporting. This creates multiple 
          opportunities for bias — systematic differences in who reports, what gets reported, and when 
          reports are filed. Understanding these biases is crucial for interpreting VAERS data accurately.
        </p>
        <p>
          The dramatic {spike2021}x spike in VAERS reports in 2021 provides a perfect case study in 
          reporting bias. While COVID-19 vaccines were administered at unprecedented scale, the sheer 
          magnitude of the increase suggests factors beyond just volume were at play.
        </p>

        <h2 className={playfairDisplay.className}>Stimulated Reporting</h2>
        <p>
          Stimulated reporting occurs when media attention, public discourse, or regulatory focus increases 
          awareness of VAERS, leading to higher reporting rates. The COVID-19 pandemic created perfect 
          conditions for stimulated reporting:
        </p>
        <ul>
          <li><strong>Unprecedented media coverage:</strong> COVID-19 vaccines received more media attention than any vaccine in history</li>
          <li><strong>Political polarization:</strong> Vaccines became a topic of intense public debate</li>
          <li><strong>Social media amplification:</strong> Stories about vaccine side effects spread rapidly online</li>
          <li><strong>VAERS awareness:</strong> More people learned about VAERS and how to file reports</li>
        </ul>
        <p>
          The result: events that might have gone unreported in previous years were suddenly being reported 
          to VAERS at much higher rates.
        </p>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <ReportingBiasCharts yearlyData={yearlyStats} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Awareness Bias Effect</h2>
        <p>
          Awareness bias occurs when people actively look for adverse events after vaccination. During 
          the COVID-19 era, several factors heightened this awareness:
        </p>
        <ul>
          <li>People were specifically told to monitor for side effects</li>
          <li>V-safe and other active monitoring systems reminded people to report symptoms</li>
          <li>Healthcare providers were required to report certain events</li>
          <li>Media coverage of rare side effects made people hypervigilant</li>
        </ul>
        <p>
          This means that normal health events that happen to coincide temporally with vaccination 
          were more likely to be perceived as vaccine-related and reported to VAERS.
        </p>

        <h2 className={playfairDisplay.className}>The Healthy Vaccinee Effect</h2>
        <p>
          The "healthy vaccinee effect" describes how vaccination rates differ across populations based 
          on health status and healthcare engagement. People who:
        </p>
        <ul>
          <li>Are more health-conscious</li>
          <li>Have regular healthcare providers</li>
          <li>Follow medical recommendations</li>
          <li>Have higher health literacy</li>
        </ul>
        <p>
          Are more likely to both get vaccinated AND to report adverse events when they occur. 
          This can create the appearance of higher adverse event rates among vaccinated individuals 
          compared to unvaccinated individuals, even when vaccines are not the cause.
        </p>

        <h2 className={playfairDisplay.className}>Media Influence on Reporting</h2>
        <p>
          Media coverage significantly influences VAERS reporting patterns:
        </p>
        <ul>
          <li><strong>Weber effect:</strong> Reports surge after media coverage of specific adverse events</li>
          <li><strong>Temporal clustering:</strong> Reports cluster around news cycles rather than actual event occurrence</li>
          <li><strong>Symptom suggestion:</strong> Media coverage can lead people to attribute normal symptoms to vaccines</li>
          <li><strong>Recall bias:</strong> People may "remember" symptoms after seeing similar stories in the news</li>
        </ul>
        <p>
          For example, when myocarditis became a widely reported vaccine side effect, VAERS saw an 
          increase not just in myocarditis reports, but in various cardiac symptoms that people 
          began attributing to vaccination.
        </p>

        <h2 className={playfairDisplay.className}>The Decline: Evidence of Bias</h2>
        <p>
          Perhaps the strongest evidence of reporting bias is what happened after 2021. VAERS reports 
          declined by approximately {decline2023}% from their 2021 peak, despite continued COVID-19 
          vaccination. This decline suggests that:
        </p>
        <ul>
          <li>Initial heightened awareness decreased over time</li>
          <li>Media attention shifted away from vaccine side effects</li>
          <li>People became accustomed to vaccination</li>
          <li>Healthcare providers developed more standardized approaches to post-vaccination care</li>
        </ul>

        <h2 className={playfairDisplay.className}>Implications for Data Interpretation</h2>
        <p>
          Understanding reporting bias is essential for several reasons:
        </p>
        <ul>
          <li><strong>Comparing across time periods:</strong> Reports from 2021 cannot be directly compared to reports from 2015</li>
          <li><strong>Comparing across vaccines:</strong> Vaccines that received more media attention may appear to have higher adverse event rates</li>
          <li><strong>Assessing rare events:</strong> Apparent increases in rare events may reflect increased reporting rather than increased occurrence</li>
          <li><strong>Setting expectations:</strong> Healthcare providers need to understand that VAERS data reflect reporting behavior as much as actual event rates</li>
        </ul>

        <h2 className={playfairDisplay.className}>Underreporting: The Other Side of Bias</h2>
        <p>
          While stimulated reporting inflates numbers for some vaccines, underreporting reduces
          counts for others. Studies estimate that VAERS captures only a fraction of actual adverse
          events:
        </p>
        <ul>
          <li><strong>Mild events (soreness, low-grade fever):</strong> estimated 1–5% reporting rate</li>
          <li><strong>Moderate events (high fever, extended fatigue):</strong> estimated 5–25% reporting rate</li>
          <li><strong>Serious events (hospitalization, disability):</strong> estimated 25–50% reporting rate</li>
          <li><strong>Deaths:</strong> highest reporting rate, but still not 100%</li>
        </ul>
        <p>
          This means that VAERS simultaneously overcounts some events (through stimulated reporting of
          coincidental events) and undercounts others (through failure to report genuine reactions).
          The net effect varies by vaccine, time period, and event type — making raw VAERS counts
          unreliable for estimating true adverse event rates.
        </p>

        <h2 className={playfairDisplay.className}>Correcting for Bias: What Researchers Do</h2>
        <p>
          Researchers use several techniques to account for reporting bias when analyzing VAERS data:
        </p>
        <ul>
          <li><strong>Proportional Reporting Ratios (PRR):</strong> Compare reporting patterns across
          vaccines to identify disproportionate signals, controlling for overall reporting volume</li>
          <li><strong>Empirical Bayesian methods:</strong> Statistical techniques that adjust for
          baseline reporting differences between vaccines and time periods</li>
          <li><strong>Multi-source triangulation:</strong> Cross-referencing VAERS signals with active
          surveillance systems (VSD, BEST) that have known denominators</li>
          <li><strong>Historical comparisons:</strong> Analyzing whether current reporting for a
          vaccine deviates from historical patterns for similar vaccines</li>
        </ul>

        <h2 className={playfairDisplay.className}>Why This Matters for Credibility</h2>
        <p>
          Acknowledging and explaining reporting bias is crucial for maintaining VAERS credibility. 
          When public health officials and researchers openly discuss these limitations:
        </p>
        <ul>
          <li>It builds trust by demonstrating transparency</li>
          <li>It helps the public interpret data more accurately</li>
          <li>It reduces misuse of VAERS data for inappropriate purposes</li>
          <li>It highlights the importance of active surveillance and controlled studies</li>
        </ul>
      </div>

      {/* Historical context */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-12">
        <strong>Historical perspective:</strong> Stimulated reporting is not unique to COVID-19.
        The 1976 swine flu vaccination campaign saw a similar (though smaller) spike in VAERS
        predecessor reports after media coverage of Guillain-Barré cases. The 1998 autism-vaccine
        controversy also increased reporting of developmental symptoms after childhood vaccination.
        In each case, reporting rates eventually returned to baseline as media attention faded — a
        pattern consistent with stimulated reporting rather than genuine changes in vaccine safety.
      </div>

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>The {spike2021}x increase in 2021 VAERS reports demonstrates stimulated reporting</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Media coverage, awareness campaigns, and political attention all influence reporting rates</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>The subsequent {decline2023}% decline shows that reporting rates are not constant</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Understanding bias is essential for accurate interpretation of VAERS data</span>
          </li>
        </ul>
      </div>

      {/* Explore More */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Tools for Understanding Bias</h3>
        <p className="text-gray-600 text-sm mb-4">
          Use these tools to see reporting bias in action — compare reporting rates across
          vaccines and time periods to understand how bias shapes the numbers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/tools/reporting-rates" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Reporting Rate Calculator →</div>
            <div className="text-sm text-gray-500">See how rates differ by vaccine and era</div>
          </Link>
          <Link href="/tools/signal-detection" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Safety Signal Detection →</div>
            <div className="text-sm text-gray-500">How real signals are distinguished from noise</div>
          </Link>
        </div>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/denominator-problem" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Why Raw VAERS Numbers Can Be Misleading</div>
            <div className="text-sm text-gray-500">The denominator problem explained</div>
          </Link>
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">The COVID-19 Impact on VAERS</div>
            <div className="text-sm text-gray-500">How the pandemic changed reporting</div>
          </Link>
          <Link href="/analysis/who-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Who Files VAERS Reports?</div>
            <div className="text-sm text-gray-500">How reporting sources shape the data</div>
          </Link>
          <Link href="/analysis/reporting-trends" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">35 Years of VAERS Reporting</div>
            <div className="text-sm text-gray-500">Historical reporting trends</div>
          </Link>
        </div>
      </div>
    </div>
  )
}