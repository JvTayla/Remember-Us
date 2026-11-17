import Link from "next/link";
import { sanityFetch } from "@/lib/sanityClient";
import { categoriesWithCountQuery } from "@/lib/queries";
import { categoryTheme } from "@/lib/categoryTheme";
import styles from "@/styles/Archive.module.css";

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
    bg: t.background ?? t.backgroundColor ?? t["--pane-bg"] ?? t["--bg"] ?? t["--cat-bg"],
    fg: t.color ?? t["--pane-fg"] ?? t["--fg"] ?? t["--cat-fg"],
  };
}

export default async function Archive() {
  const categories = (await sanityFetch(categoriesWithCountQuery)) ?? [];
  const last = categories.length - 1;
  // Share of the width the visible "strips" of the back folders may use
  const stripShare = `${48 / Math.max(categories.length - 1, 1)}%`;

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

      {categories.length === 0 ? (
        <p className={styles.empty}>No categories yet.</p>
      ) : (
        <div className={styles.stage}>
        <nav
          className={styles.folders}
          style={{ "--strip-share": stripShare }}
          aria-label="Project categories"
        >
          {categories.map((c, i) => {
            const { bg, fg } = folderColors(c);
            const isFront = i === last;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`${styles.folder} ${isFront ? styles.front : ""}`}
                style={{ "--folder-bg": bg, "--folder-fg": fg }}
              >
                <span className={styles.tab}>
                  <span className={styles.tabText}>#{c.title}</span>
                </span>

                {isFront && <span className={styles.frontTitle}>{c.title}</span>}

                <span className={styles.count}>
                  {c.count} {c.count === 1 ? "project" : "projects"}
                </span>

                {isFront && (
                  <span className={styles.cta} aria-hidden="true">
                    View projects →
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        </div>
      )}
    </div>
  );
}