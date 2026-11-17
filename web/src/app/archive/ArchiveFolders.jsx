"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Archive.module.css";

const HOVER_DELAY = 90; // ms; stops folders flickering open as the mouse sweeps past
const DEFAULT_OPEN = 0; // which folder is open on first load (0 = first, items.length - 1 = last)

export default function ArchiveFolders({ items }) {
  const [active, setActive] = useState(DEFAULT_OPEN);
  const timer = useRef(null);
  const count = items.length;
  const current = Math.min(active, Math.max(count - 1, 0));

  useEffect(() => () => clearTimeout(timer.current), []);

  // Column sizes as fr units so the browser can animate between them.
  // Closed folders are equal narrow strips; the open one gets the rest.
  const strip = Math.min(0.11, 0.48 / Math.max(count - 1, 1));
  const openFr = (1 - (count - 1) * strip) / strip;
  const columns = items
    .map((_, i) => (i === current ? `${openFr}fr` : "1fr"))
    .join(" ");

  const openNow = (i) => {
    clearTimeout(timer.current);
    setActive(i);
  };
  const openSoon = (i) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(i), HOVER_DELAY);
  };

  // Touch tablets have no hover: first tap opens a folder, second tap follows the link.
  const onClick = (e, i) => {
    if (
      i !== current &&
      window.matchMedia("(min-width: 721px) and (hover: none)").matches
    ) {
      e.preventDefault();
      openNow(i);
    }
  };

  return (
    <div className={styles.stage}>
      <nav
        className={styles.folders}
        style={{ gridTemplateColumns: columns }}
        aria-label="Project categories"
      >
        {items.map((c, i) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={styles.folder}
            data-active={i === current}
            style={{
              "--folder-bg": c.bg ?? undefined,
              "--folder-fg": c.fg ?? undefined,
            }}
            onPointerEnter={(e) => e.pointerType === "mouse" && openSoon(i)}
            onPointerLeave={() => clearTimeout(timer.current)}
            onFocus={() => openNow(i)}
            onClick={(e) => onClick(e, i)}
          >
            <span className={`${styles.tab} ${c.title.length > 15 ? styles.tabLong : ""}`}>
              <span className={styles.tabText}>#{c.title}</span>
            </span>

            <span className={styles.frontTitle}>{c.title}</span>

            {c.art && (
              <span
                className={`${styles.art} ${c.art.inset ? styles.artInset : ""}`}
                aria-hidden="true"
                style={{
                  "--art": `url(${c.art.src})`,
                  "--art-color": c.art.color ?? undefined,
                  aspectRatio: c.art.ratio,
                }}
              />
            )}

            <span className={styles.meta}>
              <span className={styles.count}>
                {c.count} {c.count === 1 ? "project" : "projects"}
              </span>
              <span className={styles.cta} aria-hidden="true">
                <span className={styles.ctaText}>View projects</span>
                <span className={styles.arrow}>→</span>
              </span>
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}