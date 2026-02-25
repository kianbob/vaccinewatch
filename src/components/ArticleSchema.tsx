interface ArticleSchemaProps {
  title: string
  description: string
  slug: string
  datePublished?: string
  dateModified?: string
}

export default function ArticleSchema({ title, description, slug, datePublished = '2026-02-25', dateModified = '2026-02-25' }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `https://www.vaccinewatch.org/analysis/${slug}`,
    datePublished,
    dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'VaccineWatch',
      url: 'https://www.vaccinewatch.org',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'VaccineWatch',
      url: 'https://www.vaccinewatch.org',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.vaccinewatch.org/analysis/${slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
