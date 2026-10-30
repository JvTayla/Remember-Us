// Fill in the real links. Entries with no href are hidden.
const SOCIALS = [
  { label: 'Instagram', href: '' },
  { label: 'Facebook', href: '' },
  { label: 'LinkedIn', href: '' },
]

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.href)
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p>Remember Us<br />4th Year Creative Project Showcase</p>
        {socials.length > 0 ? (
          <nav className="footer-socials" aria-label="Social media">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </nav>
        ) : <span />}
        <p className="right">Exhibition &apos;26</p>
      </div>
      <p className="footer-title" aria-hidden="true">Remember Us</p>
    </footer>
  )
}
