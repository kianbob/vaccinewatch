import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — VaccineWatch',
  description: 'Common questions about VAERS data, VaccineWatch methodology, and how to interpret vaccine adverse event reports.'
}

const faqs = [
  {
    question: 'What is VAERS?',
    answer: 'The Vaccine Adverse Event Reporting System (VAERS) is a national early warning system co-managed by the CDC and FDA to detect possible safety problems in U.S.-licensed vaccines. It accepts reports of adverse events that occur after vaccination from healthcare providers, manufacturers, and the public.',
  },
  {
    question: 'Does a VAERS report mean a vaccine caused the adverse event?',
    answer: 'No. VAERS reports describe events that happened after vaccination, but this temporal association does not prove causation. Many reported events may be coincidental, occurring at the same rate they would in an unvaccinated population. Reports may also contain incomplete or inaccurate information.',
  },
  {
    question: 'Why are there so many COVID-19 vaccine reports?',
    answer: 'COVID-19 vaccines were administered to hundreds of millions of people in a short timeframe, during a period of intense public scrutiny and media attention. This led to dramatically higher reporting rates compared to other vaccines — a well-documented phenomenon called "stimulated reporting." More reports does not necessarily mean more risk.',
  },
  {
    question: 'Who can file a VAERS report?',
    answer: 'Anyone can file a VAERS report — healthcare providers, vaccine manufacturers, patients, and family members. Healthcare providers are legally required to report certain serious adverse events. This openness is both a strength (broad signal detection) and a limitation (unverified reports).',
  },
  {
    question: 'What does VaccineWatch do with VAERS data?',
    answer: 'We process the raw VAERS data files published quarterly by the CDC/FDA and present them in an accessible, searchable format. We add context, disclaimers, and analysis to help people understand what the numbers mean — and what they don\'t mean.',
  },
  {
    question: 'How often is the data updated?',
    answer: 'VAERS data is published quarterly by the CDC/FDA. We update our database shortly after each new data release. The current dataset includes reports through 2026.',
  },
  {
    question: 'Why do some vaccines have more reports than others?',
    answer: 'Report volume is primarily driven by how many doses of a vaccine have been administered, public awareness, media attention, and mandatory reporting requirements. Higher report counts do not indicate higher risk. See our analysis on the denominator problem for more context.',
  },
  {
    question: 'What is the "denominator problem"?',
    answer: 'VAERS provides report counts (numerators) but not the number of vaccine doses administered (denominators). Without knowing how many people received each vaccine, raw report counts cannot be used to calculate or compare risk rates. This is the single most important limitation of VAERS data.',
  },
  {
    question: 'Is VaccineWatch anti-vaccine or pro-vaccine?',
    answer: 'Neither. We are a data transparency project. We present VAERS data as-is, with appropriate context and disclaimers. We don\'t make recommendations about vaccination. Our goal is informed transparency — helping people understand the data so they can have better conversations with their healthcare providers.',
  },
  {
    question: 'Can I use this data for medical decisions?',
    answer: 'This website is for educational and informational purposes only. It is not medical advice. Always consult qualified healthcare professionals for medical decisions, including vaccination decisions.',
  },
  {
    question: 'How do you calculate "serious outcome rate"?',
    answer: 'We define serious outcomes as reports that mention death or hospitalization. The serious outcome rate is (deaths + hospitalizations) / total reports × 100. This is a rough measure of report severity, not a measure of vaccine risk.',
  },
  {
    question: 'What are "sister sites"?',
    answer: 'VaccineWatch is part of TheDataProject.ai, a collection of data transparency tools. Our sister sites include OpenMedicaid, OpenFeds, OpenSpending, OpenMedicare, and OpenLobby — all focused on making government data accessible and understandable.',
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: 'FAQ' }]} />

      <div className="mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Common questions about VAERS data, our methodology, and how to interpret vaccine adverse event reports.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className={`text-lg font-bold text-gray-900 mb-3 ${playfairDisplay.className}`}>
              {faq.question}
            </h2>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">Learn more about our data sources and methodology.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/about" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            About VaccineWatch
          </Link>
          <Link href="/about#methodology" className="bg-white text-primary border border-primary px-6 py-2 rounded-lg font-medium hover:bg-primary/5 transition-colors">
            Our Methodology
          </Link>
        </div>
      </div>
    </div>
  )
}
