import { sanityFetch } from "@/lib/sanityClient";
import { categoriesWithCountQuery } from "@/lib/queries";
import { categoryTheme } from "@/lib/categoryTheme";
import { resolveFolders } from "@/lib/ArchiveFolders";
import styles from "@/styles/Archive.module.css";
import ArchiveFolders from "./ArchiveFolders";
import Image from "next/image";
import star1 from "@/assets/star-1.png";

export const metadata = {
  title: "Archive",
  description: "Browse every 4th year project by category.",
};

/**
 * ADAPTER: maps whatever categoryTheme() returns onto the folder's colours.
 * If your folders show the fallback red /    fefwsvwe teal colours instead of each
 * category's own colour, check what keys categoryTheme returns and add them here.
 */
function folderColors(category) {
  const t = categoryTheme(category) ?? {};
  return {
    bg:
      t.background ??
      t.backgroundColor ??
      t["--pane-bg"] ??
      t["--bg"] ??
      t["--cat-bg"] ??
      null,
    fg: t.color ?? t["--pane-fg"] ?? t["--fg"] ?? t["--cat-fg"] ?? null,
  };
}

// Colours used inside the archive folders
const TEXT_COLOR = "#ffffff"; // titles, project counts and "View projects" links
const ART_COLOR = "#e3e2c4"; // beige: the pixel artwork (hands, invaders, pen, horses)

export default async function Archive() {
  const categories = (await sanityFetch(categoriesWithCountQuery)) ?? [];

  // Plain data only: the folders are a client component (they react to hover)
  // Which folders show, their order, and which categories share a folder
  // are all set in src/lib/archiveFolders.js
  const items = resolveFolders(categories).map((f) => {
    const { bg } = folderColors(f.primary);
    return {
      slug: f.slug,
      title: f.title,
      count: f.count,
      bg,
      fg: TEXT_COLOR,
      art: f.art ? { ...f.art, color: ART_COLOR } : null,
    };
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Image
            src={star1}
            alt=""
            aria-hidden="true"
            className={styles.asterisk}
            sizes="100px"
          />
          <span>Archive</span>
          <Image
            src={star1}
            alt=""
            aria-hidden="true"
            className={styles.asterisk}
            sizes="100px"
          />
        </h1>
        <p className={styles.lead}>
          Pick a category to meet the students and see their projects.
        </p>
      </header>

      {items.length === 0 ? (
        <p className={styles.empty}>No categories yet.</p>
      ) : (
        <ArchiveFolders items={items} />
      )}
    </div>
  );
}
