export default function SocialLinks({ linkedin, socials = [] }) {
  return (
    <ul>
      {linkedin && <li><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>}
      {socials.map((s) => (
        <li key={s._key || s.url}>
          <a href={s.url} target="_blank" rel="noreferrer">{s.platform}</a>
        </li>
      ))}
    </ul>
  )
}
