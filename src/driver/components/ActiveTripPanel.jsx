import { Navigation, Phone, MessageSquare, MapPin, Flag, CheckCircle2 } from 'lucide-react';
import './ActiveTripPanel.css';

export function ActiveTripPanel({ trip, onComplete, onCancel }) {
  return (
    <div className="atp-card">
      <div className="atp-header">
        <div className="atp-status">
          <span className="pulse-container">
            <span className="pulse-dot" />
          </span>
          <span className="status-text">
            {trip.status === 'to_pickup' ? 'Heading to pickup' : 'Trip in progress'}
          </span>
        </div>
        <span className="trip-id">Trip #{trip.id.slice(-4).toUpperCase()}</span>
      </div>

      <div className="atp-body">
        <div className="atp-meta">
          <div>
            <p className="label">Passenger</p>
            <p className="value-bold">{trip.passengerName}</p>
          </div>
          <div className="text-right">
            <p className="label">Fare</p>
            <p className="fare">${trip.fare.toFixed(2)}</p>
          </div>
        </div>

        <div className="route-container">
          <div className="route-line">
            <span className="dot-red" />
            <span className="line-connector" />
            <span className="dot-gold" />
          </div>
          <div className="route-info">
            <div className="route-item">
              <MapPin size={15} className="icon-red" />
              <div>
                <p className="label">Pickup</p>
                <p className="address">{trip.pickupAddress}</p>
              </div>
            </div>
            <div className="route-item">
              <Flag size={15} className="icon-gold" />
              <div>
                <p className="label">Destination</p>
                <p className="address">{trip.destinationAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-label"><Navigation size={13} /> Distance</div>
            <p className="stat-value">{trip.distanceKm} km</p>
          </div>
          <div className="stat-box">
            <div className="stat-label">ETA</div>
            <p className="stat-value">{trip.etaMinutes} min</p>
          </div>
        </div>

        <div className="actions">
          <button className="btn-icon" aria-label="Call passenger"><Phone size={16} /></button>
          <button className="btn-icon" aria-label="Message passenger"><MessageSquare size={16} /></button>
          <button onClick={onComplete} className="btn-complete">
            <CheckCircle2 size={18} /> Complete trip
          </button>
          <button onClick={onCancel} className="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}