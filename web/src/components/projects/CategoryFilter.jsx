"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Category.module.css";


export default function CategoryFilter({ filters, children }) {
  const [active, setActive] = useState("all");
  const gridRef = useRef(null);

  useEffect(() => {
    gridRef.current?.querySelectorAll("[data-sub]").forEach((el) => {
      el.hidden = active !== "all" && el.dataset.sub !== active;
    });
  }, [active]);

  return (
    <>
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
      <div ref={gridRef} className={styles.grid}>
        {children}
      </div>
    </>
  );
}