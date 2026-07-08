import { MapPin, Navigation, Clock, CreditCard, Banknote, Wallet, TrendingUp, Check, X, User } from 'lucide-react';
import { Stars } from './Stars';
import './RideRequestCard.css';

const paymentMeta = {
  cash: { label: 'Cash', icon: Banknote, color: 'cash' },
  card: { label: 'Card', icon: CreditCard, color: 'card' },
  wallet: { label: 'Wallet', icon: Wallet, color: 'wallet' },
};

export function RideRequestCard({ request, onAccept, onReject, index = 0 }) {
  const pay = paymentMeta[request.paymentMethod];
  const PayIcon = pay.icon;
  const surge = request.surgeMultiplier > 1;

  return (
    <div
      className="rrc-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {surge && (
        <div className="rrc-surge">
          <TrendingUp size={13} />
          {request.surgeMultiplier}× SURGE PRICING
        </div>
      )}

      <div className="rrc-body">
        <div className="rrc-header">
          <div className="passenger-info">
            <div className="avatar-placeholder"><User size={20} /></div>
            <div>
              <p className="passenger-name">{request.passengerName}</p>
              <div className="rating-row">
                <Stars value={request.passengerRating} size={12} />
                <span className="rating-val">{request.passengerRating.toFixed(1)}</span>
                <span>·</span>
                <span>{request.passengerTrips} trips</span>
              </div>
            </div>
          </div>
          <div className="fare-box">
            <p className="label">Fare</p>
            <p className="fare-val">${request.estimatedFare.toFixed(2)}</p>
          </div>
        </div>

        <div className="route-container">
          <div className="route-line">
            <span className="dot-red" />
            <span className="line-connector" />
            <span className="dot-gold" />
          </div>
          <div className="route-info">
            <div>
              <p className="label">Pickup</p>
              <p className="address">{request.pickupAddress}</p>
            </div>
            <div>
              <p className="label">Destination</p>
              <p className="address">{request.destinationAddress}</p>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <Stat icon={Navigation} label="To pickup" value={`${request.distanceToPickupKm} km`} />
          <Stat icon={MapPin} label="Trip" value={`${request.tripDistanceKm} km`} />
          <Stat icon={Clock} label="ETA" value={`${request.estimatedMinutes} min`} />
        </div>

        <div className="payment-row">
          <span className={`chip ${pay.color}`}>
            <PayIcon size={13} />
            {pay.label}
          </span>
          <span className="tap-hint">Tap Accept to claim this ride</span>
        </div>

        <div className="actions">
          <button onClick={() => onReject(request)} className="btn btn-reject">
            <X size={20} strokeWidth={2.5} /> Reject
          </button>
          <button onClick={() => onAccept(request)} className="btn btn-accept">
            <Check size={20} strokeWidth={2.5} /> Accept
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="stat-box">
      <div className="stat-header">
        <Icon size={13} />
        <span>{label}</span>
      </div>
      <p className="stat-val">{value}</p>
    </div>
  );
}