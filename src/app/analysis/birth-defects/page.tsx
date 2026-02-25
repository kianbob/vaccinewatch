import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { BirthDefectsChartsClient as BirthDefectsCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Birth Defect Reports in VAERS',
  description: 'Analysis of birth defect reports in VAERS by vaccine type. Understanding the context of prenatal vaccination guidelines and background birth defect rates.'
}

export default function BirthDefectsPage() {
  const birthDefectsData = readJsonFile('birth-defects.json')

  // Sort by count and get key statistics
  const sortedData = [...birthDefectsData].sort((a: any, b: any) => b.count - a.count)
  const totalReports = birthDefectsData.reduce((sum: number, item: any) => sum + item.count, 0)
  const totalVaccines = birthDefectsData.length

  // Top vaccines with birth defect reports
  const topVaccines = sortedData.slice(0, 10)
  const topVaccine = sortedData[0]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      
      {/* Extra Heavy Warning for Birth Defects */}
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-red-500 text-xl">🚨</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-800">
              <strong>Critical Warning:</strong> Birth defect reports to VAERS do not establish causation. 
              Temporal association does not prove vaccines cause birth defects. Background birth defect 
              rates are 3-4% of all births, meaning many defects occur regardless of vaccination status.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-orange-500 text-xl">⚠️</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-orange-800">
              <strong>Medical Guidance Required:</strong> Vaccination decisions during pregnancy should 
              always be made in consultation with healthcare providers based on individual risk-benefit 
              assessment and current medical guidelines.
            </p>
          </div>
        </div>
      </div>

      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Birth Defect Reports in VAERS' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="text-xs font-medium text-danger uppercase tracking-wider mb-2">8 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Birth Defect Reports in VAERS
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Analysis of birth defect reports across {totalVaccines} vaccine types. Understanding the 
          critical difference between temporal association and causation in pregnancy outcomes.
        </p>
        <div className="bg-danger/5 border border-danger/20 rounded-lg p-6">
          <div className="text-3xl font-bold text-danger mb-1">{formatNumber(totalReports)}</div>
          <div className="text-gray-700">birth defect reports across {totalVaccines} vaccine types — context with background rates is essential</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Critical Context: Background Birth Defect Rates</h2>
        <p>
          Before analyzing any birth defect reports in VAERS, it&apos;s essential to understand the baseline: 
          <strong>3-4% of all births involve some type of birth defect</strong>, regardless of vaccination 
          status. This means that in the United States, with approximately 3.6 million births annually, 
          108,000-144,000 babies are born with birth defects every year.
        </p>
        <p>
          When vaccines are administered during pregnancy — particularly during the first trimester when 
          organ development occurs — some birth defects will occur by coincidence alone. The challenge 
          is distinguishing between background occurrence and any potential vaccine-related effects.
        </p>

        <h2 className={playfairDisplay.className}>Vaccines and Pregnancy: Current Guidelines</h2>
        <p>
          Medical guidelines for vaccination during pregnancy are based on extensive research and 
          continuous safety monitoring:
        </p>
        <ul>
          <li><strong>Recommended during pregnancy:</strong> Influenza, Tdap (whooping cough), COVID-19 (during periods of circulation)</li>
          <li><strong>Avoided during pregnancy:</strong> Live vaccines like MMR, varicella, nasal FluMist</li>
          <li><strong>Case-by-case basis:</strong> Other vaccines based on risk-benefit assessment</li>
        </ul>
        <p>
          These guidelines reflect decades of research and ongoing monitoring of pregnancy outcomes.
        </p>

        <h2 className={playfairDisplay.className}>The VAERS Birth Defect Landscape</h2>
        <p>
          {topVaccine.type} leads with {formatNumber(topVaccine.count)} birth defect reports, but this 
          number must be interpreted in context. Factors that influence these reports include:
        </p>
        <ul>
          <li>The volume of vaccines administered to pregnant women</li>
          <li>The timing of vaccination during pregnancy</li>
          <li>Awareness and reporting patterns among healthcare providers</li>
          <li>The natural background rate of birth defects in the population</li>
        </ul>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <BirthDefectsCharts birthDefectsData={topVaccines} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Temporal Association vs. Causation</h2>
        <p>
          The fundamental challenge with birth defect reports is the difference between temporal 
          association and causation:
        </p>
        <ul>
          <li><strong>Temporal association:</strong> A birth defect occurs after maternal vaccination</li>
          <li><strong>Causation:</strong> The vaccination caused the birth defect</li>
        </ul>
        <p>
          VAERS captures temporal associations but cannot determine causation. Given that birth 
          defects occur in 3-4% of all pregnancies, many will inevitably occur after maternal 
          vaccination by coincidence alone.
        </p>

        <h2 className={playfairDisplay.className}>Types of Birth Defects Reported</h2>
        <p>
          Birth defect reports in VAERS encompass a wide range of conditions, from minor anomalies 
          to serious structural defects. The diversity of reported defects across different vaccine 
          types suggests that most represent background occurrence rather than vaccine-specific effects.
        </p>
        <p>
          If vaccines were truly causing birth defects, we would expect to see:
        </p>
        <ul>
          <li>Specific patterns of defects associated with specific vaccines</li>
          <li>Dose-response relationships</li>
          <li>Consistent timing relationships</li>
          <li>Rates above background levels in controlled studies</li>
        </ul>
        <p>
          The absence of these patterns in the VAERS data is reassuring.
        </p>

        <h2 className={playfairDisplay.className}>Pregnancy Registries and Active Monitoring</h2>
        <p>
          Beyond VAERS, pregnancy safety is monitored through more robust systems:
        </p>
        <ul>
          <li><strong>Pregnancy registries:</strong> Prospective studies that follow vaccinated pregnant women</li>
          <li><strong>Birth defects surveillance systems:</strong> Population-based monitoring of birth outcomes</li>
          <li><strong>Electronic health record studies:</strong> Large-scale analysis of pregnancy outcomes</li>
          <li><strong>Clinical trials:</strong> When ethical and feasible, controlled studies in pregnant populations</li>
        </ul>
        <p>
          These systems provide much stronger evidence about vaccine safety in pregnancy than 
          passive surveillance through VAERS.
        </p>

        <h2 className={playfairDisplay.className}>The Importance of Risk-Benefit Analysis</h2>
        <p>
          Vaccination decisions during pregnancy require careful risk-benefit analysis:
        </p>
        <ul>
          <li><strong>Disease risks:</strong> Influenza and COVID-19 can cause serious complications in pregnant women</li>
          <li><strong>Fetal protection:</strong> Maternal antibodies protect newborns during their first months</li>
          <li><strong>Timing considerations:</strong> Different vaccines may be recommended at different points in pregnancy</li>
          <li><strong>Individual factors:</strong> Medical history, exposure risks, and personal circumstances</li>
        </ul>

        <h2 className={playfairDisplay.className}>What the Evidence Actually Shows</h2>
        <p>
          Large-scale studies of vaccines recommended during pregnancy have consistently found:
        </p>
        <ul>
          <li>No increase in birth defect rates above background levels</li>
          <li>No specific patterns of defects associated with vaccination</li>
          <li>Significant benefits from maternal and infant protection</li>
          <li>Safety profiles that support current recommendations</li>
        </ul>
        <p>
          These findings from controlled studies are more reliable than VAERS reports for assessing 
          vaccine safety in pregnancy.
        </p>
      </div>

      {/* Key Takeaways */}
      <div className="bg-danger/5 border border-danger/20 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Critical Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">1.</span>
            <span>3-4% of all births involve birth defects regardless of vaccination status</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">2.</span>
            <span>VAERS reports show temporal association, not causation</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">3.</span>
            <span>Controlled studies have not found increased birth defect rates from recommended vaccines</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">4.</span>
            <span>Vaccination decisions during pregnancy should be made with healthcare providers</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/reporting-bias" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Understanding VAERS Reporting Bias</div>
            <div className="text-sm text-gray-500">Why temporal association ≠ causation</div>
          </Link>
          <Link href="/analysis/denominator-problem" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Why Raw VAERS Numbers Can Be Misleading</div>
            <div className="text-sm text-gray-500">Understanding background rates</div>
          </Link>
        </div>
      </div>
    </div>
  )
}