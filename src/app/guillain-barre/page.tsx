import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Guillain-Barré Syndrome & Vaccines — VAERS Data & Research',
  description: 'Understanding the link between Guillain-Barré Syndrome (GBS) and vaccines. VAERS data, established risk from flu and J&J vaccines, and clinical outcomes.',
}

export default function GuillainBarrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {"@context":"https://schema.org","@type":"Article","headline":"Guillain-Barré Syndrome & Vaccines — VAERS Data & Research","description":"Understanding the link between Guillain-Barré Syndrome (GBS) and vaccines. VAERS data, established risk from flu and J&J vaccines, and clinical outcomes.","url":"https://www.vaccinewatch.org/guillain-barre","datePublished":"2026-02-25","dateModified":"2026-02-25","publisher":{"@type":"Organization","name":"VaccineWatch","url":"https://www.vaccinewatch.org"}},
        {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
          {"@type":"Question","name":"Can vaccines cause Guillain-Barré Syndrome?","acceptedAnswer":{"@type":"Answer","text":"There is an established but very small increased risk of GBS after certain vaccines. The flu vaccine carries about 1-2 additional cases per million doses. The J&J COVID vaccine showed a higher signal, contributing to its reduced use. The risk from infection itself is generally much higher."}},
          {"@type":"Question","name":"What is Guillain-Barré Syndrome?","acceptedAnswer":{"@type":"Answer","text":"GBS is a rare neurological disorder where the immune system attacks the peripheral nerves, causing weakness and sometimes paralysis. Most people recover fully, though recovery can take weeks to months. It can be triggered by infections, surgery, or rarely, vaccination."}},
          {"@type":"Question","name":"How common is GBS after vaccination?","acceptedAnswer":{"@type":"Answer","text":"GBS after vaccination is extremely rare — approximately 1-2 additional cases per million flu vaccine doses. The background rate of GBS is about 1-2 per 100,000 people per year regardless of vaccination status."}}
        ]}
      ]) }} />
      <Breadcrumbs items={[
        { label: 'Side Effects', href: '/side-effects' },
        { label: 'Guillain-Barré Syndrome' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">8 min read</div>
          <ShareButtons title="Guillain-Barré Syndrome & Vaccines" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Guillain-Barré Syndrome &amp; Vaccines
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Guillain-Barré Syndrome (GBS) is a rare neurological condition where the immune system 
          attacks the peripheral nerves. It has a small but established association with certain 
          vaccines — here&apos;s what the data shows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-sm text-gray-500 mb-1">Background Rate</div>
          <div className="text-lg font-bold text-gray-900">1-2 per 100,000</div>
          <div className="text-xs text-gray-400">Annual incidence, all causes</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-5">
          <div className="text-sm text-amber-500 mb-1">Vaccine-Associated Risk</div>
          <div className="text-lg font-bold text-amber-600">1-2 extra per million</div>
          <div className="text-xs text-gray-400">Above background, for associated vaccines</div>
        </div>
        <div className="bg-white border border-green-200 rounded-xl p-5">
          <div className="text-sm text-green-600 mb-1">Recovery</div>
          <div className="text-lg font-bold text-green-700">~85% recover</div>
          <div className="text-xs text-gray-400">Full or near-full recovery</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What Is GBS?</h2>
        <p>
          Guillain-Barré Syndrome causes the immune system to attack the myelin sheath 
          surrounding peripheral nerves. Symptoms include:
        </p>
        <ul>
          <li>Weakness and tingling in the legs, often spreading upward</li>
          <li>Difficulty walking or climbing stairs</li>
          <li>Facial weakness or paralysis</li>
          <li>Difficulty with eye movements or vision</li>
          <li>Severe pain</li>
          <li>In severe cases, difficulty breathing (requiring ventilation)</li>
        </ul>
        <p>
          GBS is most commonly triggered by <strong>infections</strong> — especially 
          Campylobacter jejuni bacteria, influenza, cytomegalovirus, and Epstein-Barr virus. 
          The vaccine association is much smaller than the infection association.
        </p>

        <h2 className={playfairDisplay.className}>Vaccines Associated with GBS</h2>
        
        <h3>Influenza (Flu) Vaccine</h3>
        <p>
          The most established vaccine-GBS association. Studies estimate approximately 
          <strong>1-2 additional GBS cases per million flu vaccine doses</strong>. This was first 
          identified during the 1976 swine flu vaccination campaign, which had a higher rate 
          (~1 per 100,000). Modern flu vaccines have a much smaller risk.
        </p>
        <p>
          Importantly, influenza infection itself carries a <strong>higher GBS risk</strong> than 
          the vaccine — about 17 times higher per the CDC. So vaccination actually reduces your 
          overall GBS risk by preventing the flu.
        </p>

        <h3>Johnson &amp; Johnson (Janssen) COVID-19 Vaccine</h3>
        <p>
          The J&amp;J/Janssen COVID-19 vaccine was found to have a small increased risk of GBS, 
          estimated at about 8 cases per million doses in the first 6 weeks. This was one factor 
          in the CDC&apos;s preference recommendation for mRNA vaccines (Pfizer, Moderna) over J&amp;J. 
          J&amp;J is no longer available in the U.S.
        </p>

        <h3>mRNA COVID-19 Vaccines (Pfizer, Moderna)</h3>
        <p>
          Studies have generally <strong>not found</strong> an increased GBS risk with mRNA COVID 
          vaccines. The adenoviral vector mechanism in J&amp;J appears to be the relevant factor, 
          not COVID vaccination in general.
        </p>

        <h2 className={playfairDisplay.className}>GBS Treatment and Outcomes</h2>
        <ul>
          <li><strong>Treatment:</strong> Immunoglobulin therapy (IVIG) or plasma exchange (plasmapheresis)</li>
          <li><strong>Recovery:</strong> About 85% of patients recover fully or nearly fully</li>
          <li><strong>Timeline:</strong> Recovery can take weeks to months; some residual weakness may persist</li>
          <li><strong>Mortality:</strong> About 3-5% of cases are fatal, usually from respiratory complications</li>
        </ul>

        <h2 className={playfairDisplay.className}>VAERS and GBS</h2>
        <p>
          VAERS contains reports of GBS after various vaccines. As with all VAERS data, these 
          are reports of temporal association — not confirmed causation. The established 
          associations described above come from large epidemiological studies, not from 
          VAERS alone.
        </p>
        <p>
          GBS is on the <strong>Vaccine Injury Table</strong>, meaning that GBS occurring within 
          a defined time window after certain vaccines is eligible for compensation through the 
          <Link href="/vaccine-injuries">Vaccine Injury Compensation Program</Link>.
        </p>

        <h2 className={playfairDisplay.className}>Should You Still Get Vaccinated?</h2>
        <p>
          For most people, yes. The risk of GBS from vaccination is extremely small (1-2 per million) 
          and the risk of GBS from the infections that vaccines prevent is typically higher. 
          However, people who have had GBS within 6 weeks of a previous vaccine dose should 
          discuss future vaccination with their neurologist.
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore the Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/symptoms/guillain-barre-syndrome" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">GBS in VAERS →</div>
            <div className="text-sm text-gray-500">Reports by vaccine</div>
          </Link>
          <Link href="/side-effects/flu" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Flu Vaccine Side Effects →</div>
            <div className="text-sm text-gray-500">Including GBS context</div>
          </Link>
          <Link href="/vaccine-injuries" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Vaccine Injuries →</div>
            <div className="text-sm text-gray-500">VICP compensation</div>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/myocarditis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Myocarditis</div>
            <div className="text-sm text-gray-500">Heart inflammation</div>
          </Link>
          <Link href="/allergic-reaction" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Allergic Reactions</div>
            <div className="text-sm text-gray-500">Anaphylaxis data</div>
          </Link>
          <Link href="/vaccine-deaths" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Death Reports</div>
            <div className="text-sm text-gray-500">Mortality data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
