"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";
import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import styles from "./MapContainer.module.css";

export default function Map() {
  const position = [20, 0]; // Initial center of the map

  const visitedCountries = ["Netherlands", "France"];
  const currentCountry = "Spain";
  const nextCountry = "Morocco";

  const [geoJsonData, setGeoJsonData] = useState(null);

  // const currentShipPosition = calculateCurrentPosition(itinerary);
  const currentShipPosition = [15.3, 73.8]; // placeholder

  const shipIcon = new L.Icon({
    iconUrl: "/globe.svg", // should be ship-icon.png later
    iconSize: [40, 40],
  });

  useEffect(() => {
    fetch("/countries.json")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  // Determines color for each country
  function countryStyle(feature) {
    const countryName = feature.properties.name;
    if (visitedCountries.includes(countryName)) {
      return {
        color: "#00ff00",
        weight: 1,
        fillColor: "#00ff00",
        fillOpacity: 0.3,
      }; // Green for visited
    }
    if (countryName === currentCountry) {
      return {
        color: "#ffff00",
        weight: 2,
        fillColor: "#ffff00",
        fillOpacity: 0.5,
      }; // Yellow for current
    }
    if (countryName === nextCountry) {
      return {
        color: "#ffa500",
        weight: 1,
        fillColor: "#ffa500",
        fillOpacity: 0.4,
      }; // Orange for next
    }
    // Default outline/fill style for all other countries - invisible
    return { color: "transparent", fillColor: "transparent" };
  }

  function onEachCountry(country, layer) {
    layer.on("click", (e) => {
      // router.push(`/journal/${country.properties.name}`);
      alert(`You clicked on ${country.properties.name}`);
    });
  }

  return (
    <div className={styles.mapContainer}>
        <MapContainer
        center={position}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
        >
        <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />

        {geoJsonData && (
            <GeoJSON
            data={geoJsonData}
            style={countryStyle}
            onEachFeature={onEachCountry}
            />
        )}
        
        <Marker position={currentShipPosition} icon={shipIcon}>
            <Popup>My current location! Heading to Ghana next.</Popup>
        </Marker>
        </MapContainer>
    </div>
  );
}

// export default function Map() {
//   const [location, setLocation] = useState([51.505, -0.09]); // Default to London

//   return (
//     <div>
//       <h2>My Current Location</h2>
//       {/* react-leaflet map will go here later */}
//       <p>Map will be here. Current coords: {location.join(', ')}</p>
//     </div>
//   );
// }
