import { MapPin, Navigation, Car } from 'lucide-react';

export function RouteMap({
  destination, status, online,
}: {
  destination?: string;
  status: 'idle' | 'to_pickup' | 'in_trip';
  online: boolean;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-ink-900">
      <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-label="Live route map">
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="400" height="300" fill="url(#grid)" />
        <path d="M0 220 Q 80 200 160 230 T 400 240 L400 300 L0 300 Z" fill="#18181b" opacity="0.7" />
        <path d="M280 0 Q 320 60 300 120 T 360 200 L400 200 L400 0 Z" fill="#18181b" opacity="0.5" />

        <g stroke="rgba(255,255,255,0.1)" strokeWidth="14" fill="none" strokeLinecap="round">
          <path d="M-20 80 L420 80" />
          <path d="M-20 160 L420 160" />
          <path d="M120 -20 L120 320" />
          <path d="M260 -20 L260 320" />
        </g>
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" strokeLinecap="round">
          <path d="M-20 40 L420 40" />
          <path d="M-20 200 L420 200" />
          <path d="M60 -20 L60 320" />
          <path d="M340 -20 L340 320" />
          <path d="M-20 120 Q 200 100 420 140" />
        </g>

        {status !== 'idle' && (
          <>
            <circle cx="80" cy="220" r="60" fill="url(#glow)" />
            <path
              d="M80 220 L80 160 L120 160 L120 80 L260 80 L260 40 L340 40"
              stroke="url(#routeGrad)" strokeWidth="5" fill="none"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="10 8" className="animate-route-dash"
            />
          </>
        )}

        {status !== 'idle' && (
          <>
            <g transform="translate(80 220)">
              <circle r="7" fill="#ef4444" />
              <circle r="11" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-pulse-ring" />
            </g>
            <g transform="translate(340 40)">
              <path d="M0 6 C -8 -6 -8 -14 0 -18 C 8 -14 8 -6 0 6 Z" fill="#eab308" transform="translate(0 -2) scale(1.1)" />
              <circle cx="0" cy="-12" r="3" fill="#08080a" />
            </g>
          </>
        )}

        <g transform="translate(80 220)">
          <circle r="14" fill="#08080a" stroke="#ef4444" strokeWidth="2" />
          <foreignObject x="-10" y="-10" width="20" height="20">
            <div className="w-full h-full grid place-items-center text-red-500">
              <Car size="12" />
            </div>
          </foreignObject>
        </g>
      </svg>

      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-950/80 backdrop-blur text-white text-xs font-semibold">
          <span className={`w-2 h-2 rounded-full ${online ? 'bg-red-500 animate-ping-slow' : 'bg-ink-400'}`} />
          {online ? (status === 'idle' ? 'Available · waiting for requests' : status === 'to_pickup' ? 'En route to pickup' : 'Trip in progress') : 'Offline'}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-950/80 backdrop-blur text-white text-xs font-semibold">
          <Navigation size={12} className="text-red-500" />
          Live
        </div>
      </div>

      {destination && status !== 'idle' && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-ink-950/85 backdrop-blur text-white">
          <MapPin size={16} className="text-gold-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-white/50 font-semibold">Destination</p>
            <p className="text-sm font-bold truncate">{destination}</p>
          </div>
        </div>
      )}

      {status === 'idle' && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <div className="mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur mb-3">
              <Navigation size={24} className="text-white/70" />
            </div>
            <p className="text-white font-bold">No active route</p>
            <p className="text-white/60 text-sm mt-0.5">
              {online ? 'Accept a ride to start navigation' : 'Go online to receive rides'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

