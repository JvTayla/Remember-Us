'use client'

import { useEffect, useState } from 'react'

const EMPTY = { days: 0, hours: 0, minutes: 0, seconds: 0, done: false, ready: false }

function calc(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (!targetDate || Number.isNaN(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true, ready: true }
  }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
    ready: true,
  }
}

// Starts empty and fills in after mount, so server and browser output match.
export default function useCountdown(targetDate) {
  const [time, setTime] = useState(EMPTY)

  useEffect(() => {
    setTime(calc(targetDate))
    const id = setInterval(() => setTime(calc(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return time
}
