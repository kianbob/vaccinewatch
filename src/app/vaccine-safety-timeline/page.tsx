import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Vaccine Safety Timeline — Key Events in U.S. Vaccine History',
  description: 'A timeline of major vaccine safety events from 1955 to present. From the Cutter Incident to COVID-19 myocarditis detection — how vaccine safety monitoring evolved.',
  alternates: { canonical: 'https://www.vaccinewatch.org/vaccine-safety-timeline' },
}

const events = [
  { year: 1955, title: 'The Cutter Incident', description: 'Improperly inactivated polio vaccine from Cutter Laboratories caused 40,000 polio cases, 200 children paralyzed, and 10 deaths. Led to stricter manufacturing oversight.', category: 'incident', link: '/side-effects/polio' },
  { year: 1976, title: 'Swine Flu & Guillain-Barré', description: 'Mass swine flu vaccination campaign halted after ~450 cases of Guillain-Barré Syndrome detected. Demonstrated the need for ongoing safety monitoring.', category: 'incident', link: '/guillain-barre' },
  { year: 1986, title: 'National Childhood Vaccine Injury Act', description: 'Congress created the National Vaccine Injury Compensation Program (VICP) and mandated reporting of certain adverse events. Foundation of the modern vaccine safety system.', category: 'legislation', link: '/vaccine-injuries' },
  { year: 1990, title: 'VAERS Created', description: 'The Vaccine Adverse Event Reporting System launched as a joint CDC/FDA program. Now contains 1.98M+ reports and is the primary public database for adverse event monitoring.', category: 'milestone', link: '/vaers-database' },
  { year: 1998, title: 'Wakefield Fraud Published', description: 'Andrew Wakefield published a fraudulent study linking MMR vaccine to autism. The paper was retracted in 2010 and Wakefield lost his medical license, but anti-vaccine movements grew.', category: 'controversy', link: '/side-effects/mmr' },
  { year: 1999, title: 'RotaShield Withdrawn', description: 'First rotavirus vaccine (RotaShield) withdrawn after VAERS detected intussusception risk — about 1 in 10,000 infants. A success story for the safety monitoring system.', category: 'withdrawal', link: '/side-effects/rotavirus' },
  { year: 2006, title: 'HPV Vaccine Approved', description: 'Gardasil approved for cervical cancer prevention. Generated significant reports in VAERS, with fainting (syncope) identified as a notable side effect in adolescents.', category: 'milestone', link: '/side-effects/hpv' },
  { year: 2010, title: 'Wakefield Paper Retracted', description: 'The Lancet fully retracted the 1998 MMR-autism study. Multiple large studies found no link between MMR and autism. Wakefield was struck off the UK medical register.', category: 'milestone', link: '/side-effects/mmr' },
  { year: 2014, title: 'Vaccine Safety Datalink Expansion', description: 'VSD expanded to cover ~12 million people across 9 healthcare organizations, enabling active surveillance that complements VAERS passive reporting.', category: 'milestone' },
  { year: 2017, title: 'Shingrix Replaces Zostavax', description: 'New recombinant shingles vaccine (Shingrix) approved. Much more effective but with stronger side effects — 80%+ report injection site reactions. Generated significant VAERS reports.', category: 'milestone', link: '/side-effects/shingles' },
  { year: 2020, title: 'COVID-19 Vaccines Authorized', description: 'Pfizer and Moderna mRNA vaccines received Emergency Use Authorization. The largest vaccination campaign in history began, with unprecedented VAERS reporting to follow.', category: 'milestone', link: '/side-effects/covid' },
  { year: 2021, title: 'Myocarditis Signal Detected', description: 'VAERS and v-safe detected myocarditis/pericarditis signal in young males after mRNA COVID vaccines. Risk confirmed at ~1 in 5,000-10,000 for males 16-24 after dose 2.', category: 'detection', link: '/myocarditis' },
  { year: 2021, title: 'J&J Vaccine Paused', description: 'CDC/FDA recommended pausing Johnson & Johnson COVID vaccine after 6 cases of rare blood clotting (TTS) among 6.8 million doses. Pause lifted after 10 days with updated guidance.', category: 'incident' },
  { year: 2021, title: 'Record VAERS Reports', description: '768,706 VAERS reports filed in a single year — more than 10x the typical annual volume. Driven by massive COVID vaccination campaign and heightened public awareness.', category: 'data', link: '/analysis/covid-impact' },
  { year: 2023, title: 'J&J COVID Vaccine Withdrawn', description: 'Johnson & Johnson voluntarily withdrew its COVID vaccine from the U.S. market, citing low demand. The TTS blood clotting risk, though rare, contributed to low uptake.', category: 'withdrawal' },
  { year: 2024, title: 'RSV Vaccines for Seniors', description: 'First RSV vaccines approved for adults 60+. Abrysvo and Arexvy entered the market, adding new data streams to VAERS.', category: 'milestone' },
  { year: 2026, title: 'HHS AI VAERS Analysis', description: 'HHS/RFK Jr. administration announced development of AI tools for analyzing VAERS data, signaling renewed government focus on vaccine safety monitoring.', category: 'milestone' },
]

const categoryColors: Record<string, { bg: string, text: string, dot: string }> = {
  incident: { bg: 'bg-red-50', text: 'text-red-800', dot: 'bg-red-500' },
  legislation: { bg: 'bg-blue-50', text: 'text-blue-800', dot: 'bg-blue-500' },
  milestone: { bg: 'bg-green-50', text: 'text-green-800', dot: 'bg-green-500' },
  controversy: { bg: 'bg-amber-50', text: 'text-amber-800', dot: 'bg-amber-500' },
  withdrawal: { bg: 'bg-orange-50', text: 'text-orange-800', dot: 'bg-orange-500' },
  detection: { bg: 'bg-purple-50', text: 'text-purple-800', dot: 'bg-purple-500' },
  data: { bg: 'bg-primary/5', text: 'text-primary', dot: 'bg-primary' },
}

export default function VaccineSafetyTimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Vaccine Safety Timeline' }]} />

      <div className="mb-10">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Safety Timeline
        </h1>
        <ShareButtons title="Vaccine Safety Timeline — Key Events in U.S. Vaccine History" url="https://www.vaccinewatch.org/vaccine-safety-timeline" />
        <p className="text-lg text-gray-600 max-w-3xl">
          Key events in the history of vaccine safety monitoring in the United States — from early
          manufacturing disasters to modern surveillance systems. This timeline shows how today&apos;s
          safety infrastructure was built, often in response to problems.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-8">
          {events.map((event, i) => {
            const colors = categoryColors[event.category] || categoryColors.milestone
            return (
              <div key={i} className="relative flex gap-6">
                {/* Year dot */}
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-sm font-bold text-gray-500">{event.year}</span>
                </div>
                <div className={`absolute left-[29px] top-1.5 w-3 h-3 rounded-full ${colors.dot} ring-2 ring-white`} />

                {/* Content */}
                <div className={`flex-1 ${colors.bg} rounded-xl p-5 ml-4`}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={`font-bold text-gray-900 ${playfairDisplay.className}`}>{event.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.text} bg-white/60 whitespace-nowrap`}>
                      {event.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                  {event.link && (
                    <Link href={event.link} className="inline-block mt-2 text-sm text-primary hover:text-primary/80 font-medium">
                      Explore related data →
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Context */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h2 className={`text-xl font-bold text-gray-900 mb-3 ${playfairDisplay.className}`}>The Bigger Picture</h2>
        <p className="text-gray-600 mb-3">
          Vaccine safety monitoring has evolved dramatically over 70 years. Today&apos;s system — VAERS, VSD, CISA,
          and v-safe — represents multiple layers of surveillance that didn&apos;t exist for most of vaccine history.
        </p>
        <p className="text-gray-600">
          Every withdrawal and detected signal on this timeline is evidence that the system works: problems are found
          and addressed. The challenge is communicating that monitoring process to a public that often hears about
          risks without the context of how they were detected and resolved.
        </p>
      </div>

      {/* Related */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <h3 className={`text-lg font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>Related Pages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vaccine-safety" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Vaccine Safety</div>
            <div className="text-sm text-gray-500">What VAERS data shows</div>
          </Link>
          <Link href="/is-vaers-reliable" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Is VAERS Reliable?</div>
            <div className="text-sm text-gray-500">Strengths &amp; limitations</div>
          </Link>
          <Link href="/adverse-events" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Adverse Events</div>
            <div className="text-sm text-gray-500">Understanding the data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
