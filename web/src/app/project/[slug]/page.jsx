import { notFound } from "next/navigation";
import { sanityFetch, urlFor } from "@/lib/sanityClient";
import { projectBySlugQuery } from "@/lib/queries";
import { categoryTheme } from "@/lib/categoryTheme";
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

  return (
    <div style={categoryTheme(project.category)}>
      <section className="split split--project full-bleed bleed-top">
        <div className="split__text">
          <h1>{project.title}</h1>
          {(project.shortDescription || project.subType) && (
            <p>{project.shortDescription || project.subType}</p>
          )}
        </div>
        <div className="split__art">
          {project.heroImage && (
            <img
              src={urlFor(project.heroImage).width(1400).height(800).url()}
              alt={project.title}
            />
          )}
        </div>
      </section>

      <section className="overview">
        <h2>Overview</h2>
        <p>{project.overview}</p>
        {project.projectLink && (
          <p>
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

      <ImageGallery images={project.gallery} title={project.title} />

      {project.team?.length > 0 && (
        <section className="team">
          <h2>Team</h2>
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
