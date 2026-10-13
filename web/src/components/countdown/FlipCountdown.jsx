'use client'

import { useEffect, useRef, useState } from 'react'
import './FlipCountdown.css'

// Fallback only. In the real site, pass the date from Sanity "Site Settings".
const DEFAULT_TARGET = '2026-11-20T09:00:00+02:00' // 20 Nov 2026, SAST

const pad = (n) => String(n).padStart(2, '0')

function getParts(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  const s = Math.floor(diff / 1000)
  return {
    done: diff === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

function FlipCard({ value }) {
  const [prev, setPrev] = useState(value)
  const [flips, setFlips] = useState(0)
  const curr = useRef(value)

  useEffect(() => {
    if (value !== curr.current) {
      setPrev(curr.current)
      curr.current = value
      setFlips((f) => f + 1)
    }
  }, [value])

  return (
    <div className="flip-card" aria-hidden="true">
      <div className="half top"><span>{value}</span></div>
      <div className="half bottom"><span>{flips ? prev : value}</span></div>
      {flips > 0 && (
        <>
          <div key={`t${flips}`} className="half top flap-top"><span>{prev}</span></div>
          <div key={`b${flips}`} className="half bottom flap-bottom"><span>{value}</span></div>
        </>
      )}
      <i className="clip l" />
      <i className="clip r" />
    </div>
  )
}

export function Unit({ value, label }) {
  const digits = pad(value).split('')
  return (
    <div className="unit">
      <div className="cards">
        {digits.map((d, i) => (
          <FlipCard key={i} value={d} />
        ))}
      </div>
      <span className="unit-label">{label}</span>
    </div>
  )
}

export default function FlipCountdown({
  target = DEFAULT_TARGET,
  title = 'Remember Us',
  subtitle = 'Digital Arts Exhibition 2026',
  location,
}) {
  const [t, setT] = useState(() => getParts(target))

  useEffect(() => {
    setT(getParts(target))
    const id = setInterval(() => setT(getParts(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <section className="countdown" aria-label="Countdown to the exhibition">
      {title && <h1 id="cd-title" className="cd-title">{title}</h1>}
      {subtitle && <p className="cd-sub">{subtitle}</p>}

      {t.done ? (
        <p className="cd-open">The exhibition is open.</p>
      ) : (
        <div
          className="clock"
          role="timer"
          aria-label={`${t.days} days, ${t.hours} hours, ${t.minutes} minutes until the exhibition`}
        >
          <Unit value={t.days} label="Days" />
          <span className="colon" aria-hidden="true" />
          <Unit value={t.hours} label="Hours" />
          <span className="colon" aria-hidden="true" />
          <Unit value={t.minutes} label="Minutes" />
          <span className="colon" aria-hidden="true" />
          <Unit value={t.seconds} label="Seconds" />
        </div>
      )}

      {location && <p className="cd-loc">{location}</p>}
    </section>
  )
}
