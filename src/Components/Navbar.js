import "../styles/Navbar.css";
import { useState } from "react";
import AuthModal from "./AuthModal";

// 👈 FIX: Add props destructuring { isLoggedIn, setIsLoggedIn } inside the parentheses
function Navbar({ user, setUser }) {
  const [authType, setAuthType] = useState(null); 
  // null | "login" | "register"

  return (
    <>
      <nav>
        <div className="logo">
          <h1>GEO RIDES</h1>
          <h3>Go Places, Go GEO</h3>
        </div>

        <div>
          {!user ? (
  <>
    <button onClick={() => setAuthType("login")}>Login</button>
    <button onClick={() => setAuthType("register")}>Register</button>
  </>
) : (
  <div className="user-section">
    <span className="welcome-text">
      Hi, {user.name}
    </span>

    <button
      onClick={() => {
        localStorage.removeItem("user");
        setUser(null);
      }}
    >
      Logout
    </button>
  </div>
)}
        </div>
      </nav>

      {authType && (
        <AuthModal
  type={authType}
  onClose={() => setAuthType(null)}
  onSuccess={(loggedInUser) => {
    setUser(loggedInUser);
  }}
/>
      )}
    </>
  );
}

export default Navbar;