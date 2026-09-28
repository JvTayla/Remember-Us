import { urlFor } from '../../lib/sanityClient.js'

export default function ImageGallery({ images = [], title = '' }) {
  if (!images.length) return null
  return (
    <div className="gallery">
      {images.map((img, i) => (
        <img
          key={img._key || i}
          src={urlFor(img).width(800).url()}
          alt={img.alt || `${title} image ${i + 1}`}
          loading="lazy"
        />
      ))}
    </div>
  )
}
