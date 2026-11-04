import { sanityFetch } from "@/lib/sanityClient";
import { siteSettingsQuery } from "@/lib/queries";
import { buildIcs } from "@/lib/calendar";

export const revalidate = 60;

export async function GET() {
  const settings = await sanityFetch(siteSettingsQuery);
  if (!settings?.eventDate) {
    return new Response("Event date not set", { status: 404 });
  }

  return new Response(
    buildIcs({
      eventDate: settings.eventDate,
      eventLocation: settings.eventLocation,
    }),
    {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="remember-us-exhibition.ics"',
      },
    },
  );
}
