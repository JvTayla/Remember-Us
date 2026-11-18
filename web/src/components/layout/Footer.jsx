import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanityClient";
import { siteSettingsQuery } from "@/lib/queries";
import { googleCalendarUrl } from "@/lib/calendar";
import logo from "@/assets/footerLogo.png";
import styles from "@/styles/Footer.module.css";

// ---- Edit these -------------------------------------------------------------
const INSTAGRAM_URL = "https://www.instagram.com/witsdigitalarts/?hl=en";
const INSTAGRAM_HANDLE = "@witsdigitalarts";
// What the map shows. The venue is still "to be confirmed", so this points at
// the school. Once it is final, either change this text, or paste Google Maps'
// "Embed a map" URL (src="...") into Event Map URL in Sanity.
const MAP_QUERY =
  "Wits School of Arts, University of the Witwatersrand, Johannesburg";
const FALLBACK_LOCATION = "Exhibition Hall (venue to be confirmed)";
// -----------------------------------------------------------------------------

const TZ = "Africa/Johannesburg";

function formatEventDate(iso) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
      .formatToParts(new Date(iso))
      .map((p) => [p.type, p.value]),
  );
  const time = `${parts.hour}:${parts.minute}${parts.dayPeriod.toUpperCase()}`;
  return `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year} at ${time}`;
}

async function getSettings() {
  try {
    return await sanityFetch(siteSettingsQuery);
  } catch {
    return null; // the footer should never take the page down
  }
}

export default async function Footer() {
  const settings = await getSettings();
  const eventDate = settings?.eventDate;
  const location = settings?.eventLocation || FALLBACK_LOCATION;

  const embedUrl = settings?.eventMapUrl?.includes("google.com/maps/embed")
    ? settings.eventMapUrl
    : `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
  const openUrl =
    settings?.eventMapUrl && !settings.eventMapUrl.includes("/maps/embed")
      ? settings.eventMapUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.glass}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Image
              className={styles.logo}
              src={logo}
              alt="The Wits School of Arts, Digital Arts. Remember Us, Exhibition '26"
              sizes="(max-width: 900px) 90vw, 480px"
            />
            <p className={styles.tagline}>
              {settings?.tagline || "4th Year Creative Project Showcase"}
            </p>
          </div>

          <div className={styles.links}>
            <a
              className={styles.social}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
              </svg>
              <span>
                Instagram
                <small>{INSTAGRAM_HANDLE}</small>
              </span>
            </a>
          </div>

          <div className={styles.visit}>
            <h2 className={styles.heading}>Find us</h2>
            <p className={styles.location}>{location}</p>
            <div className={styles.map}>
              <iframe
                src={embedUrl}
                title="Map showing the exhibition location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              className={styles.mapLink}
              href={openUrl}
              target="_blank"
              rel="noreferrer"
            ></a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; Rememberus2026</p>
          <a href="#top">Back to top &uarr;</a>
        </div>
      </div>
    </footer>
  );
}