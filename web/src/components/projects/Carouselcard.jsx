import Link from "next/link";
import styles from "@/styles/Carouselcard.module.css";

/**
 * ADAPTER: this is the one place that knows your project data shape.
 * If images or links don't show up, adjust the fields below to match
 * whatever your ProjectCard uses.
 */
function getCardData(project) {
  const image =
    project.imageUrl ??
    project.image?.url ??
    project.coverImage?.url ??
    project.mainImage?.url ??
    project.images?.[0]?.url ??
    null;

  return {
    title: project.title ?? "Untitled",
    image,
    href: `/projects/${project.slug}`,
  };
}

export default function CarouselCard({ project }) {
  const { title, image, href } = getCardData(project);

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

        <p className={styles.label}>
          <span>{title}</span>
        </p>

        {/* Mirrored, faded crop of the image, like the reference */}
        <div className={styles.reflection} aria-hidden="true">
          {image && (
            <img src={image} alt="" loading="lazy" decoding="async" draggable={false} />
          )}
        </div>
      </div>
    </Link>
  );
}