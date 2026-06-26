import React, { useState } from "react";
import "../styles/AuthModal.css";

import { auth } from "../firebase/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

function AuthModal({ type, onClose, onSuccess }) {
  // ... rest of your code stays exactly the same
  // function AuthModal({ type, onClose, onSuccess }) { 
  const isRegister = type === "register";

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [terms, setTerms] = useState(false);

  const [confirmationResult, setConfirmationResult] = useState(null);

  const isValidMobile = /^[0-9]{10}$/.test(mobile);
  
const sendOtp = async () => {
  if (!isValidMobile) return;

  try {
    const container = document.getElementById("recaptcha-container");

    if (!container) {
      alert("reCAPTCHA container not found.");
      return;
    }

   if (!window.recaptchaVerifier) {
  const container = document.getElementById("recaptcha-container");

  window.recaptchaVerifier = new RecaptchaVerifier(auth, container, {
    size: "invisible",
  });
}

const appVerifier = window.recaptchaVerifier;



    const result = await signInWithPhoneNumber(
      auth,
      `+91${mobile}`,
      window.recaptchaVerifier
    );

    setConfirmationResult(result);
    setStep(2);

    alert("OTP sent successfully!");
  } catch (error) {
    console.error("Firebase OTP Error:", error);
    alert(error.message);
  }
};

 const verifyOtp = async () => {
  if (!otp) {
    alert("Enter OTP");
    return;
  }

  if (isRegister && !terms) {
    alert("Please accept Terms & Conditions");
    return;
  }

  try {
    if (!confirmationResult) {
      alert("OTP session expired. Please resend OTP.");
      return;
    }

    // REAL OTP verification
    await confirmationResult.confirm(otp);

    alert(`${type} successful`);

    if (onSuccess) {
      onSuccess();
    }

    onClose();
  } catch (error) {
    console.error(error);
    alert("Invalid OTP. Please try again.");
  }
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
      <div id="recaptcha-container"></div>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default AuthModal;