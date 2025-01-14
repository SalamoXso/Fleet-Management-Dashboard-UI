import { useState } from 'react';
import { Car, Truck, Bike, Sailboat } from 'lucide-react';

const vehicleIcons = {
  car: Car,
  truck: Truck,
  motorcycle: Bike,
  boat: Sailboat,
};

export default function RightMenu({ vehicles, onVehicleSelect }) {
  const [sortBy, setSortBy] = useState('name');

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
    }
  });

  return (
    <div className="w-64 bg-gray-900 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Vehicles</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Sort by:</label>
        <select
          className="w-full bg-gray-800 text-white rounded p-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="lastUpdate">Last Update</option>
        </select>
      </div>
      <ul>
        {sortedVehicles.map((vehicle) => {
          const Icon = vehicleIcons[vehicle.type];
          return (
            <li key={vehicle.id} className="mb-2">
              <button
                className="flex items-center w-full p-2 rounded hover:bg-gray-800 text-left"
                onClick={() => onVehicleSelect(vehicle)}
              >
                <Icon className="mr-2 text-orange-500" size={24} />
                <div>
                  <div className="font-medium">{vehicle.name}</div>
                  <div className="text-sm text-gray-400">
                    {new Date(vehicle.lastUpdate).toLocaleString()}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}