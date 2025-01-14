import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validate the ID
  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json({ error: 'Invalid vehicle ID' }, { status: 400 });
  }

  // Mock data for trips
  const trips = [
    { id: 1, name: 'Trip 1', startTime: '2023-06-10T10:30:00Z', endTime: '2023-06-10T12:30:00Z' },
    { id: 2, name: 'Trip 2', startTime: '2023-06-11T09:00:00Z', endTime: '2023-06-11T11:00:00Z' },
  ];

  // Filter trips by vehicle ID
  const filteredTrips = trips.filter((trip) => trip.id === parseInt(id));

  if (filteredTrips.length === 0) {
    return NextResponse.json({ error: 'No trips found for this vehicle' }, { status: 404 });
  }

  return NextResponse.json(filteredTrips);
}
