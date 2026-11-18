export const DEFAULT_HERO = { bg: "#b71c17", fg: "#ffffff" };

const norm = (c) => c.title ?? "";

export const FOLDERS = [
  {
    key: "ai-im",
    hero: { bg: "#b71c17", fg: "#ffffff" },
    matches: [
      (c) => c.slug === "ai-im" || /^\s*ai\s*\+\s*im\s*$/i.test(norm(c)),
    ],
    art: { src: "/archive-art/ai-im-hands.png", ratio: "953 / 451" },
  },
  {
    key: "games",
    hero: { bg: "#1a5456", fg: "#f0ece4" },
    matches: [(c) => c.slug === "games" || /^\s*games?\s*$/i.test(norm(c))],
    art: {
      src: "/archive-art/games-invaders.png",
      ratio: "979 / 748",
      inset: true, // archive: sits in the middle of the folder
      color: "#f0ece4", // cream, because black is too dark on teal
    },
  },
  {
    key: "narrative-visual-design",
    // Two Sanity categories shown as ONE folder: counts are added up, and the
    // category page shows the projects from both, with filter chips.
    title: "Narrative + Visual Design",
    hero: { bg: "#509c99", fg: "#0e2f31" },
    matches: [
      (c) => c.slug === "narrative" || /^\s*narrative\b/i.test(norm(c)),
      (c) =>
        c.slug === "visual-design" || /^\s*visual\s+design\s*$/i.test(norm(c)),
    ],
    art: {
      src: "/archive-art/visual-design-pen.png",
      ratio: "979 / 869",
      inset: true,
    },
  },
  {
    key: "animations",
    hero: { bg: "#b71c17", fg: "#ffffff" },
    matches: [
      (c) => c.slug === "animations" || /^\s*animations\s*$/i.test(norm(c)),
    ],
    art: {
      src: "/archive-art/animation-horses.png",
      ratio: "1199 / 803",
      inset: true,
    },
  },
];

/**
 * Turns the Sanity category list into the folders to show.
 * Returns: [{ key, title, slug, primary, count, parts, art, hero }]
 *   slug    = the first matching category (where the folder links to)
 *   parts   = every category inside the folder: [{ slug, title, count }]
 */
export function resolveFolders(categories, { warn = true } = {}) {
  const list = categories ?? [];
  return FOLDERS.flatMap((folder) => {
    const found = folder.matches.map((m) => list.find(m)).filter(Boolean);
    if (!found.length) {
      if (warn) {
        console.warn(
          "[archive] No category matched this folder. Check its slug/title in Sanity:",
          folder.key,
        );
      }
      return [];
    }
    const [primary] = found;
    return [
      {
        key: folder.key,
        title: folder.title ?? primary.title,
        slug: primary.slug,
        primary,
        count: found.reduce((sum, c) => sum + (c.count ?? 0), 0),
        parts: found.map((c) => ({
          slug: c.slug,
          title: c.title,
          count: c.count ?? 0,
        })),
        art: folder.art ?? null,
        hero: folder.hero ?? DEFAULT_HERO,
      },
    ];
  });
}
