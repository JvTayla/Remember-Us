import Link from "next/link";
import { urlFor } from "@/lib/sanityClient";
import styles from "@/styles/Carouselcard.module.css";

function getCardData(project) {
  const image = project.heroImage
    ? urlFor(project.heroImage).width(600).height(800).fit("crop").url()
    : null;

  return {
    title: project.title ?? "Untitled",
    genre: project.subType ?? project.category?.title ?? "",
    image,
    href: `/project/${project.slug}`,
  };
}

export default function CarouselCard({ project }) {
  const { title, genre, image, href } = getCardData(project);

  return (
    <Link href={href} className={styles.card} draggable={false}>
      <div className={styles.frame}>
        <div className={styles.media}>
          {image ? (
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          {genre && <p className={styles.genre}>{genre}</p>}
          <span className={styles.more}>Learn more?</span>
        </div>
      </div>
    </Link>
  );
}
