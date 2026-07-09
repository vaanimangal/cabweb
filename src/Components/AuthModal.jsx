import React, { useState } from "react";
import "../styles/AuthModal.css";

import { auth } from "../firebase/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { registerUser, loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function AuthModal({ type, onClose, onSuccess }) {
  const isRegister = type === "register" || type === "register-driver";
  const isDriver = type === "register-driver";
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [terms, setTerms] = useState(false);

  // Driver-specific fields
  const [vehicleType, setVehicleType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const [confirmationResult, setConfirmationResult] = useState(null);

  const isValidMobile = /^[0-9]{10}$/.test(mobile);

  const sendOtp = async () => {
    if (isRegister && name.trim() === "") {
      alert("Please enter your name to register.");
      return;
    }
    if (isDriver && (!vehicleType || !licenseNumber.trim())) {
      alert("Please fill in vehicle type and license number.");
      return;
    }
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
        appVerifier
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

      await confirmationResult.confirm(otp);

      let response;

      if (isRegister) {
        response = await registerUser({
          name,
          phone: `+91${mobile}`,
          ...(isDriver && {
            role: "driver",
            vehicleType,
            licenseNumber,
          }),
        });
      } else {
        response = await loginUser({
         phone: `+91${mobile}`,
        });
      }

      alert(response.data.message);

      if (onSuccess) {
        onSuccess(response.data.user);
      }

      localStorage.setItem("user", JSON.stringify(response.data.user));

      onClose();

      if (isDriver) {
        navigate("/driver-dashboard");
      }
    } 
    catch (error) {

  console.log("FULL ERROR:", error);

  console.log("MESSAGE:", error.message);

  console.log("STACK:", error.stack);

  console.log("RESPONSE:", error.response);

  console.log("DATA:", error.response?.data);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Unknown Error"
  );
}
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{isDriver ? "Register as Driver" : isRegister ? "Register" : "Login"}</h2>

        {step === 1 && (
          <>
            {isRegister && (
              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegister}
              />
            )}

            {isDriver && (
              <>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="Innova">Innova</option>
                </select>
                <input
                  placeholder="Driving License Number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
              </>
            )}

            <input
              placeholder="Enter 10-digit Mobile Number"
              value={mobile}
              maxLength={10}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, ""))
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
