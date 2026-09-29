'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof window === 'undefined') return true;
    return navigator.onLine;
  });
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <div
      className="fixed top-3 inset-x-4 sm:inset-x-auto sm:right-4 z-50 flex items-center justify-center animate-in slide-in-from-top-3 duration-200 pointer-events-none"
      style={{ top: 'max(env(safe-area-inset-top), 0.75rem)' }}
    >
      {!isOnline ? (
        <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-600/95 dark:bg-amber-700/95 text-white text-xs font-semibold shadow-xl border border-amber-400/30 backdrop-blur-md">
          <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          <span>Mode Hors-ligne — Consultation des soins disponible</span>
        </div>
      ) : (
        <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-600/95 text-white text-xs font-semibold shadow-xl border border-emerald-400/30 backdrop-blur-md">
          <Wifi className="w-3.5 h-3.5" />
          <span>Connexion rétablie</span>
        </div>
      )}
    </div>
  );
};
