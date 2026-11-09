"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import styles from "./ProjectCarousel.module.css";

// Above this many slides, phones show a "3 / 12" counter instead of dots.
const MAX_MOBILE_DOTS = 7;

export default function ProjectCarousel({ children, label = "Projects" }) {
  const items = Children.toArray(children);
  const trackRef = useRef(null);
  const frame = useRef(0);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  // Work out which slide is closest to the centre of the track.
  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const centre = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((el, i) => {
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    });
    activeRef.current = best;
    setActive(best);
  }, []);

  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(updateActive);
  };

  const goTo = useCallback(
    (index, behavior = "smooth") => {
      const track = trackRef.current;
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      track?.children[clamped]?.scrollIntoView({
        behavior,
        inline: "center",
        block: "nearest",
      });
    },
    [items.length]
  );

  useEffect(() => {
    updateActive();
    // On resize / rotation, keep the current slide centred.
    const onResize = () => goTo(activeRef.current, "auto");
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame.current);
    };
  }, [updateActive, goTo]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  if (!items.length) return null;

  const manySlides = items.length > MAX_MOBILE_DOTS;

  return (
    <div
      className={`${styles.carousel} ${manySlides ? styles.many : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => goTo(active - 1)}
        disabled={active === 0}
        aria-label="Previous project"
      >
        ‹
      </button>

      <div
        ref={trackRef}
        className={styles.track}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {items.map((child, i) => (
          <div
            key={child.key ?? i}
            className={styles.slide}
            data-active={i === active}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            {child}
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => goTo(active + 1)}
        disabled={active === items.length - 1}
        aria-label="Next project"
      >
        ›
      </button>

      <div className={styles.dots} role="tablist" aria-label="Choose project">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to project ${i + 1}`}
            className={styles.dot}
            data-active={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <p className={styles.counter} aria-hidden="true">
        {active + 1} / {items.length}
      </p>
    </div>
  );
}