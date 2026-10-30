import Link from "next/link";
import { urlFor } from "@/lib/sanityClient";

// Round headshot + name, used in the "Team" row on a project page.
export default function TeamCircle({ person }) {
  return (
    <li>
      <Link href={`/person/${person.slug}`} className="team-circle">
        {person.photo ? (
          <img src={urlFor(person.photo).width(360).height(360).url()} alt="" />
        ) : (
          <div className="ph" />
        )}
        <strong>{person.name}</strong>
        {person.role && <span>{person.role}</span>}
      </Link>
    </li>
  );
}
