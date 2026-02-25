import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Analysis - Data-Driven VAERS Insights',
  description: 'In-depth analysis articles exploring trends, patterns, and context in VAERS vaccine adverse event data.'
}

const articles = [
  {
    slug: 'covid-impact',
    title: 'The COVID-19 Impact on VAERS',
    subtitle: 'How the pandemic changed vaccine adverse event reporting forever',
    keyFinding: '768,706 reports in 2021 alone — more than the previous 10 years combined',
    readTime: 8,
    color: 'danger',
  },
  {
    slug: 'age-patterns',
    title: 'Age Patterns in VAERS Reports',
    subtitle: 'Who reports the most, and who has the most serious outcomes?',
    keyFinding: 'Adults 65+ account for 56% of all death reports despite being 20% of total reports',
    readTime: 6,
    color: 'primary',
  },
  {
    slug: 'gender-patterns',
    title: 'Gender Disparities in Reporting',
    subtitle: 'Why 59% of VAERS reports come from women',
    keyFinding: 'Women report nearly twice as often as men across all vaccine types',
    readTime: 5,
    color: 'accent',
  },
  {
    slug: 'reporting-trends',
    title: '35 Years of VAERS Reporting',
    subtitle: 'From 2,214 reports in 1990 to the COVID-era surge and return to baseline',
    keyFinding: 'Post-COVID reporting has declined 93% from the 2021 peak',
    readTime: 7,
    color: 'primary',
  },
  {
    slug: 'myocarditis',
    title: 'Myocarditis Deep Dive',
    subtitle: 'Understanding the most closely-watched vaccine safety signal',
    keyFinding: '5,540 myocarditis reports, with COVID-19 vaccines accounting for the vast majority',
    readTime: 7,
    color: 'danger',
  },
  {
    slug: 'death-reports',
    title: 'Understanding Death Reports in VAERS',
    subtitle: 'What "death reported to VAERS" actually means — and doesn\'t mean',
    keyFinding: '27,732 death reports over 35 years, but context is everything',
    readTime: 8,
    color: 'danger',
  },
  {
    slug: 'top-symptoms',
    title: 'Most Reported Symptoms',
    subtitle: 'The 20 most commonly reported adverse symptoms in VAERS',
    keyFinding: 'Pyrexia (fever) leads with 276,779 reports — a normal immune response',
    readTime: 5,
    color: 'accent',
  },
]

const colorClasses: Record<string, string> = {
  primary: 'border-l-primary bg-primary/5',
  accent: 'border-l-accent bg-accent/5',
  danger: 'border-l-danger bg-danger/5',
}

const badgeClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  danger: 'bg-danger/10 text-danger',
}

export default function AnalysisIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Data Analysis
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          In-depth, context-rich analysis of VAERS data. Every article presents the numbers with
          appropriate context, limitations, and nuance. Neither pro-vax nor anti-vax — just transparent data journalism.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/analysis/${article.slug}`}
            className={`block border-l-4 rounded-lg p-6 hover:shadow-md transition-shadow ${colorClasses[article.color]}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className={`text-xl font-bold text-gray-900 mb-1 ${playfairDisplay.className}`}>
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-3">{article.subtitle}</p>
                <div className="bg-white/80 rounded px-3 py-2 inline-block">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Key finding:</span> {article.keyFinding}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ml-4 whitespace-nowrap ${badgeClasses[article.color]}`}>
                {article.readTime} min read
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
