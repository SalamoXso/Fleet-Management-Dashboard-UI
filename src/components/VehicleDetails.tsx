import { ArrowUp, Wifi, Battery, Thermometer, Compass, MapPin, Clock } from 'lucide-react';

import { Vehicle } from '../types'; // Import the correct Vehicle type

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  // Mock data for vehicle stats
  const stats = {
    gps: { lat: 40.7128, lng: -74.0060 },
    speed: 65,
    direction: 'NE',
    temperature: 72,
    altitude: 100,
    satelliteSignal: 4,
    cellSignal: 3,
    lastUpdate: new Date().toISOString(),
    internalBattery: 80,
    externalBattery: 100,
  };

  return (
    <div className="w-64 bg-gray-900 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">{vehicle.name}</h2>
      <ul className="space-y-2">
        <li className="flex items-center">
          <MapPin className="mr-2 text-orange-500" size={20} />
          <span>GPS: {stats.gps.lat.toFixed(4)}, {stats.gps.lng.toFixed(4)}</span>
        </li>
        <li className="flex items-center">
          <ArrowUp className="mr-2 text-orange-500" size={20} />
          <span>Speed: {stats.speed} mph</span>
        </li>
        <li className="flex items-center">
          <Compass className="mr-2 text-orange-500" size={20} />
          <span>Direction: {stats.direction}</span>
        </li>
        <li className="flex items-center">
          <Thermometer className="mr-2 text-orange-500" size={20} />
          <span>Temperature: {stats.temperature}°F</span>
        </li>
        <li className="flex items-center">
          <ArrowUp className="mr-2 text-orange-500" size={20} />
          <span>Altitude: {stats.altitude} ft</span>
        </li>
        <li className="flex items-center">
          <Wifi className="mr-2 text-orange-500" size={20} />
          <span>Satellite Signal: {stats.satelliteSignal}/5</span>
        </li>
        <li className="flex items-center">
          <Wifi className="mr-2 text-orange-500" size={20} />
          <span>Cell Signal: {stats.cellSignal}/5</span>
        </li>
        <li className="flex items-center">
          <Clock className="mr-2 text-orange-500" size={20} />
          <span>Last Update: {new Date(stats.lastUpdate).toLocaleString()}</span>
        </li>
        <li className="flex items-center">
          <Battery className="mr-2 text-orange-500" size={20} />
          <span>Internal Battery: {stats.internalBattery}%</span>
        </li>
        <li className="flex items-center">
          <Battery className="mr-2 text-orange-500" size={20} />
          <span>External Battery: {stats.externalBattery}%</span>
        </li>
      </ul>
    </div>
  );
}