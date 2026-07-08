import { useEffect, useState } from 'react';
import { Radio, Inbox, Sparkles, Power } from 'lucide-react';
import { makeRideRequest } from '../data';
import { EarningsOverview } from '../components/EarningsOverview';
import { RideRequestCard } from '../components/RideRequestCard';
import { ActiveTripPanel } from '../components/ActiveTripPanel';
import { RouteMap } from '../components/RouteMap';
import './HomeView.css';

export function HomeView({ status, onToggleStatus, todayEarnings, todayTrips, weeklyTotal, pushToast }) {
  const online = status === 'online';
  const [requests, setRequests] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);
  const [seed, setSeed] = useState(1);

  useEffect(() => {
    if (!online || activeTrip) return;
    const initial = setTimeout(() => {
      setRequests((r) => (r.length === 0 ? [makeRideRequest(seed)] : r));
    }, 1200);
    const interval = setInterval(() => {
      setRequests((r) => {
        if (r.length >= 3) return r;
        setSeed((s) => s + 1);
        return [...r, makeRideRequest(seed + 1)];
      });
    }, 9000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [online, activeTrip, seed]);

  const handleAccept = (r) => {
    setRequests((cur) => cur.filter((x) => x.id !== r.id));
    setActiveTrip({
      id: r.id,
      passengerName: r.passengerName,
      pickupAddress: r.pickupAddress,
      destinationAddress: r.destinationAddress,
      fare: r.estimatedFare,
      distanceKm: r.tripDistanceKm,
      etaMinutes: r.estimatedMinutes,
      status: 'to_pickup',
    });
    pushToast('success', `Ride accepted — navigating to ${r.pickupAddress}`);
  };

  const handleReject = (r) => {
    setRequests((cur) => cur.filter((x) => x.id !== r.id));
    pushToast('info', `Request from ${r.passengerName} declined`);
  };

  const handleComplete = () => {
    if (!activeTrip) return;
    pushToast('success', `Trip completed — $${activeTrip.fare.toFixed(2)} earned`);
    setActiveTrip(null);
  };

  const handleCancel = () => {
    if (!activeTrip) return;
    pushToast('error', 'Trip cancelled');
    setActiveTrip(null);
  };

  const mapStatus = activeTrip ? activeTrip.status : 'idle';

  return (
    <div className="hv-container">
      <StatusBanner online={online} onToggle={onToggleStatus} />

      <EarningsOverview todayEarnings={todayEarnings} todayTrips={todayTrips} weeklyTotal={weeklyTotal} />

      <div className="hv-grid">
        <section className="hv-main-col">
          <div className="hv-section-header">
            <div className="hv-title-group">
              <Radio size={18} className={online ? 'hv-icon-live' : 'hv-icon-idle'} />
              <h2>Live Ride Requests</h2>
            </div>
            <span className="hv-chip">{online ? `${requests.length} incoming` : 'Offline'}</span>
          </div>

          {activeTrip && (
            <ActiveTripPanel trip={activeTrip} onComplete={handleComplete} onCancel={handleCancel} />
          )}

          {online && requests.length > 0 ? (
            <div className="hv-request-list">
              {requests.map((r, i) => (
                <RideRequestCard key={r.id} request={r} onAccept={handleAccept} onReject={handleReject} index={i} />
              ))}
            </div>
          ) : (
            !activeTrip && (
              <div className="hv-card hv-empty">
                <div className="hv-empty-icon"><Inbox size={26} /></div>
                <p className="hv-empty-title">{online ? 'Waiting for ride requests' : 'You are offline'}</p>
                <p className="hv-empty-desc">
                  {online ? 'New requests will appear here automatically.' : 'Go online to start receiving ride requests.'}
                </p>
              </div>
            )
          )}
        </section>

        <section className="hv-map-col">
          <div className="hv-section-header">
            <h2>Navigation</h2>
            <span className="hv-chip-gold"><Sparkles size={13} /> Live route</span>
          </div>
          <div className="hv-card hv-map-wrapper">
            <RouteMap destination={activeTrip?.destinationAddress} status={mapStatus} online={online} />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatusBanner({ online, onToggle }) {
  return (
    <div className={`hv-banner ${online ? 'online' : 'offline'}`}>
      <div className="hv-bg-decoration" />
      <div className="hv-banner-content">
        <div>
          <div className="hv-status-label">
            {online && <span className="hv-pulse-ring" />}
            <span className="hv-status-dot" />
            <p>{online ? 'You are online' : 'You are offline'}</p>
          </div>
          <h2 className="hv-banner-title">{online ? 'Ready to receive rides' : 'Go online to start earning'}</h2>
          <p className="hv-banner-desc">
            {online ? 'You will be matched with nearby passengers automatically.' : 'Toggle your status to begin accepting ride requests.'}
          </p>
        </div>
        <button onClick={onToggle} className="hv-toggle-btn" aria-pressed={online}>
          <Power size={20} strokeWidth={2.5} />
          {online ? 'Go Offline' : 'Go Online'}
        </button>
      </div>
    </div>
  );
}