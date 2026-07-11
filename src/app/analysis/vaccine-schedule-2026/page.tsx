import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: '2026 Vaccine Schedule: Complete Guide to CDC Recommended Vaccines',
  description: 'The complete 2026 CDC vaccine schedule for every age from birth to 65+. New COVID boosters, RSV vaccines, Penbraya, PCV20, and full childhood immunization guide.',
  openGraph: {
    title: '2026 Vaccine Schedule: Complete Guide to CDC Recommended Vaccines',
    description: 'The full 2026 CDC immunization schedule for all age groups — including updated COVID boosters, RSV vaccines, Penbraya, and PCV20.',
  },
}

const faq = [
  {
    q: 'What vaccines are recommended in the 2026 CDC schedule?',
    a: 'The 2026 CDC immunization schedule covers hepatitis B, DTaP/Tdap, polio (IPV), Hib, pneumococcal (PCV), rotavirus, MMR, varicella, hepatitis A, influenza, HPV, meningococcal, COVID-19, RSV, and shingles (Shingrix). The specific vaccines and doses depend on age, health status, and prior vaccination history.',
  },
  {
    q: 'What changed in the 2026 vaccine schedule?',
    a: 'Key 2026 updates include an updated annual COVID-19 formulation for everyone 6 months and older, expanded RSV vaccine recommendations for adults 60+ and pregnant women, the availability of Penbraya (a pentavalent meningococcal vaccine) for adolescents, and a simplified PCV20 pathway that can replace the older PCV15-plus-PPSV23 sequence for many adults.',
  },
  {
    q: 'How many vaccines does a child get by age 2?',
    a: 'Following the CDC schedule, a child typically receives protection against roughly 14 diseases in the first two years of life, delivered across a series of well-child visits at birth, 2, 4, 6, 12, 15, and 18 months. Several vaccines are combined into single shots to reduce the number of injections.',
  },
  {
    q: 'Who should get an RSV vaccine in 2026?',
    a: 'CDC recommends RSV vaccination for adults 75 and older, adults 60-74 at increased risk, and pregnant women at 32-36 weeks of gestation (seasonally) to protect newborns. Infants who are not protected by maternal vaccination can receive nirsevimab (Beyfortus), a monoclonal antibody.',
  },
  {
    q: 'Where can I see reported side effects for these vaccines?',
    a: 'VaccineWatch links every vaccine in the schedule to its VAERS adverse event profile, showing reported symptoms, age distribution, and outcome data. VAERS is a passive surveillance system — reports describe events that occurred after vaccination and do not by themselves prove the vaccine caused them.',
  },
]

export default function VaccineSchedule2026Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema
        title="2026 Vaccine Schedule: Complete Guide to CDC Recommended Vaccines"
        description="The complete 2026 CDC immunization schedule for every age group, including updated COVID boosters, RSV vaccines, Penbraya, and PCV20."
        slug="vaccine-schedule-2026"
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
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: '2026 Vaccine Schedule Guide' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">9 min read</div>
          <ShareButtons title="2026 Vaccine Schedule: Complete Guide to CDC Recommended Vaccines" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          2026 Vaccine Schedule: Complete Guide to CDC Recommended Vaccines
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A comprehensive, plain-English breakdown of the 2026 CDC immunization schedule — from
          birth through 65 and older — including this year&apos;s updated COVID boosters, expanded
          RSV recommendations, Penbraya for adolescents, and the streamlined PCV20 pathway for adults.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="text-gray-700">
            This guide summarizes the schedule recommended by the CDC&apos;s Advisory Committee on
            Immunization Practices (ACIP). It is educational only — always confirm timing with your
            healthcare provider. See the interactive{' '}
            <Link href="/vaccine-schedule" className="text-primary hover:underline font-medium">vaccine schedule by age</Link>{' '}
            for links to VAERS data on each vaccine.
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>How the CDC Schedule Works</h2>
        <p>
          The recommended immunization schedule in the United States is reviewed and updated each year
          by ACIP, a panel of medical and public health experts, and then adopted by the CDC. The schedule
          is organized by age because the immune system, disease risk, and exposure change dramatically
          across a lifetime. Infants need protection against diseases that are most dangerous in the first
          months of life; adolescents receive vaccines timed to precede new exposures; and older adults
          receive vaccines targeting conditions that become more severe with age.
        </p>
        <p>
          Below is a stage-by-stage walkthrough of the 2026 schedule. For the compact reference table with
          direct links to each vaccine&apos;s adverse event data, use the{' '}
          <Link href="/vaccine-schedule">vaccine schedule reference page</Link>.
        </p>

        <h2 className={playfairDisplay.className}>Birth to 15 Months: The Infant Series</h2>
        <p>
          The first two years of life contain the densest part of the schedule because maternal antibodies
          fade and infants become vulnerable to serious infections. The series begins at the hospital and
          continues through well-child visits.
        </p>
        <ul>
          <li><strong>Birth:</strong> Hepatitis B (1st dose), ideally within 24 hours of delivery.</li>
          <li><strong>2 months:</strong> DTaP, IPV (polio), Hib, PCV (pneumococcal), rotavirus, and the 2nd hepatitis B dose.</li>
          <li><strong>4 months:</strong> DTaP, IPV, Hib, PCV, and rotavirus (2nd doses).</li>
          <li><strong>6 months:</strong> DTaP, PCV, rotavirus and hepatitis B (3rd doses), plus the first annual influenza vaccine. Updated COVID-19 vaccination also begins at 6 months.</li>
          <li><strong>12–15 months:</strong> MMR (measles, mumps, rubella), varicella (chickenpox), hepatitis A, and the final Hib and PCV doses.</li>
        </ul>
        <p>
          Because so many doses are given during infancy, this age group generates a meaningful share of
          reports in passive surveillance systems. Our{' '}
          <Link href="/analysis/pediatric">pediatric VAERS analysis</Link> explains why raw report counts for
          young children must be interpreted in the context of how many doses are administered.
        </p>

        <h2 className={playfairDisplay.className}>15 Months to 6 Years: Boosters and School Entry</h2>
        <p>
          Toddlers and preschoolers receive booster doses that lock in long-term immunity ahead of school
          entry. Around 15–18 months children get a 4th DTaP dose, and between 4 and 6 years they receive
          their final DTaP and polio doses along with the 2nd MMR and 2nd varicella doses. Annual influenza
          vaccination continues every year. Most states require proof of these vaccines for kindergarten —
          see our guide to{' '}
          <Link href="/analysis/state-vaccine-requirements-2026">state vaccine requirements for 2026</Link>.
        </p>

        <h2 className={playfairDisplay.className}>11–18 Years: The Adolescent Platform</h2>
        <p>
          The pre-teen visit around ages 11–12 is a major milestone. It typically includes:
        </p>
        <ul>
          <li><strong>Tdap:</strong> a booster for tetanus, diphtheria, and pertussis.</li>
          <li><strong>HPV:</strong> a 2-dose series (when started before age 15) that protects against cancers caused by human papillomavirus.</li>
          <li><strong>Meningococcal ACWY (MenACWY):</strong> with a booster at age 16.</li>
        </ul>
        <p>
          A notable 2026 development is <strong>Penbraya</strong>, the first pentavalent meningococcal vaccine,
          which combines protection against serogroups A, C, W, Y, and B in a single product. For adolescents
          and young adults who would otherwise receive separate MenACWY and MenB shots, Penbraya can reduce the
          number of injections. Older teens and college-bound students often also receive MenB (serogroup B)
          vaccination based on shared clinical decision-making.
        </p>

        <h2 className={playfairDisplay.className}>Adults 19–49: Catch-Up and Maintenance</h2>
        <p>
          Adults in this range need an annual influenza vaccine, a Td or Tdap booster every 10 years, and
          the updated annual COVID-19 vaccine. HPV vaccination is recommended through age 26 (and available
          through 45 based on shared decision-making). Adults who missed childhood vaccines — for MMR, varicella,
          or hepatitis B — should catch up. Pregnancy adds specific recommendations: Tdap during every
          pregnancy (weeks 27–36), influenza in any trimester, and seasonal RSV vaccination at 32–36 weeks to
          protect the newborn.
        </p>

        <h2 className={playfairDisplay.className}>Adults 50–64: Shingles and Beyond</h2>
        <p>
          At age 50, adults become eligible for <strong>Shingrix</strong>, a 2-dose recombinant vaccine that is
          highly effective at preventing shingles and its painful complication, postherpetic neuralgia. Annual
          influenza and updated COVID-19 vaccination continue. Adults with certain health conditions may also be
          recommended pneumococcal and hepatitis B vaccination earlier than 65.
        </p>

        <h2 className={playfairDisplay.className}>Adults 65 and Older: Higher-Risk Protection</h2>
        <p>
          Older adults face greater risk from respiratory infections, so the 2026 schedule emphasizes:
        </p>
        <ul>
          <li><strong>Influenza:</strong> annual vaccination, with higher-dose or adjuvanted formulations preferred for 65+.</li>
          <li><strong>Pneumococcal:</strong> a single dose of <strong>PCV20</strong> now provides broad coverage in one shot, replacing the older two-step PCV15-plus-PPSV23 pathway for most adults and simplifying the decision.</li>
          <li><strong>RSV:</strong> recommended for all adults 75+, and for 60–74-year-olds at increased risk.</li>
          <li><strong>COVID-19:</strong> updated annual vaccination, with some higher-risk seniors eligible for an additional dose.</li>
          <li><strong>Shingrix:</strong> for anyone 50+ who has not completed the 2-dose series.</li>
        </ul>
        <p>
          Because seniors receive many vaccines and have higher baseline rates of illness, they account for a
          disproportionate share of serious reports in passive surveillance. Our{' '}
          <Link href="/analysis/elderly">analysis of the 65+ age group</Link> unpacks why report counts alone
          can be misleading for older adults.
        </p>

        <h2 className={playfairDisplay.className}>New and Updated for 2026 at a Glance</h2>
        <ul>
          <li><strong>Updated COVID-19 vaccines:</strong> a refreshed annual formulation targeting circulating variants, recommended for everyone 6 months and older.</li>
          <li><strong>Expanded RSV protection:</strong> vaccines for adults 60+ and pregnant women, plus nirsevimab for infants. Read the full{' '}
            <Link href="/analysis/rsv-vaccine-2026">RSV vaccine 2026 guide</Link>.</li>
          <li><strong>Penbraya:</strong> a pentavalent (ACWY + B) meningococcal vaccine that consolidates adolescent meningococcal protection.</li>
          <li><strong>PCV20 pathway:</strong> a single-dose pneumococcal option that simplifies adult vaccination.</li>
        </ul>

        <h2 className={playfairDisplay.className}>The Childhood Schedule: Why So Many, So Early?</h2>
        <p>
          Parents sometimes question why the infant schedule is so dense. The medical rationale is
          straightforward: infants are most vulnerable to many infectious diseases during their first
          year of life, when maternal antibodies are waning and their own immune systems are still
          developing. Delaying vaccines leaves children unprotected during their highest-risk period.
        </p>
        <p>
          Key facts about the childhood schedule:
        </p>
        <ul>
          <li><strong>Multiple vaccines at one visit is safe and well-studied.</strong> Co-administration
          studies are required before vaccines can be recommended together. See our{' '}
          <Link href="/analysis/multi-vaccine">multi-vaccine analysis</Link>.</li>
          <li><strong>Combination vaccines reduce injections.</strong> Products like Pediarix (DTaP + IPV +
          HepB) and ProQuad (MMR + varicella) combine multiple antigens into single shots.</li>
          <li><strong>The immune system can handle it.</strong> Infants encounter far more antigens from
          everyday environmental exposure than from all childhood vaccines combined.</li>
          <li><strong>Catch-up schedules exist.</strong> Children who fall behind can follow CDC catch-up
          guidance with adjusted intervals to get back on track.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Understanding Side Effects for Every Vaccine</h2>
        <p>
          Every vaccine in the schedule has an expected side effect profile — most commonly soreness at the
          injection site, mild fever, and fatigue that resolve within a few days. VaccineWatch maintains
          plain-language side effect guides drawn from VAERS data, including{' '}
          <Link href="/side-effects/covid">COVID-19</Link>, <Link href="/side-effects/flu">influenza</Link>,{' '}
          <Link href="/side-effects/mmr">MMR</Link>, <Link href="/side-effects/hpv">HPV</Link>,{' '}
          <Link href="/side-effects/tdap">Tdap</Link>, and <Link href="/side-effects/shingles">shingles</Link>.
          Browse the complete collection on the{' '}
          <Link href="/side-effects">vaccine side effects hub</Link>.
        </p>
        <p>
          Remember that VAERS is a passive, self-reporting system. A report means an event happened after
          vaccination, not that the vaccine caused it. For more on how to interpret this data responsibly, see
          our <Link href="/analysis/denominator-problem">denominator problem analysis</Link>.
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
            <span>The 2026 schedule covers vaccines from birth through 65+ across all life stages</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Key 2026 updates include expanded RSV vaccines, Penbraya for adolescents, and simplified PCV20</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>The infant schedule is dense because babies are most vulnerable to serious infections</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Co-administration is standard practice, safe, and well-studied</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">5.</span>
            <span>Every vaccine in the schedule links to VAERS adverse event data on VaccineWatch</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/vaccine-schedule" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Vaccine Schedule by Age →</div>
            <div className="text-sm text-gray-500">Reference table with VAERS data links</div>
          </Link>
          <Link href="/analysis/rsv-vaccine-2026" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">RSV Vaccine 2026 Guide →</div>
            <div className="text-sm text-gray-500">Who should get it and what to know</div>
          </Link>
          <Link href="/analysis/pediatric" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Pediatric VAERS Analysis →</div>
            <div className="text-sm text-gray-500">Childhood vaccine data in context</div>
          </Link>
          <Link href="/analysis/elderly" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">The 65+ Age Group →</div>
            <div className="text-sm text-gray-500">Why senior report rates are higher</div>
          </Link>
          <Link href="/analysis/state-vaccine-requirements-2026" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">State Requirements 2026 →</div>
            <div className="text-sm text-gray-500">School entry laws by state</div>
          </Link>
          <Link href="/analysis/multi-vaccine" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Multi-Vaccine Analysis →</div>
            <div className="text-sm text-gray-500">Co-administration safety data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
