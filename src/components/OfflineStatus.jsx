import { useOnline } from '../hooks/useOnline';

export default function OfflineStatus() {
  const online = useOnline();

  if (online) return null;

  return (
    <div className="bg-red-100 text-red-800 p-2 text-center text-sm font-medium shadow-sm rounded-md mb-4">
      You are offline, viewing cached todos. Some features may not work.
    </div>
  );
}
