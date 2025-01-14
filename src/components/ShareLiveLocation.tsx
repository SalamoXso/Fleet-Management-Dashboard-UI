'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { Vehicle, Geofence } from '../types'; // Import the correct types
import GeofenceActions from './GeofenceActions'; // Import the GeofenceActions component

interface ShareLiveLocationProps {
  vehicle: Vehicle;
  isEditing?: boolean;
}

export default function ShareLiveLocation({ vehicle }: ShareLiveLocationProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [geofences, setGeofences] = useState<Geofence[]>([]); // State for geofences

  // Handle adding a new geofence
  const handleAddGeofence = (geofence: Geofence) => {
    setGeofences([...geofences, geofence]);
  };

  // Handle editing a geofence
  const handleEditGeofence = (id: string, updatedGeofence: Geofence) => {
    setGeofences(geofences.map((g) => (g.id === id ? updatedGeofence : g)));
  };

  // Handle deleting a geofence
  const handleDeleteGeofence = (id: string) => {
    setGeofences(geofences.filter((g) => g.id !== id));
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/share-live-location/${vehicle.id}`;
    setShareLink(link);
    setIsCopied(false);
  };

  const copyToClipboard = async () => {
    if (shareLink) {
      try {
        await navigator.clipboard.writeText(shareLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Share Live Location for {vehicle.name}</h3>
      <p className="text-gray-300 mb-4">
        Generate a shareable link to track this vehicle&apos;s live location.
      </p>

      <button
        onClick={generateShareLink}
        className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
      >
        <Share2 className="mr-2" size={18} />
        Generate Shareable Link
      </button>

      {shareLink && (
        <div className="mt-4">
          <p className="text-gray-300 mb-2">Shareable Link:</p>
          <div className="flex items-center bg-gray-800 p-2 rounded-md">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-grow bg-transparent text-white outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="ml-2 p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              {isCopied ? (
                <Check className="text-green-500" size={18} />
              ) : (
                <Copy className="text-gray-300" size={18} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Geofence Actions */}
      <GeofenceActions
        geofences={geofences}
        onAdd={handleAddGeofence}
        onEdit={handleEditGeofence}
        onDelete={handleDeleteGeofence}
      />
    </div>
  );
}