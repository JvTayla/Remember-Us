// When LANDING_ONLY=true, the site shows just the landing hero:
// no nav bar, no footer, no project grid, and every other page redirects to "/".
// Set it in Vercel for the Production environment only (see README).
export const LANDING_ONLY = process.env.LANDING_ONLY === "true";
