import Link from 'next/link'
import { sanityFetch } from '@/lib/sanityClient'
import { categoriesWithCountQuery } from '@/lib/queries'
import { categoryTheme } from '@/lib/categoryTheme'

export const metadata = {
  title: 'Archive',
  description: 'Browse every 4th year project by category.',
}

export default async function Archive() {
  const categories = await sanityFetch(categoriesWithCountQuery)

  return (
    <>
      <h1 className="archive-title">Archive</h1>
      <p className="archive-lead">Pick a category to meet the students and see their projects.</p>

      <nav className="panes full-bleed" aria-label="Project categories">
        {categories?.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} className="pane" style={categoryTheme(c)}>
            <span className="pane__title">{c.title}</span>
            <span className="pane__count">{c.count} {c.count === 1 ? 'project' : 'projects'}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
