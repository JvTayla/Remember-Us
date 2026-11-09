"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/Projectcarousel.module.css";

// Above this many slides, phones show a "3 / 12" counter instead of dots.
const MAX_MOBILE_DOTS = 7;
// Auto-scroll: how long each slide stays centred before moving on (ms).
const AUTOPLAY_MS = 3000;

export default function ProjectCarousel({ children, label = "Projects" }) {
  const items = Children.toArray(children);
  const n = items.length;

  // Endless loop: the slides are repeated (always an odd number of copies) and
  // we live in the middle copy. When the scroll settles in another copy, we
  // silently jump to the identical slide in the middle one.
  const copies = n < 2 ? 1 : n < 6 ? 5 : 3;
  const mid = (copies - 1) / 2;
  const total = n * copies;

  const trackRef = useRef(null);
  const frame = useRef(0);
  const settleTimer = useRef(0);
  const activeRef = useRef(mid * n);
  const [active, setActive] = useState(mid * n);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  // Which slide is closest to the centre of the track?
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

  // After scrolling stops: if we are outside the middle copy, jump back into it.
  const rebalance = useCallback(() => {
    const track = trackRef.current;
    if (!track || copies === 1 || n === 0) return;
    const idx = activeRef.current;
    const home = mid * n + (((idx % n) + n) % n);
    if (home === idx) return;
    const delta = track.children[home].offsetLeft - track.children[idx].offsetLeft;
    track.style.scrollSnapType = "none";
    track.scrollLeft += delta;
    requestAnimationFrame(() => {
      track.style.scrollSnapType = "";
      updateActive();
    });
  }, [copies, mid, n, updateActive]);

  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(updateActive);
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(rebalance, 140);
  };

  const goTo = useCallback(
    (index, behavior = "smooth") => {
      const track = trackRef.current;
      const clamped = Math.max(0, Math.min(total - 1, index));
      track?.children[clamped]?.scrollIntoView({
        behavior,
        inline: "center",
        block: "nearest",
      });
    },
    [total]
  );

  // Start in the middle copy, then reveal (avoids a visible jump on load).
  useEffect(() => {
    goTo(mid * n, "auto");
    updateActive();
    setReady(true);
    // On resize / rotation, keep the current slide centred.
    const onResize = () => goTo(activeRef.current, "auto");
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame.current);
      clearTimeout(settleTimer.current);
    };
  }, [goTo, updateActive, mid, n]);

  // Auto-scroll: step forward every few seconds, forever.
  // Pauses on hover, focus, touch, hidden tab, and for reduced-motion users.
  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      goTo(activeRef.current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, n, goTo]);

  // For a dot, pick whichever copy of that slide is nearest to where we are.
  const goToSlide = (i) => {
    let best = mid * n + i;
    for (let c = 0; c < copies; c++) {
      const cand = c * n + i;
      if (Math.abs(cand - activeRef.current) < Math.abs(best - activeRef.current)) best = cand;
    }
    goTo(best);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  if (!n) return null;

  const manySlides = n > MAX_MOBILE_DOTS;
  const realActive = ((active % n) + n) % n;

  return (
    <div
      className={`${styles.carousel} ${manySlides ? styles.many : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 4000)}
    >
      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => goTo(active - 1)}
        aria-label="Previous project"
      >
        ‹
      </button>

      <div
        ref={trackRef}
        className={styles.track}
        data-ready={ready}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {Array.from({ length: copies }).flatMap((_, c) =>
          items.map((child, i) => {
            const idx = c * n + i;
            return (
              <div
                key={`${c}-${child.key ?? i}`}
                className={styles.slide}
                data-active={idx === active}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                aria-hidden={c === mid ? undefined : true}
              >
                {child}
              </div>
            );
          })
        )}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => goTo(active + 1)}
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
            aria-selected={i === realActive}
            aria-label={`Go to project ${i + 1}`}
            className={styles.dot}
            data-active={i === realActive}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>

      <p className={styles.counter} aria-hidden="true">
        {realActive + 1} / {n}
      </p>
    </div>
  );
}
