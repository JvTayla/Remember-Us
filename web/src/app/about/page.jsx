import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanityClient";
import { aboutStatsQuery } from "@/lib/queries";

export const metadata = { title: "About" };

// Optional images: drop these into web/public/ and they appear automatically.
const has = (file) => existsSync(path.join(process.cwd(), "public", file));

export default async function About() {
  const stats = await sanityFetch(aboutStatsQuery);
  const hasPhoto = has("about-hero.jpg");
  const hasArt = has("about-building.png");

  const tiles = [
    { n: stats?.projects, label: "projects" },
    { n: stats?.people, label: "students" },
    { n: stats?.categories, label: "categories" },
  ].filter((t) => t.n > 0);

  return (
    <>
      <section
        className={`about-band full-bleed bleed-top${hasPhoto ? " about-band--photo" : ""}`}
      >
        <h1>About</h1>
      </section>

      <section className={`about-body${hasArt ? " about-body--art" : ""}`}>
        {hasArt && <div className="about-art" aria-hidden="true" />}
        <div className="about-text">
          <h2>Who we are</h2>
          {/* PLACEHOLDER COPY: replace with your own text */}
          <p>
            Remember Us is the 2026 exhibition of 4th year creative project
            work: animation, games, visual design, interactive media and more,
            all made by one graduating class.
          </p>
          <p>
            This site is the archive. Browse by category, meet the students
            behind each project, and follow their links to see more of their
            work.
          </p>

          {tiles.length > 0 && (
            <ul className="facts">
              {tiles.map((t) => (
                <li key={t.label} className="fact">
                  <strong>{t.n}</strong>
                  <span>{t.label}</span>
                </li>
              ))}
            </ul>
          )}

          <Link href="/archive" className="button">
            Browse the archive
          </Link>
        </div>
      </section>
    </>
  );
}
