import styles from '@/styles/RememberUsTitle.module.css'

const WORDS = ['REMEMBER', 'US']

// Fixed values (not random) so server and client render the same markup
const ROTATIONS = [-3, 2, -1.5, 3, -2, 1, -3.5, 2.5]
const OFFSETS = [0.04, -0.05, 0.02, -0.03, 0.05, -0.02, 0.03, -0.04] // em
const VARIANTS = 3 // paper / tan / ink, see CSS

const MIN_PHOTOS = 6

function photoSrc(url) {
  return `${url}?w=240&h=240&fit=crop&auto=format`
}

export default function RememberUsTitle({ images = [], speed }) {
  const photos = (images || []).filter((img) => img?.url)

  // Repeat a small set so each half of the loop is wide enough
  const group = photos.length
    ? Array.from({ length: Math.ceil(MIN_PHOTOS / photos.length) }).flatMap(() => photos)
    : []

  let n = 0

  return (
    <h1
      className={styles.title}
      style={speed ? { '--duration': `${speed}s` } : undefined}
    >
      <span className={styles.srOnly}>Remember Us</span>

      <span className={styles.marquee} aria-hidden="true">
        {group.length > 0 && (
          <span className={styles.track}>
            {[0, 1].map((copy) => (
              <span className={styles.group} key={copy}>
                {group.map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${copy}-${i}`}
                    className={styles.photo}
                    src={photoSrc(img.url)}
                    alt=""
                    width={240}
                    height={240}
                  />
                ))}
              </span>
            ))}
          </span>
        )}
      </span>

      <span className={styles.letters} aria-hidden="true">
        {WORDS.map((word) => (
          <span className={styles.word} key={word}>
            {[...word].map((ch) => {
              const i = n++
              return (
                <span
                  key={i}
                  className={styles.tile}
                  data-variant={i % VARIANTS}
                  style={{
                    '--r': `${ROTATIONS[i % ROTATIONS.length]}deg`,
                    '--y': `${OFFSETS[i % OFFSETS.length]}em`,
                  }}
                >
                  {ch}
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </h1>
  )
}
