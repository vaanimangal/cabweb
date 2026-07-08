import { MapPin, Navigation, Car } from 'lucide-react';
import './RouteMap.css';

export function RouteMap({ destination, status, online }) {
  return (
    <div className="rm-container">
      <svg
        viewBox="0 0 400 300"
        className="rm-svg"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Live route map"
      >
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

        <g className="roads-main">
          <path d="M-20 80 L420 80" />
          <path d="M-20 160 L420 160" />
          <path d="M120 -20 L120 320" />
          <path d="M260 -20 L260 320" />
        </g>
        <g className="roads-secondary">
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
              stroke="url(#routeGrad)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="10 8"
              className="route-dash"
            />
          </>
        )}

        {status !== 'idle' && (
          <>
            <g transform="translate(80 220)">
              <circle r="7" fill="#ef4444" />
              <circle r="11" fill="none" stroke="#ef4444" strokeWidth="2" className="pulse-ring" />
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
            <div className="car-icon-wrapper"><Car size={12} /></div>
          </foreignObject>
        </g>
      </svg>

      <div className="rm-overlay-top">
        <div className="status-badge">
          <span className={`dot ${online ? 'online' : 'offline'}`} />
          {online ? (status === 'idle' ? 'Available' : 'En route') : 'Offline'}
        </div>
        <div className="live-badge">
          <Navigation size={12} className="icon" /> Live
        </div>
      </div>

      {destination && status !== 'idle' && (
        <div className="rm-destination">
          <MapPin size={16} className="icon" />
          <div>
            <p className="label">Destination</p>
            <p className="value">{destination}</p>
          </div>
        </div>
      )}

      {status === 'idle' && (
        <div className="rm-empty">
          <div className="text-center">
            <div className="icon-box"><Navigation size={24} /></div>
            <p className="title">No active route</p>
            <p className="subtitle">{online ? 'Accept a ride to start' : 'Go online to receive rides'}</p>
          </div>
        </div>
      )}
    </div>
  );
}