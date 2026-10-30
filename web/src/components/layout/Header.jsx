import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <nav aria-label="Main">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/archive">Archive</Link>
      </nav>
    </header>
  );
}
