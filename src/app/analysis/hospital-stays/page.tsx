import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { HospitalStaysChartsClient as HospitalStaysCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'How Long Are Vaccine-Related Hospitalizations? - VAERS Hospital Duration Analysis',
  description: 'Analysis of hospitalization duration for vaccine-related adverse events. Most hospital stays are brief, typically 1-3 days for vaccine-associated hospitalizations.'
}

export default function HospitalStaysPage() {
  const hospitalData = readJsonFile('hospital-duration.json')

  // Calculate overall statistics across all vaccines
  const allVaccines = Object.keys(hospitalData)
  let totalHospitalizations = 0
  let durationCounts: { [key: string]: number } = {}

  allVaccines.forEach(vaccine => {
    const vaccineData = hospitalData[vaccine]
    Object.keys(vaccineData).forEach(duration => {
      totalHospitalizations += vaccineData[duration]
      durationCounts[duration] = (durationCounts[duration] || 0) + vaccineData[duration]
    })
  })

  // Calculate key statistics
  const shortStays = (durationCounts["1"] || 0) + (durationCounts["2"] || 0) + (durationCounts["3"] || 0)
  const shortStaysPercent = ((shortStays / totalHospitalizations) * 100).toFixed(1)
  
  const oneDayPercent = ((durationCounts["1"] || 0) / totalHospitalizations * 100).toFixed(1)

  // COVID-19 specific analysis
  const covidData = hospitalData.COVID19 || {}
  const covidTotal = Object.values(covidData).reduce((sum: number, count: any) => sum + count, 0)
  const covidShortStays = (covidData["1"] || 0) + (covidData["2"] || 0) + (covidData["3"] || 0)
  const covidShortPercent = ((covidShortStays / covidTotal) * 100).toFixed(1)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'How Long Are Vaccine-Related Hospitalizations?' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">6 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          How Long Are Vaccine-Related Hospitalizations?
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Analysis of hospitalization duration for vaccine adverse events in VAERS. The data shows 
          most hospitalizations are brief, with clear patterns across different vaccine types.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-primary mb-1">{shortStaysPercent}%</div>
          <div className="text-gray-700">of hospitalizations last <strong>3 days or fewer</strong> ({formatNumber(shortStays)} of {formatNumber(totalHospitalizations)} hospital reports)</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Pattern of Brief Stays</h2>
        <p>
          When VAERS reports indicate hospitalization after vaccination, the duration data reveals 
          encouraging patterns. Of {formatNumber(totalHospitalizations)} hospitalizations with known 
          duration, the vast majority are brief stays that suggest less severe medical conditions.
        </p>
        <p>
          The distribution shows that {oneDayPercent}% of vaccine-related hospitalizations last just 
          one day, often indicating overnight observation rather than treatment for serious complications. 
          These short stays are typically for monitoring purposes following adverse events like 
          allergic reactions or fainting episodes.
        </p>

        <h2 className={playfairDisplay.className}>Duration Breakdown</h2>
        <p>Looking at the specific duration patterns:</p>
        <ul>
          <li><strong>1 day:</strong> {formatNumber(durationCounts["1"] || 0)} hospitalizations ({oneDayPercent}%)</li>
          <li><strong>2 days:</strong> {formatNumber(durationCounts["2"] || 0)} hospitalizations ({((durationCounts["2"] || 0) / totalHospitalizations * 100).toFixed(1)}%)</li>
          <li><strong>3 days:</strong> {formatNumber(durationCounts["3"] || 0)} hospitalizations ({((durationCounts["3"] || 0) / totalHospitalizations * 100).toFixed(1)}%)</li>
          <li><strong>4-7 days:</strong> {formatNumber((durationCounts["4"] || 0) + (durationCounts["5"] || 0) + (durationCounts["6"] || 0) + (durationCounts["7"] || 0))} hospitalizations</li>
          <li><strong>Longer stays:</strong> {formatNumber((durationCounts["8-14"] || 0) + (durationCounts["15-30"] || 0) + (durationCounts["31+"] || 0))} hospitalizations</li>
        </ul>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <HospitalStaysCharts hospitalData={hospitalData} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>COVID-19 Vaccine Hospitalizations</h2>
        <p>
          COVID-19 vaccines show similar duration patterns to other vaccines, with {covidShortPercent}% 
          of hospitalizations lasting 3 days or fewer. This consistency across vaccine types suggests 
          that brief hospitalizations are the norm for vaccine-related adverse events.
        </p>
        <p>
          The brief duration pattern for COVID-19 vaccines is particularly noteworthy given the high 
          volume of reports. Even with unprecedented reporting numbers, the hospitalization duration 
          patterns remain consistent with other vaccines.
        </p>

        <h2 className={playfairDisplay.className}>What Short Stays Suggest</h2>
        <p>Brief hospitalizations after vaccination typically indicate:</p>
        <ul>
          <li><strong>Observation protocols:</strong> Healthcare providers keeping patients for monitoring after reactions</li>
          <li><strong>Allergic reactions:</strong> Anaphylaxis treatment and observation periods</li>
          <li><strong>Vasovagal episodes:</strong> Fainting spells requiring brief medical attention</li>
          <li><strong>Precautionary measures:</strong> Conservative management of uncertain symptoms</li>
        </ul>
        <p>
          These scenarios align with known vaccine side effects and standard medical practice for 
          managing acute reactions.
        </p>

        <h2 className={playfairDisplay.className}>Longer Hospitalizations</h2>
        <p>
          While most hospitalizations are brief, some last weeks or longer. These extended stays may reflect:
        </p>
        <ul>
          <li><strong>Serious underlying conditions:</strong> Pre-existing health problems that coincidentally worsen after vaccination</li>
          <li><strong>Complex medical conditions:</strong> Rare but genuine vaccine-related complications requiring extended treatment</li>
          <li><strong>Diagnostic workups:</strong> Extensive testing to determine if symptoms are vaccine-related</li>
          <li><strong>Coincidental illness:</strong> Unrelated medical conditions that occur temporally near vaccination</li>
        </ul>
        <p>
          The relatively small number of extended stays is consistent with vaccines&apos; overall safety profile.
        </p>

        <h2 className={playfairDisplay.className}>Comparison with General Hospital Data</h2>
        <p>
          The brief duration pattern in VAERS is encouraging when compared to general hospitalization data. 
          The average hospital stay in the U.S. is approximately 4.5 days, meaning vaccine-related 
          hospitalizations tend to be shorter than typical hospital stays.
        </p>
        <p>
          This suggests that even when adverse events are serious enough to warrant hospitalization, 
          they are generally less severe than conditions that typically require hospitalization.
        </p>

        <h2 className={playfairDisplay.className}>Clinical Context and Management</h2>
        <p>
          Healthcare providers have well-established protocols for managing vaccine reactions:
        </p>
        <ul>
          <li>Immediate treatment of allergic reactions with epinephrine and supportive care</li>
          <li>Observation periods for patients with uncertain symptoms</li>
          <li>Conservative management approaches when vaccine association is suspected</li>
          <li>Discharge once patients are stable and symptoms have resolved</li>
        </ul>
        <p>
          The predominance of short hospitalizations reflects both the generally mild nature of vaccine 
          adverse events and effective clinical management protocols.
        </p>

        <h2 className={playfairDisplay.className}>Limitations and Considerations</h2>
        <p>
          Several factors should be considered when interpreting hospitalization duration data:
        </p>
        <ul>
          <li>Not all VAERS reports include precise duration information</li>
          <li>Some hospitalizations may be for observation rather than treatment</li>
          <li>Duration may be influenced by hospital policies and insurance considerations</li>
          <li>Reporting patterns may vary by healthcare provider and institution</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>{shortStaysPercent}% of vaccine-related hospitalizations last 3 days or fewer</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>{oneDayPercent}% of hospitalizations are just one day, often for observation</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>Duration patterns are consistent across different vaccine types</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Vaccine-related hospitalizations tend to be shorter than average hospital stays</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious vs Non-Serious Outcomes</div>
            <div className="text-sm text-gray-500">Understanding severity classifications</div>
          </Link>
          <Link href="/analysis/recovery-rates" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Do Vaccine Side Effects Go Away?</div>
            <div className="text-sm text-gray-500">Recovery patterns and outcomes</div>
          </Link>
        </div>
      </div>
    </div>
  )
}