import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Vaccine Hesitancy Trends 2026: Data, Demographics & What\'s Driving Distrust',
  description: 'Vaccine hesitancy in 2026: KFF/Gallup polling data, declining childhood vaccination rates, state exemption trends, demographic patterns, social media impact, and what the data shows about trust in vaccines.',
  openGraph: {
    title: 'Vaccine Hesitancy Trends 2026: Data, Demographics & What\'s Driving Distrust',
    description: 'A data-driven analysis of vaccine hesitancy trends in 2026 — who is declining vaccines, why, and what the polling and uptake data reveal.',
  },
}

const faq = [
  {
    q: 'What percentage of Americans are vaccine-hesitant in 2026?',
    a: 'It depends on the vaccine. KFF polling from early 2026 shows that approximately 20% of adults say they will "definitely not" get an updated COVID-19 booster, while childhood vaccine hesitancy is lower but growing — about 10-12% of parents now express concerns about routine childhood vaccines like MMR, up from roughly 5% pre-pandemic. Flu vaccine uptake among adults has plateaued around 48-50%, similar to pre-pandemic levels.',
  },
  {
    q: 'Are childhood vaccination rates actually declining?',
    a: 'Yes, though the decline is modest at the national level. The CDC reports that kindergarten vaccination coverage for the 2024-2025 school year dropped to approximately 92.7% for MMR — below the 95% threshold generally considered necessary for herd immunity against measles. More concerning are state-level disparities: several states now have exemption rates above 5%, and some counties have rates as low as 70-80%.',
  },
  {
    q: 'Which demographics are most vaccine-hesitant?',
    a: 'Vaccine hesitancy cuts across demographics in complex ways. For COVID-19 vaccines, hesitancy is highest among Republican-leaning adults (roughly 40% decline boosters), younger adults (18-29), and rural populations. For childhood vaccines, hesitancy correlates with both ends of the political spectrum — conservative communities concerned about government mandates and some progressive communities focused on "natural" health approaches. Education level shows a U-shaped curve: hesitancy is somewhat higher among those with the least and most education.',
  },
  {
    q: 'How does social media affect vaccine hesitancy?',
    a: 'Research consistently shows that exposure to anti-vaccine content on social media is associated with increased vaccine hesitancy. A 2025 study in Nature found that adults who reported getting health information primarily from social media were 3x more likely to decline recommended vaccines. However, causation is hard to establish — people may seek out content that confirms existing beliefs. Platform algorithm changes have had measurable effects: when major platforms reduced anti-vaccine content promotion in 2021-2022, hesitancy metrics briefly improved.',
  },
  {
    q: 'What are states doing about declining vaccination rates?',
    a: 'States are divided. Some have tightened exemption policies — California, New York, and West Virginia allow only medical exemptions, and their vaccination rates remain among the highest. Others have moved in the opposite direction: since 2020, at least 12 states have expanded exemption options or restricted schools\' ability to enforce vaccine requirements. The policy landscape reflects broader political polarization around public health mandates.',
  },
  {
    q: 'Is vaccine hesitancy a global phenomenon?',
    a: 'Yes. WHO named vaccine hesitancy one of the top ten threats to global health in 2019, and the trend has intensified post-pandemic. Europe has seen measles outbreaks linked to declining MMR coverage. Japan\'s HPV vaccine uptake collapsed after a safety scare in 2013 and only recently recovered. However, patterns vary widely — some low-income countries have high vaccine demand but access barriers, while some high-income countries have access but declining demand.',
  },
]

export default function VaccineHesitancy2026Page() {
  const declineCovidBoosters = 20
  const kindergartenMmrRate = 92.7
  const statesAbove5Exemption = 14
  const covidBoosterUptake = 23
  const fluVaccineUptake = 49

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema
        title="Vaccine Hesitancy Trends 2026: Data, Demographics & What's Driving Distrust"
        description="A data-driven analysis of vaccine hesitancy trends in 2026 — who is declining vaccines, why, and what the polling and uptake data reveal."
        slug="vaccine-hesitancy-2026"
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
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Vaccine Hesitancy 2026' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">11 min read</div>
          <ShareButtons title="Vaccine Hesitancy Trends 2026: Data, Demographics & What's Driving Distrust" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Hesitancy Trends 2026: Data, Demographics &amp; What&apos;s Driving Distrust
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Vaccine confidence in the United States has shifted significantly since the pandemic. Childhood
          vaccination rates are slipping below critical thresholds in some areas, COVID booster uptake has
          plateaued at historic lows, and political polarization around vaccines has intensified. Here is
          what the data shows — and what it means for public health.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{kindergartenMmrRate}%</div>
              <div className="text-sm text-gray-600">kindergarten MMR rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{covidBoosterUptake}%</div>
              <div className="text-sm text-gray-600">2025-26 COVID booster uptake</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{statesAbove5Exemption}</div>
              <div className="text-sm text-gray-600">states with 5%+ exemptions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{fluVaccineUptake}%</div>
              <div className="text-sm text-gray-600">adult flu vaccine uptake</div>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The State of Vaccine Confidence in 2026</h2>
        <p>
          Vaccine hesitancy is not new, but the COVID-19 pandemic dramatically reshaped the landscape.
          What was once a fringe concern is now a mainstream political and cultural issue. KFF&apos;s
          COVID-19 Vaccine Monitor — the most comprehensive ongoing survey of vaccine attitudes — shows
          that approximately {declineCovidBoosters}% of U.S. adults say they will &quot;definitely not&quot;
          get an updated COVID-19 booster, a number that has remained stubbornly stable since late 2022.
        </p>
        <p>
          More concerning than COVID-specific hesitancy is the spillover effect onto routine childhood
          vaccines. Gallup polling from January 2026 found that only 69% of Americans believe it is
          &quot;extremely or very important&quot; for parents to vaccinate their children — down from
          84% in 2019. This 15-percentage-point decline in just seven years represents one of the most
          significant shifts in public health attitudes in modern American history.
        </p>

        <h2 className={playfairDisplay.className}>Childhood Vaccination Rates: Below the Threshold</h2>
        <p>
          The CDC&apos;s annual kindergarten vaccination assessment for the 2024–2025 school year
          revealed a national MMR coverage rate of approximately {kindergartenMmrRate}% — below the 95%
          threshold generally considered necessary for herd immunity against measles. While this national
          average masks significant state-level variation, the overall trend is concerning:
        </p>
        <ul>
          <li>
            <strong>2017–2018:</strong> 94.3% national MMR coverage at kindergarten entry
          </li>
          <li>
            <strong>2019–2020:</strong> 95.0% (brief improvement due to focused outreach)
          </li>
          <li>
            <strong>2020–2021:</strong> 93.9% (pandemic disruption)
          </li>
          <li>
            <strong>2022–2023:</strong> 93.1% (partial recovery stalled)
          </li>
          <li>
            <strong>2024–2025:</strong> {kindergartenMmrRate}% (continued decline)
          </li>
        </ul>
        <p>
          The practical consequence appeared in early 2025, when the U.S. experienced its largest measles
          outbreak since 2019 — over 700 confirmed cases, concentrated in communities with low vaccination
          rates in Texas, Ohio, and Florida. These outbreaks disproportionately affected unvaccinated
          children and resulted in dozens of hospitalizations.
        </p>

        <h2 className={playfairDisplay.className}>Exemption Rates by State</h2>
        <p>
          Non-medical vaccine exemptions — religious or philosophical — vary dramatically by state.
          As of the 2024–2025 school year, {statesAbove5Exemption} states have kindergarten non-medical
          exemption rates above 5%, with some areas far higher:
        </p>
        <ul>
          <li><strong>Idaho:</strong> 12.1% exemption rate (highest in the nation)</li>
          <li><strong>Alaska:</strong> 9.8%</li>
          <li><strong>Wisconsin:</strong> 8.4%</li>
          <li><strong>Oregon:</strong> 7.9%</li>
          <li><strong>Utah:</strong> 7.2%</li>
        </ul>
        <p>
          By contrast, states that permit only medical exemptions — California, New York, West Virginia,
          Mississippi, and Maine — consistently maintain exemption rates below 1% and overall vaccination
          rates above 95%. The correlation between exemption policy and vaccination rates is one of the
          strongest findings in vaccine policy research. Explore state-level requirements on our{' '}
          <Link href="/state-requirements">state vaccine requirements page</Link>.
        </p>

        <h2 className={playfairDisplay.className}>COVID-19 Vaccine Uptake: The Plateau</h2>
        <p>
          COVID-19 booster uptake has stabilized at historically low levels. The 2025–2026 updated
          COVID-19 vaccine (targeting the JN.1 lineage) has been taken by approximately {covidBoosterUptake}%
          of eligible adults — far below the roughly 50% who received the initial two-dose primary series
          and comparable to annual flu vaccine uptake rates.
        </p>
        <p>
          This plateau reflects a combination of factors: perceived low personal risk (especially among
          younger adults), &quot;pandemic fatigue&quot; reducing motivation, distrust of repeated
          formulation changes, and political polarization. Among adults 65+, uptake is significantly
          higher at approximately 42%, reflecting both greater perceived risk and stronger physician
          recommendation in this age group.
        </p>

        <h2 className={playfairDisplay.className}>Social Media and Misinformation</h2>
        <p>
          The role of social media in amplifying vaccine hesitancy has been extensively studied since the
          pandemic. Key findings include:
        </p>
        <ul>
          <li>
            <strong>Algorithmic amplification:</strong> Platform algorithms that prioritize engagement
            tend to amplify emotionally charged anti-vaccine content. A 2025 study in <em>Nature</em>
            found that anti-vaccine posts on X (formerly Twitter) received 3.5x more engagement than
            pro-vaccine posts, partly because outrage and fear drive more interaction than reassurance.
          </li>
          <li>
            <strong>The &quot;Disinformation Dozen&quot; and beyond:</strong> While a 2021 CCDH report
            attributed 65% of anti-vaccine content to just 12 accounts, the landscape has since
            fragmented across platforms — Telegram, Rumble, Substack, and TikTok have all become
            significant vectors for anti-vaccine messaging, making content moderation more challenging.
          </li>
          <li>
            <strong>Misuse of VAERS data:</strong> Raw VAERS data has become one of the most common
            tools for generating misleading anti-vaccine claims. Without understanding the{' '}
            <Link href="/analysis/reporting-bias">reporting bias</Link> and{' '}
            <Link href="/analysis/denominator-problem">denominator problem</Link>, VAERS data can
            appear alarming — which is why VaccineWatch exists to provide context.
          </li>
          <li>
            <strong>Platform policy changes:</strong> Meta (Facebook/Instagram) quietly reversed its
            COVID-19 misinformation policies in early 2025, citing evolving science and free speech
            concerns. YouTube and TikTok maintain some content policies but enforcement has relaxed.
            X has minimal content moderation around vaccine information.
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>Demographic Patterns</h2>
        <p>
          Vaccine hesitancy does not follow simple demographic lines. The patterns are complex and often
          counterintuitive:
        </p>
        <ul>
          <li>
            <strong>Political affiliation:</strong> The strongest predictor of COVID-19 vaccine uptake in
            the U.S. is political affiliation. KFF data shows approximately 82% of Democrats have received
            at least a primary series vs. 60% of Republicans. The gap is even wider for boosters. However,
            for childhood vaccines, political affiliation is a weaker predictor — hesitancy exists on both
            the right (government overreach concerns) and left (some natural health and alternative
            medicine communities).
          </li>
          <li>
            <strong>Geography:</strong> Rural counties have consistently lower vaccination rates than urban
            and suburban areas — roughly 10–15 percentage points lower for COVID-19 and 2–5 points lower
            for childhood vaccines. This reflects both access issues (fewer pharmacies, longer distances)
            and attitudinal differences.
          </li>
          <li>
            <strong>Education:</strong> The relationship between education and vaccine hesitancy is
            U-shaped. Those without a high school diploma and those with doctoral degrees both show
            somewhat higher hesitancy than those with bachelor&apos;s degrees, though for different
            reasons — access and trust barriers in the former, perceived self-sufficiency in risk
            assessment in the latter.
          </li>
          <li>
            <strong>Race and ethnicity:</strong> Early pandemic racial disparities in COVID-19 vaccine
            uptake (lower rates among Black and Hispanic Americans) have largely closed by 2026, reflecting
            successful targeted outreach. However, trust in the medical system remains lower among Black
            Americans, rooted in historical abuses like the Tuskegee syphilis study.
          </li>
          <li>
            <strong>Age:</strong> Adults 65+ are the most vaccine-receptive age group across all vaccine
            types. Young adults (18–29) are the most likely to skip recommended vaccines, driven more by
            apathy and perceived low risk than by active anti-vaccine beliefs.
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>Healthcare Provider Trust</h2>
        <p>
          Despite declining institutional trust, personal healthcare providers remain the most trusted
          source of vaccine information. A 2026 Gallup survey found that 73% of Americans trust their
          own doctor&apos;s vaccine recommendations — far higher than trust in the CDC (52%), the FDA
          (48%), or pharmaceutical companies (27%).
        </p>
        <p>
          This finding has practical implications: studies consistently show that a strong physician
          recommendation is the single most effective intervention for vaccine uptake. Patients whose
          doctors use a &quot;presumptive&quot; approach (&quot;You&apos;re due for your flu shot
          today&quot;) are significantly more likely to accept vaccination than those given a
          &quot;participatory&quot; approach (&quot;What do you think about getting a flu shot?&quot;).
        </p>
        <p>
          However, even provider trust has eroded. The share of Americans rating nurses and physicians
          as having &quot;high or very high&quot; honesty and ethics dropped from 85% to 74% between
          2019 and 2025 in Gallup polling — a casualty of pandemic-era controversies over masking,
          lockdowns, and changing public health guidance.
        </p>

        <h2 className={playfairDisplay.className}>Policy Responses and School Mandate Debates</h2>
        <p>
          The policy landscape around vaccine requirements has become a front in the broader culture wars:
        </p>
        <ul>
          <li>
            <strong>Tightening exemptions:</strong> After measles outbreaks, some states have moved to
            eliminate non-medical exemptions or add educational requirements. Maine eliminated its
            religious and philosophical exemptions in 2021; its kindergarten vaccination rate rose from
            93.4% to 97.1% within two years.
          </li>
          <li>
            <strong>Loosening requirements:</strong> In the opposite direction, at least 12 states since
            2020 have passed laws expanding exemption options, prohibiting COVID-19 vaccine mandates for
            school attendance, or restricting public health authorities&apos; ability to enforce vaccine
            requirements. Several states have introduced legislation to extend these protections to
            routine childhood vaccines.
          </li>
          <li>
            <strong>Federal level:</strong> No federal childhood vaccine mandate exists — requirements
            are set by states. However, federal policy around military vaccine requirements, Head Start
            programs, and healthcare worker mandates continues to generate controversy.
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>International Comparisons</h2>
        <p>
          The U.S. is not alone in grappling with vaccine hesitancy, but the degree of political
          polarization around vaccines is unusually high:
        </p>
        <ul>
          <li>
            <strong>Europe:</strong> Several European countries (Romania, France, Italy) experienced
            measles outbreaks in 2024–2025 due to declining MMR coverage. France and Italy responded
            with expanded mandatory vaccination schedules — France now requires 11 childhood vaccines.
          </li>
          <li>
            <strong>Japan:</strong> HPV vaccine uptake collapsed from ~70% to under 1% after a safety
            scare in 2013, took nearly a decade to recover, and by 2026 is still below 50% — a cautionary
            tale about how quickly vaccine confidence can be destroyed and how slowly it rebuilds.
          </li>
          <li>
            <strong>Australia:</strong> The &quot;No Jab, No Pay&quot; policy (withholding family tax
            benefits for unvaccinated children) has maintained childhood vaccination rates above 95%,
            demonstrating that financial incentives can be effective where mandates face political
            opposition.
          </li>
          <li>
            <strong>Sub-Saharan Africa:</strong> In contrast, many African countries have high vaccine
            demand but face supply, cold-chain, and healthcare infrastructure barriers — a reminder that
            hesitancy and access are distinct challenges requiring different solutions.
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>The Role of VAERS Data in the Hesitancy Debate</h2>
        <p>
          VAERS data plays an outsized role in the vaccine hesitancy conversation. The database is
          publicly accessible, its raw numbers can appear alarming to those unfamiliar with passive
          surveillance limitations, and it has been widely cited in anti-vaccine social media content.
          VaccineWatch exists in part to bridge this gap — providing transparent access to VAERS data
          alongside the context needed to interpret it accurately.
        </p>
        <p>
          Key resources for understanding VAERS in context include our analyses of{' '}
          <Link href="/analysis/reporting-bias">reporting bias</Link>,{' '}
          <Link href="/analysis/who-reports">who files VAERS reports</Link>, and{' '}
          <Link href="/is-vaers-reliable">whether VAERS is reliable</Link>. The database is a valuable
          early warning system — it helped detect the myocarditis signal — but it was never designed to
          be a scoreboard of vaccine harms, and misusing it as one fuels unfounded fears.
        </p>

        <h2 className={playfairDisplay.className}>The Bottom Line</h2>
        <p>
          Vaccine hesitancy in 2026 is a multifaceted challenge driven by eroded institutional trust,
          political polarization, social media dynamics, and pandemic fatigue. The data shows measurable
          declines in both childhood and adult vaccination rates, with real public health consequences
          including measles outbreaks. Solutions are not simple — they require rebuilding trust at the
          individual provider level, transparent communication about both benefits and risks, and
          evidence-based policy that balances public health protection with individual liberty concerns.
        </p>
        <p>
          What the data does <em>not</em> support is the narrative that vaccines are broadly unsafe. Five
          years of intensive monitoring have produced a detailed safety picture that, while not perfect,
          is more comprehensive than for any medical intervention in history. The challenge is not a lack
          of safety data — it is ensuring that data reaches people in a form they can understand and trust.
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
          <Link href="/state-requirements" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">State Vaccine Requirements →</div>
            <div className="text-sm text-gray-500">Mandates and exemptions by state</div>
          </Link>
          <Link href="/analysis/reporting-bias" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">VAERS Reporting Bias →</div>
            <div className="text-sm text-gray-500">Why some vaccines have more reports</div>
          </Link>
          <Link href="/analysis/who-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Who Files VAERS Reports? →</div>
            <div className="text-sm text-gray-500">Reporters by type and motivation</div>
          </Link>
          <Link href="/is-vaers-reliable" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Is VAERS Reliable? →</div>
            <div className="text-sm text-gray-500">Understanding passive surveillance</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
