import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'State Vaccine Requirements 2026: School Entry Laws & Exemptions',
  description: 'A 2026 guide to state vaccine requirements for school entry — required vaccines, medical, religious, and philosophical exemptions, and which states changed their laws.',
  openGraph: {
    title: 'State Vaccine Requirements 2026: School Entry Laws & Exemptions',
    description: 'How state vaccine requirements for school entry work in 2026 — required vaccines, exemption types, and recent state law changes.',
  },
}

const faq = [
  {
    q: 'Are vaccines required for school in every state?',
    a: 'Yes. All 50 states and the District of Columbia require certain vaccines for children entering public school and licensed daycare, though the exact list and the available exemptions vary by state. Requirements are set by state law and health departments, not by the federal government.',
  },
  {
    q: 'What vaccines are typically required for school entry?',
    a: 'Most states require proof of vaccination against diphtheria, tetanus, and pertussis (DTaP/Tdap), polio (IPV), measles, mumps, and rubella (MMR), varicella (chickenpox), and hepatitis B. Many also require hepatitis A, meningococcal, and Hib or pneumococcal for younger children. HPV is required in only a small number of states.',
  },
  {
    q: 'What types of vaccine exemptions exist?',
    a: 'There are three main categories: medical exemptions (for children who cannot safely be vaccinated for a documented medical reason), religious exemptions (based on sincerely held religious beliefs), and philosophical or personal-belief exemptions. All states allow medical exemptions; most allow religious exemptions; and a minority allow philosophical exemptions.',
  },
  {
    q: 'Which states do not allow non-medical exemptions?',
    a: 'A small group of states — including California, Mississippi, West Virginia, New York, Maine, and Connecticut — allow only medical exemptions and do not permit religious or philosophical exemptions for school entry. Several of these tightened their laws following measles outbreaks.',
  },
  {
    q: 'How do I find my state’s specific requirements?',
    a: 'Requirements are published by each state’s department of health and are updated periodically. VaccineWatch provides a state-by-state view of VAERS reporting data, and you should confirm current legal requirements with your state health department or school district before enrollment.',
  },
]

export default function StateVaccineRequirements2026Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema
        title="State Vaccine Requirements 2026: School Entry Laws & Exemptions"
        description="A 2026 guide to state vaccine requirements for school entry — required vaccines, exemption types, and recent state law changes."
        slug="state-vaccine-requirements-2026"
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
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'State Vaccine Requirements 2026' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">8 min read</div>
          <ShareButtons title="State Vaccine Requirements 2026: School Entry Laws & Exemptions" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          State Vaccine Requirements 2026: School Entry Laws &amp; Exemptions
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          In the United States, vaccine requirements for school are set state by state — not by the federal
          government. This guide explains how the system works in 2026: which vaccines are commonly required,
          the three types of exemptions, and how state laws have shifted in recent years.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="text-gray-700">
            This is an educational overview, not legal advice. Requirements change frequently — always confirm
            with your state health department or school district. Browse VAERS reporting data by location on
            the <Link href="/states" className="text-primary hover:underline font-medium">states data page</Link>.
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why This Matters</h2>
        <p>
          Understanding state vaccine requirements is important for parents enrolling children in
          school, families moving between states, healthcare providers counseling patients, and
          anyone trying to understand why vaccination coverage — and VAERS reporting patterns —
          vary geographically. Requirements shape behavior, and behavior shapes the data.
        </p>

        <h2 className={playfairDisplay.className}>How State Requirements Work</h2>
        <p>
          Every state and the District of Columbia require certain vaccinations for children to attend public
          school and licensed childcare. These laws exist to maintain high community immunity and prevent
          outbreaks of diseases like measles and pertussis in settings where children gather. While the CDC
          publishes a recommended <Link href="/vaccine-schedule">national immunization schedule</Link>, it is
          each state legislature and health department that decides which of those vaccines are legally
          mandatory for enrollment — and what exemptions are available.
        </p>
        <p>
          The result is real variation. A vaccine required in one state may be only recommended in a
          neighboring one, and the ease of obtaining an exemption differs dramatically across state lines.
        </p>

        <h2 className={playfairDisplay.className}>Commonly Required Vaccines</h2>
        <p>
          Although the exact list varies, most states require documented protection against the following
          before kindergarten entry:
        </p>
        <ul>
          <li><strong>DTaP / Tdap</strong> — diphtheria, tetanus, and pertussis (see <Link href="/side-effects/dtap">DTaP</Link> and <Link href="/side-effects/tdap">Tdap</Link> side effects).</li>
          <li><strong>IPV</strong> — inactivated polio vaccine (<Link href="/side-effects/polio">polio side effects</Link>).</li>
          <li><strong>MMR</strong> — measles, mumps, and rubella (<Link href="/side-effects/mmr">MMR side effects</Link>).</li>
          <li><strong>Varicella</strong> — chickenpox (<Link href="/side-effects/varicella">varicella side effects</Link>).</li>
          <li><strong>Hepatitis B</strong> — and, in many states, hepatitis A (<Link href="/side-effects/hepatitis-b">hepatitis B side effects</Link>).</li>
        </ul>
        <p>
          Younger children in daycare are often also required to have Hib and pneumococcal (PCV) vaccines.
          Adolescents entering middle school frequently must show a Tdap booster and, in many states,
          meningococcal (MenACWY) vaccination. HPV vaccination is mandated for school entry in only a handful
          of jurisdictions.
        </p>

        <h2 className={playfairDisplay.className}>The Three Types of Exemptions</h2>
        <p>
          States allow families to opt out of some or all requirements through exemptions, which fall into
          three categories:
        </p>
        <ul>
          <li>
            <strong>Medical exemptions</strong> are permitted in all 50 states. They apply when a child has a
            documented medical reason — such as a severe allergy to a vaccine component or a compromised immune
            system — that makes vaccination unsafe. These typically require a licensed physician&apos;s
            certification.
          </li>
          <li>
            <strong>Religious exemptions</strong> are allowed in the large majority of states for families
            whose sincerely held religious beliefs conflict with vaccination. The documentation required
            ranges from a simple signed statement to a notarized affidavit.
          </li>
          <li>
            <strong>Philosophical (personal-belief) exemptions</strong> are the broadest and least common. A
            minority of states permit parents to decline vaccines based on personal or moral convictions that
            are not strictly religious.
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>States That Tightened Requirements</h2>
        <p>
          Over the past decade, several states removed non-medical exemptions, usually in response to
          outbreaks. California eliminated both religious and philosophical exemptions after a 2014–2015
          measles outbreak linked to Disneyland. New York removed its religious exemption in 2019 during a
          large measles outbreak. Maine and Connecticut also ended non-medical exemptions in recent years.
          These states — along with Mississippi and West Virginia, which have long allowed only medical
          exemptions — now have the strictest school-entry laws in the country and correspondingly high
          vaccination coverage.
        </p>

        <h2 className={playfairDisplay.className}>States That Loosened or Broadened Access to Exemptions</h2>
        <p>
          Movement has not been in one direction. Some states have made exemptions easier to obtain or have
          expanded personal-belief options, and legislative proposals to broaden exemption access appear
          regularly. Because the legal landscape shifts each session, families should always verify the
          current rules rather than rely on prior years. The variation in exemption policy is one factor
          behind differences in reported vaccine coverage — and, indirectly, in the volume of adverse event
          reports — from state to state.
        </p>

        <h2 className={playfairDisplay.className}>Requirements, Coverage, and VAERS Data</h2>
        <p>
          States with stricter requirements tend to have higher childhood vaccination coverage, while states
          with easy philosophical exemptions often see lower coverage and larger pockets of susceptibility.
          VaccineWatch lets you explore VAERS adverse event reports by state to see how reporting patterns
          differ geographically. Keep in mind that report counts reflect population size, vaccination volume,
          and local reporting practices — not necessarily differences in vaccine safety. Our{' '}
          <Link href="/analysis/geographic-patterns">geographic patterns analysis</Link> explores these
          nuances, and the <Link href="/analysis/reporting-bias">reporting bias</Link> article explains why
          raw counts require careful interpretation.
        </p>

        <h2 className={playfairDisplay.className}>College and University Requirements</h2>
        <p>
          In addition to K–12 requirements, many colleges and universities mandate additional
          vaccines for incoming students, including:
        </p>
        <ul>
          <li><strong>Meningococcal (MenACWY):</strong> required or strongly recommended at most
          four-year residential colleges, with a booster at age 16 if the first dose was given before 16.</li>
          <li><strong>MMR:</strong> two documented doses, often stricter than K–12 requirements.</li>
          <li><strong>COVID-19:</strong> some institutions continue to require updated COVID vaccination,
          though mandates have been rolled back at many schools since 2023.</li>
          <li><strong>Meningococcal B:</strong> increasingly recommended but rarely required.</li>
        </ul>
        <p>
          College requirements are typically set by the institution (not the state), meaning students
          attending private universities in states with broad exemptions may still face strict vaccine
          requirements.
        </p>

        <h2 className={playfairDisplay.className}>Exemption Trends and Public Health Implications</h2>
        <p>
          Rising exemption rates in some states have contributed to localized outbreaks of
          vaccine-preventable diseases. Measles outbreaks in 2019 and pertussis clusters in subsequent
          years have been concentrated in areas with high non-medical exemption rates. Public health
          experts track exemption rates as a leading indicator of community vulnerability, and several
          states have responded by tightening exemption procedures — for example, requiring physician
          counseling before granting a philosophical exemption.
        </p>
        <p>
          The tension between parental autonomy and community disease prevention remains one of the
          most debated areas of vaccine policy. VaccineWatch presents the data without taking a
          position on these policy questions.
        </p>

        <h2 className={playfairDisplay.className}>How to Confirm Your State&apos;s Rules</h2>
        <p>
          Requirements are published by each state&apos;s department of health and by individual school
          districts, and they are updated periodically. Before enrolling a child, check your state health
          department&apos;s website for the current required vaccines, accepted forms of documentation, and the
          exemption process. For questions about which vaccines your child needs and when, consult the{' '}
          <Link href="/vaccine-schedule">CDC vaccine schedule</Link> and your pediatrician. General questions
          about how this site&apos;s data works are answered in our <Link href="/faq">FAQ</Link>.
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
            <span>All 50 states require certain vaccines for school entry, but the exact list and exemptions vary</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Three exemption types exist: medical (all states), religious (most states), and philosophical (minority of states)</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>States with stricter requirements tend to have higher vaccination coverage and fewer outbreaks</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>College and university requirements add another layer beyond K–12 mandates</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">5.</span>
            <span>Always confirm current requirements with your state health department before enrollment</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/states" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">VAERS Data by State →</div>
            <div className="text-sm text-gray-500">Reports for all 50 states</div>
          </Link>
          <Link href="/vaccine-schedule" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Vaccine Schedule by Age →</div>
            <div className="text-sm text-gray-500">The recommended CDC schedule</div>
          </Link>
          <Link href="/analysis/vaccine-schedule-2026" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">2026 Vaccine Schedule Guide →</div>
            <div className="text-sm text-gray-500">Everything new this year</div>
          </Link>
          <Link href="/analysis/geographic-patterns" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Geographic Patterns →</div>
            <div className="text-sm text-gray-500">How reports vary by location</div>
          </Link>
          <Link href="/analysis/vaccine-hesitancy-2026" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Vaccine Hesitancy 2026 →</div>
            <div className="text-sm text-gray-500">Public confidence trends</div>
          </Link>
          <Link href="/analysis/reporting-bias" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Reporting Bias →</div>
            <div className="text-sm text-gray-500">Why report counts vary by region</div>
          </Link>
          <Link href="/side-effects" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Side Effects Guides →</div>
            <div className="text-sm text-gray-500">Required vaccine side effect data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
