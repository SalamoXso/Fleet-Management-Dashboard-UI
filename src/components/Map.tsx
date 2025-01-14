'use client'; // Ensure this is a Client Component

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import { Vehicle } from '../types'; // Import the correct Vehicle type

interface MapProps {
  vehicles: Vehicle[];
}

export default function Map({ vehicles }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure the API key is defined
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is missing. Please check your environment variables.');
    }

    const loader = new Loader({
      apiKey, // This is now guaranteed to be a string
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.0060 },
          zoom: 10,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          ],
        });

        // Add markers for vehicles
        vehicles?.forEach((vehicle) => {
          new google.maps.Marker({
            position: { lat: vehicle.lat, lng: vehicle.lng },
            map,
            title: vehicle.name,
          });
        });
      }
    });
  }, [vehicles]);

  return <div ref={mapRef} className="w-full h-full" />;
}