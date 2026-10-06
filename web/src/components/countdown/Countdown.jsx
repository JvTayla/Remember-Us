"use client";

import { useEffect, useState } from "react";
import useCountdown from "@/hooks/useCountdown";
import { Unit } from "./FlipCountdown";

export default function Countdown({ eventDate, eventLocation }) {
  const { days, hours, minutes, seconds, done, ready } =
    useCountdown(eventDate);
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    if (eventDate) {
      setFormatted(
        new Date(eventDate).toLocaleString([], {
          dateStyle: "full",
          timeStyle: "short",
        }),
      );
    }
  }, [eventDate]);

  if (!eventDate) return null;
  return (
    <section className="countdown">
      {ready &&
        (done ? (
          <h2>The exhibition is live!</h2>
        ) : (
          <div className="clock">
            <Unit value={days} label="Days" />
            <span className="colon" aria-hidden="true" />
            <Unit value={hours} label="Hours" />
            <span className="colon" aria-hidden="true" />
            <Unit value={minutes} label="Minutes" />
            <span className="colon" aria-hidden="true" />
            <Unit value={seconds} label="Seconds" />
          </div>
        ))}
      <p>{formatted}</p>
      {eventLocation && <p>{eventLocation}</p>}
    </section>
  );
}
