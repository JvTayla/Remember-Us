import { useEffect, useState } from 'react'

export default function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now()
    if (!targetDate || Number.isNaN(diff) || diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
    }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      done: false,
    }
  }

  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return time
}
