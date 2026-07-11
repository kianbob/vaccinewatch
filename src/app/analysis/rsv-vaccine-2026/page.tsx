import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'RSV Vaccine 2026: Who Should Get It & What to Know',
  description: 'RSV vaccine guide for 2026: Arexvy and Abrysvo for adults 60+, Abrysvo in pregnancy, and nirsevimab (Beyfortus) for infants — efficacy, side effects, and CDC advice.',
  openGraph: {
    title: 'RSV Vaccine 2026: Who Should Get It & What to Know',
    description: 'A complete 2026 guide to RSV vaccines — Arexvy, Abrysvo, and nirsevimab — with efficacy data, VAERS side effects, and CDC recommendations.',
  },
}

const faq = [
  {
    q: 'Who should get the RSV vaccine in 2026?',
    a: 'CDC recommends RSV vaccination for all adults 75 and older, for adults 60-74 who are at increased risk of severe RSV, and for pregnant women at 32-36 weeks of gestation during RSV season to protect their newborns. Infants who are not protected by maternal vaccination can receive nirsevimab (Beyfortus).',
  },
  {
    q: 'What is the difference between Arexvy and Abrysvo?',
    a: 'Arexvy is made by GSK and is approved for adults 60 and older. Abrysvo is made by Pfizer and is approved both for adults 60 and older and for pregnant women at 32-36 weeks to protect infants after birth. Both are protein-based (not mRNA) vaccines given as a single dose.',
  },
  {
    q: 'Is nirsevimab (Beyfortus) a vaccine?',
    a: 'Nirsevimab is a monoclonal antibody, not a traditional vaccine. Instead of prompting the infant’s immune system to make its own antibodies, it provides ready-made antibodies that offer passive protection through the RSV season. It is recommended for infants under 8 months entering their first RSV season who are not protected by maternal vaccination.',
  },
  {
    q: 'How effective are the RSV vaccines?',
    a: 'In clinical trials, the adult RSV vaccines reduced RSV-associated lower respiratory tract disease by roughly 70-83% in the first season. Maternal vaccination with Abrysvo reduced severe RSV disease in infants in the months after birth, and nirsevimab reduced medically attended RSV illness in infants by about 75-80%.',
  },
  {
    q: 'What side effects are reported for RSV vaccines?',
    a: 'The most commonly reported reactions are injection-site pain, fatigue, muscle pain, headache, and mild fever, typically resolving within a few days. As with all vaccines, adverse events are monitored through VAERS, which is a passive reporting system where a report does not by itself prove the vaccine caused the event.',
  },
]

export default function RsvVaccine2026Page() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const rsv = vaccineIndex.find((v: any) => v.type === 'RSV')

  const reports = rsv?.reports || 0
  const died = rsv?.died || 0
  const hosp = rsv?.hosp || 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema
        title="RSV Vaccine 2026: Who Should Get It & What to Know"
        description="A complete 2026 guide to RSV vaccines — Arexvy, Abrysvo, and nirsevimab — with efficacy data, VAERS side effects, and CDC recommendations."
        slug="rsv-vaccine-2026"
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
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'RSV Vaccine 2026' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">8 min read</div>
          <ShareButtons title="RSV Vaccine 2026: Who Should Get It & What to Know" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          RSV Vaccine 2026: Who Should Get It &amp; What to Know
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Respiratory syncytial virus (RSV) protection has expanded rapidly. Heading into the
          2025–2026 season there are now vaccines for older adults and pregnant women, plus a
          long-acting antibody for infants. Here is who qualifies, how well they work, and what the
          reported side effects look like.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-primary mb-1">{formatNumber(reports)}</div>
          <div className="text-gray-700">
            VAERS reports mention an RSV vaccine, including {formatNumber(hosp)} hospitalizations and{' '}
            {formatNumber(died)} deaths reported after vaccination. As always, a report does not mean the
            vaccine caused the event.
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>A Historic Development</h2>
        <p>
          The approval of RSV vaccines in 2023–2024 represented a decades-long effort to develop
          protection against a virus that has eluded vaccine developers since the 1960s. An early
          attempt at an RSV vaccine in the 1960s actually made disease worse in vaccinated children
          (a phenomenon called vaccine-enhanced disease), setting back RSV vaccine research by
          decades. Modern RSV vaccines use fundamentally different approaches that avoid this risk.
        </p>

        <h2 className={playfairDisplay.className}>Why RSV Matters</h2>
        <p>
          RSV is a common respiratory virus that causes cold-like symptoms in most people but can be
          serious for infants and older adults. It is a leading cause of hospitalization in babies and is
          responsible for tens of thousands of hospitalizations and thousands of deaths among older adults
          in the United States each year. For decades there was no approved RSV vaccine; the arrival of
          multiple products has made the 2025–2026 season a turning point in prevention.
        </p>

        <h2 className={playfairDisplay.className}>Arexvy (GSK) for Adults 60+</h2>
        <p>
          <strong>Arexvy</strong>, manufactured by GSK, is a protein subunit vaccine with an adjuvant that
          boosts the immune response. It is approved for adults 60 and older and given as a single dose. In
          its pivotal trial, Arexvy substantially reduced RSV-associated lower respiratory tract disease in
          older adults, with protection observed across the first two seasons. It is not an mRNA vaccine.
        </p>

        <h2 className={playfairDisplay.className}>Abrysvo (Pfizer) for Adults 60+ and Pregnancy</h2>
        <p>
          <strong>Abrysvo</strong>, made by Pfizer, is a bivalent protein-based vaccine with two important
          uses. First, like Arexvy, it protects adults 60 and older. Second — and uniquely — it is approved
          for <strong>pregnant women at 32–36 weeks of gestation</strong>. When given during this window,
          the mother produces antibodies that cross the placenta and protect the newborn during the first
          vulnerable months of life. Maternal vaccination is administered seasonally (typically September
          through January in most of the country) to align protection with peak RSV circulation.
        </p>

        <h2 className={playfairDisplay.className}>Nirsevimab (Beyfortus) for Infants</h2>
        <p>
          <strong>Nirsevimab</strong>, sold as Beyfortus, is not a vaccine but a long-acting monoclonal
          antibody. Rather than training the immune system, it delivers ready-made antibodies that provide
          passive protection lasting through an RSV season. CDC recommends it for infants under 8 months
          entering their first RSV season who are not already protected by maternal Abrysvo vaccination, and
          for some high-risk children 8–19 months entering their second season. In real-world use it has
          markedly reduced medically attended RSV illness and hospitalization in infants.
        </p>
        <p>
          Families generally choose <em>one</em> approach to protect a newborn: either maternal vaccination
          during pregnancy or nirsevimab for the infant after birth. Both are effective; the choice depends
          on timing, availability, and a discussion with the healthcare provider.
        </p>

        <h2 className={playfairDisplay.className}>CDC / ACIP Recommendations for 2026</h2>
        <ul>
          <li><strong>Adults 75+:</strong> a single dose of an RSV vaccine (Arexvy or Abrysvo) is recommended for everyone.</li>
          <li><strong>Adults 60–74:</strong> recommended for those at increased risk of severe RSV — including chronic heart or lung disease, weakened immune systems, and residence in long-term care.</li>
          <li><strong>Pregnancy:</strong> Abrysvo at 32–36 weeks during RSV season.</li>
          <li><strong>Infants:</strong> nirsevimab for those not covered by maternal vaccination.</li>
        </ul>
        <p>
          The adult RSV vaccine is currently a <em>single</em> dose — it is not yet an annual vaccine like flu
          or COVID-19. Whether and when a booster will be recommended is an area ACIP continues to study.
        </p>

        <h2 className={playfairDisplay.className}>Efficacy Data</h2>
        <p>
          Across clinical trials, the adult RSV vaccines reduced RSV-associated lower respiratory tract
          disease by roughly 70–83% in the first season, with meaningful protection continuing into a second
          season. Maternal vaccination with Abrysvo cut severe RSV disease in infants during the first months
          of life, and nirsevimab reduced medically attended infant RSV illness by approximately 75–80% in
          trials and real-world studies. Efficacy naturally wanes over time, which is why timing relative to
          the season matters.
        </p>

        <h2 className={playfairDisplay.className}>Reported Side Effects (VAERS)</h2>
        <p>
          The most frequently reported reactions to RSV vaccines are local and short-lived: injection-site
          pain, fatigue, muscle aches, headache, and low-grade fever, usually resolving within a few days.
          A small number of Guillain-Barré syndrome cases were observed in older-adult trials, prompting
          continued safety monitoring; the absolute risk appears very low and is weighed against the
          substantial burden of RSV disease in this age group. You can read more about that condition in our{' '}
          <Link href="/guillain-barre">Guillain-Barré overview</Link>.
        </p>
        <p>
          VaccineWatch tracks {formatNumber(reports)} VAERS reports mentioning RSV vaccination. As with all
          passive surveillance, these reports describe events that occurred after vaccination and do not on
          their own establish causation. For a deeper explanation, see the{' '}
          <Link href="/analysis/denominator-problem">denominator problem</Link> and{' '}
          <Link href="/is-vaers-reliable">is VAERS reliable?</Link>
        </p>

        <h2 className={playfairDisplay.className}>Real-World Effectiveness Data</h2>
        <p>
          Since RSV vaccines became widely available in the 2023–2024 season, real-world data has
          begun to confirm the clinical trial findings. Key observations from the first two seasons of
          use include:
        </p>
        <ul>
          <li><strong>RSV hospitalization rates among vaccinated adults 60+ have dropped significantly</strong>
          compared to pre-vaccine seasons, consistent with the 70–83% efficacy seen in trials</li>
          <li><strong>Nirsevimab has been effective in reducing infant RSV hospitalizations</strong> in
          the states and countries where it has been widely deployed</li>
          <li><strong>Maternal vaccination uptake</strong> has been slower than expected, partly due to
          timing logistics (the vaccine is administered seasonally during a narrow pregnancy window)
          and partly due to general hesitancy around new vaccines during pregnancy</li>
          <li><strong>No unexpected safety signals</strong> have emerged beyond what was identified in
          clinical trials, though the Guillain-Barré monitoring continues</li>
        </ul>

        <h2 className={playfairDisplay.className}>RSV Seasonality and Timing</h2>
        <p>
          RSV season in most of the continental United States typically runs from October through March,
          with peak activity in December and January. This seasonality matters because:
        </p>
        <ul>
          <li>Adult RSV vaccination should ideally occur before the season starts (September–October)</li>
          <li>Maternal vaccination is timed to 32–36 weeks of gestation during the season</li>
          <li>Nirsevimab for infants is given just before or during the RSV season</li>
        </ul>
        <p>
          Some southern states and tropical regions experience earlier or longer RSV seasons, and
          healthcare providers in those areas may adjust timing accordingly.
        </p>

        <h2 className={playfairDisplay.className}>The Bottom Line</h2>
        <p>
          For the first time, effective RSV prevention is available across the age spectrum — from newborns
          to seniors. If you are 75 or older, 60–74 with risk factors, or pregnant in the fall, talk with
          your provider about which option fits you. RSV vaccination is now part of the broader{' '}
          <Link href="/vaccine-schedule">CDC vaccine schedule</Link>, and it features prominently in this
          year&apos;s updates covered in our{' '}
          <Link href="/analysis/vaccine-schedule-2026">2026 vaccine schedule guide</Link>.
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

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>RSV vaccines (Arexvy, Abrysvo) are now available for adults 60+ and pregnant women</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Nirsevimab (Beyfortus) provides passive protection for infants through their first RSV season</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>Clinical trials showed 70–83% efficacy against RSV-associated lower respiratory tract disease</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Real-world data from the first two seasons confirms clinical trial findings</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">5.</span>
            <span>The adult RSV vaccine is currently a single dose, not annual like flu or COVID</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/vaccines/rsv" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">RSV Vaccine VAERS Data →</div>
            <div className="text-sm text-gray-500">Full adverse event profile with charts</div>
          </Link>
          <Link href="/analysis/elderly" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">The 65+ Age Group →</div>
            <div className="text-sm text-gray-500">Why senior report rates are higher</div>
          </Link>
          <Link href="/vaccine-schedule" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Vaccine Schedule by Age →</div>
            <div className="text-sm text-gray-500">See where RSV fits in the schedule</div>
          </Link>
          <Link href="/analysis/vaccine-schedule-2026" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">2026 Vaccine Schedule Guide →</div>
            <div className="text-sm text-gray-500">Everything new this year</div>
          </Link>
          <Link href="/guillain-barre" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Guillain-Barré Syndrome →</div>
            <div className="text-sm text-gray-500">Monitored with RSV vaccines</div>
          </Link>
          <Link href="/analysis/covid-long-term-safety" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID Long-Term Safety →</div>
            <div className="text-sm text-gray-500">Comparison with newer vaccines</div>
          </Link>
          <Link href="/analysis/pediatric" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Pediatric Analysis →</div>
            <div className="text-sm text-gray-500">Infant vaccination data in context</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
