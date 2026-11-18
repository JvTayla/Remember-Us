import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanityClient";
import {
  categoryBySlugQuery,
  categoriesWithCountQuery,
  projectsByCategoryQuery,
} from "@/lib/queries";
import { resolveFolders, DEFAULT_HERO } from "@/lib/ArchiveFolders";
import CarouselCard from "@/components/projects/CarouselCard";
import CategoryFilter from "@/components/projects/CategoryFilter";
import styles from "@/styles/Category.module.css";

// ---- Search: what text can visitors find a project by? ----
// Collects the text fields of a project (title, genre, description, student names...),
// skipping images and internal ids. If your project has a field that isn't being found,
// make sure it's included in the projectsByCategoryQuery.
const SKIP_KEYS = new Set(["heroImage", "image", "images", "gallery", "asset", "url", "href"]);

function collectText(value, depth = 0) {
  if (value == null || depth > 4) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((v) => collectText(v, depth + 1));
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !key.startsWith("_") && !SKIP_KEYS.has(key))
      .flatMap(([, v]) => collectText(v, depth + 1));
  }
  return [];
}

function searchTextFor(project, folderPartTitle) {
  return [...collectText(project), folderPartTitle]
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Which folder does this category belong to? (Narrative and Visual Design share one.)
async function load(slug) {
  const [category, categories] = await Promise.all([
    sanityFetch(categoryBySlugQuery, { slug }),
    sanityFetch(categoriesWithCountQuery),
  ]);
  if (!category) return null;

  const folders = resolveFolders(categories, { warn: false });
  const folder = folders.find((f) => f.parts.some((p) => p.slug === slug)) ?? {
    // a category that isn't in any folder (e.g. VR / XR): still works, just plain
    key: slug,
    title: category.title,
    slug,
    count: 0,
    parts: [{ slug, title: category.title, count: 0 }],
    art: null,
    hero: DEFAULT_HERO,
  };
  return { folders, folder };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) return {};
  return {
    title: data.folder.title,
    description: `${data.folder.title} projects from the Remember Us 4th year exhibition.`,
  };
}

export default async function Category({ params }) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();
  const { folders, folder } = data;

  // Projects from every category in this folder, each tagged with where it came from
  const groups = await Promise.all(
    folder.parts.map(async (part) => ({
      part,
      projects: (await sanityFetch(projectsByCategoryQuery, { slug: part.slug })) ?? [],
    })),
  );
  const seen = new Set();
  const cards = [];
  for (const { part, projects } of groups) {
    for (const project of projects) {
      if (seen.has(project.slug)) continue;
      seen.add(project.slug);
      cards.push({ sub: part.slug, subTitle: part.title, project });
    }
  }

  // Filter chips only make sense when the folder holds more than one category
  const perPart = folder.parts
    .map((p) => ({
      key: p.slug,
      label: p.title,
      count: cards.filter((c) => c.sub === p.slug).length,
    }))
    .filter((p) => p.count > 0);
  const filters =
    perPart.length > 1
      ? [{ key: "all", label: "All", count: cards.length }, ...perPart]
      : null;

  const index = folders.findIndex((f) => f.key === folder.key);
  const next = folders.length > 1 ? folders[(index + 1) % folders.length] : null;
  const number = index >= 0 ? String(index + 1).padStart(2, "0") : null;

  const names = folder.parts.length > 1 ? folder.parts.map((p) => p.title) : [folder.title];
  const countText = `${cards.length} ${cards.length === 1 ? "project" : "projects"}`;
  const { bg, fg } = folder.hero;

  return (
    <div
      className={styles.page}
      style={{ "--folder-bg": bg, "--folder-fg": fg }}
    >
      {/* ---- Hero: the folder, opened ---- */}
      <section
        className={`full-bleed bleed-top ${styles.hero} ${folder.art ? "" : styles.heroNoArt}`}
      >
        <div className={styles.heroText}>
          <Link href="/archive" className={styles.back}>
            &larr; Archive
          </Link>
          <p className={styles.kicker}>
            {number ? `Folder ${number} · ` : ""}
            {countText}
          </p>
          <h1 className={styles.title}>{folder.title}</h1>
          <p className={styles.lead}>
            A selection of {names.join(" and ")} projects from our 4th year students.
          </p>
        </div>

        {folder.art && (
          <span
            className={styles.art}
            aria-hidden="true"
            style={{
              "--art": `url(${folder.art.src})`,
              "--art-ratio": folder.art.ratio,
              "--art-color": folder.art.color ?? undefined,
            }}
          />
        )}
      </section>

      <div className={`full-bleed ${styles.body}`}>
        <div className={styles.inner}>
          {/* ---- Jump between folders ---- */}
          {folders.length > 1 && (
            <nav className={styles.switcher} aria-label="Folders">
              {folders.map((f) => (
                <Link
                  key={f.key}
                  href={`/category/${f.slug}`}
                  className={styles.tab}
                  aria-current={f.key === folder.key ? "page" : undefined}
                  style={{ "--dot": f.hero.bg }}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  {f.title}
                </Link>
              ))}
            </nav>
          )}

          {/* ---- Projects ---- */}
          {cards.length === 0 ? (
            <p className={styles.empty}>No projects yet.</p>
          ) : (
            <CategoryFilter filters={filters} total={cards.length}>
              {cards.map(({ sub, subTitle, project }) => (
                <div
                  key={project.slug}
                  data-sub={sub}
                  data-search={searchTextFor(project, subTitle)}
                  className={styles.item}
                >
                  <CarouselCard project={project} />
                </div>
              ))}
            </CategoryFilter>
          )}

          {/* ---- Next folder ---- */}
          {next && next.key !== folder.key && (
            <Link
              href={`/category/${next.slug}`}
              className={styles.next}
              style={{ "--next-bg": next.hero.bg, "--next-fg": next.hero.fg }}
            >
              <span>
                <span className={styles.nextLabel}>Next folder</span>
                <span className={styles.nextTitle}>{next.title}</span>
              </span>
              <span className={styles.nextArrow} aria-hidden="true">
                &rarr;
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}