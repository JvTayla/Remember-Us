import { urlFor } from "@/lib/sanityClient";
import SocialLinks from "./SocialLinks";
import BackLink from "@/components/layout/BackLink";

// Profile header on the person page: big name, role line and bio on the left,
// portrait on the right. Matches the "people profile" mockup.
export default function PersonBio({ person }) {
  // The bio is plain text in Sanity; every line break becomes its own paragraph.
  const paragraphs = (person.bio || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="person-hero">
      <div className="person-hero__text">
        <BackLink href="/about">Back to about us</BackLink>
        <h1>{person.name}</h1>
        {person.role && <p className="person-hero__role">{person.role}</p>}
        {paragraphs.length > 0 && (
          <div className="person-hero__bio">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        <SocialLinks linkedin={person.linkedin} socials={person.socials} />
      </div>

      <div className="person-hero__photo">
        {person.photo ? (
          <img
            src={urlFor(person.photo).width(680).height(850).url()}
            alt={person.name}
          />
        ) : (
          <div className="person-hero__placeholder" aria-hidden="true" />
        )}
      </div>
    </article>
  );
}
