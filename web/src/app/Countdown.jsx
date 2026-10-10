'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from '@/styles/Countdown.module.css'

const TZ = 'Africa/Johannesburg'

function remaining(target) {
  const total = Math.max(0, Math.floor((target - Date.now()) / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    mins: Math.floor((total % 3600) / 60),
    secs: total % 60,
    done: total === 0,
  }
}

function formatEventDate(iso) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
      .formatToParts(new Date(iso))
      .map((p) => [p.type, p.value])
  )
  const time = `${parts.hour}:${parts.minute}${parts.dayPeriod.toUpperCase()}`
  return `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year} at ${time}`
}

function Tile({ value, label }) {
  return (
    <div className={styles.tile}>
      <div className={styles.num} aria-hidden="true">
        {String(value).padStart(2, '0')}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}

export default function Countdown({ eventDate, eventLocation }) {
  // null until mounted, so server and client markup match
  const [time, setTime] = useState(null)

  useEffect(() => {
    if (!eventDate) return
    const target = new Date(eventDate).getTime()
    setTime(remaining(target))
    const id = setInterval(() => setTime(remaining(target)), 1000)
    return () => clearInterval(id)
  }, [eventDate])

  const dateLine = useMemo(() => (eventDate ? formatEventDate(eventDate) : ''), [eventDate])

  if (!eventDate) return null

  const t = time ?? { days: 0, hours: 0, mins: 0, secs: 0, done: false }

  return (
    <>
      {t.done ? (
        <p className={styles.live}>The exhibition is open.</p>
      ) : (
        <div
          className={`${styles.countdown} ${time ? '' : styles.pending}`}
          role="timer"
          aria-label={
            time
              ? `${t.days} days, ${t.hours} hours, ${t.mins} minutes until the exhibition`
              : undefined
          }
        >
          <Tile value={t.days} label="days" />
          <Tile value={t.hours} label="hours" />
          <Tile value={t.mins} label="mins" />
          <Tile value={t.secs} label="secs" />
        </div>
      )}

      <p className={styles.date} suppressHydrationWarning>{dateLine}</p>
      {eventLocation && <p className={styles.location}>{eventLocation}</p>}
      {!t.done && <p className={styles.save}>Save the date</p>}
    </>
  )
}
