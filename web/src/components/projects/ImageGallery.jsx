import { urlFor } from "@/lib/sanityClient";
import GalleryLightbox from "./GalleryLightbox";

// Server part: builds the image URLs. The click-to-enlarge viewer is client-side.
export default function ImageGallery({ images = [], title = "" }) {
  if (!images?.length) return null;

  const items = images.map((img, i) => ({
    key: img._key || i,
    thumb: urlFor(img).width(800).url(),
    full: urlFor(img).width(2200).fit("max").url(),
    alt: img.alt || `${title} image ${i + 1}`,
  }));

  return <GalleryLightbox items={items} />;
}
