"use client";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";

export default function LocalTime({ timezone }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(DateTime.now().setZone(timezone));
    const interval = setInterval(() => {
      setNow(DateTime.now().setZone(timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div>
      Ship's Local Time: {now ? now.toFormat("HH:mm:ss") : "Loading..."} ({timezone})
    </div>
  );
}