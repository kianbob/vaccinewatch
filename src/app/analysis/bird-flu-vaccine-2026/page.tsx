import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Bird Flu Vaccine 2026: H5N1 Vaccine Status, Trials & Availability',
  description: 'Everything you need to know about the bird flu vaccine in 2026: mRNA and nasal spray candidates in human trials, FDA fast track designation, stockpile status, and when a public H5N1 vaccine may be available.',
  openGraph: {
    title: 'Bird Flu Vaccine 2026: H5N1 Vaccine Status, Trials & Availability',
    description: 'Comprehensive guide to bird flu vaccine development in 2026 — human trials underway, FDA fast track granted, nasal spray candidates showing promise, and what it means for pandemic preparedness.',
  },
  keywords: ['bird flu vaccine 2026', 'H5N1 vaccine', 'bird flu vaccine availability', 'avian flu vaccine', 'bird flu shot', 'H5N1 mRNA vaccine', 'bird flu vaccine human trials'],
}

const faq = [
  {
    q: 'Is there a bird flu vaccine available for the public in 2026?',
    a: 'Not yet for general public use. As of July 2026, several H5N1 vaccines are stockpiled for emergency deployment, and new mRNA and nasal spray candidates are in active human trials. The FDA has granted fast track designation to at least one candidate (ARCT-2304), which could accelerate availability if a pandemic is declared.',
  },
  {
    q: 'How effective are the bird flu vaccines being developed?',
    a: 'Early clinical data is encouraging. mRNA-based candidates have shown strong neutralizing antibody responses after a single dose. A new nasal spray vaccine demonstrated complete protection against H5N1 in animal models, outperforming traditional injected flu shots. Adjuvanted vaccines in the stockpile produce seroprotective titers in 70–90% of recipients.',
  },
  {
    q: 'When will a bird flu vaccine be available to the general public?',
    a: 'Timeline depends on whether H5N1 begins spreading between humans. Stockpiled vaccines could be deployed within weeks of a pandemic declaration. mRNA candidates could be manufactured at scale within 60–90 days. For routine use without a pandemic trigger, availability would require full FDA approval, which could take 1–2 more years.',
  },
  {
    q: 'Can the regular flu shot protect against bird flu?',
    a: 'No. Seasonal flu vaccines target H1N1, H3N2, and influenza B — the strains circulating in humans. H5N1 is antigenically distinct and requires a dedicated vaccine. However, staying current on seasonal flu vaccination is still recommended.',
  },
  {
    q: 'What are the side effects of H5N1 bird flu vaccines?',
    a: 'Clinical trial data shows side effects consistent with standard flu vaccines: injection-site pain (60–80%), fatigue (25–40%), headache (20–35%), and low-grade fever (10–15%). Adjuvanted formulations may cause slightly more local soreness but produce stronger immune responses. Any deployed H5N1 vaccine would be monitored through VAERS and other safety systems.',
  },
  {
    q: 'Is bird flu dangerous to humans in 2026?',
    a: 'Current risk to the general public remains low. Over 70 confirmed U.S. cases since 2024 have mostly been mild, occurring in workers with direct animal contact. However, H5N1 has historically had a high fatality rate globally, and its continued spread in cattle and poultry keeps public health agencies on alert.',
  },
]

export default function BirdFluVaccine2026Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema
        title="Bird Flu Vaccine 2026: H5N1 Vaccine Status, Trials & Availability"
        description="Comprehensive guide to bird flu vaccine development in 2026 — human trials underway, FDA fast track granted, nasal spray candidates showing promise."
        slug="bird-flu-vaccine-2026"
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
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Bird Flu Vaccine 2026' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">12 min read</div>
          <ShareButtons title="Bird Flu Vaccine 2026: H5N1 Vaccine Status, Trials & Availability" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Bird Flu Vaccine 2026: H5N1 Vaccine Status, Trials &amp; Availability
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          As H5N1 avian influenza continues circulating in U.S. dairy herds and poultry flocks — with over 70 confirmed
          human cases since 2024 — vaccine development has accelerated dramatically. Multiple candidates are now in
          human trials, and the FDA has granted fast track designation to an mRNA candidate. Here is a complete guide
          to where things stand in July 2026.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">4+</div>
              <div className="text-sm text-gray-600">vaccine candidates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">Phase 2/3</div>
              <div className="text-sm text-gray-600">most advanced trials</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">10M+</div>
              <div className="text-sm text-gray-600">stockpiled doses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">Fast Track</div>
              <div className="text-sm text-gray-600">FDA designation</div>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why a Bird Flu Vaccine Matters Now</h2>
        <p>
          The H5N1 clade 2.3.4.4b virus has rewritten the playbook on avian influenza. Since March 2024,
          it has spread to over 940 dairy herds across 30+ states, decimated poultry flocks driving egg prices
          to record highs, and jumped to mammals including cats, raccoons, and marine life. While current
          human-to-human transmission remains absent, the virus&apos;s unprecedented mammalian host range has
          pandemic preparedness experts on high alert.
        </p>
        <p>
          The good news: vaccine science has advanced enormously since the last major H5N1 scare in the
          mid-2000s. mRNA technology, refined during COVID-19, now offers a rapid-response platform that
          can produce updated vaccines within weeks of a strain change. And traditional approaches have
          also matured, with adjuvanted vaccines already stockpiled and ready for deployment.
        </p>

        <h2 className={playfairDisplay.className}>Vaccine Candidates in Human Trials (2026)</h2>

        <h3>mRNA Vaccines: The Frontrunners</h3>
        <p>
          <strong>Moderna mRNA-1018</strong> entered Phase 2/3 trials in mid-2025 with approximately
          6,000 participants. Early data shows strong neutralizing antibody responses after a single dose.
          Moderna can update the antigen sequence and begin manufacturing within 60 days of a strain
          change — a critical advantage if the virus mutates.
        </p>
        <p>
          <strong>Arcturus Therapeutics ARCT-2304</strong> received FDA fast track designation in January 2026.
          This self-amplifying mRNA (saRNA) vaccine is in Phase 1 human trials, targeting high-risk groups
          like poultry workers and older adults. The self-amplifying technology means lower doses may
          produce equivalent immune responses, potentially stretching supply further during a pandemic.
        </p>

        <h3>Nasal Spray Vaccines: A New Approach</h3>
        <p>
          A breakthrough nasal spray H5N1 vaccine developed using an influenza virus vector platform
          showed strong protection in animal tests in early 2026, outperforming traditional injected flu
          shots. Published in February 2026, the research demonstrated that nasal delivery may provide
          superior mucosal immunity — blocking the virus at its point of entry in the respiratory tract,
          rather than just preventing severe disease.
        </p>
        <p>
          Separately, researchers at the University of Nebraska–Lincoln published results in April 2026
          showing a novel vaccine approach that protected both mice and dairy calves against severe H5N1
          disease. The team is seeking funding for a multispecies vaccine that could simultaneously
          protect humans and livestock — addressing both the public health and agricultural dimensions
          of the outbreak.
        </p>

        <h3>Stockpiled Vaccines: Ready for Emergency Use</h3>
        <p>
          <strong>CSL Seqirus</strong> maintains the most deployment-ready position. Their MF59-adjuvanted,
          cell-based H5N1 vaccine already has FDA pre-pandemic approval and approximately 10 million
          doses are stockpiled in the Strategic National Stockpile. These could be deployed within weeks
          of a pandemic declaration without needing new authorization.
        </p>
        <p>
          <strong>Sanofi</strong> is developing a recombinant protein-based candidate using its FluBlok
          platform, with Phase 1/2 data showing strong antibody responses with adjuvant. <strong>GSK</strong> has
          an AS03-adjuvanted H5N1 vaccine under contract with BARDA.
        </p>

        <h2 className={playfairDisplay.className}>FDA Fast Track &amp; Regulatory Pathway</h2>
        <p>
          The FDA&apos;s fast track designation for ARCT-2304 signals regulatory urgency. Fast track allows
          more frequent FDA meetings, rolling review of data (rather than waiting for a complete package),
          and potential priority review — cutting months off the typical approval timeline.
        </p>
        <p>
          Additionally, the FDA&apos;s pre-pandemic approval pathway lets vaccines be manufactured and
          stockpiled based on immunogenicity data (immune response) rather than real-world efficacy trials,
          which can&apos;t be conducted before a pandemic starts. This is how CSL Seqirus&apos; vaccine was
          approved and stockpiled.
        </p>

        <h2 className={playfairDisplay.className}>VAERS Data Access Expansion (May 2025)</h2>
        <p>
          In a significant development for vaccine safety transparency, the CDC and FDA expanded public
          access to VAERS data in May 2025 through the WONDER database and downloadable files. This
          enhancement provides more complete reporting on all adverse events following vaccination,
          including expanded secondary report data. For any future H5N1 vaccine,{' '}
          <Link href="/vaers-database">VAERS monitoring</Link> would follow the enhanced framework
          established during COVID-19, including the Vaccine Safety Datalink (VSD) and V-safe for
          active surveillance.
        </p>

        <h2 className={playfairDisplay.className}>When Could a Public Vaccine Be Available?</h2>
        <p>
          The timeline depends on whether H5N1 begins sustained human-to-human transmission:
        </p>
        <ul>
          <li>
            <strong>Pandemic scenario:</strong> Stockpiled vaccines could ship within weeks. mRNA platforms
            could have updated doses in production within 60–90 days. The government has invested in
            &quot;warm base&quot; manufacturing — keeping production lines ready to pivot from seasonal
            flu to pandemic vaccine.
          </li>
          <li>
            <strong>Non-pandemic preparedness:</strong> mRNA candidates in current trials could complete
            Phase 3 by late 2026 or early 2027. Full FDA approval for routine use would follow, potentially
            making vaccines available to high-risk groups (poultry workers, veterinarians, first responders)
            before the general public.
          </li>
          <li>
            <strong>Current reality:</strong> With no human-to-human transmission documented, mass
            vaccination is not recommended. The focus remains on occupational protection, stockpile
            readiness, and advancing clinical trials.
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>What You Can Do Now</h2>
        <p>
          While waiting for an H5N1 vaccine, public health agencies recommend:
        </p>
        <ul>
          <li>Avoid contact with sick or dead wild birds, poultry, or other animals</li>
          <li>Do not consume raw or undercooked poultry or eggs from unknown sources</li>
          <li>If you work with poultry or dairy cattle, follow CDC occupational safety guidelines including PPE</li>
          <li>
            Stay current on your{' '}
            <Link href="/analysis/vaccine-schedule-2026">seasonal flu vaccine</Link> — while it
            won&apos;t protect against H5N1, it reduces the risk of co-infection that could allow
            viral reassortment
          </li>
          <li>
            Monitor updates from the{' '}
            <a href="https://www.cdc.gov/bird-flu/situation-summary/index.html" target="_blank" rel="noopener noreferrer">
              CDC bird flu situation page
            </a>
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>The Bottom Line</h2>
        <p>
          Bird flu vaccine development in 2026 is further advanced than at any previous point in history.
          mRNA candidates are in human trials, nasal spray vaccines show promise in animal studies, and
          millions of doses are already stockpiled for emergency use. The FDA&apos;s fast track designation
          and the expanded VAERS monitoring infrastructure mean that when an H5N1 vaccine does reach
          the public, both the speed of deployment and the rigor of safety surveillance will be
          unprecedented. VaccineWatch will track all H5N1 vaccine VAERS data as it becomes available.
        </p>
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
          <Link href="/analysis/bird-flu-h5n1-vaccine" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">H5N1 Vaccine Development: Full Analysis →</div>
            <div className="text-sm text-gray-500">Deep dive into all H5N1 vaccine candidates and clinical data</div>
          </Link>
          <Link href="/analysis/h5n1-vaccine-update" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">H5N1 Vaccine Update: July 2026 →</div>
            <div className="text-sm text-gray-500">Latest developments in bird flu vaccine research</div>
          </Link>
          <Link href="/vaccines/flu" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Flu Vaccine VAERS Data →</div>
            <div className="text-sm text-gray-500">Seasonal influenza adverse event reports</div>
          </Link>
          <Link href="/analysis/vaccine-hesitancy-2026" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Vaccine Hesitancy in 2026 →</div>
            <div className="text-sm text-gray-500">Public attitudes toward vaccination</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
