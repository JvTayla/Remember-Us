import Image from "next/image";

import ProjectGrid from "@/components/projects/ProjectGrid";
import { sanityFetch } from "@/lib/sanityClient";
import { siteSettingsQuery, projectsQuery } from "@/lib/queries";
import building from "@/assets/building.png";
import RememberUsTitle from "./RememberUsTitle";

import Countdown from "./Countdown";
import styles from "@/styles/home.module.css";
export default async function Home() {
  const [settings, projects] = await Promise.all([
    sanityFetch(siteSettingsQuery),
    sanityFetch(projectsQuery),
  ]);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <RememberUsTitle
            images={settings?.marqueeImages}
            speed={settings?.marqueeSpeed}
          />
          <h2 className={styles.exhibition}>EXHIBITION '26</h2>
          <p className={styles.tagline}>
            {settings?.tagline || "Creative Project Showcase"}
          </p>
          <Countdown
            eventDate={settings?.eventDate}
            eventLocation={settings?.eventLocation}
          />
        </div>

        <Image
          className={styles.building}
          src={building}
          alt=""
          priority
          sizes="(max-width: 720px) 62vw, 35vw"
        />
      </section>

      <h2>Projects</h2>
      <ProjectGrid projects={projects} />
    </>
  );
}
