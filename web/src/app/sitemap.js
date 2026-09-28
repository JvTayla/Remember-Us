import { sanityFetch } from '@/lib/sanityClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap() {
  const [categories, projects, people] = await Promise.all([
    sanityFetch(`*[_type == "category"]{ "slug": slug.current }`),
    sanityFetch(`*[_type == "project"]{ "slug": slug.current }`),
    sanityFetch(`*[_type == "person"]{ "slug": slug.current }`),
  ])

  return [
    { url: siteUrl },
    { url: `${siteUrl}/about` },
    ...categories.map((c) => ({ url: `${siteUrl}/category/${c.slug}` })),
    ...projects.map((p) => ({ url: `${siteUrl}/project/${p.slug}` })),
    ...people.map((p) => ({ url: `${siteUrl}/person/${p.slug}` })),
  ]
}
