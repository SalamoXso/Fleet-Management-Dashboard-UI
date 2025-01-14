// app/api/vehicles/[id]/trips/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Mock data for trips
  const trips = [
    { id: 1, vehicleId: '1', name: 'Trip 1', startTime: '2023-06-10T10:30:00Z', endTime: '2023-06-10T12:30:00Z' },
    { id: 2, vehicleId: '1', name: 'Trip 2', startTime: '2023-06-11T09:00:00Z', endTime: '2023-06-11T11:00:00Z' },
    { id: 3, vehicleId: '2', name: 'Trip 3', startTime: '2023-06-12T08:00:00Z', endTime: '2023-06-12T10:00:00Z' },
  ];

  // Filter trips by vehicle ID
  const filteredTrips = trips.filter((trip) => trip.vehicleId === id);

  return NextResponse.json(filteredTrips);
}