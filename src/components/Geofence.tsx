'use client'; // Ensure this is a Client Component

import { useState, useEffect } from 'react';
import { GoogleMap, Polygon, useJsApiLoader } from '@react-google-maps/api';

export default function Geofence({ vehicle, isEditing = false }) {
  const [geofences, setGeofences] = useState([]);
  const [newGeofence, setNewGeofence] = useState(null);

  useEffect(() => {
    const fetchGeofences = async () => {
      try {
        const response = await fetch(`/api/vehicles/${vehicle.id}/geofences`);
        const data = await response.json();
        setGeofences(data);
      } catch (error) {
        console.error('Error fetching geofences:', error);
      }
    };

    fetchGeofences();
  }, [vehicle]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">
        {isEditing ? 'Set Geofence' : 'View Geofences'} for {vehicle.name}
      </h3>
      {isEditing && (
        <button
          className="mb-4 p-2 bg-orange-500 rounded"
          onClick={() => setNewGeofence(true)}
        >
          Create New Geofence
        </button>
      )}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 40.7128, lng: -74.0060 }}
        zoom={10}
      >
        {geofences.map((geofence) => (
          <Polygon
            key={geofence.id}
            paths={geofence.coordinates}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}