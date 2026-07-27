import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'VAERS Reports by Age Group — Adverse Events by Age Demographics (2026)',
  description: 'How do vaccine adverse event reports in VAERS break down by age? Explore reporting patterns across infants, children, teens, adults, and seniors — and what the age data actually means.',
  openGraph: {
    title: 'VAERS Reports by Age Group — Who Reports the Most Adverse Events?',
    description: 'Breakdown of VAERS adverse event reports by age demographics: infants through seniors. Reporting patterns, common reactions by age, and how to interpret the data.',
  },
}

export default function VaersByAgePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Which age group has the most VAERS reports?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Adults aged 30-64 account for the largest share of VAERS reports, largely because this group received the most COVID-19 vaccine doses. When adjusted for doses administered, reporting rates per million doses are highest in adolescents and young adults (12-29) and seniors (65+).'
                }
              },
              {
                '@type': 'Question',
                name: 'Do children have more vaccine side effects than adults?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Children receive more vaccine doses through the childhood immunization schedule, leading to a steady baseline of VAERS reports. However, most pediatric reports involve mild, expected reactions (fever, injection site pain). Serious reports are rare in children. VAERS reports alone cannot determine whether children experience more side effects — only controlled studies can establish comparative rates.'
                }
              },
              {
                '@type': 'Question',
                name: 'Why do older adults have more serious VAERS reports?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Seniors (65+) have a higher proportion of serious VAERS reports because they have more underlying health conditions, are more likely to be hospitalized for any reason, and any health event after vaccination is more likely to be reported. This does not necessarily mean vaccines are more dangerous for older adults — correlation in VAERS does not equal causation.'
                }
              },
              {
                '@type': 'Question',
                name: 'Are VAERS reports different for teens vs adults after COVID vaccines?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Teens and young adults (12-29) show a distinct pattern in COVID vaccine VAERS reports: higher rates of myocarditis/pericarditis (especially in males), more reports of chest pain and heart palpitations, but lower rates of the systemic reactions (fatigue, headache) that dominate adult reports. This age-specific signal led to updated clinical guidance.'
                }
              }
            ]
          })
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"Article","headline":"VAERS Reports by Age Group — Adverse Event Demographics","description":"How vaccine adverse event reports in VAERS break down by age: reporting patterns, common reactions, and what the age data means.","url":"https://www.vaccinewatch.org/vaers-by-age","datePublished":"2026-07-27","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"VaccineWatch","url":"https://www.vaccinewatch.org"}}' }} />
      <Breadcrumbs items={[{ label: 'VAERS Reports by Age Group' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">12 min read</div>
          <ShareButtons title="VAERS Reports by Age Group" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          VAERS Reports by Age Group
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Age is one of the most important factors in vaccine adverse event reporting. Here&apos;s 
          how VAERS data breaks down across age demographics — from infants to seniors — and 
          what the patterns actually tell us.
        </p>
      </div>

      {/* Key facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-white border border-blue-200 rounded-xl p-5">
          <div className="text-sm text-blue-500 font-medium mb-1">Most Reports</div>
          <div className="text-lg font-bold text-gray-900">Adults 30–64</div>
          <div className="text-sm text-gray-500">Largest vaccinated group</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-5">
          <div className="text-sm text-amber-500 font-medium mb-1">Highest Serious Rate</div>
          <div className="text-lg font-bold text-gray-900">Seniors 65+</div>
          <div className="text-sm text-gray-500">More underlying conditions</div>
        </div>
        <div className="bg-white border border-purple-200 rounded-xl p-5">
          <div className="text-sm text-purple-500 font-medium mb-1">Unique Signal</div>
          <div className="text-lg font-bold text-gray-900">Teens &amp; Young Adults</div>
          <div className="text-sm text-gray-500">Myocarditis after mRNA vaccines</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
        <h2 className={`text-xl font-bold text-amber-900 mb-4 ${playfairDisplay.className}`}>💡 Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900">
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Raw report counts are misleading without dose denominators.</strong> The age group with the most reports is simply the group that received the most doses. Per-dose reporting rates tell a very different story.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Different age groups show different adverse event profiles.</strong> Children&apos;s reports are dominated by fever and fussiness. Adults report more fatigue and headache. Seniors have higher proportions of serious outcomes — but also more baseline health events.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>COVID vaccines shifted the age distribution dramatically.</strong> Before 2021, VAERS was dominated by childhood vaccine reports. COVID vaccination created a massive surge in adult reports, fundamentally changing the age breakdown.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Age-specific signals are real and important.</strong> The myocarditis signal in young males was detected partly because age-stratified analysis revealed a pattern invisible in aggregate data.</span>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Age Groups in VAERS</h2>
        <p>
          VAERS reports include the patient&apos;s age at vaccination, allowing analysis by age 
          demographics. Understanding these patterns is critical for vaccine safety surveillance —
          but also easy to misinterpret without proper context.
        </p>

        <h2 className={playfairDisplay.className}>Infants and Young Children (0–4)</h2>
        <p>
          Infants and toddlers receive numerous vaccines through the childhood immunization 
          schedule (DTaP, MMR, polio, hepatitis B, rotavirus, and more). VAERS reports for this 
          age group typically involve:
        </p>
        <ul>
          <li><strong>Fever</strong> — the most common reported reaction in infants</li>
          <li><strong>Injection site reactions</strong> — redness, swelling at the vaccination site</li>
          <li><strong>Fussiness and crying</strong> — common and expected after vaccination</li>
          <li><strong>Rash</strong> — occasionally reported, especially after MMR</li>
        </ul>
        <p>
          Serious reports in this age group are rare but receive significant attention. It&apos;s 
          important to note that infants have a baseline rate of medical events (febrile 
          seizures, SIDS, hospitalizations) that will coincidentally follow vaccination simply 
          because the vaccination schedule is dense during the first year of life.
        </p>

        <h2 className={playfairDisplay.className}>Children (5–11)</h2>
        <p>
          School-age children receive fewer routine vaccines but became eligible for COVID-19 
          vaccination in late 2021. Reports for this group show:
        </p>
        <ul>
          <li>Predominantly mild reactions (fever, fatigue, headache)</li>
          <li>Lower reporting rates per dose than adolescents or adults</li>
          <li>Very low rates of serious adverse events</li>
          <li>Myocarditis risk after COVID vaccination is lower than in older teens</li>
        </ul>

        <h2 className={playfairDisplay.className}>Adolescents and Young Adults (12–29)</h2>
        <p>
          This age group emerged as particularly important during COVID-19 vaccination due to 
          the myocarditis signal:
        </p>
        <ul>
          <li><strong>Myocarditis/pericarditis:</strong> Confirmed elevated risk after mRNA COVID vaccines, especially in males aged 16–24 after the second dose</li>
          <li><strong>Chest pain and palpitations:</strong> Reported at higher rates than in older adults</li>
          <li><strong>Syncope (fainting):</strong> Teens are more prone to fainting after any vaccination — this is a known age-related phenomenon, not vaccine-specific</li>
          <li><strong>Strong immune response:</strong> Young people tend to report more systemic reactions (fever, body aches) because their immune systems respond more vigorously</li>
        </ul>
        <p>
          The detection of the myocarditis signal in this age group demonstrates why age-stratified 
          analysis matters — the signal was much clearer when looking at young males specifically 
          rather than all ages combined. For more details, see our{' '}
          <Link href="/myocarditis">myocarditis page</Link>.
        </p>

        <h2 className={playfairDisplay.className}>Adults (30–64)</h2>
        <p>
          Working-age adults make up the largest volume of VAERS reports, primarily driven by 
          COVID-19 vaccination. Common patterns:
        </p>
        <ul>
          <li><strong>Fatigue and headache</strong> dominate reports</li>
          <li><strong>Arm pain and swelling</strong> at injection site</li>
          <li><strong>Flu-like symptoms</strong> (chills, body aches, fever) — more common after dose 2</li>
          <li><strong>Allergic reactions</strong> including rare anaphylaxis</li>
          <li>Lower myocarditis risk compared to younger adults</li>
        </ul>
        <p>
          Because this group received the most COVID vaccine doses, they account for the most 
          total reports — but their per-dose reporting rate is often lower than seniors or 
          adolescents.
        </p>

        <h2 className={playfairDisplay.className}>Seniors (65+)</h2>
        <p>
          Older adults present unique challenges for VAERS interpretation:
        </p>
        <ul>
          <li><strong>Higher proportion of serious reports:</strong> Seniors are more likely to have reports classified as serious (hospitalization, life-threatening, death)</li>
          <li><strong>Background health events:</strong> With more chronic conditions, seniors have a higher baseline rate of hospitalizations, strokes, heart attacks, and death — events that will coincidentally follow vaccination</li>
          <li><strong>COVID vaccine death reports:</strong> Many death reports in VAERS involved elderly nursing home residents vaccinated during early rollout; most were determined to be coincidental with expected mortality in this population</li>
          <li><strong>Flu vaccine reports:</strong> Seniors receive annual flu vaccines and account for a significant portion of influenza vaccine VAERS reports</li>
        </ul>

        <h2 className={playfairDisplay.className}>How COVID Changed the Age Distribution</h2>
        <p>
          Before 2021, VAERS was primarily a pediatric reporting system. The childhood vaccine 
          schedule meant most reports involved children under 18. COVID-19 vaccination 
          fundamentally transformed this:
        </p>
        <ul>
          <li><strong>Pre-COVID:</strong> ~50% of reports involved children under 18</li>
          <li><strong>Post-COVID:</strong> Adults 18+ account for the vast majority of reports</li>
          <li><strong>Report volume:</strong> Annual VAERS reports increased roughly 10-fold during the COVID vaccination campaign</li>
          <li><strong>Reporting behavior:</strong> Heightened public awareness and media coverage led to increased reporting across all ages</li>
        </ul>

        <h2 className={playfairDisplay.className}>Why Age Matters for Safety Signals</h2>
        <p>
          Age-stratified analysis is essential for detecting vaccine safety signals. Several 
          important signals would have been missed or delayed without age-specific review:
        </p>
        <ul>
          <li><strong>Myocarditis:</strong> Signal was concentrated in males 12–29 and would have been diluted in all-ages data</li>
          <li><strong>Intussusception:</strong> A historical example — the rotavirus vaccine (RotaShield) risk was specific to infants</li>
          <li><strong>Febrile seizures:</strong> Primarily relevant to children under 5</li>
          <li><strong>GBS (Guillain-Barré Syndrome):</strong> Age patterns differ by vaccine type</li>
        </ul>
        <p>
          This is why researchers don&apos;t just look at total VAERS reports — they break data 
          down by age, sex, vaccine type, and dose number to identify patterns that matter.
        </p>

        <h2 className={playfairDisplay.className}>Interpreting Age Data in VAERS</h2>
        <p>
          When looking at VAERS reports by age, keep these principles in mind:
        </p>
        <ul>
          <li><strong>Denominators matter:</strong> More doses given to an age group = more reports, regardless of safety</li>
          <li><strong>Baseline rates vary by age:</strong> Seniors have higher background rates of health events than young adults</li>
          <li><strong>Reporting behavior varies:</strong> Parents may report differently than adults reporting for themselves</li>
          <li><strong>VAERS is a signal detector, not a calculator:</strong> Age patterns in VAERS suggest where to look, not definitive risk levels</li>
        </ul>
      </div>

      {/* Explore data */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore the Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/search" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Search VAERS →</div>
            <div className="text-sm text-gray-500">Filter reports by age group</div>
          </Link>
          <Link href="/myocarditis" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Myocarditis & Vaccines →</div>
            <div className="text-sm text-gray-500">Age-specific cardiac signal</div>
          </Link>
          <Link href="/vaccine-deaths" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Vaccine Death Reports →</div>
            <div className="text-sm text-gray-500">Mortality data by demographics</div>
          </Link>
          <Link href="/side-effects" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Side Effects by Vaccine →</div>
            <div className="text-sm text-gray-500">Compare across vaccine types</div>
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-semibold text-gray-900">Why don&apos;t you show exact percentages by age?</div>
            <div className="text-gray-600 mt-1">Meaningful per-dose rates require accurate denominators (total doses given per age group), which VAERS alone doesn&apos;t provide. We focus on patterns and context rather than precise percentages that could be misleading without dose data.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Does a higher number of reports in an age group mean the vaccine is more dangerous for them?</div>
            <div className="text-gray-600 mt-1">Not necessarily. More reports usually reflect more doses administered, higher reporting awareness, or more baseline health events — not greater danger. Only controlled studies comparing vaccinated and unvaccinated groups can determine actual risk differences.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Are children&apos;s vaccines less safe because they receive so many doses?</div>
            <div className="text-gray-600 mt-1">The number of vaccine doses does not indicate danger. Each vaccine on the childhood schedule has been individually studied for safety. The immune system handles multiple vaccines effectively. More doses in VAERS simply reflects the schedule density, not increased risk.</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vaccine-injuries" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Vaccine Injuries</div>
            <div className="text-sm text-gray-500">Understanding injury reports</div>
          </Link>
          <Link href="/is-vaers-reliable" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Is VAERS Reliable?</div>
            <div className="text-sm text-gray-500">How to interpret the data</div>
          </Link>
          <Link href="/guillain-barre" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Guillain-Barré Syndrome</div>
            <div className="text-sm text-gray-500">Another age-relevant signal</div>
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Data note:</strong> Age information in VAERS is reported by the submitter and may 
        occasionally be missing or inaccurate. Approximately 5-10% of VAERS reports have missing 
        age data. The patterns described on this page reflect general trends observed in reports 
        with valid age information.
      </div>
    </div>
  )
}
