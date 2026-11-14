"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// On the landing page the nav is invisible until the visitor scrolls down from
// the first screen, then a sticky bar slides in. On every other page it
// behaves as before. SHOW_AFTER is a fraction of the screen height.
const SHOW_AFTER = 0.3;

export default function Header() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLanding]);

  const className = [
    "site-header",
    isLanding && "site-header--landing",
    isLanding && scrolled && "is-visible",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={className}>
      <nav aria-label="Main">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/archive">Archive</Link>
      </nav>
    </header>
  );
}
