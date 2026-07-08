import "../styles/Navbar.css";
import { useState, useRef, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const [authType, setAuthType] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

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
              <button
                className="driver-link-btn"
                onClick={() => setAuthType("register-driver")}
              >
                Become a Driver
              </button>
            </>
          ) : (
            <div className="user-section" ref={menuRef}>
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
                    👤 My Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      window.location.href = "/my-bookings";
                    }}
                  >
                    🚕 My Bookings
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      navigate("/driver-dashboard");

                    }}
                  >
                    🚗 Driver Dashboard
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      setUser(null);
                      setShowMenu(false);
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
