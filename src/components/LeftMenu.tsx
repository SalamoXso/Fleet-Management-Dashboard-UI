'use client'; // Ensure this is a Client Component

import { useState } from 'react';
import { MapPin, Clock, Share2, Settings, Bell } from 'lucide-react';
import VehicleSettings from '../components/Settings';
import NotificationSettings from '../components/NotificationSettings';
import History from './History';
import Geofence from './Geofence';
import ShareLiveLocation from './ShareLiveLocation';
import { Vehicle } from '../types'; // Import the shared Vehicle interface

interface LeftMenuProps {
  selectedVehicle: Vehicle | null; // selectedVehicle can be a Vehicle object or null
}

const menuItems = [
  { name: 'History', icon: Clock },
  { name: 'View Geofences', icon: MapPin },
  { name: 'Set Geofence', icon: MapPin },
  { name: 'Share Live Location', icon: Share2 },
  { name: 'Settings', icon: Settings },
  { name: 'Notification Settings', icon: Bell },
];

export default function LeftMenu({ selectedVehicle }: LeftMenuProps) {
  const [activeItem, setActiveItem] = useState('History');

  // Render the appropriate component based on the active item
  const renderActiveComponent = () => {
    if (!selectedVehicle) {
      return <p className="text-gray-400">No vehicle selected</p>;
    }

    switch (activeItem) {
      case 'History':
        return <History vehicle={selectedVehicle} />;
      case 'View Geofences':
        return <Geofence vehicle={selectedVehicle} />;
      case 'Set Geofence':
        return <Geofence vehicle={selectedVehicle}  />; // ✅ Correct usage of isEditing
      case 'Share Live Location':
        return <ShareLiveLocation vehicle={selectedVehicle} />; // ❌ No isEditing here
      case 'Settings':
        return <VehicleSettings vehicle={selectedVehicle} />;
      case 'Notification Settings':
        return <NotificationSettings vehicle={selectedVehicle} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-64 bg-gray-900 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Fleet Management</h2>
      {selectedVehicle ? (
        <>
          <nav>
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center w-full p-2 mt-2 rounded ${
                  activeItem === item.name ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                <item.icon className="mr-2" size={20} />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="mt-4">
            {renderActiveComponent()}
          </div>
        </>
      ) : (
        <p className="text-gray-400">Select a vehicle to view options</p>
      )}
    </div>
  );
}
