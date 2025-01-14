'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LeftMenu from '../components/LeftMenu';
import RightMenu from '../components/RightMenu';
import VehicleDetails from '../components/VehicleDetails';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const mockVehicles = [
  {
    id: 1,
    name: 'Car 1',
    type: 'car',
    lastUpdate: '2023-06-10T10:30:00Z',
    lat: 40.7128,
    lng: -74.0060,
  },
  {
    id: 2,
    name: 'Truck 1',
    type: 'truck',
    lastUpdate: '2023-06-10T11:15:00Z',
    lat: 40.7215,
    lng: -74.0123,
  },
  {
    id: 3,
    name: 'Motorcycle 1',
    type: 'motorcycle',
    lastUpdate: '2023-06-10T09:45:00Z',
    lat: 40.7056,
    lng: -74.0089,
  },
  {
    id: 4,
    name: 'Boat 1',
    type: 'boat',
    lastUpdate: '2023-06-10T08:00:00Z',
    lat: 40.7150,
    lng: -74.0050,
  },
];

export default function Dashboard() {
  const [vehicles] = useState(mockVehicles); // Removed unused `setVehicles`
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div className="flex h-screen bg-black text-white">
      <LeftMenu selectedVehicle={selectedVehicle} />
      <main className="flex-grow relative">
        <Map vehicles={vehicles} />
      </main>
      {selectedVehicle ? (
        <VehicleDetails vehicle={selectedVehicle} />
      ) : (
        <RightMenu vehicles={vehicles} onVehicleSelect={setSelectedVehicle} />
      )}
    </div>
  );
}