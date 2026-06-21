import "../styles/Navbar.css";
import { useState } from "react";
import AuthModal from "./AuthModal";

// 👈 FIX: Add props destructuring { isLoggedIn, setIsLoggedIn } inside the parentheses
function Navbar({ isLoggedIn, setIsLoggedIn }) { 
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
          {/* Optional: You can now use isLoggedIn to hide these when logged in */}
          {!isLoggedIn ? (
            <>
              <button onClick={() => setAuthType("login")}>Login</button>
              <button onClick={() => setAuthType("register")}>Register</button>
            </>
          ) : (
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          )}
        </div>
      </nav>

      {authType && (
        <AuthModal 
          type={authType} 
          onClose={() => setAuthType(null)} 
          onSuccess={() => setIsLoggedIn(true)} // 👈 This will work perfectly now!
        />
      )}
    </>
  );
}

export default Navbar;