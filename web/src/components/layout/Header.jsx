import { Link } from 'react-router-dom'
import useSanityQuery from '../../hooks/useSanityQuery.js'
import { categoriesQuery } from '../../lib/queries.js'

export default function Header() {
  const { data: categories } = useSanityQuery(categoriesQuery)

  return (
    <header className="site-header">
      <div className="container">
        <nav>
          <Link to="/" className="brand">Remember Us</Link>
          {categories?.map((c) => (
            <Link key={c.slug} to={`/category/${c.slug}`}>{c.title}</Link>
          ))}
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  )
}
