import Link from 'next/link'
import { sanityFetch } from '@/lib/sanityClient'
import { categoriesQuery } from '@/lib/queries'

export default async function Header() {
  const categories = await sanityFetch(categoriesQuery)

  return (
    <header className="site-header">
      <div className="container">
        <nav>
          <Link href="/" className="brand">Remember Us</Link>
          {categories?.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`}>{c.title}</Link>
          ))}
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  )
}
