'use client'

import { useEffect, useState } from 'react'
import useCountdown from '@/hooks/useCountdown'

export default function Countdown({ eventDate, eventLocation }) {
  const { days, hours, minutes, seconds, done, ready } = useCountdown(eventDate)
  const [formatted, setFormatted] = useState('')

  useEffect(() => {
    if (eventDate) {
      setFormatted(new Date(eventDate).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' }))
    }
  }, [eventDate])

  if (!eventDate) return null

  return (
    <section>
      {ready && (done ? <h2>The exhibition is live!</h2> : (
        <div className="countdown">
          <div><strong>{days}</strong>days</div>
          <div><strong>{hours}</strong>hours</div>
          <div><strong>{minutes}</strong>min</div>
          <div><strong>{seconds}</strong>sec</div>
        </div>
      ))}
      <p>{formatted}</p>
      {eventLocation && <p>{eventLocation}</p>}
    </section>
  )
}
