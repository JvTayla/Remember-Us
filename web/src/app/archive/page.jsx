import { sanityFetch } from "@/lib/sanityClient";
import { categoriesWithCountQuery } from "@/lib/queries";
import { categoryTheme } from "@/lib/categoryTheme";
import { resolveFolders } from "@/lib/ArchiveFolders";
import styles from "@/styles/Archive.module.css";
import ArchiveFolders from "./ArchiveFolders";

export const metadata = {
  title: "Archive",
  description: "Browse every 4th year project by category.",
};

/**
 * Hand-drawn-style asterisk. Swap this for your own artwork if you have it:
 *   <img src="/asterisk.png" alt="" className={styles.asterisk} />
 */
function Asterisk({ id }) {
  return (
    <svg
      className={styles.asterisk}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
      </defs>
      <g fill="currentColor" filter={`url(#${id})`}>
        {[0, 45, 90, 135].map((angle) => (
          <path
            key={angle}
            d="M50 2 L55.5 50 L50 98 L44.5 50 Z"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * ADAPTER: maps whatever categoryTheme() returns onto the folder's colours.
 * If your folders show the fallback red / teal colours instead of each
 * category's own colour, check what keys categoryTheme returns and add them here.
 */
function folderColors(category) {
  const t = categoryTheme(category) ?? {};
  return {
    bg: t.background ?? t.backgroundColor ?? t["--pane-bg"] ?? t["--bg"] ?? t["--cat-bg"] ?? null,
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
          <Asterisk id="rough-left" />
          <span>Archive</span>
          <Asterisk id="rough-right" />
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