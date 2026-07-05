import { Navigation, Phone, MessageSquare, MapPin, Flag, CheckCircle2 } from 'lucide-react';
import type { ActiveTrip } from '../types';

export function ActiveTripPanel({
  trip, onComplete, onCancel,
}: {
  trip: ActiveTrip;
  onComplete: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="card overflow-hidden animate-scale-in">
      <div className="flex items-center justify-between px-4 py-3 bg-ink-900 text-white">
        <div className="flex items-center gap-2">
          <span className="relative flex">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping-slow" />
          </span>
          <span className="text-sm font-bold">{trip.status === 'to_pickup' ? 'Heading to pickup' : 'Trip in progress'}</span>
        </div>
        <span className="text-xs font-semibold text-white/60">Trip #{trip.id.slice(-4).toUpperCase()}</span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Passenger</p>
            <p className="font-bold text-ink-900">{trip.passengerName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Fare</p>
            <p className="text-xl font-extrabold text-ink-900">${trip.fare.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="flex flex-col items-center pt-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-red-100" />
            <span className="flex-1 w-0.5 my-1 bg-gradient-to-b from-red-400 to-gold-400 rounded-full" />
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 ring-4 ring-gold-100" />
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-start gap-2">
              <MapPin size={15} className="text-red-600 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Pickup</p>
                <p className="text-sm font-semibold text-ink-800 truncate">{trip.pickupAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Flag size={15} className="text-gold-600 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Destination</p>
                <p className="text-sm font-semibold text-ink-800 truncate">{trip.destinationAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-ink-50 border border-ink-100 px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-ink-400">
              <Navigation size={13} />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Distance</span>
            </div>
            <p className="mt-0.5 text-sm font-bold text-ink-800">{trip.distanceKm} km</p>
          </div>
          <div className="rounded-xl bg-ink-50 border border-ink-100 px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-ink-400">
              <span className="text-[10px] font-semibold uppercase tracking-wide">ETA</span>
            </div>
            <p className="mt-0.5 text-sm font-bold text-ink-800">{trip.etaMinutes} min</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button className="btn btn-md tap bg-ink-100 text-ink-800 hover:bg-ink-200" aria-label="Call passenger">
            <Phone size={16} />
          </button>
          <button className="btn btn-md tap bg-ink-100 text-ink-800 hover:bg-ink-200" aria-label="Message passenger">
            <MessageSquare size={16} />
          </button>
          <button onClick={onComplete} className="btn btn-md tap flex-1 bg-red-500 text-white hover:bg-red-600 shadow-glowRed font-bold">
            <CheckCircle2 size={18} />
            Complete trip
          </button>
          <button onClick={onCancel} className="btn btn-md tap bg-ink-100 text-ink-700 hover:bg-ink-200 font-bold">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

