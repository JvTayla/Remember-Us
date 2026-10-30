import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { sanityFetch, urlFor } from "@/lib/sanityClient";
import { categoryBySlugQuery, projectsByCategoryQuery } from "@/lib/queries";
import { categoryTheme } from "@/lib/categoryTheme";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await sanityFetch(categoryBySlugQuery, { slug });
  if (!category) return {};
  return {
    title: category.title,
    description: `${category.title} projects from the Remember Us 4th year exhibition.`,
  };
}

export default async function Category({ params }) {
  const { slug } = await params;
  const [category, projects] = await Promise.all([
    sanityFetch(categoryBySlugQuery, { slug }),
    sanityFetch(projectsByCategoryQuery, { slug }),
  ]);

  if (!category) notFound();

  const theme = categoryTheme({ slug, title: category.title });
  const art = projects?.find((p) => p.heroImage)?.heroImage;

  return (
    <div style={theme}>
      <section className="split full-bleed bleed-top">
        <div className="split__text">
          <Link href="/archive" className="kicker">
            &larr; Archive
          </Link>
          <h1>{category.title}</h1>
          <p>
            A selection of {category.title} projects from our 4th year students.
          </p>
        </div>
        <div className="split__art" aria-hidden="true">
          {art && (
            <img src={urlFor(art).width(1400).height(800).url()} alt="" />
          )}
        </div>
      </section>
      <div style={{ height: "var(--space-4)" }} />
      <ProjectGrid projects={projects} />
    </div>
  );
}
