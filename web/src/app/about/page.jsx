import Image from "next/image";
import { sanityFetch, urlFor } from "@/lib/sanityClient";
import { aboutStatsQuery, peopleQuery } from "@/lib/queries";
import star from "@/assets/star2.png";
import PeopleSearchGrid from "@/components/people/PeopleSearchGrid";
import bunny from "@/assets/timeBunny.png";
import onePieceMan from "@/assets/onePieceMan.png";
import styles from "@/styles/About.module.css";



export const metadata = {
  title: "About",
  description: "Meet the graduating class behind Remember Us, the 2026 4th year exhibition.",
};

async function safeFetch(query) {
  try {
    return await sanityFetch(query);
  } catch {
    return null;
  }
}

export default async function About() {
  const [stats, people] = await Promise.all([
    safeFetch(aboutStatsQuery),
    safeFetch(peopleQuery),
  ]);

  const peopleData = (people ?? []).map((p) => ({
    name: p.name,
    slug: p.slug,
    role: p.role ?? null,
    photoUrl: p.photo
      ? urlFor(p.photo).width(400).height(400).fit("crop").auto("format").url()
      : null,
  }));

  const tiles = [
    { n: stats?.projects, label: "projects" },
    { n: stats?.people, label: "students" },
    { n: stats?.categories, label: "categories" },
  ].filter((t) => t.n > 0);

  return (
    <div className={styles.page}>
      <section className={`${styles.band} full-bleed`}>
        <h1 className={styles.title}>
          <Image src={star} alt="" aria-hidden="true" className={styles.asterisk} sizes="80px" />
          <span>About Us</span>
          <Image src={star} alt="" aria-hidden="true" className={styles.asterisk} sizes="80px" />
        </h1>
      </section>

      <div className={styles.body}>
   
        <Image
          src={bunny}
          alt=""
          aria-hidden="true"
          className={styles.bunny}
          sizes="160px"
        /> 

        <Image
          src={onePieceMan}
          alt=""
          aria-hidden="true"
          className={styles.onePieceMan}
          sizes="160px"
        /> 


        <section className={styles.intro} aria-labelledby="who-we-are">
          <h2 id="who-we-are" className={styles.heading}>
            Who we are
          </h2>
          {/* HEY THIS IS JUST PLACEHOLER TEXT*/}
          <p>
            Remember Us is the 2026 exhibition of 4th year creative work from
            the Wits School of Arts, Digital Arts: animation, games, visual
            design, interactive media and more, all made by one graduating
            class.
          </p>
          <p>
            This site is the archive. Find a student by name or role, open
            their profile, and follow their links to see more of their work.
          </p>

          {tiles.length > 0 && (
            <ul className={styles.facts}>
              {tiles.map((t) => (
                <li key={t.label} className={styles.fact}>
                  <strong>{t.n}</strong>
                  <span>{t.label}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.peopleSection} aria-label="Students">
          <PeopleSearchGrid people={peopleData} />
        </section>
      </div>

      
      <div className={`${styles.bandBottom} full-bleed`} aria-hidden="true" />
    </div>
  );
}
