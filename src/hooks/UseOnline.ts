import { useEffect, useState } from 'react';


export type UseOnlineHook = () => boolean;

export const useOnline: UseOnlineHook = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const goOnline = (_event: Event): void => setIsOnline(true);
    const goOffline = (_event: Event): void => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOnline;
};
