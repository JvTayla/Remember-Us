import { sanityFetch } from "@/lib/sanityClient";
import { categoriesWithCountQuery } from "@/lib/queries";
import { categoryTheme } from "@/lib/categoryTheme";
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

/**
 * WHICH FOLDERS APPEAR, AND IN WHAT ORDER.
 * Only categories listed here are shown, in this order. Anything else in Sanity
 * (e.g. VR / XR) is left out of the archive. Each entry matches a category by
 * slug or title, so tweak `match` if one of yours is named differently.
 *
 * `art` is optional artwork shown while that folder is open. Files live in
 * /public/archive-art/. It's drawn in the folder's text colour unless `color` is set.
 */
const FOLDERS = [
  {
    matches: [(c) => c.slug === "ai-im" || /^\s*ai\s*\+\s*im\s*$/i.test(c.title ?? "")],
    art: { src: "/archive-art/ai-im-hands.png", ratio: "953 / 451" },
  },
  {
    matches: [(c) => c.slug === "games" || /^\s*games?\s*$/i.test(c.title ?? "")],
  },
  {
    // Two Sanity categories shown as ONE folder: their project counts are added up,
    // and the folder links to the first one that matches.
    title: "Narrative + Visual Design",
    matches: [
      (c) => c.slug === "narrative" || /^\s*narrative\b/i.test(c.title ?? ""),
      (c) => c.slug === "visual-design" || /^\s*visual\s+design\s*$/i.test(c.title ?? ""),
    ],
  },
  {
    matches: [(c) => c.slug === "animation" || /^\s*animation\s*$/i.test(c.title ?? "")],
    art: {
      src: "/archive-art/animation-horses.png",
      ratio: "1199 / 803",
      inset: true, // pulled in from the sides, clear of any neighbouring tab
    },
  },
];

export default async function Archive() {
  const categories = (await sanityFetch(categoriesWithCountQuery)) ?? [];

  // Plain data only: the folders are a client component (they react to hover)
  const items = FOLDERS.flatMap((folder) => {
    const found = folder.matches.map((m) => categories.find(m)).filter(Boolean);
    if (!found.length) {
      console.warn(
        "[archive] No category matched one of the FOLDERS entries. Check its slug/title in Sanity.",
        folder.matches.map(String)
      );
      return [];
    }
    const [primary] = found;
    const { bg, fg } = folderColors(primary);
    return [
      {
        slug: primary.slug,
        title: folder.title ?? primary.title,
        count: found.reduce((sum, c) => sum + (c.count ?? 0), 0),
        bg,
        fg,
        art: folder.art ?? null,
      },
    ];
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