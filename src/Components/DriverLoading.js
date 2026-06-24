import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/DriverLoading.css"; // css file link

function DriverLoading() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searching, setSearching] = useState(true);

  // Grab the data passed from the DestinationCards page
  const { vehicle, fuel, language, special } = location.state || {};

  useEffect(() => {
    // Simulate searching for a driver for 3.5 seconds
    const timer = setTimeout(() => {
      setSearching(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="driver-loading-container">
      {searching ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <h2>Finding your perfect ride...</h2>
          <p>Matching you with a <strong>{fuel} {vehicle}</strong> driver</p>
          {special && <p className="special-request">Requirement: {special}</p>}
        </div>
      ) : (
        <div className="success-state">
          <h2>Driver Found! </h2>
          <div className="driver-card-mock">
            <div className="driver-avatar">👨🏻‍✈️</div>
            <div className="driver-details">
              <h3>Rahul Kumar</h3>  
              <p>⭐ 4.9 (120+ rides)</p>
              <p><strong>Vehicle:</strong> White {vehicle} ({fuel})</p>
              <p><strong>Languages:</strong> {language || "English, Hindi"}</p>
            </div>
          </div>
          <button className="back-btn" onClick={() => navigate("/")}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default DriverLoading;