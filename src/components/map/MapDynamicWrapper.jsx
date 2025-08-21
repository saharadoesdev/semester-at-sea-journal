'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function DynamicMap(mapProps) {
  const Map = useMemo(() => dynamic(
    () => import('@/components/map/MapContainer'),
    {
      loading: () => <p>A map is loading...</p>,
      ssr: false
    }
  ), []);

  return <Map {...mapProps} />;
}