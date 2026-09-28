import useCountdown from '../../hooks/useCountdown.js'

export default function Countdown({ eventDate, eventLocation }) {
  const { days, hours, minutes, seconds, done } = useCountdown(eventDate)

  if (!eventDate) return null

  const formatted = new Date(eventDate).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })

  return (
    <section>
      {done ? <h2>The exhibition is live!</h2> : (
        <div className="countdown">
          <div><strong>{days}</strong>days</div>
          <div><strong>{hours}</strong>hours</div>
          <div><strong>{minutes}</strong>min</div>
          <div><strong>{seconds}</strong>sec</div>
        </div>
      )}
      <p>{formatted}</p>
      {eventLocation && <p>{eventLocation}</p>}
    </section>
  )
}
