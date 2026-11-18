"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Gallery thumbnails; clicking one opens a full-screen viewer over a blurred page
// with previous / next buttons, arrow keys, swipe, and Esc to close.
export default function GalleryLightbox({ items }) {
  const [open, setOpen] = useState(null); // index of the open image, or null
  const closeRef = useRef(null);
  const lastTrigger = useRef(null);
  const touchX = useRef(null);
  const count = items.length;

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus?.();
  }, []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % count)),
    [count],
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + count) % count)),
    [count],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open === null, close, next, prev]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = open === null ? null : items[open];

  return (
    <>
      <div className="gallery">
        {items.map((it, i) => (
          <button
            key={it.key}
            type="button"
            className="gallery__item"
            aria-label={`View image ${i + 1} of ${count} larger`}
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setOpen(i);
            }}
          >
            <img src={it.thumb} alt={it.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {current &&
        createPortal(
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="lightbox__btn lightbox__close"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            &times;
          </button>

          {count > 1 && (
            <button
              type="button"
              className="lightbox__btn lightbox__prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              &#8249;
            </button>
          )}

          <img
            key={current.key}
            className="lightbox__img"
            src={current.full}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
          />

          {count > 1 && (
            <button
              type="button"
              className="lightbox__btn lightbox__next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              &#8250;
            </button>
          )}

          <p className="lightbox__count" aria-live="polite">
            {open + 1} / {count}
          </p>
        </div>,
        document.body,
      )}
    </>
  );
}
