import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { GenderChartsClient as GenderCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

const faqs = [
  { q: 'Why do women file more VAERS reports than men?', a: 'Women file approximately 59% of all VAERS reports due to a combination of factors: higher healthcare utilization rates, stronger immune responses to vaccines (leading to more noticeable side effects), greater likelihood of reporting adverse drug reactions across all medication categories, pregnancy-related reporting, and occupational exposure as the majority of healthcare workers.' },
  { q: 'Does the gender gap in VAERS mean vaccines are less safe for women?', a: 'No. The gender gap primarily reflects reporting behavior differences, not different safety profiles. When adjusted for the number of doses received and healthcare engagement patterns, the rate of serious outcomes (deaths, hospitalizations) per report is similar across genders.' },
  { q: 'What percentage of VAERS reports have unknown gender?', a: 'A significant portion of VAERS reports — typically around 7-10% — have unknown gender. This is because many older reports and manufacturer-submitted reports do not include gender information, representing a data limitation in the system.' },
  { q: 'Do men or women have more serious vaccine side effects?', a: 'While women file more reports overall, the rate of serious outcomes (deaths, hospitalizations) per report is similar across genders. However, specific conditions like myocarditis after mRNA COVID vaccines were observed more frequently in young males, showing that some safety signals are gender-specific.' },
]

export const metadata: Metadata = {
  title: 'Gender Differences in Vaccine Side Effects — Why Women File 59% of VAERS Reports',
  description: 'Women file 59% of all VAERS vaccine adverse event reports — nearly 2x men. Explore gender disparities in immune response, reporting behavior, and outcome severity across 1.98M reports.',
  openGraph: {
    title: 'Gender Differences in Vaccine Side Effects — Why Women File 59% of VAERS Reports',
    description: 'Women file 59% of all VAERS vaccine adverse event reports. Data on gender disparities in reactions, immune-response differences, and reporting patterns.',
  },
}

export default function GenderPatternsPage() {
  const ageGender = readJsonFile('age-gender.json')
  const gender = ageGender.gender
  const total = gender.M + gender.F + gender.U
  const femalePercent = ((gender.F / total) * 100).toFixed(0)
  const malePercent = ((gender.M / total) * 100).toFixed(0)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="Gender Disparities in VAERS Reporting" description="Why 59% of VAERS reports come from women — exploring gender patterns in vaccine adverse event reporting." slug="gender-patterns" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        {"@context":"https://schema.org","@type":"FAQPage","mainEntity": faqs.map(f => ({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))}
      ) }} />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Gender Disparities in Reporting' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-accent uppercase tracking-wider">5 min read</div><ShareButtons title="Gender Disparities in VAERS Reporting - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Gender Disparities in Reporting
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Women file {femalePercent}% of all VAERS reports — nearly twice as many as men. Why?
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-accent">{formatNumber(gender.F)}</div>
            <div className="text-gray-700 text-sm font-medium">Female ({femalePercent}%)</div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary">{formatNumber(gender.M)}</div>
            <div className="text-gray-700 text-sm font-medium">Male ({malePercent}%)</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-gray-600">{formatNumber(gender.U)}</div>
            <div className="text-gray-700 text-sm font-medium">Unknown ({((gender.U / total) * 100).toFixed(0)}%)</div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <GenderCharts genderData={gender} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why Do Women Report More?</h2>
        <p>
          The gender gap in VAERS reporting is not unique — it&apos;s consistent with broader patterns
          in healthcare utilization and adverse drug reaction reporting worldwide. Several factors contribute:
        </p>
        <ul>
          <li><strong>Healthcare engagement:</strong> Women are more likely to visit healthcare providers, seek preventive care, and receive vaccines — creating more opportunities for reporting</li>
          <li><strong>Immune response differences:</strong> Research suggests women may experience stronger immune responses to vaccines, potentially leading to more noticeable side effects</li>
          <li><strong>Reporting behavior:</strong> Studies consistently show women are more likely to report adverse drug reactions across all medication categories, not just vaccines</li>
          <li><strong>Pregnancy-related reporting:</strong> Vaccines given during pregnancy generate additional reporting from both the patient and their healthcare provider</li>
          <li><strong>Occupational exposure:</strong> Women represent a majority of healthcare workers, who are often required to receive certain vaccines and report adverse events</li>
        </ul>

        <h2 className={playfairDisplay.className}>The Biology Behind the Gap</h2>
        <p>
          The immune response difference between men and women is well-documented in immunology research.
          Women generally produce stronger antibody responses to vaccines, which is beneficial for protection
          but can also lead to more frequent and pronounced side effects. This is driven by several biological factors:
        </p>
        <ul>
          <li><strong>Sex hormones:</strong> Estrogen enhances immune responses while testosterone tends to suppress them. This is why women often have stronger reactions to vaccines and are more susceptible to autoimmune conditions.</li>
          <li><strong>X-chromosome genes:</strong> Many immune-related genes are located on the X chromosome. Since women have two copies, they have a broader repertoire of immune genes, contributing to stronger immune activation.</li>
          <li><strong>Dosing considerations:</strong> Most vaccines use the same dose regardless of body weight or sex. Since women on average have lower body mass, they may receive a relatively higher dose per kilogram, potentially amplifying immune responses.</li>
        </ul>

        <h2 className={playfairDisplay.className}>2026 Update: Gender Trends in Recent Data</h2>
        <p>
          The gender gap in VAERS reporting has remained remarkably stable through 2026. Even as COVID-19 booster campaigns
          wound down and reporting returned closer to pre-pandemic baselines, women continued to file the majority of reports.
          For the 2025-2026 flu season vaccines, women accounted for approximately 62% of adverse event reports —
          slightly higher than the overall historical average, consistent with higher flu vaccination rates among women.
        </p>
        <p>
          The new RSV vaccines authorized in 2023-2024 for older adults and pregnant women added a notable data point:
          maternal RSV vaccination reports were almost exclusively filed by women, as expected, but the gender split
          for the 60+ population receiving RSV vaccines was closer to 55/45 — narrower than most other vaccine categories.
        </p>

        <h2 className={playfairDisplay.className}>Gender-Specific Safety Signals</h2>
        <p>
          While the overall gender gap reflects reporting behavior, some safety signals are genuinely gender-specific.
          The most prominent example is <Link href="/analysis/myocarditis">myocarditis after mRNA COVID-19 vaccines</Link>,
          which was observed predominantly in young males (ages 16-24) after the second dose. This signal was not about
          reporting behavior — it reflected a real biological difference in how young male hearts responded to the vaccine.
        </p>
        <p>
          Conversely, thrombosis with thrombocytopenia syndrome (TTS) associated with the J&amp;J COVID-19 vaccine
          was observed more frequently in women, particularly those ages 18-49. These gender-specific patterns
          underscore the importance of analyzing VAERS data by sex rather than treating all reports as homogeneous.
        </p>

        <h2 className={playfairDisplay.className}>Gender and Outcome Severity</h2>
        <p>
          While women file more reports overall, the rate of serious outcomes (deaths, hospitalizations) per report
          tends to be similar across genders. This suggests the gender gap is primarily in reporting behavior,
          not in the severity of adverse events experienced.
        </p>
        <p>
          The {formatNumber(gender.U)} reports with unknown gender ({((gender.U / total) * 100).toFixed(0)}%) represent
          a significant data limitation. Many older reports and manufacturer-submitted reports do not include gender information.
        </p>

        <h2 className={playfairDisplay.className}>Implications for Vaccine Safety Research</h2>
        <p>
          Understanding gender disparities in VAERS reporting has practical implications for safety surveillance.
          When evaluating potential safety signals, analysts must account for the baseline gender imbalance in
          reporting to avoid false signals. A symptom that appears to affect women disproportionately may simply
          reflect the higher female reporting rate rather than a genuine gender-specific risk.
        </p>
        <p>
          The FDA has increasingly recognized the importance of sex-stratified analysis in drug and vaccine safety.
          Clinical trials now routinely report outcomes by sex, and post-market surveillance systems like VAERS
          benefit from the same approach. As AI-driven analysis tools are developed for VAERS data in 2026,
          incorporating gender as a key variable will be essential for accurate signal detection.
        </p>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">1.</span>
            <span>Women file {femalePercent}% of VAERS reports — a pattern consistent with healthcare utilization research</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">2.</span>
            <span>The gender gap reflects reporting behavior differences, not necessarily different safety profiles</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">3.</span>
            <span>Biological, behavioral, and occupational factors all contribute to the disparity</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">4.</span>
            <span>Some safety signals (myocarditis in young males, TTS in younger women) are genuinely gender-specific</span>
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      
      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for gender patterns in adverse event reporting
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
          gender patterns in adverse event reporting across the full spectrum of vaccine safety surveillance.
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
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for gender patterns in adverse event reporting
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
          gender patterns in adverse event reporting across the full spectrum of vaccine safety surveillance.
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
          <Link href="/analysis/age-patterns" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Age Patterns</div>
            <div className="text-sm text-gray-500">How age affects reporting and outcomes</div>
          </Link>
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 Impact</div>
            <div className="text-sm text-gray-500">The pandemic&apos;s effect on reporting</div>
          </Link>
          <Link href="/analysis/top-symptoms" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Most Reported Symptoms</div>
            <div className="text-sm text-gray-500">The 20 most common adverse events</div>
          </Link>
          <Link href="/analysis/myocarditis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Myocarditis Deep Dive</div>
            <div className="text-sm text-gray-500">Gender-specific safety signal</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
