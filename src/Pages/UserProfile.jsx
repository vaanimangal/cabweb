import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";

function UserProfile({ user, setUser }) {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      name,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    setEditing(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-top">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <h2>My Account</h2>

        </div>

        <div className="profile-header">

          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h3>{user?.name}</h3>

          <span className="verified">
            ✔ Verified User
          </span>

        </div>

        <div className="section">

          <h4>Personal Information</h4>

          <div className="profile-row">

            <label>Name</label>

            <div className="name-box">

              {editing ? (
                <input
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              ) : (
                <>
                  <span>{user?.name}</span>

                  <button
                    className="edit-icon"
                    onClick={()=>setEditing(true)}
                  >
                    ✎
                  </button>
                </>
              )}

            </div>

          </div>

          <div className="profile-row">
            <label>Phone Number</label>
            <span>{user?.phone}</span>
          </div>

          <div className="profile-row">
            <label>Member Since</label>
            <span>
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Today"}
            </span>
          </div>

        </div>

        <div className="section">

          <h4>Quick Actions</h4>

          <button className="action-btn">
            📜 Ride History
          </button>

          <button className="action-btn">
            ❤️ Saved Places
          </button>

          <button className="action-btn">
            💳 Payment Methods
          </button>

          <button className="action-btn">
            🎁 Offers & Rewards
          </button>

        </div>

        {editing && (

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            Save Changes
          </button>

        )}

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default UserProfile;