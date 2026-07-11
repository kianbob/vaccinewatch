import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Myocarditis After COVID Vaccine — VAERS Data & Risk (2026)',
  description: 'Myocarditis reports after COVID-19 vaccination in VAERS: risk by age and sex, clinical outcomes, and research context for this confirmed vaccine safety signal.',
  openGraph: {
    title: 'Myocarditis and COVID Vaccine — VAERS Data & Research (2026)',
    description: 'Myocarditis after COVID vaccination: VAERS adverse event data, who is most at risk, clinical outcomes, and how the vaccine risk compares to COVID infection.',
  },
}

export default function MyocarditisLandingPage() {
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
                name: 'Can COVID vaccines cause myocarditis?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, myocarditis is a confirmed but rare side effect of mRNA COVID-19 vaccines (Pfizer and Moderna). The risk is highest in males aged 16-24 after the second dose. Most cases are mild and resolve with treatment.'
                }
              },
              {
                '@type': 'Question',
                name: 'How common is myocarditis after COVID vaccination?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'VAERS data and clinical studies show approximately 1-4 cases per 100,000 mRNA vaccine doses in young males. The risk is much lower in older adults and females.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are the symptoms of vaccine-related myocarditis?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Symptoms typically include chest pain, shortness of breath, and heart palpitations, usually appearing within 1-5 days after vaccination. Most cases are mild and patients recover fully.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is myocarditis from COVID vaccine serious?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most vaccine-associated myocarditis cases are mild, with the majority of patients recovering fully. Hospitalization is common for monitoring but ICU admission is rare. Clinical studies show most patients have normal cardiac function at follow-up.'
                }
              }
            ]
          })
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"Article","headline":"Myocarditis and COVID Vaccine — VAERS Data & Research","description":"Complete analysis of myocarditis reports after COVID-19 vaccination. Data from VAERS combined with clinical research on risk factors, outcomes, and context.","url":"https://www.vaccinewatch.org/myocarditis","datePublished":"2026-02-25","dateModified":"2026-02-25","publisher":{"@type":"Organization","name":"VaccineWatch","url":"https://www.vaccinewatch.org"}}'}} />
      <Breadcrumbs items={[{ label: 'Myocarditis & Vaccines' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">10 min read</div>
          <ShareButtons title="Myocarditis and COVID Vaccine" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Myocarditis and Vaccines
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Myocarditis (inflammation of the heart muscle) is a confirmed rare side effect of 
          mRNA COVID-19 vaccines. Here&apos;s what the data shows — including who&apos;s most at risk, 
          how common it is, and what outcomes look like.
        </p>
      </div>

      {/* Key facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-white border border-red-200 rounded-xl p-5">
          <div className="text-sm text-red-500 font-medium mb-1">Confirmed Risk</div>
          <div className="text-lg font-bold text-gray-900">mRNA Vaccines</div>
          <div className="text-sm text-gray-500">Pfizer &amp; Moderna</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-5">
          <div className="text-sm text-amber-500 font-medium mb-1">Highest Risk Group</div>
          <div className="text-lg font-bold text-gray-900">Males 12–29</div>
          <div className="text-sm text-gray-500">After 2nd dose</div>
        </div>
        <div className="bg-white border border-green-200 rounded-xl p-5">
          <div className="text-sm text-green-600 font-medium mb-1">Outcomes</div>
          <div className="text-lg font-bold text-gray-900">Most Recover</div>
          <div className="text-sm text-gray-500">Usually mild with treatment</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
        <h2 className={`text-xl font-bold text-amber-900 mb-4 ${playfairDisplay.className}`}>💡 Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900">
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>This is a confirmed, real risk</strong> — unlike most VAERS signals, the myocarditis-mRNA vaccine link has been validated by multiple independent surveillance systems worldwide. It&apos;s not just a VAERS artifact.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>COVID infection causes myocarditis at 5-10× higher rates than vaccination.</strong> For most age groups, the cardiac risk from catching COVID unvaccinated far exceeds the myocarditis risk from the vaccine.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Young males aged 12-29 after dose 2 are the highest-risk group</strong> — estimated at 1-10 extra cases per 100,000. This led to updated guidance recommending longer intervals between doses for this demographic.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Vaccine-associated myocarditis has better outcomes</strong> than infection-associated myocarditis — shorter hospital stays, faster recovery, and lower rates of cardiac complications.</span>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What Is Myocarditis?</h2>
        <p>
          Myocarditis is inflammation of the heart muscle (myocardium). It can be caused by 
          viral infections, autoimmune conditions, and — rarely — vaccination. Symptoms include 
          chest pain, shortness of breath, and abnormal heart rhythms.
        </p>
        <p>
          Pericarditis (inflammation of the heart lining) is a related condition that has also 
          been reported after COVID vaccination. Together, they&apos;re sometimes referred to as 
          &quot;myopericarditis.&quot;
        </p>

        <h2 className={playfairDisplay.className}>The COVID Vaccine Connection</h2>
        <p>
          Multiple surveillance systems worldwide have confirmed a small increased risk of 
          myocarditis after mRNA COVID-19 vaccines (Pfizer-BioNTech and Moderna). Key findings:
        </p>
        <ul>
          <li><strong>Risk is real but rare:</strong> Estimated at 1–10 extra cases per 100,000 vaccinated males aged 12–29</li>
          <li><strong>Second dose, young males:</strong> Highest risk after the second dose in males aged 12–29</li>
          <li><strong>Moderna slightly higher risk:</strong> Some studies suggest slightly higher rates with Moderna vs Pfizer</li>
          <li><strong>Most cases are mild:</strong> The majority respond well to treatment (anti-inflammatories, rest)</li>
          <li><strong>Hospital stays are short:</strong> Median hospital stay of 1–3 days</li>
        </ul>

        <h2 className={playfairDisplay.className}>Myocarditis: Vaccine vs COVID Infection</h2>
        <p>
          A critical comparison: COVID-19 infection itself causes myocarditis at <strong>significantly 
          higher rates</strong> than COVID vaccination. Research shows:
        </p>
        <ul>
          <li>COVID infection: ~150 cases per 100,000 infected (all ages)</li>
          <li>COVID vaccine: ~1–10 cases per 100,000 vaccinated (highest-risk group)</li>
          <li>COVID myocarditis tends to be more severe than vaccine myocarditis</li>
        </ul>
        <p>
          This risk-benefit context is important: even in the highest-risk group (young males), 
          the risk of myocarditis from COVID infection exceeds the risk from vaccination.
        </p>

        <h2 className={playfairDisplay.className}>What VAERS Shows</h2>
        <p>
          VAERS contains thousands of myocarditis/pericarditis reports after COVID-19 vaccination. 
          These reports were instrumental in identifying the safety signal early, demonstrating 
          VAERS working as intended — detecting rare adverse events that warrant investigation.
        </p>
        <p>
          However, raw VAERS counts overestimate the true incidence because:
        </p>
        <ul>
          <li>Media coverage of myocarditis led to heightened reporting (stimulated reporting)</li>
          <li>Some reports may not meet clinical criteria for myocarditis</li>
          <li>Without denominators (doses given), raw counts are misleading</li>
        </ul>

        <h2 className={playfairDisplay.className}>Outcomes and Recovery</h2>
        <p>
          Follow-up studies of vaccine-associated myocarditis show encouraging outcomes:
        </p>
        <ul>
          <li><strong>Most patients recover fully</strong> within days to weeks</li>
          <li><strong>Hospital stays are typically brief</strong> (1-4 days)</li>
          <li><strong>Cardiac MRI normalization</strong> occurs in most patients within months</li>
          <li><strong>Long-term outcomes</strong> appear favorable, though follow-up is ongoing</li>
          <li><strong>Deaths are extremely rare</strong> — a handful of cases among millions vaccinated</li>
        </ul>

        <h2 className={playfairDisplay.className}>Long-Term Follow-Up Data</h2>
        <p>
          As of 2026, several years of follow-up data are available for patients who experienced
          vaccine-associated myocarditis. The evidence is reassuring:
        </p>
        <ul>
          <li><strong>Cardiac MRI normalization:</strong> The majority of patients show resolution of
          inflammation on follow-up imaging within 3–6 months</li>
          <li><strong>Exercise tolerance:</strong> Most patients return to full physical activity,
          including competitive sports, after an appropriate recovery period</li>
          <li><strong>Recurrence:</strong> Recurrent myocarditis after subsequent vaccination is rare,
          though most guidelines recommend caution with additional mRNA doses</li>
          <li><strong>Ongoing monitoring:</strong> Long-term cardiac outcome studies continue to track
          patients for any delayed effects, with results so far showing favorable outcomes</li>
        </ul>
        <p>
          These long-term findings contrast with myocarditis from COVID-19 infection, which tends
          to cause more persistent cardiac changes and longer recovery times.
        </p>

        <h2 className={playfairDisplay.className}>How Myocarditis Was Detected</h2>
        <p>
          The detection of vaccine-associated myocarditis is a case study in how vaccine safety
          monitoring is supposed to work:
        </p>
        <ul>
          <li><strong>April 2021:</strong> Israel reported early signals of myocarditis in young males</li>
          <li><strong>May 2021:</strong> VAERS reports flagged a disproportionate number of myocarditis cases</li>
          <li><strong>June 2021:</strong> CDC confirmed the signal after reviewing VSD and clinical data</li>
          <li><strong>Ongoing:</strong> Updated guidance issued, including extended dose intervals for young males</li>
        </ul>
        <p>
          This timeline — from signal detection to confirmed risk in roughly 2 months — demonstrates
          VAERS working exactly as designed. For more on how VAERS detects safety signals, see{' '}
          <Link href="/is-vaers-reliable">Is VAERS Reliable?</Link>
        </p>

        <h2 className={playfairDisplay.className}>Current Guidance</h2>
        <p>Based on the data, current guidance includes:</p>
        <ul>
          <li>CDC still recommends COVID vaccination for everyone 6 months and older</li>
          <li>People who develop myocarditis should consult their doctor before additional doses</li>
          <li>A longer interval between doses may reduce risk</li>
          <li>Patients should seek immediate medical care for chest pain, shortness of breath, or heart palpitations after vaccination</li>
        </ul>
      </div>

      {/* Explore data */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore the Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/analysis/myocarditis" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Myocarditis Analysis →</div>
            <div className="text-sm text-gray-500">Detailed VAERS charts and data</div>
          </Link>
          <Link href="/symptoms/myocarditis" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Myocarditis in VAERS →</div>
            <div className="text-sm text-gray-500">All vaccine associations</div>
          </Link>
          <Link href="/side-effects/covid" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">COVID Vaccine Side Effects →</div>
            <div className="text-sm text-gray-500">Full side effect profile</div>
          </Link>
          <Link href="/tools/risk-context" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Risk Context Calculator →</div>
            <div className="text-sm text-gray-500">Put numbers in perspective</div>
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-semibold text-gray-900">Should young males avoid mRNA COVID vaccines?</div>
            <div className="text-gray-600 mt-1">CDC still recommends COVID vaccination for everyone. While young males have a slightly elevated myocarditis risk from the vaccine, the risk of myocarditis from COVID infection is 5–10× higher. Extended dose intervals (8+ weeks between doses) can reduce the risk.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Can I get another COVID vaccine after myocarditis?</div>
            <div className="text-gray-600 mt-1">This should be discussed with a cardiologist. Current guidance suggests that people who experienced myocarditis after an mRNA dose should consult their doctor before receiving additional mRNA vaccines. Alternative vaccine types may be considered.</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious Outcomes</div>
            <div className="text-sm text-gray-500">Understanding severity</div>
          </Link>
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Death Reports</div>
            <div className="text-sm text-gray-500">Mortality data analysis</div>
          </Link>
          <Link href="/analysis/recovery-rates" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Recovery Rates</div>
            <div className="text-sm text-gray-500">Do side effects resolve?</div>
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Data note:</strong> Myocarditis is one of the few vaccine safety signals where VAERS
        data has been confirmed by independent active surveillance systems worldwide. This makes it
        an instructive example of VAERS working as intended — detecting a rare signal quickly, which
        was then confirmed through controlled studies, leading to updated clinical guidance.
      </div>
    </div>
  )
}
