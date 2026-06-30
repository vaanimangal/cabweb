import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Payment.css";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Keep the driver info alive by passing it forward
  const driverData = location.state || {};

  const handlePayment = (method) => {
    // In a real app, process payment here
    alert(`Payment successful via ${method}`);
    
    // Redirect to Active Ride after payment
    navigate("/ActiveRide", { state: driverData });
  };

  return (
    <div className="payment-container">
      <h2>Complete Payment</h2>
      <p>Pay in advance to confirm your booking.</p>
      
      <div className="payment-options">
        <button onClick={() => handlePayment("UPI")}>Pay with UPI</button>
        <button onClick={() => handlePayment("Card")}>Pay with Credit/Debit</button>
        <button onClick={() => handlePayment("Wallet")}>Pay with Wallet</button>
      </div>

      <button className="cancel-btn" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default PaymentPage;