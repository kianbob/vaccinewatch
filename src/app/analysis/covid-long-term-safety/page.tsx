import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'COVID Vaccine Long-Term Safety: 5+ Years of Monitoring Data (2021-2026)',
  description: 'Five years of COVID-19 vaccine safety data: V-safe results from 10M+ participants, VAERS cumulative reports, confirmed myocarditis signal, thrombosis with J&J, all-cause mortality studies, and what long-term monitoring shows.',
  openGraph: {
    title: 'COVID Vaccine Long-Term Safety: 5+ Years of Monitoring Data (2021-2026)',
    description: 'A data-driven review of COVID-19 vaccine safety over 5+ years — V-safe, VSD, VAERS analysis, confirmed signals, and what long-term follow-up reveals.',
  },
}

const faq = [
  {
    q: 'What does 5 years of COVID vaccine safety data show?',
    a: 'Five years of surveillance data from multiple independent systems (VAERS, V-safe, VSD, international databases) have identified several confirmed safety signals — most notably myocarditis after mRNA vaccines in young males and thrombosis with thrombocytopenia after J&J/Janssen. Large population studies have not found an increase in all-cause mortality attributable to vaccination; rather, vaccinated populations have shown lower all-cause mortality than unvaccinated populations in most analyses.',
  },
  {
    q: 'How common is myocarditis after mRNA COVID vaccines?',
    a: 'The highest rate occurs in males aged 16-24 after the second dose of an mRNA vaccine, estimated at roughly 50-70 cases per million second doses in this demographic. Most cases are mild, with patients recovering within days to weeks. The rate drops substantially with subsequent boosters and is far lower in older age groups and in females. For context, the rate of myocarditis from COVID-19 infection itself is estimated to be several times higher.',
  },
  {
    q: 'Why was the J&J/Janssen COVID vaccine withdrawn?',
    a: 'The J&J/Janssen vaccine was associated with a rare but serious condition called thrombosis with thrombocytopenia syndrome (TTS) — unusual blood clots combined with low platelet counts, occurring primarily in women under 50. With mRNA alternatives widely available and TTS risk not present with Pfizer or Moderna, the J&J vaccine was withdrawn from the U.S. market in June 2023. Approximately 19 million doses had been administered in the U.S.',
  },
  {
    q: 'What is V-safe and what did it find?',
    a: 'V-safe was a CDC smartphone-based active surveillance program where vaccinated individuals voluntarily reported symptoms and health impacts after COVID-19 vaccination. Over 10 million participants enrolled. V-safe data showed that common short-term reactions (fatigue, headache, muscle pain, fever) peaked 1-2 days post-vaccination and resolved quickly. It also detected higher rates of health impacts requiring medical attention than clinical trials had suggested, contributing to ongoing safety analyses.',
  },
  {
    q: 'Do COVID vaccines affect long-term mortality?',
    a: 'Multiple large cohort studies across the U.S., UK, Israel, and Scandinavia have examined all-cause mortality in vaccinated vs. unvaccinated populations over several years. The consistent finding is that vaccinated individuals have equal or lower all-cause mortality, even after adjusting for the "healthy vaccinee" effect. No credible evidence of excess long-term mortality attributable to COVID-19 vaccines has emerged in five years of follow-up.',
  },
  {
    q: 'Are there concerns about long-term effects of mRNA technology?',
    a: 'mRNA from the vaccines is broken down by the body within days and does not integrate into human DNA. Five years of follow-up data from millions of recipients has not revealed any delayed-onset safety signals beyond those identified in the first few months. The lipid nanoparticle delivery system is fully metabolized. While continued monitoring is appropriate for any medical product, the biological mechanism of mRNA vaccines does not support concerns about effects emerging years after vaccination.',
  },
]

export default function CovidLongTermSafetyPage() {
  const totalVaersReports = 724000
  const vsafeParticipants = 10200000
  const totalDosesAdmin = 677000000
  const myocarditisConfirmed = 2900
  const ttsCases = 60

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema
        title="COVID Vaccine Long-Term Safety: 5+ Years of Monitoring Data (2021-2026)"
        description="A data-driven review of COVID-19 vaccine safety over 5+ years — V-safe, VSD, VAERS analysis, confirmed signals, and what long-term follow-up reveals."
        slug="covid-long-term-safety"
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
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'COVID Vaccine Long-Term Safety' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">12 min read</div>
          <ShareButtons title="COVID Vaccine Long-Term Safety: 5+ Years of Monitoring Data (2021-2026)" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          COVID Vaccine Long-Term Safety: 5+ Years of Monitoring Data
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          More than {formatNumber(totalDosesAdmin)} COVID-19 vaccine doses have been administered in the
          United States since December 2020. With over five years of real-world safety data now available,
          here is what the monitoring systems have found — confirmed signals, studied concerns, and what
          long-term follow-up reveals.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{formatNumber(totalDosesAdmin)}</div>
              <div className="text-sm text-gray-600">U.S. doses administered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{formatNumber(totalVaersReports)}</div>
              <div className="text-sm text-gray-600">VAERS reports</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{formatNumber(vsafeParticipants)}</div>
              <div className="text-sm text-gray-600">V-safe participants</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{formatNumber(myocarditisConfirmed)}</div>
              <div className="text-sm text-gray-600">confirmed myocarditis cases</div>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Scale of COVID-19 Vaccination</h2>
        <p>
          The COVID-19 vaccination campaign is the largest and most closely monitored in U.S. history.
          From the first Emergency Use Authorization in December 2020 through mid-2026,
          approximately {formatNumber(totalDosesAdmin)} doses of COVID-19 vaccine have been administered —
          spanning the original two-dose primary series, boosters, and updated formulations targeting
          newer variants. At peak rollout in spring 2021, more than 3 million doses were being given daily.
        </p>
        <p>
          This massive scale means that the safety surveillance systems have more data than for any other
          vaccine in history. What follows is a review of what those systems have found over five-plus years
          of monitoring.
        </p>

        <h2 className={playfairDisplay.className}>V-safe: Active Surveillance at Scale</h2>
        <p>
          V-safe was a CDC smartphone-based active surveillance tool where vaccinated people could
          voluntarily report health status after each dose. Over {formatNumber(vsafeParticipants)} people
          enrolled — roughly one in every 20 vaccinated Americans — making it the largest active vaccine
          safety surveillance effort ever conducted.
        </p>
        <p>
          Key findings from V-safe data:
        </p>
        <ul>
          <li>
            <strong>Common reactions:</strong> Injection-site pain was reported by roughly 70% of
            participants after dose 1 and 75% after dose 2. Fatigue, headache, and muscle pain were
            reported by 30–55% after dose 2, peaking on day 1 and largely resolving within 3 days.
          </li>
          <li>
            <strong>Dose 2 more reactive:</strong> Systemic reactions (fever, chills, fatigue) were
            significantly more common after the second dose than the first, consistent with a boosted
            immune response.
          </li>
          <li>
            <strong>Health impacts:</strong> Approximately 7.7% of participants reported being unable to
            perform normal daily activities after at least one dose, and about 1% reported seeking medical
            care for a post-vaccination symptom.
          </li>
          <li>
            <strong>Rapid resolution:</strong> The vast majority of reported symptoms resolved within 1–3
            days. Long-duration symptoms were uncommon in V-safe data.
          </li>
        </ul>
        <p>
          V-safe was decommissioned in 2023, but the data has been made publicly available and continues to
          inform safety analyses.
        </p>

        <h2 className={playfairDisplay.className}>Vaccine Safety Datalink (VSD): Near-Real-Time Active Monitoring</h2>
        <p>
          The VSD is a collaboration between the CDC and nine integrated health care organizations covering
          approximately 12 million members. Unlike VAERS, the VSD links vaccination records to electronic
          health records, enabling researchers to compare rates of specific outcomes in vaccinated vs.
          unvaccinated populations — the gold standard for detecting true safety signals.
        </p>
        <p>
          Over five years, VSD studies have:
        </p>
        <ul>
          <li>Confirmed the myocarditis signal after mRNA vaccines in young males, quantifying rates by age, sex, and dose number</li>
          <li>Identified a small increased risk of febrile seizures in young children when COVID and flu vaccines were co-administered</li>
          <li>Found no increased risk of Guillain-Barré syndrome after mRNA vaccines (the signal was specific to J&amp;J/Janssen)</li>
          <li>Shown no increased risk of stroke, pulmonary embolism, or deep vein thrombosis attributable to mRNA COVID vaccines in the general population</li>
          <li>Detected a possible signal for ischemic stroke in adults 65+ after the bivalent booster co-administered with high-dose flu vaccine, which subsequent investigation found to be a statistical fluctuation that did not persist</li>
        </ul>

        <h2 className={playfairDisplay.className}>VAERS: Cumulative Passive Surveillance Data</h2>
        <p>
          As of mid-2026, VAERS has received approximately {formatNumber(totalVaersReports)} reports
          following COVID-19 vaccination. This is by far the largest body of reports for any single
          vaccine in VAERS history — reflecting both the massive number of doses administered and
          heightened public awareness of the reporting system during the pandemic.
        </p>
        <p>
          Important context for interpreting this number: VAERS is a <em>passive</em> reporting system
          where anyone can file a report. A report does not mean the vaccine caused the event. During
          COVID-19, reporting rates were dramatically higher than for other vaccines due to public
          awareness, media attention, legal requirements for healthcare providers to report certain events,
          and deliberate efforts by some groups to encourage reporting. See our{' '}
          <Link href="/analysis/denominator-problem">denominator problem</Link> analysis for why raw
          VAERS counts require careful interpretation.
        </p>
        <p>
          Of the {formatNumber(totalVaersReports)} reports, approximately 8% were classified as serious
          (involving hospitalization, life-threatening events, permanent disability, or death). You can
          explore the full breakdown in our{' '}
          <Link href="/analysis/serious-outcomes">serious outcomes analysis</Link>.
        </p>

        <h2 className={playfairDisplay.className}>Confirmed Signal: Myocarditis After mRNA Vaccines</h2>
        <p>
          Myocarditis (inflammation of the heart muscle) is the most significant confirmed safety signal
          for mRNA COVID-19 vaccines. First identified through VAERS in mid-2021 and subsequently confirmed
          by VSD, international databases, and clinical studies, the signal has been extensively characterized:
        </p>
        <ul>
          <li>
            <strong>Who is most affected:</strong> Males aged 16–24, particularly after the second dose
            of an mRNA vaccine. The estimated rate in this demographic is approximately 50–70 cases per
            million second doses.
          </li>
          <li>
            <strong>Clinical course:</strong> The majority of vaccine-associated myocarditis cases have
            been mild, with patients presenting with chest pain, elevated troponin levels, and sometimes
            abnormal cardiac MRI findings. Most patients recovered within days to weeks with supportive
            care. Hospitalization was common for monitoring but ICU admission was rare.
          </li>
          <li>
            <strong>Long-term outcomes:</strong> Follow-up studies through 2025 have shown that the vast
            majority of patients had complete or near-complete resolution of cardiac inflammation. A small
            percentage (estimated at 5–10%) had persistent mild MRI abnormalities at 6–12 months, though
            clinical significance remains uncertain.
          </li>
          <li>
            <strong>Risk vs. benefit:</strong> CDC and ACIP have consistently concluded that the benefits
            of mRNA vaccination outweigh the myocarditis risk in all recommended age groups, noting that
            COVID-19 infection itself carries a higher risk of myocarditis than vaccination.
          </li>
        </ul>
        <p>
          For a deeper dive into myocarditis data, see our{' '}
          <Link href="/myocarditis">myocarditis overview page</Link> with VAERS-specific analysis.
        </p>

        <h2 className={playfairDisplay.className}>Thrombosis with Thrombocytopenia Syndrome (TTS) — J&amp;J/Janssen</h2>
        <p>
          Thrombosis with thrombocytopenia syndrome (TTS) was a rare but serious condition associated
          specifically with the Johnson &amp; Johnson / Janssen adenoviral vector COVID-19 vaccine.
          Approximately {formatNumber(ttsCases)} confirmed cases were identified in the U.S. out of about
          19 million doses administered, with a case fatality rate of roughly 15%.
        </p>
        <p>
          TTS involved unusual blood clots (often cerebral venous sinus thrombosis) combined with low
          platelet counts, primarily affecting women under 50 within two weeks of vaccination. The
          mechanism — antibody-mediated platelet activation similar to heparin-induced thrombocytopenia —
          was identified relatively quickly, enabling targeted clinical management.
        </p>
        <p>
          With mRNA alternatives widely available and the TTS risk unique to the adenoviral platform, the
          J&amp;J vaccine was withdrawn from the U.S. market in June 2023. This represents the safety
          monitoring system working as intended: a rare signal was detected, characterized, and acted upon.
        </p>

        <h2 className={playfairDisplay.className}>All-Cause Mortality Studies</h2>
        <p>
          One of the most important long-term safety questions is whether COVID-19 vaccination affects
          overall mortality. Multiple large studies have examined this:
        </p>
        <ul>
          <li>
            <strong>U.S. VA study (2024):</strong> A study of over 8 million veterans found that
            vaccinated individuals had 40% lower all-cause mortality over two years compared to
            unvaccinated individuals, even after adjusting for age, comorbidities, and healthcare
            utilization. Some of this difference reflects the &quot;healthy vaccinee&quot; effect (healthier
            people are more likely to get vaccinated), but the finding is inconsistent with any meaningful
            increase in mortality from vaccination.
          </li>
          <li>
            <strong>Scandinavian cohort studies:</strong> Large population-based studies in Denmark, Sweden,
            and Norway covering millions of participants found no excess all-cause mortality in vaccinated
            populations over 2–3 years of follow-up.
          </li>
          <li>
            <strong>UK ONS data:</strong> Office for National Statistics analyses of mortality by
            vaccination status through 2024 showed lower age-standardized mortality rates in vaccinated
            groups, though methodological debates about proper adjustment continue.
          </li>
        </ul>

        <h2 className={playfairDisplay.className}>International Pharmacovigilance</h2>
        <p>
          The U.S. is not the only country monitoring COVID-19 vaccine safety. International databases
          provide critical corroborating data:
        </p>
        <ul>
          <li><strong>EudraVigilance (EU):</strong> Over 2 million reports across the European Economic Area, with findings largely consistent with U.S. data</li>
          <li><strong>Yellow Card (UK):</strong> The MHRA&apos;s system collected hundreds of thousands of reports, confirming the same major signals (myocarditis, TTS)</li>
          <li><strong>Israel:</strong> With its early and rapid vaccination campaign, Israel provided some of the earliest real-world safety and efficacy data, including the first robust myocarditis signal detection</li>
          <li><strong>Global Vaccine Safety Initiative (WHO):</strong> Coordinated international signal detection has not identified any major safety concerns beyond those already recognized</li>
        </ul>

        <h2 className={playfairDisplay.className}>Efficacy Waning and Booster Safety</h2>
        <p>
          COVID-19 vaccine efficacy against infection wanes substantially within 4–6 months, though
          protection against severe disease and hospitalization has proven more durable, lasting 6–12
          months or longer. This waning has driven the shift to annual updated boosters, similar to
          seasonal flu vaccination.
        </p>
        <p>
          Safety data for booster doses (third, fourth, and updated formulations) has generally been
          consistent with the primary series, with somewhat lower rates of systemic reactions reported
          after subsequent doses. The myocarditis risk appears lower with boosters than with the second
          primary dose, based on VSD and international data.
        </p>

        <h2 className={playfairDisplay.className}>mRNA Platform Safety Track Record</h2>
        <p>
          COVID-19 vaccines introduced mRNA technology to mass human use for the first time. Five years
          later, the platform has a substantial safety track record:
        </p>
        <ul>
          <li>mRNA is broken down by normal cellular processes within 1–3 days of injection</li>
          <li>The spike protein produced by the mRNA is cleared within 1–2 weeks in most individuals</li>
          <li>mRNA does not enter the cell nucleus and cannot integrate into human DNA</li>
          <li>The lipid nanoparticle delivery system is fully metabolized</li>
          <li>No delayed-onset adverse effects have emerged beyond those identified in the first 2–3 months post-vaccination</li>
          <li>The technology is now being applied to RSV vaccines, flu vaccines, and cancer immunotherapies with similar safety profiles in trials</li>
        </ul>

        <h2 className={playfairDisplay.className}>The Bottom Line</h2>
        <p>
          Five years of monitoring — across multiple independent surveillance systems, in dozens of
          countries, covering hundreds of millions of vaccinated people — have produced a clearer picture
          of COVID-19 vaccine safety than for any vaccine in history. The confirmed safety signals
          (myocarditis, TTS) were detected, characterized, and responded to. Large population studies
          have not shown excess mortality attributable to vaccination. The data does not support concerns
          about hidden or delayed long-term effects, though ongoing monitoring remains appropriate.
        </p>
        <p>
          For those exploring VAERS data on their own, we strongly recommend understanding the{' '}
          <Link href="/analysis/reporting-bias">reporting bias</Link>,{' '}
          <Link href="/analysis/denominator-problem">denominator problem</Link>, and{' '}
          <Link href="/analysis/who-reports">who files VAERS reports</Link> — context that is essential
          for accurate interpretation.
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
          <Link href="/myocarditis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Myocarditis &amp; Vaccines →</div>
            <div className="text-sm text-gray-500">VAERS myocarditis reports analyzed</div>
          </Link>
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Death Reports in VAERS →</div>
            <div className="text-sm text-gray-500">Context for the most misunderstood data</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious Outcome Analysis →</div>
            <div className="text-sm text-gray-500">Hospitalization, disability, and ER data</div>
          </Link>
          <Link href="/analysis/denominator-problem" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">The Denominator Problem →</div>
            <div className="text-sm text-gray-500">Why raw VAERS counts need context</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
