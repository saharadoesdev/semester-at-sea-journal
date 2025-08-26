import { createClient } from "@/utils/supabase/server";
import MapDynamicWrapper from "../components/map/MapDynamicWrapper";
import LocalTime from "@/components/map/LocalTime";
import JournalArchive from "@/components/journal/JournalArchive";
import Link from 'next/link';
import Arc from 'arc';
import itinerary from "@/data/itinerary.json";
import styles from "./page.module.css";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("JournalEntries")
    .select()
    .order("created_at", { ascending: false })
    .limit(1); // probably increase later

  const { data: countries, error: countriesError } = await supabase
    .from("Countries")
    .select("name, flag_emoji");
  const countryFlags = {};
  if (countries) {
    countries.forEach((country) => {
      countryFlags[country.name] = country.flag_emoji;
    });
  }

  function calculateTravelStatus(itinerary, currentDate) {
    for (let i = 0; i < itinerary.length; i++) {
      const currentStop = itinerary[i];
      const arrivalTime = new Date(currentStop.arrivalDate);
      const departureTime = new Date(currentStop.departureDate);

      // check if currently in a port
      if (currentDate >= arrivalTime && currentDate <= departureTime) {
        const visitedCountries = itinerary.slice(0, i).map(stop => stop.country).filter(Boolean);
        const futureCountries = itinerary.slice(i + 1).map(stop => stop.country).filter(Boolean);
        
        return {
          status: 'In Port',
          currentLocation: currentStop,
          visitedCountries: [...new Set(visitedCountries)],
          futureCountries: [...new Set(futureCountries)],
        };
      }

      // check if currently at sea
      if (i + 1 < itinerary.length) {
        const nextStop = itinerary[i + 1];
        const nextArrivalTime = new Date(nextStop.arrivalDate);

        if (currentDate > departureTime && currentDate < nextArrivalTime) {
          const visitedCountries = itinerary.slice(0, i + 1).map(stop => stop.country).filter(Boolean);
          const futureCountries = itinerary.slice(i + 2).map(stop => stop.country).filter(Boolean);

          return {
            status: 'At Sea',
            lastPort: currentStop,
            nextPort: nextStop,
            visitedCountries: [...new Set(visitedCountries)],
            futureCountries: [...new Set(futureCountries)],
          };
        }
      }
    }

    // if loop finishes, voyage is either not started or over
    if (currentDate < new Date(itinerary[0].arrivalDate)) {
      return { status: 'Not Started' };
    } else {
      return { status: 'Completed' };
    }
  }
  
  function generateCurvedPath(startCoords, endCoords) {
    const start = { x: startCoords[1], y: startCoords[0] }; // lng, lat
    const end = { x: endCoords[1], y: endCoords[0] }; // lng, lat

    const generator = new Arc.GreatCircle(start, end);
    
    const line = generator.Arc(50); // generates 50 points along arc
    
    // coords are [lng, lat]; need to flip for leaflet
    return line.geometries[0].coords.map(([lng, lat]) => [lat, lng]);
  }

  function calculatePaths(itinerary, travelStatus) {
    if (travelStatus.status === 'Not Started' || travelStatus.status === 'Completed') {
      const fullPath = itinerary.map(stop => stop.coords);
      return {
        completedPath: travelStatus.status === 'Completed' ? fullPath : [],
        futurePath: travelStatus.status === 'Not Started' ? fullPath : [],
      };
    }

    let lastPortIndex = -1;

    if (travelStatus.status === 'In Port') {
      // Find the index of the current port
      lastPortIndex = itinerary.findIndex(stop => stop.city === travelStatus.currentLocation.city);
    } else { // 'At Sea'
      // Find the index of the last port we were at
      lastPortIndex = itinerary.findIndex(stop => stop.city === travelStatus.lastPort.city);
    }

    if (lastPortIndex === -1) return { completedPath: [], futurePath: [] };

    // const completedPath = itinerary.slice(0, lastPortIndex + 1).map(stop => stop.coords);

    // const futurePath = itinerary.slice(lastPortIndex).map(stop => stop.coords);

    const completedPoints = itinerary.slice(0, lastPortIndex + 1);
    const futurePoints = itinerary.slice(lastPortIndex);

    const completedPath = [];
    // Loop through each segment of the completed path
    for (let i = 0; i < completedPoints.length - 1; i++) {
      const start = completedPoints[i].coords;
      const end = completedPoints[i + 1].coords;
      // Generate the curve for this segment and add it to the final path
      completedPath.push(...generateCurvedPath(start, end));
    }

    const futurePath = [];
    // Loop through each segment of the future path
    for (let i = 0; i < futurePoints.length - 1; i++) {
      const start = futurePoints[i].coords;
      const end = futurePoints[i + 1].coords;
      futurePath.push(...generateCurvedPath(start, end));
    }

    return { completedPath, futurePath };
  }

  const currentDate = new Date('2025-09-29T05:41:00.000Z');

  const travelStatus = calculateTravelStatus(itinerary, currentDate);

  const { completedPath, futurePath } = calculatePaths(itinerary, travelStatus);
  
  const currentShipPosition = [15.3, 73.8]; // placeholder

  const mapProps = {
    travelStatus,
    completedPath,
    futurePath,
    currentShipPosition,
    itinerary,
    countryFlags,
  };

  return (
    <>
      <MapDynamicWrapper {...mapProps}/>
      <div className={styles.page}>
        <LocalTime timezone="Europe/Amsterdam" />
        <h2>Latest Update ↓</h2>
        <JournalArchive posts={posts || []} />
        
        <h1>Welcome to My Voyage!</h1>
        <p>
          Explore the world with me as I document my travels on my Semester at
          Sea journey.
        </p>
        <h3 style={{ textAlign: 'center' }}>{`Over the next 100 days, I'll be visiting 11 countries across three continents. `}<Link style={{ color: '#fb6962', textDecoration: 'underline' }} href="/route">Explore the full itinerary.</Link></h3>
        <br /><br />
        {/* <div className={styles.JournalCards}>
        <JournalCard />
        <JournalCard />
        <JournalCard />
      </div> */}
      </div>
    </>
  );
}
