"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import styles from "@/styles/About.module.css";

// Search box + grid of student photos for the About page.
export default function PeopleSearchGrid({ people = [] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return people;
    return people.filter((p) =>
      `${p.name} ${p.role ?? ""}`.toLowerCase().includes(q),
    );
  }, [people, query]);

  return (
    <div className={styles.people}>
      <form
        className={styles.search}
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor={inputId} className={styles.srOnly}>
          Find people by name or role
        </label>
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <input
          id={inputId}
          className={styles.searchInput}
          type="search"
          placeholder="Find People"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <p className={styles.srOnly} aria-live="polite">
        {query ? `${results.length} ${results.length === 1 ? "person" : "people"} found` : ""}
      </p>

      {results.length > 0 ? (
        <ul className={styles.grid}>
          {results.map((p) => (
            <li key={p.slug}>
              <Link href={`/person/${p.slug}`} className={styles.tile}>
                {p.photoUrl ? (
                  <img src={p.photoUrl} alt="" loading="lazy" />
                ) : (
                  <span className={styles.initials} aria-hidden="true">
                    {initials(p.name)}
                  </span>
                )}
                <span className={styles.tileName}>
                  {p.name}
                  {p.role && <small>{p.role}</small>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          {people.length ? `No one matches “${query}”.` : "Students coming soon."}
        </p>
      )}
    </div>
  );
}

function initials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
