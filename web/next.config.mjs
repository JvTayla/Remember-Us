const landingOnly = process.env.LANDING_ONLY === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // In landing-only mode, every other page sends visitors back to the landing page.
  async redirects() {
    if (!landingOnly) return [];
    return [
      "/about",
      "/archive",
      "/submit",
      "/category/:path*",
      "/project/:path*",
      "/person/:path*",
    ].map((source) => ({ source, destination: "/", permanent: false }));
  },
}

export default nextConfig
