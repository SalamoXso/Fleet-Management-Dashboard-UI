'use client'; // Ensure this is a Client Component

import { useState, useEffect } from 'react';
import { Polyline } from '@react-google-maps/api';

export default function History({ vehicle }) {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`/api/vehicles/${vehicle.id}/trips`);
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, [vehicle]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Trip History</h3>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id} className="mb-2">
            <button
              className="w-full p-2 rounded hover:bg-gray-800 text-left"
              onClick={() => setSelectedTrip(trip)}
            >
              <div className="font-medium">{trip.name}</div>
              <div className="text-sm text-gray-400">
                {new Date(trip.startTime).toLocaleString()} - {new Date(trip.endTime).toLocaleString()}
              </div>
            </button>
          </li>
        ))}
      </ul>
      {selectedTrip && (
        <div className="mt-4">
          <h4 className="text-lg font-bold mb-2">{selectedTrip.name}</h4>
          <Polyline
            path={selectedTrip.route}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
          />
        </div>
      )}
    </div>
  );
}