import { Link } from 'react-router-dom'
import { urlFor } from '../../lib/sanityClient.js'
import SocialLinks from './SocialLinks.jsx'

export default function PersonBio({ person }) {
  return (
    <article>
      {person.photo && (
        <img src={urlFor(person.photo).width(300).height(300).url()} alt={person.name} />
      )}
      <h3><Link to={`/person/${person.slug}`}>{person.name}</Link></h3>
      {person.role && <p>{person.role}</p>}
      {person.bio && <p>{person.bio}</p>}
      <SocialLinks linkedin={person.linkedin} socials={person.socials} />
    </article>
  )
}
