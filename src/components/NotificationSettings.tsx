'use client'; // Ensure this is a Client Component

import { useState } from 'react';

export default function NotificationSettings({ vehicle }) {
  // State to manage notification preferences
  const [notifications, setNotifications] = useState({
    geofenceAlerts: true,
    speedAlerts: false,
    maintenanceReminders: true,
  });

  // Handle toggle changes
  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Notification Settings for {vehicle.name}</h3>
      <div className="space-y-4">
        {/* Geofence Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Geofence Alerts</p>
            <p className="text-sm text-gray-400">
              Notify when the vehicle enters or exits a geofence.
            </p>
          </div>
          <button
            onClick={() => handleToggle('geofenceAlerts')}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              notifications.geofenceAlerts ? 'bg-orange-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                notifications.geofenceAlerts ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Speed Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Speed Alerts</p>
            <p className="text-sm text-gray-400">
              Notify when the vehicle exceeds a specified speed limit.
            </p>
          </div>
          <button
            onClick={() => handleToggle('speedAlerts')}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              notifications.speedAlerts ? 'bg-orange-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                notifications.speedAlerts ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Maintenance Reminders */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Maintenance Reminders</p>
            <p className="text-sm text-gray-400">
              Notify when the vehicle is due for maintenance.
            </p>
          </div>
          <button
            onClick={() => handleToggle('maintenanceReminders')}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              notifications.maintenanceReminders ? 'bg-orange-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                notifications.maintenanceReminders ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}