import Link from "next/link";

// Small "← Back" link used at the top of detail pages.
export default function BackLink({ href, children }) {
  return (
    <Link href={href} className="back-link">
      <span aria-hidden="true">&larr;</span> {children}
    </Link>
  );
}
