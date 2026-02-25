import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Is VAERS Reliable? Understanding VAERS Strengths & Limitations | VaccineWatch',
  description: 'An honest assessment of VAERS reliability. What VAERS can and cannot tell us about vaccine safety, its strengths, limitations, and how to interpret the data correctly.',
  openGraph: {
    title: 'Is VAERS Reliable? — Honest Assessment',
    description: 'What VAERS can and cannot tell us about vaccine safety.',
  },
}

export default function IsVAERSReliablePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Is VAERS Reliable?' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">10 min read</div>
          <ShareButtons title="Is VAERS Reliable? | VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Is VAERS Reliable?
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The short answer: VAERS is reliable <em>for what it&apos;s designed to do</em> — detect 
          safety signals. It&apos;s unreliable for what many people try to use it for — proving 
          vaccines cause specific harms. Understanding the difference is crucial.
        </p>
      </div>

      {/* Quick answer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="text-green-700 font-bold mb-2">✅ VAERS IS Good For:</div>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Detecting new safety signals early</li>
            <li>• Identifying unusual patterns</li>
            <li>• Monitoring known side effects</li>
            <li>• Generating hypotheses for study</li>
            <li>• Providing transparency</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="text-red-700 font-bold mb-2">❌ VAERS Is NOT Good For:</div>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• Proving a vaccine caused an event</li>
            <li>• Calculating actual risk rates</li>
            <li>• Comparing vaccine safety head-to-head</li>
            <li>• Making personal medical decisions</li>
            <li>• Drawing definitive conclusions</li>
          </ul>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What VAERS Was Designed To Do</h2>
        <p>
          VAERS was created in 1990 as an <strong>early warning system</strong> — a &quot;canary 
          in the coal mine&quot; for vaccine safety. Its job is to collect as many reports as 
          possible so that researchers can look for patterns.
        </p>
        <p>
          Think of VAERS like a suggestion box, not a court of law. It casts a wide net to catch 
          potential signals. The trade-off: it captures noise along with signal, and that&apos;s 
          by design.
        </p>
        <p>
          <strong>VAERS has successfully detected real safety signals:</strong>
        </p>
        <ul>
          <li><strong>Intussusception from RotaShield (1999):</strong> VAERS detected this bowel obstruction risk, leading to the vaccine&apos;s withdrawal</li>
          <li><strong>Myocarditis from mRNA COVID vaccines (2021):</strong> VAERS data was among the first signals of this rare side effect</li>
          <li><strong>Thrombosis from J&amp;J vaccine (2021):</strong> VAERS reports triggered the investigation that identified TTS</li>
          <li><strong>Guillain-Barré from flu vaccines:</strong> Ongoing monitoring of this rare association</li>
        </ul>

        <h2 className={playfairDisplay.className}>The Strengths of VAERS</h2>
        
        <h3>1. Anyone Can Report</h3>
        <p>
          This is simultaneously a strength and a limitation. The open reporting system means 
          that unusual events get captured even if a healthcare provider wouldn&apos;t have 
          thought to report them. It gives patients a voice.
        </p>

        <h3>2. Comprehensive Coverage</h3>
        <p>
          VAERS covers all vaccines given in the U.S. and has data going back to 1990. This 
          long history allows researchers to identify trends and compare patterns over time.
        </p>

        <h3>3. Public Access</h3>
        <p>
          Unlike many medical databases, VAERS data is publicly available. This transparency 
          allows independent researchers, journalists, and the public to examine the data.
        </p>

        <h3>4. Speed</h3>
        <p>
          VAERS can detect signals quickly — within weeks of a vaccine rollout. Active 
          surveillance systems like the VSD take longer to produce results.
        </p>

        <h2 className={playfairDisplay.className}>The Limitations of VAERS</h2>

        <h3>1. No Causation</h3>
        <p>
          This is the most important limitation. A VAERS report means something happened 
          <em>after</em> vaccination. It does not mean the vaccine <em>caused</em> it. 
          With millions of vaccinations per year, coincidental events are inevitable.
        </p>

        <h3>2. Underreporting</h3>
        <p>
          Studies estimate that VAERS captures only <strong>1-10% of actual adverse events</strong> 
          (depending on the event type). Minor events like soreness are rarely reported, while 
          serious events are reported more consistently. This means you can&apos;t calculate 
          true rates from VAERS data.
        </p>

        <h3>3. Stimulated Reporting</h3>
        <p>
          Media coverage and public attention can dramatically increase reporting for specific 
          vaccines. COVID-19 vaccine VAERS reports surged partly because of genuine adverse events 
          and partly because of heightened awareness and mandatory reporting requirements.
        </p>

        <h3>4. No Verification</h3>
        <p>
          VAERS reports are not routinely verified. They may contain inaccurate diagnoses, 
          incomplete information, or even deliberately false reports. While submitting a 
          false report is a federal crime, the system relies primarily on good faith.
        </p>

        <h3>5. No Denominator</h3>
        <p>
          VAERS tells you how many reports were filed, but not how many people were vaccinated. 
          Without this denominator, you can&apos;t calculate actual rates. See our{' '}
          <Link href="/analysis/denominator-problem">denominator problem analysis</Link>.
        </p>

        <h2 className={playfairDisplay.className}>How VAERS Is Misused</h2>
        <p>
          VAERS data is frequently misused in ways that lead to incorrect conclusions:
        </p>
        <ul>
          <li><strong>&quot;X deaths reported after vaccination&quot;</strong> — implies causation when none is established</li>
          <li><strong>Raw count comparisons</strong> — comparing vaccines without adjusting for doses given or reporting patterns</li>
          <li><strong>Cherry-picking</strong> — highlighting specific scary reports without context</li>
          <li><strong>Ignoring the disclaimer</strong> — every VAERS data download includes a disclaimer about limitations</li>
        </ul>
        <p>
          If someone cites VAERS data to prove a vaccine is dangerous, they&apos;re misusing 
          the system. VAERS generates hypotheses; it doesn&apos;t test them.
        </p>

        <h2 className={playfairDisplay.className}>What&apos;s Better Than VAERS?</h2>
        <p>For establishing causation, other systems are more appropriate:</p>
        <ul>
          <li><strong>Vaccine Safety Datalink (VSD):</strong> Active surveillance using electronic health records from 12 million patients</li>
          <li><strong>Clinical Immunization Safety Assessment (CISA):</strong> Expert clinical review of complex cases</li>
          <li><strong>V-safe:</strong> Smartphone-based active surveillance (used for COVID vaccines)</li>
          <li><strong>Epidemiological studies:</strong> Controlled studies comparing vaccinated and unvaccinated populations</li>
        </ul>
        <p>
          These systems complement VAERS. VAERS catches the signal; these systems investigate 
          whether the signal is real.
        </p>

        <h2 className={playfairDisplay.className}>The Bottom Line</h2>
        <p>
          VAERS is a valuable and necessary part of vaccine safety monitoring. It&apos;s reliable 
          as an early warning system and for identifying patterns that warrant investigation. 
          It&apos;s unreliable as a source of definitive conclusions about vaccine causation or risk.
        </p>
        <p>
          The best approach: take VAERS data seriously, but interpret it with context. That&apos;s 
          exactly what VaccineWatch aims to provide.
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding VAERS Better</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/analysis/denominator-problem" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">The Denominator Problem →</div>
            <div className="text-sm text-gray-500">Why raw numbers mislead</div>
          </Link>
          <Link href="/analysis/reporting-bias" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Reporting Bias →</div>
            <div className="text-sm text-gray-500">How bias affects the data</div>
          </Link>
          <Link href="/vaers-database" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Explore the Database →</div>
            <div className="text-sm text-gray-500">See the data for yourself</div>
          </Link>
          <Link href="/about" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">About VaccineWatch →</div>
            <div className="text-sm text-gray-500">Our methodology</div>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/analysis/who-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Who Reports to VAERS?</div>
            <div className="text-sm text-gray-500">Healthcare workers vs public</div>
          </Link>
          <Link href="/faq" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">FAQ</div>
            <div className="text-sm text-gray-500">Common questions</div>
          </Link>
          <Link href="/glossary" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Glossary</div>
            <div className="text-sm text-gray-500">VAERS terminology</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
