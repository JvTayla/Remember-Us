/*this is the star thingies*/
export default function Asterisk({ id, className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
      </defs>
      <g fill="currentColor" filter={`url(#${id})`}>
        {[0, 45, 90, 135].map((angle) => (
          <path
            key={angle}
            d="M50 2 L55.5 50 L50 98 L44.5 50 Z"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}
