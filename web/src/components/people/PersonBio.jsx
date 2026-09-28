import Link from 'next/link'
import { urlFor } from '@/lib/sanityClient'
import SocialLinks from './SocialLinks'

export default function PersonBio({ person }) {
  return (
    <article>
      {person.photo && (
        <img src={urlFor(person.photo).width(300).height(300).url()} alt={person.name} />
      )}
      <h3><Link href={`/person/${person.slug}`}>{person.name}</Link></h3>
      {person.role && <p>{person.role}</p>}
      {person.bio && <p>{person.bio}</p>}
      <SocialLinks linkedin={person.linkedin} socials={person.socials} />
    </article>
  )
}
