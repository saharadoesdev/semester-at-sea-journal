"use client";
import { useState, useEffect } from "react";
import TimelineCard from './TimelineCard';

export default function RouteTimeline({ itinerary, flags }) {
  //   const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(
    new Date("2025-10-15T19:00+00:00")
  );

  // ensures date is fresh on client side
  useEffect(() => {
    // setCurrentDate(new Date());
    setCurrentDate(new Date("2025-10-15T19:00+00:00"));
  }, []);

  const getStatus = (arrival, departure) => {
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    if (currentDate > departureDate) return "Visited";
    if (currentDate >= arrivalDate && currentDate <= departureDate)
      return "Current";
    return "Upcoming";
  };

  return (
    <div className="timeline">
      {/* need to put prologue card at the top */}

      {itinerary.map((stop, index) => (
        <div key={stop.city} className="timeline-stop">
           <TimelineCard 
            city={stop.city}
            country={stop.country}
            flag={flags[stop.country]}
            dates={`${new Date(stop.arrivalDate).toLocaleDateString()} - ${new Date(stop.departureDate).toLocaleDateString()}`}
            status={getStatus(stop.arrivalDate, stop.departureDate)}
            countrySlug={stop.country.toLowerCase().replace(/ /g, '-')}
          />
          {/* <h3>
            {stop.city}, {stop.country}
          </h3>
          <p>
            Dates: {new Date(stop.arrivalDate).toLocaleDateString()} -{" "}
            {new Date(stop.departureDate).toLocaleDateString()}
          </p>
          <p>Status: {getStatus(stop.arrivalDate, stop.departureDate)}</p>
          <p>Country Slug: {stop.country.toLowerCase().replace(/ /g, "-")}</p> */}

          {index < itinerary.length - 1 && (
            <div className="timeline-connector">
              <a href="/at-sea" className="at-sea-link">
                🚢
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
