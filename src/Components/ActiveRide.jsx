import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ActiveRide.css";

function ActiveRide() {
  const navigate = useNavigate();
  const [eta, setEta] = useState(5);

  // Simulate ETA countdown
  useEffect(() => {
    if (eta > 0) {
      const timer = setTimeout(() => setEta(eta - 1), 60000); // decrement every minute
      return () => clearTimeout(timer);
    }
  }, [eta]);

  return (
    <div className="active-ride-container">
      {/* Top Header */}
      <div className="ride-header">
        <h3>Driver is on the way</h3>
        <p className="eta-text">Arriving in {eta} mins</p>
      </div>

      {/* Map Placeholder */}
      <div className="map-placeholder">
        <p>Map View Active</p>
        <div className="vehicle-marker">🚗</div>
      </div>

      {/* Driver Info Section */}
      <div className="ride-footer">
        <div className="driver-info">
          <div className="avatar">👨🏻‍✈️</div>
          <div>
            <h4>Rahul Kumar</h4>
            <p>DL-01-AB-1234 • White Swift</p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-contact">Call Driver</button>
          <button className="btn-cancel" onClick={() => navigate("/")}>
            Cancel Ride
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActiveRide;