'use client'; // Ensure this is a Client Component

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

import { Vehicle } from '../types'; // Import the correct Vehicle type

// Define the props for the ShareLiveLocation component
interface ShareLiveLocationProps {
  vehicle: Vehicle;
  isEditing?: boolean; // Make it optional if not always required

}

export default function ShareLiveLocation({ vehicle }: ShareLiveLocationProps) {
  const [isCopied, setIsCopied] = useState(false); // Track if the link is copied
  const [shareLink, setShareLink] = useState(''); // Store the generated shareable link

  // Generate a shareable link for the vehicle's live location
  const generateShareLink = () => {
    const baseUrl = window.location.origin; // Get the current domain
    const link = `${baseUrl}/share-live-location/${vehicle.id}`; // Create a unique link
    setShareLink(link);
    setIsCopied(false); // Reset the copied state
  };

  // Copy the shareable link to the clipboard
  const copyToClipboard = async () => {
    if (shareLink) {
      try {
        await navigator.clipboard.writeText(shareLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Share Live Location for {vehicle.name}</h3>
      <p className="text-gray-300 mb-4">
        Generate a shareable link to track this vehicles live location.
      </p>

      {/* Generate Link Button */}
      <button
        onClick={generateShareLink}
        className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
      >
        <Share2 className="mr-2" size={18} />
        Generate Shareable Link
      </button>

      {/* Display the Shareable Link */}
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
    </div>
  );
}