import { urlFor } from '@/lib/sanityClient'
import SocialLinks from './SocialLinks'

// Full profile row used on the person page: big photo left, details right.
export default function PersonBio({ person }) {
  return (
    <article className="person">
      {person.photo
        ? <img src={urlFor(person.photo).width(560).height(750).url()} alt={person.name} />
        : <div />}
      <div>
        <h1>{person.name}</h1>
        {person.role && <p className="role">{person.role}</p>}
        {person.bio && <p>{person.bio}</p>}
        <SocialLinks linkedin={person.linkedin} socials={person.socials} />
      </div>
    </article>
  )
}
