import { WifiOff, Wifi } from "lucide-react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useState, useEffect } from "react";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (isOnline && !showReconnected) {
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, showReconnected]);

  if (isOnline && !showReconnected) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 text-center text-sm font-medium transition-all duration-300 ${
        isOnline ? "bg-green-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <span>Back online! Your content will sync automatically.</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span>You're offline. Some features may be limited.</span>
          </>
        )}
      </div>
    </div>
  );
}
