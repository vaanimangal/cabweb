import { MapPin, Navigation, Clock, CreditCard, Banknote, Wallet, TrendingUp, Check, X, User } from 'lucide-react';
import type { RideRequest } from '../types';
import { Stars } from './Stars';

const paymentMeta = {
  cash: { label: 'Cash', icon: Banknote, color: 'text-ink-700 bg-ink-100' },
  card: { label: 'Card', icon: CreditCard, color: 'text-red-700 bg-red-50' },
  wallet: { label: 'Wallet', icon: Wallet, color: 'text-gold-700 bg-gold-50' },
};

export function RideRequestCard({
  request, onAccept, onReject, index = 0,
}: {
  request: RideRequest;
  onAccept: (r: RideRequest) => void;
  onReject: (r: RideRequest) => void;
  index?: number;
}) {
  const pay = paymentMeta[request.paymentMethod];
  const PayIcon = pay.icon;
  const surge = request.surgeMultiplier > 1;

  return (
    <div className="card card-hover overflow-hidden animate-slide-in-right" style={{ animationDelay: `${index * 0.08}s` }}>
      {surge && (
        <div className="flex items-center justify-center gap-1.5 py-1.5 bg-gold-400 text-ink-900 text-xs font-bold">
          <TrendingUp size={13} />
          {request.surgeMultiplier}× SURGE PRICING
        </div>
      )}

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid place-items-center w-11 h-11 rounded-xl bg-ink-100 text-ink-700 shrink-0">
              <User size={20} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-ink-900 truncate">{request.passengerName}</p>
              <div className="flex items-center gap-2 text-xs text-ink-500">
                <Stars value={request.passengerRating} size={12} />
                <span className="font-semibold text-ink-700">{request.passengerRating.toFixed(1)}</span>
                <span>·</span>
                <span>{request.passengerTrips} trips</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Fare</p>
            <p className="text-2xl font-extrabold text-ink-900 leading-none">${request.estimatedFare.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="flex flex-col items-center pt-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-red-100" />
            <span className="flex-1 w-0.5 my-1 bg-gradient-to-b from-red-400 to-gold-400 rounded-full" />
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 ring-4 ring-gold-100" />
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Pickup</p>
              <p className="text-sm font-semibold text-ink-800 truncate">{request.pickupAddress}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Destination</p>
              <p className="text-sm font-semibold text-ink-800 truncate">{request.destinationAddress}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat icon={Navigation} label="To pickup" value={`${request.distanceToPickupKm} km`} />
          <Stat icon={MapPin} label="Trip" value={`${request.tripDistanceKm} km`} />
          <Stat icon={Clock} label="ETA" value={`${request.estimatedMinutes} min`} />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className={`chip ${pay.color}`}>
            <PayIcon size={13} />
            {pay.label}
          </span>
          <span className="text-xs text-ink-400 font-medium">Tap Accept to claim this ride</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => onReject(request)}
            className="btn btn-lg tap bg-ink-100 text-ink-800 hover:bg-ink-200 font-bold"
            aria-label={`Reject ride from ${request.passengerName}`}
          >
            <X size={20} strokeWidth={2.5} />
            Reject
          </button>
          <button
            onClick={() => onAccept(request)}
            className="btn btn-lg tap bg-red-500 text-white hover:bg-red-600 shadow-glowRed font-bold"
            aria-label={`Accept ride from ${request.passengerName}`}
          >
            <Check size={20} strokeWidth={2.5} />
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-ink-50 border border-ink-100 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-ink-400">
        <Icon size={13} />
        <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-0.5 text-sm font-bold text-ink-800">{value}</p>
    </div>
  );
}
