'use client';

import { useState, useEffect } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';

export default function Map() {
  const [location, setLocation] = useState([51.505, -0.09]); // Default to London

  return (
    <div>
      <h2>My Current Location</h2>
      {/* react-leaflet map will go here later */}
      <p>Map will be here. Current coords: {location.join(', ')}</p>
    </div>
  );
}