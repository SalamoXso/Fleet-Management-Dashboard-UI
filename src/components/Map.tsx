import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function Map({ vehicles }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Ensure this matches your env variable
      version: 'weekly',
    });

    loader.load().then(() => {
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
      vehicles?.forEach((vehicle) => { // Use optional chaining to avoid errors
        new google.maps.Marker({
          position: { lat: vehicle.lat, lng: vehicle.lng },
          map,
          title: vehicle.name,
        });
      });
    });
  }, [vehicles]);

  return <div ref={mapRef} className="w-full h-full" />;
}