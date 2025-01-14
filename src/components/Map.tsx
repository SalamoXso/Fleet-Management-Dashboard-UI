'use client'; // Ensure this is a Client Component

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import { Vehicle } from '../types'; // Import the correct Vehicle type

interface MapProps {
  vehicles: Vehicle[];
}

export default function Map({ vehicles }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false); // Track if the API key is missing

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // If the API key is missing, show the mockup map
    if (!apiKey) {
      setApiKeyMissing(true);
      return;
    }

    // Load the Google Maps API
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

  // Render the mockup map if the API key is missing
  if (apiKeyMissing) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-orange-500 mb-4">Mockup Map</h2>
          <p className="text-gray-300 mb-4">
            Google Maps API key is missing. Displaying a mockup map.
          </p>
          <div className="relative w-full h-96 bg-gray-700 rounded-lg">
            {/* Mockup markers for vehicles */}
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="absolute"
                style={{
                  left: `${((vehicle.lng + 180) / 360) * 100}%`,
                  top: `${((90 - vehicle.lat) / 180) * 100}%`,
                }}
              >
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <div className="text-xs text-white mt-1">{vehicle.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render the actual Google Map
  return <div ref={mapRef} className="w-full h-full" />;
}