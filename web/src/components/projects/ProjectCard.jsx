import Link from "next/link";
import { urlFor } from "@/lib/sanityClient";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/project/${project.slug}`} className="project-card">
      <div className="project-card__panel">
        <h3>{project.title}</h3>
        {project.subType && <small>{project.subType}</small>}
        {project.shortDescription && <p>{project.shortDescription}</p>}
      </div>
      <div className="project-card__art">
        {project.heroImage && (
          <img
            src={urlFor(project.heroImage).width(900).height(600).url()}
            alt=""
            loading="lazy"
          />
        )}
      </div>
    </Link>
  );
}
