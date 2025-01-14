import { Vehicle } from '../types'; // Import the correct Vehicle type

interface SettingsProps {
  vehicle: Vehicle;
}

export default function Settings({ vehicle }: SettingsProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Settings for {vehicle.name}</h3>
      <p className="text-gray-300">General settings will go here.</p>
    </div>
  );
}