import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCar, FaGasPump } from "react-icons/fa";
import { MdLanguage, MdAccessible } from "react-icons/md";
import AuthModal from "./AuthModal";
import axios from "axios";

import "../styles/DestinationCards.css";

function DestinationCards({
  trip,
  setTrip,
  isLoggedIn,
  user,
}) {
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const isFormValid = Boolean(trip.vehicle) && Boolean(trip.fuel);

  const handleNavigation = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/bookings",
      {
        userId: user._id,

        tripType: trip.tripType,

        pickup: trip.pickup,
        destination: trip.destination,

        startDateTime: trip.startDateTime,
        endDateTime: trip.endDateTime,

        vehicle: trip.vehicle,
        fuel: trip.fuel,
        language: trip.language,
        special: trip.special,
      }
    );

    navigate("/find-driver", {
      state: {
        ...trip,
        bookingId: response.data.booking._id,
      },
    });

  } catch (err) {
    console.error(err);
    alert("Booking failed.");
  }
};

  return (
    <div className="filter-container">
      <h2>Choose Your Ride</h2>

      <div className="filters">

        {/* Language */}
        <div className="filter-box">
          <MdLanguage className="filter-icon" />
          <select
            value={trip.language}
            onChange={(e) =>
              setTrip({
                ...trip,
                language: e.target.value,
              })
            }
          >
            <option value="">Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Hinglish">Hinglish</option>
          </select>
        </div>

        {/* Special */}
        <div className="filter-box">
          <MdAccessible className="filter-icon" />
          <select
            value={trip.special}
            onChange={(e) =>
              setTrip({
                ...trip,
                special: e.target.value,
              })
            }
          >
            <option value="">Special</option>
            <option value="Pet Friendly">
              Pet Friendly
            </option>
            <option value="Wheelchair Friendly">
              Wheelchair Friendly
            </option>
          </select>
        </div>

        {/* Fuel */}
        <div className="filter-box">
          <FaGasPump className="filter-icon" />
          <select
            value={trip.fuel}
            onChange={(e) =>
              setTrip({
                ...trip,
                fuel: e.target.value,
              })
            }
          >
            <option value="">Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="CNG">CNG</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

      </div>

      <div className="vehicle-grid">

        <div
          className={`vehicle-card ${
            trip.vehicle === "Sedan" ? "selected" : ""
          }`}
          onClick={() =>
            setTrip({
              ...trip,
              vehicle: "Sedan",
            })
          }
        >
          <FaCar className="vehicle-icon" />
          <h3>Sedan</h3>
          <p>4 Seats</p>
        </div>

        <div
          className={`vehicle-card ${
            trip.vehicle === "SUV" ? "selected" : ""
          }`}
          onClick={() =>
            setTrip({
              ...trip,
              vehicle: "SUV",
            })
          }
        >
          <FaCar className="vehicle-icon" />
          <h3>SUV</h3>
          <p>7 Seats</p>
        </div>

        <div
          className={`vehicle-card ${
            trip.vehicle === "Innova" ? "selected" : ""
          }`}
          onClick={() =>
            setTrip({
              ...trip,
              vehicle: "Innova",
            })
          }
        >
          <FaCar className="vehicle-icon" />
          <h3>Innova</h3>
          <p>7 Seats</p>
        </div>

        <div
          className={`vehicle-card ${
            trip.vehicle === "Hatchback" ? "selected" : ""
          }`}
          onClick={() =>
            setTrip({
              ...trip,
              vehicle: "Hatchback",
            })
          }
        >
          <FaCar className="vehicle-icon" />
          <h3>Hatchback</h3>
          <p>4 Seats</p>
        </div>

      </div>

      {!isFormValid && (
        <p className="error-text">
          Please select both Vehicle and Fuel type
        </p>
      )}

      <button
        className="driver-btn"
        disabled={!isFormValid}
        onClick={() => {
          if (!isFormValid) return;

          if (!isLoggedIn) {
            setShowAuthModal(true);
          } else {
            handleNavigation();
          }
        }}
      >
        Find Drivers
      </button>

      {showAuthModal && (
        <AuthModal
          type="login"
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            handleNavigation();
          }}
        />
      )}
    </div>
  );
}

export default DestinationCards;