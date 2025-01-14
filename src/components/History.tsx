'use client'; // Ensure this is a Client Component

import { useState, useEffect } from 'react';
import { Polyline } from '@react-google-maps/api';
import { Vehicle } from '../types'; // Import the correct Vehicle type

// Define the Trip interface
interface Trip {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  route: google.maps.LatLngLiteral[]; // Assuming route is an array of LatLngLiteral objects
}

// Define the props for the History component
interface HistoryProps {
  vehicle: Vehicle; // This will be used in the future
}

// Mock data for trips
const mockTrips: Trip[] = [
  {
    id: '1',
    name: 'Trip to Office',
    startTime: '2023-10-01T08:00:00Z',
    endTime: '2023-10-01T09:00:00Z',
    route: [
      { lat: 37.7749, lng: -122.4194 }, // San Francisco
      { lat: 37.3382, lng: -121.8863 }, // San Jose
    ],
  },
  {
    id: '2',
    name: 'Trip to Client',
    startTime: '2023-10-02T10:00:00Z',
    endTime: '2023-10-02T11:30:00Z',
    route: [
      { lat: 37.7749, lng: -122.4194 }, // San Francisco
      { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    ],
  },
];

export default function History({ vehicle }: HistoryProps) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  useEffect(() => {
    // Use mock data instead of fetching from the API
    setTrips(mockTrips);

    // TODO: Replace mock data with API call using the `vehicle` prop
    // Example: fetch(`/api/vehicles/${vehicle.id}/trips`)
  }, [vehicle]); // Add `vehicle` to the dependency array when using it

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