"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "@/styles/About.module.css";

const SLOT_COUNT = 24; 
const CHANGE_EVERY_MS = 1200; 




export default function PeopleSearchGrid({ people = [] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return people;
    return people.filter((p) =>
      `${p.name} ${p.role ?? ""}`.toLowerCase().includes(q),
    );
  }, [people, q]);

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
          placeholder="Search People"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>


      <p className={styles.srOnly} aria-live="polite">
        {q ? `${results.length} ${results.length === 1 ? "person" : "people"} found` : ""}
      </p>

      {!q ? (
        <RotatingGrid people={people} />
      ) : results.length > 0 ? (
        <ul className={styles.grid}>
          {results.map((p) => (
            <li key={p.slug}>
              <Link href={`/person/${p.slug}`} className={styles.tile}>
                <TileFace person={p} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No one matches “{query.trim()}”.</p>
      )}
    </div>
  );
}



function RotatingGrid({ people }) {

  const [slots, setSlots] = useState(() => initialSlots(people));
  const hovered = useRef(null); 
  const lastChanged = useRef(null); 
  const slotsRef = useRef(slots); 
  slotsRef.current = slots;


  useEffect(() => setSlots(initialSlots(people)), [people]);

  useEffect(() => {
    if (people.length < 2) return; 
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return; 

    let cancelled = false;
    const timer = setInterval(() => {
      if (document.hidden) return; 

      const current = slotsRef.current;
      const slotIndex = pickSlot(current.length, hovered.current, lastChanged.current);
      if (slotIndex === null) return;
      const next = pickPerson(people, current, slotIndex);
      if (!next) return;
      lastChanged.current = slotIndex;


      preload(next.photoUrl).then(() => {
        if (cancelled) return;
        setSlots((latest) =>
          latest.map((s, i) => {
            if (i !== slotIndex || i === hovered.current) return s;
            const back = 1 - s.front;
            const layers = [...s.layers];
            layers[back] = next;
            return { layers, front: back };
          }),
        );
      });
    }, CHANGE_EVERY_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [people]);


  if (people.length === 0) {
    return (
      <>
        <p className={styles.srOnly}>Students coming soon.</p>
        <ul className={`${styles.grid} ${styles.rotating}`} aria-hidden="true">
          {Array.from({ length: SLOT_COUNT }, (_, i) => (
            <li key={i}>
              <span className={styles.tile} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>

      <ul className={styles.srOnly} aria-label="All students">
        {people.map((p) => (
          <li key={p.slug}>
            <Link href={`/person/${p.slug}`}>{p.name}</Link>
          </li>
        ))}
      </ul>


      <ul className={`${styles.grid} ${styles.rotating}`} aria-hidden="true">
        {slots.map((slot, i) => {
          const showing = slot.layers[slot.front];
          return (
            <li key={i}>
              <Link
                href={`/person/${showing.slug}`}
                className={styles.tile}
                tabIndex={-1}
                onMouseEnter={() => (hovered.current = i)}
                onMouseLeave={() => (hovered.current = null)}
              >
                {slot.layers.map((p, layer) => (
                  <span
                    key={layer}
                    className={`${styles.layer} ${layer === slot.front ? styles.layerOn : ""}`}
                  >
                    <TileFace person={p} />
                  </span>
                ))}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}


function TileFace({ person }) {
  return (
    <>
      {person.photoUrl ? (
        <img src={person.photoUrl} alt="" loading="lazy" />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initials(person.name)}
        </span>
      )}
      <span className={styles.tileName}>
        {person.name}
        {person.role && <small>{person.role}</small>}
      </span>
    </>
  );
}



function initialSlots(people) {
  if (!people.length) return [];
  return Array.from({ length: SLOT_COUNT }, (_, i) => {
    const p = people[i % people.length];
    return { layers: [p, p], front: 0 };
  });
}


function pickSlot(count, hoveredIndex, lastIndex) {
  const options = [];
  for (let i = 0; i < count; i++) {
    if (i !== hoveredIndex && i !== lastIndex) options.push(i);
  }
  return options.length ? options[Math.floor(Math.random() * options.length)] : null;
}



function pickPerson(people, slots, slotIndex) {
  const onScreen = new Set(slots.map((s) => s.layers[s.front].slug));
  const current = slots[slotIndex].layers[slots[slotIndex].front].slug;
  let pool = people.filter((p) => !onScreen.has(p.slug));
  if (!pool.length) pool = people.filter((p) => p.slug !== current);
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}

function preload(src) {
  if (!src) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

function initials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
