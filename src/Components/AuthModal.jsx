import React, { useState } from "react"; // 👈 FIX: Make sure 'useState' is included here!
import "../styles/AuthModal.css";

function AuthModal({ type, onClose, onSuccess }) {
  // ... rest of your code stays exactly the same
  // function AuthModal({ type, onClose, onSuccess }) { 
  const isRegister = type === "register";

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [terms, setTerms] = useState(false);

  const isValidMobile = /^[0-9]{10}$/.test(mobile);

  const sendOtp = () => {
    if (!isValidMobile) return;
    console.log("Send OTP to:", mobile);
    setStep(2);
  };

  const verifyOtp = () => {
    if (!isValidMobile) return;

    if (isRegister && !terms) {
      alert("Please accept Terms & Conditions");
      return;
    }

    console.log("OTP Verified");
    alert(`${type} successful`);
    
    // 👈 2. Trigger the success callback if it was passed to the modal
    if (onSuccess) {
      onSuccess(); 
    }
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>{isRegister ? "Register" : "Login"}</h2>

        {step === 1 && (
          <>
            {isRegister && (
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              placeholder="Enter 10-digit Mobile Number"
              value={mobile}
              maxLength={10}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "")) // only digits
              }
            />

            {!isValidMobile && mobile.length > 0 && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Enter valid 10-digit number
              </p>
            )}

            <button
              onClick={sendOtp}
              disabled={!isValidMobile}
              style={{
                opacity: isValidMobile ? 1 : 0.5,
                cursor: isValidMobile ? "pointer" : "not-allowed",
              }}
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {isRegister && (
              <label className="terms">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                />
                I agree to{" "}
                <a href="/terms" target="_blank" rel="noreferrer">
                  Terms & Conditions
                </a>
              </label>
            )}

            <button onClick={verifyOtp}>Verify OTP</button>
          </>
        )}

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default AuthModal;