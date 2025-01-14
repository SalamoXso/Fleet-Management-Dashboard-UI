// src/types.ts
export interface Vehicle {
  id: number;
  name: string;
  type: string;
  lastUpdate: string;
  lat: number;
  lng: number;
  isEditing:boolean;
  // Add any other properties as needed
}