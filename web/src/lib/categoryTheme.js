// One place to tweak category colours. Only Animation comes straight from the
// mockup; the rest use the stripe palette from the Visual Design panel.
const THEMES = [
  { match: /anim/i,           panel: '#d9d9d9', panelInk: '#0d0d0d', accent: '#ffbbba', accentInk: '#0d0d0d', art: '#ca2f1d' },
  { match: /game/i,           panel: '#0d0d0d', panelInk: '#ffffff', accent: '#ca2f1d', accentInk: '#ffffff', art: '#680000' },
  { match: /\bai\b|im\b/i,    panel: '#680000', panelInk: '#ffffff', accent: '#a2a2a2', accentInk: '#0d0d0d', art: '#0d0d0d' },
  { match: /visual|narrat/i,  panel: '#5babaa', panelInk: '#0d0d0d', accent: '#ffffff', accentInk: '#0d0d0d', art: '#156468' },
  { match: /vr|xr/i,          panel: '#a2a2a2', panelInk: '#0d0d0d', accent: '#5babaa', accentInk: '#0d0d0d', art: '#ca2f1d' },
]

export function categoryTheme(category) {
  const key = `${category?.slug ?? ''} ${category?.title ?? ''}`
  const t = THEMES.find((x) => x.match.test(key)) ?? THEMES[0]
  return {
    '--panel': t.panel, '--panel-ink': t.panelInk,
    '--accent': t.accent, '--accent-ink': t.accentInk, '--art': t.art,
  }
}
