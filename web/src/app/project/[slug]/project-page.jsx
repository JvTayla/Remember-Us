import { notFound } from "next/navigation";
import { sanityFetch, urlFor } from "@/lib/sanityClient";
import { projectBySlugQuery } from "@/lib/queries";
import ImageGallery from "@/components/projects/ImageGallery";
import TeamCircle from "@/components/people/TeamCircle";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await sanityFetch(projectBySlugQuery, { slug });
  if (!project) return {};

  const description =
    project.shortDescription || project.overview?.slice(0, 160);
  const image = project.heroImage
    ? urlFor(project.heroImage).width(1200).height(630).url()
    : null;

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = await sanityFetch(projectBySlugQuery, { slug });

  if (!project) notFound();

  // The overview is plain text in Sanity; each line break becomes a paragraph.
  const paragraphs = (project.overview || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="project-page">
      <header className="project-hero">
        <h1>{project.title}</h1>
        {(project.shortDescription || project.subType) && (
          <p className="project-hero__sub">
            {project.shortDescription || project.subType}
          </p>
        )}
      </header>

      {project.heroImage && (
        <img
          className="project-banner"
          src={urlFor(project.heroImage).width(1600).height(400).fit("crop").url()}
          alt={project.title}
        />
      )}

      {(project.gallery?.length > 0 || paragraphs.length > 0 || project.projectLink) && (
        <section className="project-overview">
          <h2>Overview</h2>
          <ImageGallery images={project.gallery} title={project.title} />
          {paragraphs.length > 0 && (
            <div className="project-overview__text">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {project.projectLink && (
            <p className="project-overview__link">
              <a
                className="button"
                href={project.projectLink}
                target="_blank"
                rel="noreferrer"
              >
                View project
              </a>
            </p>
          )}
        </section>
      )}

      {project.team?.length > 0 && (
        <section className="team">
          <h2 className="visually-hidden">Team</h2>
          <ul className="team-list">
            {project.team.map((p) => (
              <TeamCircle key={p.slug} person={p} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
