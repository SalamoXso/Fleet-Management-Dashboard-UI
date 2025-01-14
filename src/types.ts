// src/types.ts
export interface Vehicle {
  id: number;
  name: string;
  type: string;
  lastUpdate: string;
  lat: number;
  lng: number;
 
  // Add any other properties as needed
}

// src/types.ts
export interface Geofence {
  id: string; // Unique identifier for the geofence
  name: string; // Name of the geofence
  lat: number; // Latitude of the geofence center
  lng: number; // Longitude of the geofence center
  radius: number; // Radius of the geofence in meters
}