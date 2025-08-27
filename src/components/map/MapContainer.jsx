"use client";

import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Polyline, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import Link from "next/link";
import styles from "./MapContainer.module.css";

export default function Map(mapProps) {
  // function MapClickAlert() {     // this is for finding waypoint positions
  //   useMapEvent("click", (e) => {
  //     alert(`Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`);
  //   });
  //   return null;
  // }
  const position = [20, 0]; // Initial center of the map

  // placeholders; these will be passed in from page.js later
  // const visitedCountries = ["Netherlands", "France"];
  // const currentCountry = "Spain";
  // const nextCountry = "Morocco";
  // const futureCountries = ["Ghana", "South Africa", "Mauritius", "India", "Hong Kong", "Vietnam", "Thailand"];
  const { travelStatus, completedPath, futurePath, currentShipPosition, itinerary, countryFlags } = mapProps;

  const [geoJsonData, setGeoJsonData] = useState(null);

  // const currentShipPosition = calculateCurrentPosition(itinerary);
  // const currentShipPosition = [15.3, 73.8]; // placeholder
  const visitedCountries = travelStatus.visitedCountries || [];
  // const currentCountry = travelStatus.currentLocation.country || "";
  // const nextCountry = travelStatus.nextCountry || "";

  let currentCountry = "";
  let nextCountry = "";

  if (travelStatus.status === "In Port" && travelStatus.currentLocation) {
    currentCountry = travelStatus.currentLocation.country || "";
  }
  if (travelStatus.status === "At Sea" && travelStatus.nextPort) {
    nextCountry = travelStatus.nextPort.country || "";
  }


  const futureCountries = travelStatus.futureCountries || [];

  const shipIcon = new L.Icon({
    iconUrl: "/ship-icon.svg",
    iconSize: [65, 65],
  });

  const completedPathOptions = { color: 'white', weight: 2, opacity: 0.8 };

  const futurePathOptions = { color: 'white', weight: 2, opacity: 0.8, dashArray: '7, 10' };

  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    fetch("/countries.json")
      .then((res) => res.json())
      .then((data) => {
        const itineraryCountries = [
          ...visitedCountries,
          currentCountry,
          // nextCountry,
          ...futureCountries,
        ];
        const filteredFeatures = data.features.filter((feature) =>
          itineraryCountries.includes(feature.properties.name)
        );
        setGeoJsonData({ ...data, features: filteredFeatures });
      });
  }, []);

  // Determines color for each country
  function countryStyle(feature) {
    const countryName = feature.properties.name;
    if (visitedCountries.includes(countryName)) {
      return {
        color: "#ffffff",
        weight: 1,
        dashArray: "6 4",
        // fillColor: "#00ff00",
        fillOpacity: 0.2,
      }; // Green for visited
    }
    if (countryName === currentCountry) {
      return {
        color: "#ffffff",
        weight: 1.5,
        // fillColor: "#ffff00",
        fillOpacity: 0.3,
      }; // Yellow for current
    }
    if (countryName === nextCountry) {
      return {
        color: "#ffffff",
        weight: 1,
        // fillColor: "#ffa500",
        fillOpacity: 0.2,
      }; // Orange for next
    }
    if (futureCountries.includes(countryName)) {
      return {
        color: "#ffffff",
        weight: 1,
        dashArray: "1 4",
        // fillColor: "#00ff00",
        fillOpacity: 0.1,
      }; // Green for visited
    }
    // Default outline/fill style for all other countries - invisible
    return { color: "transparent", fillColor: "transparent" };
  }

  function onEachCountry(country, layer) {
    layer.on("click", (e) => {
      // router.push(`/journal/${country.properties.name}`);
      // alert(`You clicked on ${country.properties.name}`);
      // layer.bindPopup(country.properties.name).openPopup();
      setPopupInfo({
        name: country.properties.name,
        latlng: e.latlng,
      });
    });
  }

  return (
    <div className={styles.mapContainer}>
        <MapContainer
        center={position}
        zoom={2}
        style={{ height: "calc(100vh - 64px - 80px)", width: "100%" }}
        minZoom={3}
        maxZoom={9}
        scrollWheelZoom={false}
        maxBounds={L.latLngBounds(L.latLng(-50, -25), L.latLng(80, 180))}   // need to experiment with these
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

        <Polyline pathOptions={completedPathOptions} positions={completedPath} />
        <Polyline pathOptions={futurePathOptions} positions={futurePath} />
        
        <Marker position={currentShipPosition} icon={shipIcon}>
            <Popup>My current location! Heading to Ghana next.</Popup>
        </Marker>

        {popupInfo && (
          <Popup
            position={popupInfo.latlng}
            eventHandlers={{
              remove: () => setPopupInfo(null),
            }}
          >
            <div>
              <span style={{ fontSize: "1.5em" }}>
                {countryFlags?.[popupInfo.name] || ""}
              </span>
              <br />
              <strong>{popupInfo.name}</strong>
              <br />
              <Link href={`/country/${popupInfo.name.toLowerCase().replace(/ /g, '-')}`}>
                <span style={{ color: "#0070f3", textDecoration: "underline", cursor: "pointer" }}>
                  Explore this country &rarr;
                </span>
              </Link>
            </div>
          </Popup>
        )}


        {/* <MapClickAlert /> */}
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
