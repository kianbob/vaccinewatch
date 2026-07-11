import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Bird Flu H5N1 Vaccine Development 2026: Status, Candidates & What to Know',
  description: 'H5N1 bird flu vaccine tracker for 2026: outbreak scope, human cases, vaccine candidates from CSL Seqirus, Sanofi, and Moderna, stockpile status, FDA pre-pandemic approvals, and VAERS monitoring plans.',
  openGraph: {
    title: 'Bird Flu H5N1 Vaccine Development 2026: Status, Candidates & What to Know',
    description: 'A comprehensive guide to H5N1 avian influenza vaccine development in 2026 — outbreak data, candidate vaccines, stockpile readiness, and what it means for public health.',
  },
}

const faq = [
  {
    q: 'Is there an approved H5N1 bird flu vaccine for the general public?',
    a: 'As of mid-2026, there is no H5N1 vaccine authorized for broad public use. However, the FDA has granted pre-pandemic approvals for several H5N1 vaccines (including CSL Seqirus\' Audenz and an adjuvanted cell-based vaccine) that could be deployed quickly if the virus begins spreading efficiently between humans. These are stockpiled by the U.S. government for emergency use.',
  },
  {
    q: 'How many human cases of H5N1 have been reported in the U.S.?',
    a: 'Between April 2024 and mid-2026, the CDC confirmed over 70 human H5N1 cases in the United States, mostly among dairy and poultry workers with direct animal exposure. The majority experienced mild conjunctivitis or respiratory symptoms, though several required hospitalization. One fatal case was reported in early 2025 in a patient with underlying health conditions.',
  },
  {
    q: 'What H5N1 vaccine candidates are in development?',
    a: 'Major candidates include CSL Seqirus\' cell-based adjuvanted vaccine (already stockpiled), Sanofi\'s recombinant protein-based candidate, and Moderna\'s mRNA-based H5N1 vaccine (mRNA-1018) currently in Phase 2/3 trials. GSK and other manufacturers also have pre-pandemic vaccine platforms that could be adapted rapidly.',
  },
  {
    q: 'How is H5N1 bird flu different from seasonal flu?',
    a: 'H5N1 is a highly pathogenic avian influenza subtype with a historically high case fatality rate in humans (roughly 50% globally since 2003, though recent U.S. cases have been far milder). Seasonal flu typically has a fatality rate below 0.1%. The concern is that H5N1 could mutate to spread more easily between people, potentially triggering a pandemic.',
  },
  {
    q: 'Would VAERS track side effects from an H5N1 vaccine?',
    a: 'Yes. Any authorized or emergency-use H5N1 vaccine would be subject to the same VAERS reporting requirements as other vaccines. The CDC has indicated that enhanced monitoring through V-safe and the Vaccine Safety Datalink (VSD) would also be activated, similar to the surveillance infrastructure deployed during COVID-19 vaccination.',
  },
  {
    q: 'Should I be worried about bird flu in 2026?',
    a: 'The current risk to the general public remains low. H5N1 has not demonstrated sustained human-to-human transmission. However, the virus\'s continued circulation in dairy cattle, wild birds, and poultry flocks — and occasional spillover to humans — keeps pandemic preparedness agencies on high alert. Vaccination plans exist primarily as a contingency.',
  },
]

export default function BirdFluH5N1VaccinePage() {
  const confirmedHumanCases = 73
  const affectedDairyHerds = 940
  const stockpiledDoses = 10000000
  const countriesReporting = 87

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema
        title="Bird Flu H5N1 Vaccine Development 2026: Status, Candidates & What to Know"
        description="A comprehensive guide to H5N1 avian influenza vaccine development in 2026 — outbreak data, candidate vaccines, stockpile readiness, and what it means for public health."
        slug="bird-flu-h5n1-vaccine"
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
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Bird Flu H5N1 Vaccine 2026' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">10 min read</div>
          <ShareButtons title="Bird Flu H5N1 Vaccine Development 2026: Status, Candidates & What to Know" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Bird Flu H5N1 Vaccine Development 2026: Status, Candidates &amp; What to Know
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          H5N1 avian influenza has been circulating in U.S. dairy cattle and poultry flocks since early
          2024, with sporadic human cases raising pandemic preparedness concerns. Multiple vaccine
          candidates are in development or already stockpiled. Here is where things stand heading into
          mid-2026.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{formatNumber(confirmedHumanCases)}</div>
              <div className="text-sm text-gray-600">U.S. human cases</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{formatNumber(affectedDairyHerds)}</div>
              <div className="text-sm text-gray-600">affected dairy herds</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{formatNumber(stockpiledDoses)}</div>
              <div className="text-sm text-gray-600">stockpiled doses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{formatNumber(countriesReporting)}</div>
              <div className="text-sm text-gray-600">countries with H5N1</div>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The H5N1 Outbreak: 2024–2026</h2>
        <p>
          In March 2024, USDA confirmed the first detection of highly pathogenic avian influenza (HPAI) H5N1
          in U.S. dairy cattle — an unprecedented finding that upended assumptions about which mammals could
          sustain the virus. By mid-2026, the outbreak has spread to over {formatNumber(affectedDairyHerds)} dairy
          herds across more than 30 states, affected hundreds of millions of poultry (driving egg prices to
          record highs), and been detected in cats, raccoons, bears, and marine mammals.
        </p>
        <p>
          Globally, the H5N1 clade 2.3.4.4b has become the dominant circulating strain, reported in
          {' '}{formatNumber(countriesReporting)} countries across six continents. Wild bird migration continues to
          seed new outbreaks, making eradication virtually impossible. The question is no longer whether the
          virus will persist, but whether it will adapt to spread efficiently between humans.
        </p>

        <h2 className={playfairDisplay.className}>Human Cases in the United States</h2>
        <p>
          As of July 2026, the CDC has confirmed {formatNumber(confirmedHumanCases)} human H5N1 cases in the
          United States. The majority have occurred among dairy farm workers and poultry workers with direct
          occupational exposure to infected animals. Most cases presented with conjunctivitis (eye infection)
          or mild upper respiratory symptoms. However, several cases required hospitalization, and one death
          was reported in January 2025 — a Louisiana resident with significant underlying health conditions.
        </p>
        <p>
          Crucially, no sustained human-to-human transmission has been documented. Every confirmed U.S. case
          has been traced to direct animal contact, though a small number of household contacts developed
          symptoms that could not be definitively linked to independent animal exposure, keeping
          epidemiologists vigilant.
        </p>

        <h2 className={playfairDisplay.className}>Vaccine Candidates: Who Is Building What</h2>
        <p>
          Several pharmaceutical companies have H5N1 vaccine candidates at various stages of development
          and regulatory review:
        </p>
        <ul>
          <li>
            <strong>CSL Seqirus — Audenz &amp; Adjuvanted Cell-Based Vaccine:</strong> CSL Seqirus has the
            most advanced position. Their cell-based, MF59-adjuvanted H5N1 vaccine received FDA approval
            for pre-pandemic use in 2020. The U.S. government has contracted for millions of doses for the
            Strategic National Stockpile, with approximately {formatNumber(stockpiledDoses)} doses in bulk
            or finished form as of early 2026. This platform can be updated to match circulating strains
            within weeks.
          </li>
          <li>
            <strong>Sanofi — Recombinant Protein Candidate:</strong> Sanofi is developing a recombinant
            hemagglutinin (HA) protein vaccine using its established FluBlok platform. Phase 1/2 clinical
            trials began in late 2024, with preliminary immunogenicity data showing robust antibody
            responses, particularly when paired with an adjuvant. Sanofi has a BARDA contract to support
            scale-up if pandemic deployment is needed.
          </li>
          <li>
            <strong>Moderna — mRNA-1018:</strong> Moderna&apos;s mRNA-based H5N1 vaccine entered Phase 2/3
            trials in mid-2025, enrolling approximately 6,000 participants. Early data showed strong
            neutralizing antibody responses after a single dose, with a favorable safety profile consistent
            with other mRNA vaccines. The mRNA platform&apos;s advantage is speed: Moderna claims it can
            update the antigen sequence and begin manufacturing within 60 days of a strain change.
          </li>
          <li>
            <strong>GSK and Others:</strong> GSK maintains a pre-pandemic H5N1 vaccine with its AS03
            adjuvant system and has a standing contract with BARDA. Several other manufacturers in Europe
            and Asia have egg-based and cell-based candidates at varying readiness levels.
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>The Strategic National Stockpile</h2>
        <p>
          The U.S. government maintains a stockpile of pre-pandemic H5N1 vaccine as part of its pandemic
          preparedness strategy. As of 2026, ASPR (Administration for Strategic Preparedness and Response)
          reports approximately {formatNumber(stockpiledDoses)} doses of H5N1 vaccine in bulk antigen and
          finished form, plus separate stockpiles of MF59 and AS03 adjuvants that can stretch dose counts
          significantly — a technique called &quot;dose-sparing&quot; that was validated during the 2009
          H1N1 pandemic.
        </p>
        <p>
          However, {formatNumber(stockpiledDoses)} doses would cover only a fraction of the U.S. population
          of 340 million. In a pandemic scenario, vaccine manufacturing would need to scale rapidly, which
          is why BARDA has invested in &quot;warm base&quot; manufacturing capacity — keeping production
          lines ready to pivot from seasonal flu to pandemic flu vaccine on short notice. The estimated
          timeline from pandemic declaration to first public doses is 12–16 weeks for egg-based vaccines
          and potentially faster for mRNA platforms.
        </p>

        <h2 className={playfairDisplay.className}>FDA Pre-Pandemic Approvals</h2>
        <p>
          The FDA has a unique regulatory pathway for pre-pandemic influenza vaccines. These vaccines are
          approved based on immunogenicity (their ability to generate an immune response) rather than
          real-world efficacy against disease, since it is not possible to run a traditional efficacy trial
          before a pandemic starts. This framework allows vaccines to be manufactured and stockpiled
          in advance, then deployed under their existing approval (potentially with a strain update) once
          a pandemic is declared.
        </p>
        <p>
          CSL Seqirus&apos; adjuvanted H5N1 vaccine and Sanofi&apos;s earlier H5N1 candidate have both
          received FDA pre-pandemic approval. In a pandemic scenario, these could be distributed without
          needing a new Emergency Use Authorization, though the FDA would likely require updated clinical
          data if the circulating strain has drifted significantly from the vaccine antigen.
        </p>

        <h2 className={playfairDisplay.className}>Clinical Trial Data</h2>
        <p>
          Across multiple candidates, clinical trial data for H5N1 vaccines shows consistent findings:
        </p>
        <ul>
          <li>
            <strong>Immunogenicity:</strong> Two doses of adjuvanted H5N1 vaccine reliably produce
            seroprotective antibody titers in 70–90% of participants. Single-dose regimens with mRNA
            candidates have shown comparable responses in early data.
          </li>
          <li>
            <strong>Cross-reactivity:</strong> Adjuvanted vaccines appear to generate broader immune
            responses that may offer partial protection against drifted H5N1 variants — important because
            the virus continues to evolve in animal reservoirs.
          </li>
          <li>
            <strong>Safety:</strong> Reported adverse events are generally consistent with seasonal
            influenza vaccines: injection-site pain (60–80%), fatigue (25–40%), headache (20–35%), and
            low-grade fever (10–15%). Adjuvanted formulations tend to produce somewhat more local
            reactogenicity but stronger immune responses.
          </li>
          <li>
            <strong>Durability:</strong> Limited data suggests antibody levels decline significantly by
            12 months, which could necessitate booster doses in a prolonged pandemic scenario.
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>WHO Coordination and Global Preparedness</h2>
        <p>
          The World Health Organization maintains a global influenza surveillance network that monitors
          H5N1 evolution in real time. WHO&apos;s Global Influenza Surveillance and Response System
          (GISRS) regularly updates candidate vaccine viruses — standardized reference strains that
          manufacturers use to produce vaccines. As of 2026, WHO has issued updated CVVs for the
          clade 2.3.4.4b viruses circulating in North American cattle and poultry.
        </p>
        <p>
          WHO has also coordinated advance purchase agreements with several manufacturers to ensure
          that low- and middle-income countries would have access to pandemic vaccines, addressing
          equity gaps exposed during the COVID-19 pandemic. The organization estimates that global
          manufacturing capacity for pandemic influenza vaccine has roughly doubled since 2019, to
          approximately 8 billion doses per year across all platforms.
        </p>

        <h2 className={playfairDisplay.className}>VAERS Monitoring Plans</h2>
        <p>
          If an H5N1 vaccine is deployed to the public, safety monitoring would follow the enhanced
          framework established during COVID-19 vaccination. This includes VAERS for passive adverse
          event reporting, the Vaccine Safety Datalink (VSD) for active near-real-time surveillance in
          large health systems, V-safe for participant-reported outcomes via smartphone, and the
          Clinical Immunization Safety Assessment (CISA) Project for complex case evaluation.
        </p>
        <p>
          VaccineWatch would track VAERS reports for any authorized H5N1 vaccine, providing the same
          transparent data exploration available for{' '}
          <Link href="/vaccines/flu">seasonal flu vaccines</Link> and other immunizations. Given the
          lessons learned from COVID-19 vaccine safety monitoring, the infrastructure is substantially
          more mature than it was in 2020.
        </p>

        <h2 className={playfairDisplay.className}>H5N1 vs. Seasonal Flu Vaccines</h2>
        <p>
          Current seasonal flu vaccines do <em>not</em> protect against H5N1. Seasonal vaccines target
          H1N1, H3N2, and influenza B strains — the subtypes circulating in humans. H5N1 is
          antigenically distinct, requiring a dedicated vaccine. However, the manufacturing infrastructure
          overlaps significantly: the same egg-based and cell-based production facilities used for
          seasonal flu can be repurposed for pandemic H5N1 vaccine production, though this would
          likely disrupt seasonal flu vaccine supply.
        </p>
        <p>
          This tradeoff is one reason mRNA platforms are seen as strategically valuable — they use
          entirely separate manufacturing processes and would not compete with seasonal flu production
          capacity.
        </p>

        <h2 className={playfairDisplay.className}>The Bottom Line</h2>
        <p>
          H5N1 has not become a pandemic, and the current risk to the general public remains low. But
          the virus&apos;s unprecedented spread through U.S. dairy cattle, continued poultry outbreaks,
          and sporadic human infections have elevated preparedness planning to a level not seen since
          the early days of COVID-19. Multiple vaccine candidates are ready or nearly ready for rapid
          deployment, the stockpile provides a first-wave buffer, and surveillance systems are in place
          to monitor safety if vaccination begins. The situation bears watching — and VaccineWatch will
          track any H5N1 vaccine VAERS data as it becomes available.
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
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/vaccines/flu" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Flu Vaccine VAERS Data →</div>
            <div className="text-sm text-gray-500">Seasonal influenza adverse event reports</div>
          </Link>
          <Link href="/vaccine-schedule" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Vaccine Schedule by Age →</div>
            <div className="text-sm text-gray-500">CDC-recommended immunization timeline</div>
          </Link>
          <Link href="/analysis/denominator-problem" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">The Denominator Problem →</div>
            <div className="text-sm text-gray-500">Why raw VAERS counts need context</div>
          </Link>
          <Link href="/is-vaers-reliable" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Is VAERS Reliable? →</div>
            <div className="text-sm text-gray-500">Understanding passive surveillance data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
