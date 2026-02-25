import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'VAERS Glossary — Vaccine Safety Terms Explained | VaccineWatch',
  description: 'Clear definitions of VAERS terminology, vaccine safety terms, and adverse event reporting concepts. Understand the data with plain-language explanations.',
  keywords: 'VAERS glossary, adverse event definition, vaccine safety terms, what is VAERS, what does VAERS stand for, vaccine adverse event reporting system explained'
}

const terms = [
  {
    term: 'VAERS',
    definition: 'The Vaccine Adverse Event Reporting System — a passive surveillance system co-managed by the CDC and FDA that collects reports of adverse events following vaccination. Anyone can submit a report.',
    link: '/about',
  },
  {
    term: 'Adverse Event (AE)',
    definition: 'Any health problem that occurs after vaccination, regardless of whether the vaccine caused it. An adverse event is a temporal association — something that happened after vaccination — not proof of causation.',
  },
  {
    term: 'Serious Adverse Event (SAE)',
    definition: 'An adverse event that results in death, a life-threatening condition, hospitalization, prolonged hospitalization, permanent disability, or a congenital anomaly/birth defect.',
  },
  {
    term: 'Passive Surveillance',
    definition: 'A system that relies on voluntary reports rather than actively seeking cases. VAERS is a passive system, meaning it depends on people choosing to file reports. This means VAERS may undercount events (underreporting) or include unrelated events.',
    link: '/analysis/reporting-bias',
  },
  {
    term: 'Active Surveillance',
    definition: 'A system that proactively monitors a defined population for health events. The Vaccine Safety Datalink (VSD) is an example. Active surveillance produces more reliable data than passive systems like VAERS.',
  },
  {
    term: 'Causation vs Correlation',
    definition: 'Correlation means two things happen around the same time. Causation means one thing actually caused the other. VAERS shows correlation only — a report filed after vaccination does not prove the vaccine caused the event.',
    link: '/analysis/denominator-problem',
  },
  {
    term: 'Signal Detection',
    definition: 'The process of identifying potential safety concerns from surveillance data. VAERS is designed for signal detection — finding patterns that warrant further investigation — not for determining if a vaccine caused a specific event.',
  },
  {
    term: 'Background Rate',
    definition: 'The rate at which a health event occurs in the general population regardless of vaccination. For example, heart attacks occur daily in the U.S. Some will happen shortly after vaccination purely by coincidence.',
  },
  {
    term: 'Denominator Problem',
    definition: 'VAERS counts reports (numerator) but doesn\'t track how many people were vaccinated (denominator). Without knowing the denominator, raw report counts are meaningless for calculating risk. Over 670 million COVID-19 doses were administered in the U.S.',
    link: '/analysis/denominator-problem',
  },
  {
    term: 'MedDRA',
    definition: 'Medical Dictionary for Regulatory Activities — the standardized medical terminology used in VAERS to code symptoms and diagnoses. Each symptom in VAERS is coded using MedDRA Preferred Terms.',
  },
  {
    term: 'Onset Interval',
    definition: 'The time between vaccination and the start of the adverse event (NUMDAYS field in VAERS). Helps distinguish likely vaccine reactions (typically 0-3 days) from coincidental events.',
    link: '/analysis/onset-timing',
  },
  {
    term: 'Lot Number',
    definition: 'A manufacturer-assigned identifier for a specific batch of vaccines. In VAERS, lot numbers can be used to track reports by batch, but comparing raw counts between lots is misleading because lot sizes and distribution vary enormously.',
    link: '/analysis/lot-analysis',
  },
  {
    term: 'Dose Series',
    definition: 'Which dose in a vaccination series a report refers to (1st dose, 2nd dose, booster, etc.). Different doses may have different side effect profiles.',
    link: '/analysis/dose-comparison',
  },
  {
    term: 'Recovery Status',
    definition: 'Whether the person recovered from the adverse event. In VAERS: Y (recovered), N (not recovered), or U (unknown). "Not recovered" often means symptoms were ongoing at time of report, not necessarily permanent.',
    link: '/analysis/recovery-rates',
  },
  {
    term: 'VAERS ID',
    definition: 'A unique identifier assigned to each report in VAERS. Can be used to look up individual reports in the VAERS database.',
  },
  {
    term: 'Myocarditis',
    definition: 'Inflammation of the heart muscle. Identified as a rare side effect of mRNA COVID-19 vaccines, primarily in young males after the second dose. Most cases are mild and resolve with treatment.',
    link: '/analysis/myocarditis',
  },
  {
    term: 'Anaphylaxis',
    definition: 'A severe, potentially life-threatening allergic reaction that occurs rapidly after exposure. Vaccination sites are equipped to treat anaphylaxis, and it typically resolves with epinephrine treatment.',
  },
  {
    term: 'Guillain-Barré Syndrome (GBS)',
    definition: 'A rare neurological disorder where the immune system attacks nerve cells. Has been associated with some vaccines at very low rates. Most patients recover fully.',
    link: '/symptoms/guillain-barre-syndrome',
  },
  {
    term: 'Thrombosis with Thrombocytopenia Syndrome (TTS)',
    definition: 'A rare condition involving blood clots and low platelet counts. Was identified as a very rare side effect of the J&J/Janssen COVID-19 vaccine.',
  },
  {
    term: 'Stimulated Reporting',
    definition: 'An increase in reports driven by media attention, public awareness campaigns, or regulatory requirements rather than an actual increase in adverse events. COVID-19 had massive stimulated reporting.',
    link: '/analysis/reporting-bias',
  },
  {
    term: 'Underreporting',
    definition: 'The phenomenon where not all adverse events get reported to VAERS. Studies suggest VAERS captures only a fraction of events — estimates vary from 1% to 10% depending on the severity and type of event.',
    link: '/analysis/reporting-bias',
  },
  {
    term: 'Healthcare Provider Report',
    definition: 'Reports filed by doctors, nurses, pharmacists, or other medical professionals. These tend to be more clinically detailed than patient-filed reports.',
    link: '/analysis/who-reports',
  },
  {
    term: 'Manufacturer Report',
    definition: 'Reports filed by vaccine manufacturers. These are required by FDA regulations and often come from post-marketing surveillance programs.',
    link: '/analysis/who-reports',
  },
  {
    term: 'V-safe',
    definition: 'A smartphone-based active surveillance program launched by the CDC for COVID-19 vaccines. Unlike VAERS, V-safe actively checks in with vaccinated individuals to collect health data.',
  },
  {
    term: 'Vaccine Safety Datalink (VSD)',
    definition: 'A collaboration between the CDC and several large healthcare organizations that uses electronic health records for active vaccine safety surveillance. Produces more reliable data than VAERS.',
  },
  {
    term: 'Clinical Information Statement (CIS)',
    definition: 'Required information that must be given to patients before vaccination, including known risks and side effects.',
  },
  {
    term: 'Post-Marketing Surveillance',
    definition: 'The monitoring of vaccine safety after a vaccine has been approved and is being used in the general population. VAERS is one of several post-marketing surveillance tools.',
  },
]

export default function GlossaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Glossary' }]} />

      <div className="mb-10">
        <h1 className={`${playfairDisplay.className} text-4xl md:text-5xl font-bold text-gray-900 mb-4`}>
          VAERS Glossary
        </h1>
        <p className="text-xl text-gray-600">
          Plain-language definitions of vaccine safety terms and VAERS concepts. 
          Understanding the terminology is essential for interpreting VAERS data correctly.
        </p>
      </div>

      {/* Quick jump alphabet */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from(new Set(terms.map(t => t.term[0].toUpperCase()))).sort().map(letter => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Terms grouped by first letter */}
      <div className="space-y-8">
        {Array.from(new Set(terms.map(t => t.term[0].toUpperCase()))).sort().map(letter => {
          const letterTerms = terms.filter(t => t.term[0].toUpperCase() === letter)
          return (
            <div key={letter} id={`letter-${letter}`}>
              <h2 className={`${playfairDisplay.className} text-2xl font-bold text-primary mb-4 border-b border-primary/20 pb-2`}>
                {letter}
              </h2>
              <dl className="space-y-6">
                {letterTerms.map(t => (
                  <div key={t.term}>
                    <dt className="text-lg font-semibold text-gray-900">{t.term}</dt>
                    <dd className="mt-1 text-gray-700 leading-relaxed">
                      {t.definition}
                      {t.link && (
                        <>
                          {' '}
                          <Link href={t.link} className="text-primary hover:underline text-sm">
                            Learn more →
                          </Link>
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/about" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">About VAERS</div>
            <div className="text-sm text-gray-500">How VAERS works</div>
          </Link>
          <Link href="/faq" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">FAQ</div>
            <div className="text-sm text-gray-500">Common questions</div>
          </Link>
          <Link href="/analysis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Analysis</div>
            <div className="text-sm text-gray-500">In-depth articles</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
