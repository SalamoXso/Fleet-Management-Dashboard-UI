export default function NotificationSettings({ vehicle }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Notification Settings for {vehicle.name}</h3>
      <p className="text-gray-300">Notification preferences will go here.</p>
    </div>
  );
}