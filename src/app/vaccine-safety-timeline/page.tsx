import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Vaccine Safety Timeline — 1955 to 2026 Key Events in U.S. History',
  description: 'From the 1955 Cutter Incident to 2026 AI-driven VAERS analysis: 20+ major vaccine safety events that shaped how the U.S. monitors 1.98M+ adverse event reports.',
  openGraph: {
    title: 'Vaccine Safety Timeline — Key Events, 1955 to 2026',
    description: 'A timeline of major US vaccine safety events, from the 1955 Cutter Incident to COVID-19 myocarditis detection — showing how VAERS and modern safety monitoring evolved.',
  },
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
  { year: 2025, title: 'H5N1 Avian Flu Preparedness', description: 'With H5N1 bird flu spreading in dairy cattle and poultry, the U.S. government stockpiled pre-pandemic vaccines and began planning for potential mass vaccination campaigns.', category: 'milestone' },
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

const faqs = [
  { q: 'What is VAERS and when was it created?', a: 'VAERS (Vaccine Adverse Event Reporting System) was created in 1990 as a joint program of the CDC and FDA. It is a passive surveillance system that accepts reports of adverse events following vaccination from anyone — healthcare providers, patients, and manufacturers. As of 2026, VAERS contains over 1.98 million reports.' },
  { q: 'What was the Cutter Incident?', a: 'The Cutter Incident of 1955 was one of the worst pharmaceutical disasters in U.S. history. Cutter Laboratories produced improperly inactivated polio vaccine that contained live poliovirus, causing approximately 40,000 polio cases, 200 cases of paralysis, and 10 deaths. It led to much stricter vaccine manufacturing oversight and is considered a turning point in vaccine safety regulation.' },
  { q: 'How did COVID-19 vaccines change VAERS reporting?', a: 'COVID-19 vaccines caused an unprecedented surge in VAERS reporting. In 2021 alone, 768,706 reports were filed — more than 10 times the typical annual volume. This was driven by the largest vaccination campaign in U.S. history (670+ million doses administered), heightened public awareness, and mandatory reporting requirements for healthcare providers administering EUA vaccines.' },
  { q: 'Was the myocarditis signal detected by VAERS?', a: 'Yes, VAERS played a critical role in detecting the myocarditis safety signal associated with mRNA COVID-19 vaccines in 2021. The system flagged an unusual number of myocarditis reports in young males after the second dose. The signal was then confirmed through more rigorous studies, and the FDA added warning labels to the Pfizer and Moderna vaccines.' },
  { q: 'What happened with the J&J COVID vaccine?', a: 'The Johnson & Johnson (Janssen) COVID-19 vaccine was paused in April 2021 after 6 cases of rare blood clotting (thrombosis with thrombocytopenia syndrome, or TTS) were detected among 6.8 million doses. The pause was lifted after 10 days with updated guidance. J&J ultimately withdrew the vaccine from the U.S. market in 2023 due to low demand.' },
]

export default function VaccineSafetyTimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {"@context":"https://schema.org","@type":"Article","headline":"Vaccine Safety Timeline — Key Events, 1955 to 2026","description":"A timeline of 20+ major U.S. vaccine safety events from the 1955 Cutter Incident to 2026 AI-driven VAERS analysis.","url":"https://www.vaccinewatch.org/vaccine-safety-timeline","datePublished":"2026-02-25","dateModified":"2026-07-10","publisher":{"@type":"Organization","name":"VaccineWatch","url":"https://www.vaccinewatch.org"}},
        {"@context":"https://schema.org","@type":"FAQPage","mainEntity": faqs.map(f => ({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))}
      ]) }} />
      <Breadcrumbs items={[{ label: 'Vaccine Safety Timeline' }]} />

      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">8 min read</div>
          <ShareButtons title="Vaccine Safety Timeline — Key Events in U.S. Vaccine History" url="https://www.vaccinewatch.org/vaccine-safety-timeline" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Safety Timeline
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Key events in the history of vaccine safety monitoring in the United States — from early
          manufacturing disasters to modern surveillance systems. This timeline shows how today&apos;s
          safety infrastructure was built, often in response to problems.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-700">4</div>
          <div className="text-xs text-red-600">Major Incidents</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">8</div>
          <div className="text-xs text-green-600">Milestones</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-700">2</div>
          <div className="text-xs text-orange-600">Withdrawals</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">70+</div>
          <div className="text-xs text-purple-600">Years of History</div>
        </div>
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

      {/* Key Lessons */}
      <div className="mt-8 prose prose-lg max-w-none">
        <h2 className={playfairDisplay.className}>Lessons from History</h2>
        <p>
          Several recurring themes emerge from over seven decades of vaccine safety history:
        </p>
        <ul>
          <li><strong>Systems improve through failure:</strong> The Cutter Incident, the 1976 Swine Flu debacle,
          and the RotaShield withdrawal all led to stronger safety systems. VAERS itself was born from the
          recognition that the U.S. needed systematic adverse event tracking.</li>
          <li><strong>Transparency builds trust:</strong> The J&amp;J pause in 2021 — halting a vaccine over 6 cases
          in 6.8 million doses — demonstrated that regulators will act on even extremely rare signals. This
          transparency is essential for public confidence, even when it creates short-term alarm.</li>
          <li><strong>Context matters more than numbers:</strong> The 768,000 VAERS reports filed in 2021 sound
          alarming in isolation. In the context of 670+ million doses administered, widespread mandatory reporting,
          and heightened public awareness, the numbers tell a different story.</li>
          <li><strong>Passive surveillance has limits:</strong> VAERS is a signal detection system, not a risk
          measurement tool. It excels at finding unexpected patterns (like myocarditis in young males) but cannot
          calculate how likely any given side effect is. That requires controlled studies and active surveillance
          systems like VSD.</li>
        </ul>

        <h2 className={playfairDisplay.className}>The 2026 Landscape</h2>
        <p>
          As of mid-2026, vaccine safety monitoring sits at an inflection point. The HHS administration under
          RFK Jr. has signaled increased scrutiny of vaccine safety data, including the development of AI-powered
          tools for analyzing VAERS reports. Whether this leads to more sophisticated signal detection or politicized
          data interpretation remains to be seen.
        </p>
        <p>
          Meanwhile, the post-pandemic normalization of VAERS reporting continues. Annual reports are returning to
          the 35,000-45,000 range typical of the 2015-2019 era, while new vaccine entries like RSV immunizations
          add fresh data streams to monitor. The potential for H5N1 avian flu vaccination campaigns adds another
          variable that could reshape the reporting landscape if a pandemic emerges.
        </p>
        <p>
          The fundamental challenge remains unchanged: balancing the public&apos;s right to transparent safety data
          with the need for responsible interpretation of that data. VAERS was built as an early warning system,
          not a scorecard — and communicating that distinction remains as important in 2026 as it was in 1990.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
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

      {/* How VAERS Works Today */}
      <div className="mt-12 prose prose-lg max-w-none">
        <h2 className={playfairDisplay.className}>How the Safety System Works Today</h2>
        <p>
          The U.S. vaccine safety monitoring system in 2026 is a multi-layered infrastructure built from
          the lessons of the events described above. Understanding each layer helps put VAERS data in context:
        </p>
        <ul>
          <li><strong>VAERS (Passive Surveillance):</strong> Anyone can report. Catches unexpected signals across
          the entire vaccinated population. Strength: broad coverage. Weakness: cannot determine causation or calculate rates.</li>
          <li><strong>Vaccine Safety Datalink (VSD):</strong> Active surveillance across ~12 million people in 9
          healthcare organizations. Can compare outcomes in vaccinated vs. unvaccinated groups. Used to confirm
          or rule out signals detected by VAERS.</li>
          <li><strong>Clinical Immunization Safety Assessment (CISA):</strong> Expert clinical consultation for
          complex individual cases. Healthcare providers can submit cases for review by vaccine safety specialists.</li>
          <li><strong>v-safe (COVID-19 era):</strong> Smartphone-based active surveillance system deployed for
          COVID-19 vaccines. Collected health check-ins from over 10 million participants. Provided real-time
          safety data during the pandemic.</li>
          <li><strong>Biologics Effectiveness and Safety (BEST):</strong> FDA&apos;s system using large healthcare
          databases and claims data for near-real-time surveillance of biologics including vaccines.</li>
        </ul>
        <p>
          Together, these systems create overlapping layers of safety monitoring. No single system is perfect,
          but they complement each other. VAERS serves as the front door — the widest net — while VSD, CISA,
          and BEST provide the rigorous analysis needed to determine whether a signal represents a real risk.
        </p>

        <h2 className={playfairDisplay.className}>Key Vaccine Safety Concepts</h2>
        <p>
          Several concepts are essential for understanding the events on this timeline:
        </p>
        <ul>
          <li><strong>Temporal association vs. causation:</strong> Just because an event occurs after vaccination
          does not mean the vaccine caused it. With millions of people vaccinated, coincidental events are inevitable.</li>
          <li><strong>The denominator problem:</strong> VAERS provides report counts (numerators) but not the number
          of doses administered (denominators). Without denominators, you cannot calculate rates or compare safety
          across vaccines. See our <Link href="/analysis/denominator-problem">denominator problem analysis</Link>.</li>
          <li><strong>Stimulated reporting:</strong> Media attention, legal incentives, and public awareness campaigns
          can dramatically increase VAERS reporting independent of any change in actual risk. The 2021 spike is
          the clearest example.</li>
          <li><strong>Background rates:</strong> Every adverse event has a background rate — how often it occurs
          in the general population regardless of vaccination. A meaningful safety analysis must compare
          post-vaccination rates to these background rates.</li>
        </ul>
      </div>

      {/* Related */}
      
      {/* Additional context */}
      <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About This Timeline</h3>
        <p className="text-sm text-gray-600 mb-3">
          This timeline covers major events in U.S. vaccine safety history. It is not exhaustive — many smaller
          but important developments in vaccine manufacturing, regulation, and surveillance are not included.
          The events selected represent turning points that shaped today&apos;s safety infrastructure.
        </p>
        <p className="text-sm text-gray-600">
          All data referenced on this page comes from official VAERS public-use datasets published by the CDC/FDA,
          peer-reviewed medical literature, and government reports. For our complete data methodology, see the{' '}
          <Link href="/methodology" className="text-primary hover:underline">methodology page</Link>.
        </p>
      </div>

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
          <Link href="/analysis/reporting-trends" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">35 Years of Trends</div>
            <div className="text-sm text-gray-500">VAERS reporting over time</div>
          </Link>
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">COVID-19 Impact</div>
            <div className="text-sm text-gray-500">The pandemic&apos;s effect on VAERS</div>
          </Link>
          <Link href="/methodology" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Methodology</div>
            <div className="text-sm text-gray-500">How we process VAERS data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
