import "../styles/Navbar.css";
import { useState } from "react";
import AuthModal from "./AuthModal";

// 👈 FIX: Add props destructuring { isLoggedIn, setIsLoggedIn } inside the parentheses
function Navbar({ user, setUser }) {
  const [authType, setAuthType] = useState(null); 
  // null | "login" | "register"
  const [showMenu, setShowMenu] = useState(false);

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

  <button
    className="profile-btn"
    onClick={() => setShowMenu(!showMenu)}
  >
    👤 {user.name} ▼
  </button>

  {showMenu && (
    <div className="profile-dropdown">

      <button
        onClick={() => {
          setShowMenu(false);
          window.location.href = "/profile";
        }}
      >
        👤My Profile
      </button>

      <button>
        🚕My Bookings
      </button>

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