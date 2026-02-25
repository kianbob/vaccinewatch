export async function GET() {
  const baseUrl = 'https://vaccinewatch.org'

  const articles = [
    // New analysis articles
    {
      slug: 'denominator-problem',
      title: 'Why Raw VAERS Numbers Can Be Misleading',
      description: 'The most critical limitation: raw numbers are meaningless without context. 670+ million COVID doses analyzed.',
      date: '2026-02-25',
    },
    {
      slug: 'reporting-bias',
      title: 'Understanding VAERS Reporting Bias',
      description: 'Stimulated reporting, awareness bias, and media influence. 2021 saw a 25x spike in reports.',
      date: '2026-02-25',
    },
    {
      slug: 'onset-timing',
      title: 'When Do Vaccine Side Effects Start?',
      description: 'Analysis of onset timing patterns. 73% of adverse events occur within 3 days of vaccination.',
      date: '2026-02-25',
    },
    {
      slug: 'dose-comparison',
      title: 'First Dose vs Second Dose vs Booster',
      description: 'Comparing adverse event patterns across doses. Second doses generate 130% more reports.',
      date: '2026-02-25',
    },
    {
      slug: 'recovery-rates',
      title: 'Do Vaccine Side Effects Go Away?',
      description: 'Analysis of recovery status in VAERS reports. 68% indicate recovery, but context is essential.',
      date: '2026-02-25',
    },
    {
      slug: 'lot-analysis',
      title: 'Understanding Vaccine Lot Numbers in VAERS',
      description: 'Why lot analysis is misleading without context. 4,414 COVID lots analyzed with heavy disclaimers.',
      date: '2026-02-25',
    },
    {
      slug: 'multi-vaccine',
      title: 'When Multiple Vaccines Are Given Together',
      description: 'Co-administration patterns and safety. 1,514 vaccine combinations reflecting standard practice.',
      date: '2026-02-25',
    },
    {
      slug: 'birth-defects',
      title: 'Birth Defect Reports in VAERS',
      description: 'Prenatal vaccination analysis. 41 vaccines with reports, but 3-4% background rate provides context.',
      date: '2026-02-25',
    },
    {
      slug: 'hospital-stays',
      title: 'How Long Are Vaccine-Related Hospitalizations?',
      description: 'Hospitalization duration patterns. 72% of stays last 3 days or fewer.',
      date: '2026-02-25',
    },
    {
      slug: 'who-reports',
      title: 'Who Files VAERS Reports?',
      description: 'Understanding reporting sources. Private practice dominates, reflecting vaccination patterns.',
      date: '2026-02-25',
    },
    // Original analysis articles
    {
      slug: 'covid-impact',
      title: 'The COVID-19 Impact on VAERS',
      description: 'How the pandemic changed vaccine adverse event reporting forever. 768,706 reports in 2021 alone.',
      date: '2026-02-25',
    },
    {
      slug: 'age-patterns',
      title: 'Age Patterns in VAERS Reports',
      description: 'Who reports the most, and who has the most serious outcomes? Adults 65+ account for 56% of death reports.',
      date: '2026-02-25',
    },
    {
      slug: 'gender-patterns',
      title: 'Gender Disparities in VAERS Reporting',
      description: 'Why 59% of VAERS reports come from women — exploring gender patterns in adverse event reporting.',
      date: '2026-02-25',
    },
    {
      slug: 'reporting-trends',
      title: '35 Years of VAERS Reporting Trends',
      description: 'From 2,214 reports in 1990 to the COVID-era surge and return to baseline.',
      date: '2026-02-25',
    },
    {
      slug: 'myocarditis',
      title: 'Myocarditis Deep Dive',
      description: 'Understanding the most closely-watched vaccine safety signal. 5,540 reports with COVID-19 vaccines dominant.',
      date: '2026-02-25',
    },
    {
      slug: 'death-reports',
      title: 'Understanding Death Reports in VAERS',
      description: 'What "death reported to VAERS" actually means — and doesn\'t mean. 27,732 reports over 35 years.',
      date: '2026-02-25',
    },
    {
      slug: 'top-symptoms',
      title: 'Most Reported Symptoms in VAERS',
      description: 'The 20 most commonly reported adverse symptoms. Pyrexia (fever) leads with 276,779 reports.',
      date: '2026-02-25',
    },
  ]

  const items = articles.map(a => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${baseUrl}/analysis/${a.slug}</link>
      <description>${escapeXml(a.description)}</description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/analysis/${a.slug}</guid>
    </item>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>VaccineWatch Analysis</title>
    <link>${baseUrl}</link>
    <description>Data-driven analysis of VAERS vaccine adverse event reports</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
