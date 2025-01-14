'use client';

import { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { Geofence } from '../types'; // Import the Geofence interface

interface GeofenceActionsProps {
  geofences: Geofence[]; // List of existing geofences
  onAdd: (geofence: Geofence) => void; // Callback for adding a new geofence
  onEdit: (id: string, updatedGeofence: Geofence) => void; // Callback for editing a geofence
  onDelete: (id: string) => void; // Callback for deleting a geofence
}

export default function GeofenceActions({ geofences, onAdd, onEdit, onDelete }: GeofenceActionsProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null); // Track which geofence is being edited
  const [newGeofence, setNewGeofence] = useState<Geofence>({
    id: '',
    name: '',
    lat: 0,
    lng: 0,
    radius: 100,
  });

  // Handle form submission for adding/editing a geofence
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      onEdit(isEditing, newGeofence); // Call the onEdit callback
    } else {
      onAdd({ ...newGeofence, id: Date.now().toString() }); // Call the onAdd callback
    }
    setIsEditing(null); // Reset editing state
    setNewGeofence({ id: '', name: '', lat: 0, lng: 0, radius: 100 }); // Reset form
  };

  // Handle editing a geofence
  const handleEdit = (geofence: Geofence) => {
    setIsEditing(geofence.id);
    setNewGeofence(geofence);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Geofence Actions</h3>

      {/* Form for adding/editing a geofence */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Geofence Name"
            value={newGeofence.name}
            onChange={(e) => setNewGeofence({ ...newGeofence, name: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="number"
            placeholder="Latitude"
            value={newGeofence.lat}
            onChange={(e) => setNewGeofence({ ...newGeofence, lat: parseFloat(e.target.value) })}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="number"
            placeholder="Longitude"
            value={newGeofence.lng}
            onChange={(e) => setNewGeofence({ ...newGeofence, lng: parseFloat(e.target.value) })}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="number"
            placeholder="Radius (meters)"
            value={newGeofence.radius}
            onChange={(e) => setNewGeofence({ ...newGeofence, radius: parseFloat(e.target.value) })}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          {isEditing ? <Edit className="mr-2" size={18} /> : <Plus className="mr-2" size={18} />}
          {isEditing ? 'Update Geofence' : 'Add Geofence'}
        </button>
      </form>

      {/* List of existing geofences */}
      <div className="space-y-2">
        {geofences.map((geofence) => (
          <div key={geofence.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
            <div>
              <p className="font-medium">{geofence.name}</p>
              <p className="text-sm text-gray-400">
                Lat: {geofence.lat}, Lng: {geofence.lng}, Radius: {geofence.radius}m
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(geofence)}
                className="p-1 text-orange-500 hover:text-orange-600"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete(geofence.id)}
                className="p-1 text-red-500 hover:text-red-600"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}