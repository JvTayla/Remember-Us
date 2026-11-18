"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Category.module.css";

// lower-case, strip accents, collapse spaces (the server does the same to each card's text)
const normalise = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Search box + filter chips + the project grid.
 * The cards are rendered on the server and passed in as children, each wrapped in an
 * element with data-sub="<category slug>" and data-search="<searchable text>".
 * Typing or choosing a chip just hides the wrappers that don't match.
 *
 * Put this file at: src/components/projects/CategoryFilter.jsx
 */
export default function CategoryFilter({ filters, total, children }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(total);
  const gridRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const terms = normalise(query).split(" ").filter(Boolean);
    let count = 0;
    gridRef.current?.querySelectorAll("[data-sub]").forEach((el) => {
      const inChip = active === "all" || el.dataset.sub === active;
      const text = el.dataset.search ?? "";
      const show = inChip && terms.every((t) => text.includes(t));
      el.hidden = !show;
      if (show) count += 1;
    });
    setVisible(count);
  }, [active, query]);

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const filtering = query.trim() !== "" || active !== "all";
  const status = filtering
    ? `Showing ${visible} of ${total} ${total === 1 ? "project" : "projects"}`
    : "";

  return (
    <>
      <div className={styles.tools}>
        {filters && (
          <div className={styles.filters} role="group" aria-label="Filter projects">
            <span className={styles.filterLabel}>Show</span>
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={styles.chip}
                aria-pressed={active === f.key}
                onClick={() => setActive(f.key)}
              >
                {f.label} <span className={styles.chipCount}>{f.count}</span>
              </button>
            ))}
          </div>
        )}

        <form
          className={styles.search}
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="project-search" className={styles.srOnly}>
            Search projects
          </label>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            id="project-search"
            className={styles.searchInput}
            type="search"
            name="q"
            value={query}
            placeholder="Search projects"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQuery("");
            }}
          />
          {query && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={clearSearch}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </form>
      </div>

      <p className={styles.status} aria-live="polite">
        {status}
      </p>

      <div ref={gridRef} className={styles.grid}>
        {children}
      </div>

      {filtering && visible === 0 && (
        <p className={styles.noResults}>
          No projects match
          {query.trim() ? <> &ldquo;{query.trim()}&rdquo;</> : " that filter"}.{" "}
          <button
            type="button"
            className={styles.noResultsBtn}
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
          >
            Clear search
          </button>
        </p>
      )}
    </>
  );
}