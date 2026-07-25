import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'H5N1 Vaccine Update July 2026: Latest Bird Flu Vaccine News & Developments',
  description: 'July 2026 H5N1 vaccine update: FDA fast tracks mRNA bird flu vaccine, nasal spray shows promise, Nebraska develops multispecies vaccine, expanded VAERS monitoring. Latest avian flu vaccine news.',
  openGraph: {
    title: 'H5N1 Vaccine Update July 2026: Latest Bird Flu Vaccine News & Developments',
    description: 'Latest H5N1 avian influenza vaccine developments — new trials, FDA fast track, nasal spray breakthrough, and safety monitoring updates for July 2026.',
  },
  keywords: ['H5N1 vaccine update', 'bird flu vaccine news', 'H5N1 vaccine 2026', 'avian flu vaccine update', 'bird flu vaccine latest', 'H5N1 mRNA vaccine trial', 'bird flu nasal vaccine'],
}

const faq = [
  {
    q: 'What is the latest H5N1 vaccine news in 2026?',
    a: 'As of July 2026, the FDA has granted fast track designation to ARCT-2304 (a self-amplifying mRNA vaccine), Moderna\'s mRNA-1018 is in Phase 2/3 trials, a nasal spray vaccine showed strong results in animal studies, and University of Nebraska researchers developed a promising multispecies vaccine protecting both mice and cattle.',
  },
  {
    q: 'Has the FDA approved any H5N1 vaccine for public use?',
    a: 'No broad public-use H5N1 vaccine has been approved as of July 2026. However, CSL Seqirus\' adjuvanted H5N1 vaccine has pre-pandemic FDA approval and is stockpiled for emergency deployment. The FDA\'s fast track designation for ARCT-2304 could accelerate a new approval.',
  },
  {
    q: 'How many H5N1 human cases have there been in 2026?',
    a: 'The CDC has confirmed over 70 total U.S. human cases since April 2024, with cases continuing into 2026 primarily among dairy and poultry workers. Most cases have been mild, though one death was reported in January 2025. No sustained human-to-human transmission has been documented.',
  },
  {
    q: 'What is the nasal spray bird flu vaccine?',
    a: 'Researchers published results in early 2026 showing an influenza virus vector-based nasal spray vaccine that outperformed traditional injected flu shots against H5N1 in animal tests. Nasal delivery may provide superior mucosal immunity, blocking the virus at its respiratory entry point. Human trials have not yet begun for this specific candidate.',
  },
  {
    q: 'How will bird flu vaccine safety be monitored?',
    a: 'Any deployed H5N1 vaccine would be monitored through VAERS (passive reporting), the Vaccine Safety Datalink (active surveillance), and V-safe (smartphone-based reporting). In May 2025, the CDC and FDA expanded public VAERS data access, providing more transparency for all vaccine adverse event reports.',
  },
]

const timeline = [
  { date: 'March 2024', event: 'First H5N1 detection in U.S. dairy cattle — unprecedented mammalian outbreak begins' },
  { date: 'Late 2024', event: 'FDA approves Phase 1 trial for self-amplifying mRNA H5N1 vaccine (ARCT-2304)' },
  { date: 'January 2025', event: 'First U.S. H5N1 death reported (Louisiana); $590M Moderna contract issued then terminated' },
  { date: 'April 2025', event: 'Nasal spray H5N1 vaccine platform developed using influenza virus vector technology' },
  { date: 'May 2025', event: 'CDC/FDA expand public VAERS data access through WONDER database' },
  { date: 'Mid-2025', event: 'Moderna mRNA-1018 enters Phase 2/3 trials with ~6,000 participants' },
  { date: 'January 2026', event: 'FDA grants fast track designation to ARCT-2304 for H5N1 prevention' },
  { date: 'February 2026', event: 'Nasal spray H5N1 vaccine shows strong protection in animal studies, outperforming traditional shots' },
  { date: 'April 2026', event: 'University of Nebraska develops vaccine protecting both mice and dairy calves against H5N1' },
  { date: 'May 2026', event: 'mRNA bird flu vaccine enters human trials targeting poultry workers and older adults' },
]

export default function H5N1VaccineUpdatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema
        title="H5N1 Vaccine Update July 2026: Latest Bird Flu Vaccine News & Developments"
        description="Latest H5N1 avian influenza vaccine developments — new trials, FDA fast track, nasal spray breakthrough, and safety monitoring updates."
        slug="h5n1-vaccine-update"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }) }} />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'H5N1 Vaccine Update' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">10 min read · Updated July 2026</div>
          <ShareButtons title="H5N1 Vaccine Update July 2026: Latest Bird Flu Vaccine News" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          H5N1 Vaccine Update: July 2026
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Bird flu vaccine development is moving faster than ever. From FDA fast track designation to
          breakthrough nasal spray technology, here are the latest developments in the race to prepare
          for a potential H5N1 pandemic — and the expanded safety monitoring that would come with it.
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>
          H5N1 Vaccine Development Timeline
        </h2>
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-28 text-sm font-semibold text-primary">{item.date}</div>
              <div className="flex-1 text-gray-700 border-l-2 border-primary/20 pl-4">{item.event}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>FDA Fast Tracks mRNA Bird Flu Vaccine</h2>
        <p>
          In January 2026, the FDA granted fast track designation to ARCT-2304, a self-amplifying mRNA
          (saRNA) vaccine developed by Arcturus Therapeutics for prevention of H5N1 avian influenza.
          This designation provides several regulatory advantages: more frequent FDA meetings during
          development, eligibility for rolling review (submitting data as it becomes available rather
          than waiting for a complete package), and potential priority review.
        </p>
        <p>
          What makes self-amplifying mRNA different from standard mRNA vaccines like Moderna&apos;s? The
          saRNA approach includes a replicase gene that allows the mRNA to copy itself inside cells,
          potentially producing more antigen protein from a smaller initial dose. This could mean lower
          doses produce equivalent immune responses — a significant advantage when vaccine supply needs
          to stretch across a large population quickly.
        </p>

        <h2 className={playfairDisplay.className}>Nasal Spray Vaccine Shows Breakthrough Results</h2>
        <p>
          Published in February 2026, research on a novel nasal spray H5N1 vaccine demonstrated results
          that could reshape avian influenza vaccination strategy. The vaccine uses an influenza virus
          vector-based platform — originally pioneered during the COVID-19 pandemic — to deliver H5N1
          antigens directly to the nasal mucosa.
        </p>
        <p>
          Why does the delivery route matter? Traditional injected vaccines primarily stimulate systemic
          immunity (antibodies in the blood), while nasal vaccines can generate mucosal IgA antibodies
          at the site where respiratory viruses enter the body. In animal studies, the nasal spray
          provided <em>stronger</em> protection than traditional intramuscular flu shots, suggesting it
          could both prevent infection and reduce viral shedding — potentially limiting transmission.
        </p>

        <h2 className={playfairDisplay.className}>Multispecies Vaccine: Protecting Humans and Cattle</h2>
        <p>
          University of Nebraska–Lincoln researchers published results in April 2026 showing a vaccine
          approach that protected both mice and dairy calves against highly pathogenic H5N1 — a first
          for bird flu. The significance: H5N1&apos;s unprecedented spread through U.S. dairy cattle has
          created a massive animal reservoir that increases spillover risk to humans. A vaccine that
          protects cattle would reduce the virus&apos;s foothold in the food supply while simultaneously
          serving as a human vaccine candidate.
        </p>
        <p>
          The researchers are seeking funding and industry partnerships to advance the multispecies
          vaccine through further evaluation. If successful, this approach could protect both agricultural
          workers and the animals they work with — addressing the outbreak at its source.
        </p>

        <h2 className={playfairDisplay.className}>Moderna&apos;s Phase 2/3 Trials Continue</h2>
        <p>
          Moderna&apos;s mRNA-1018 H5N1 vaccine, which entered Phase 2/3 trials in mid-2025 with
          approximately 6,000 participants, continues to advance. Early data showed strong neutralizing
          antibody responses after a single dose with a safety profile consistent with other mRNA
          vaccines. By May 2026, an mRNA-based bird flu vaccine was being trialed specifically in
          high-risk groups including poultry workers and older adults.
        </p>
        <p>
          Notably, the original $590 million HHS contract with Moderna for H5N1 vaccine development,
          issued in January 2025, was terminated by May 2025. However, Moderna has continued development
          through other funding mechanisms, reflecting the company&apos;s assessment that pandemic
          preparedness vaccines represent a significant commercial opportunity.
        </p>

        <h2 className={playfairDisplay.className}>Expanded VAERS Monitoring</h2>
        <p>
          A less-noticed but significant development: on May 8, 2025, the CDC and FDA expanded public
          access to VAERS data through the WONDER database and downloadable files. The enhancement
          provides a more complete picture of all reported adverse events following vaccination,
          including expanded access to secondary reports and more detailed data fields.
        </p>
        <p>
          This matters for H5N1 because any deployed bird flu vaccine would be monitored through these
          enhanced systems. The infrastructure for post-market safety surveillance is substantially more
          mature than it was at the start of COVID-19 vaccination in late 2020. VaccineWatch will provide{' '}
          <Link href="/vaers-database">full VAERS data exploration</Link> for any H5N1 vaccine as
          reports become available.
        </p>

        <h2 className={playfairDisplay.className}>Current Outbreak Status</h2>
        <p>
          As of July 2026, H5N1 clade 2.3.4.4b continues to circulate in U.S. dairy cattle (940+ affected
          herds across 30+ states), wild birds, and poultry flocks across 87 countries globally. The CDC
          streamlined A(H5) bird flu updates with routine influenza data reporting in July 2025, reflecting
          the ongoing but stable nature of the public health situation.
        </p>
        <p>
          The risk assessment remains: current risk to the general public is low, but the virus&apos;s
          continued circulation in mammalian hosts creates ongoing pandemic potential. Vaccination remains
          the primary preparedness tool, which is why development is proceeding urgently even without
          active human-to-human transmission.
        </p>

        <h2 className={playfairDisplay.className}>What to Watch Next</h2>
        <ul>
          <li>Phase 2/3 results from Moderna&apos;s mRNA-1018 trial (expected late 2026)</li>
          <li>Phase 1 data from Arcturus ARCT-2304 fast-tracked trial</li>
          <li>Whether the nasal spray vaccine advances to human trials</li>
          <li>Any changes in H5N1 human-to-human transmission patterns</li>
          <li>Updated CDC candidate vaccine virus recommendations as the virus evolves</li>
          <li>Potential expansion of vaccination to occupational risk groups</li>
        </ul>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faq.map((f) => (
            <div key={f.q}>
              <div className="font-semibold text-gray-900">{f.q}</div>
              <div className="text-gray-700 mt-1">{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/bird-flu-vaccine-2026" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Bird Flu Vaccine 2026: Complete Guide →</div>
            <div className="text-sm text-gray-500">Status, trials, and availability for H5N1 vaccines</div>
          </Link>
          <Link href="/analysis/bird-flu-h5n1-vaccine" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">H5N1 Vaccine Development: Full Analysis →</div>
            <div className="text-sm text-gray-500">Deep dive into candidates, stockpile, and clinical data</div>
          </Link>
          <Link href="/is-vaers-reliable" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Is VAERS Reliable? →</div>
            <div className="text-sm text-gray-500">Understanding passive surveillance data</div>
          </Link>
          <Link href="/analysis/covid-long-term-safety" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID Vaccine Long-Term Safety →</div>
            <div className="text-sm text-gray-500">What the data shows after years of follow-up</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
