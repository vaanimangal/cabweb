import { useState } from "react";
import { FaCar, FaGasPump } from "react-icons/fa";
import { MdLanguage, MdAccessible } from "react-icons/md";
import "../styles/DestinationCards.css";

function DestinationCards() {
  
  const [language, setLanguage] = useState("");
  const [special, setSpecial] = useState("");
  const [fuel, setFuel] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const isFormValid = Boolean(selectedVehicle) && Boolean(fuel);

  return (
    <div className="filter-container">
      <h2>Choose Your Ride</h2>

      <div className="filters">

        

        {/* Language */}
        <div className="filter-box">
          <MdLanguage className="filter-icon" />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
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
            value={special}
            onChange={(e) => setSpecial(e.target.value)}
          >
            <option value="">Special</option>
            <option value="Pet Friendly">Pet Friendly</option>
            <option value="Wheelchair Friendly">
              Wheelchair Friendly
            </option>
          </select>
        </div>

        {/* Fuel */}
        <div className="filter-box">
          <FaGasPump className="filter-icon" />

          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
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
      selectedVehicle === "Sedan" ? "selected" : ""
    }`}
    onClick={() => setSelectedVehicle("Sedan")}
  >
    <FaCar className="vehicle-icon" />
    <h3>Sedan</h3>
    <p>4 Seats</p>
    
  </div>

  <div
    className={`vehicle-card ${
      selectedVehicle === "SUV" ? "selected" : ""
    }`}
    onClick={() => setSelectedVehicle("SUV")}
  >
    <FaCar className="vehicle-icon" />
    <h3>SUV</h3>
    <p>7 Seats</p>
    
  </div>

  <div
    className={`vehicle-card ${
      selectedVehicle === "Innova" ? "selected" : ""
    }`}
    onClick={() => setSelectedVehicle("Innova")}
  >
    <FaCar className="vehicle-icon" />
    <h3>Innova</h3>
    <p>7 Seats</p>
    
  </div>

  <div
    className={`vehicle-card ${
      selectedVehicle === "Hatchback" ? "selected" : ""
    }`}
    onClick={() => setSelectedVehicle("Hatchback")}
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
    console.log("Searching drivers...");
  }}
>
  Find Drivers
</button>
    </div>
  );
}

export default DestinationCards;