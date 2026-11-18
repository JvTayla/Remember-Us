import Link from "next/link";
import { urlFor } from "@/lib/sanityClient";

// "Portfolio / Projects" row on the person page: a full-width rule, a centred
// heading, then portrait cards with a LEARN MORE link underneath.
// (The category page keeps using ProjectGrid; this one is profile-only.)
export default function PersonProjects({ projects }) {
  return (
    <section
      className="person-projects"
      aria-labelledby="person-projects-title"
    >
      <hr className="person-projects__rule full-bleed" />
      <h2 id="person-projects-title" className="person-projects__title">
        Portfolio / Projects
      </h2>

      {projects?.length ? (
        <ul className="person-projects__list">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/project/${p.slug}`} className="portfolio-card">
                <div className="portfolio-card__art">
                  {p.cardImage ? (
                    <img
                      src={urlFor(p.cardImage).width(600).height(800).url()}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <div className="portfolio-card__placeholder" />
                  )}
                </div>
                <span className="portfolio-card__name">{p.title}</span>
                <span className="portfolio-card__cta">Learn more</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="person-projects__empty">No projects yet.</p>
      )}
    </section>
  );
}
