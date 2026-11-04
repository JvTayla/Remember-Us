// Helpers for the "Add to calendar" links on the landing page.
// Sanity only stores a start time, so every event gets this default length.
export const DEFAULT_DURATION_HOURS = 3;

const TITLE = "Remember Us: Exhibition '26";
const DESCRIPTION = "Remember Us, the 4th year creative project showcase.";

// 2026-11-21T07:00:00Z -> 20261121T070000Z
function toCalendarStamp(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function range(eventDate) {
  const start = new Date(eventDate);
  const end = new Date(start.getTime() + DEFAULT_DURATION_HOURS * 3600 * 1000);
  return { start: toCalendarStamp(start), end: toCalendarStamp(end) };
}

export function googleCalendarUrl({ eventDate, eventLocation }) {
  const { start, end } = range(eventDate);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${start}/${end}`,
    details: DESCRIPTION,
  });
  if (eventLocation) params.set("location", eventLocation);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function buildIcs({ eventDate, eventLocation }) {
  const { start, end } = range(eventDate);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Remember Us//Exhibition//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:remember-us-exhibition-26@remember-us",
    `DTSTAMP:${toCalendarStamp(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcs(TITLE)}`,
    `DESCRIPTION:${escapeIcs(DESCRIPTION)}`,
  ];
  if (eventLocation) lines.push(`LOCATION:${escapeIcs(eventLocation)}`);
  lines.push("END:VEVENT", "END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
