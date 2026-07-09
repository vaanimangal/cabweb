import { Home, Wallet, FileText, Star, Settings, Car, X } from "lucide-react";
import { driverProfile } from "../data";
import "./Sidebar.css";

const NAV = [
  { key: "home", label: "Home", icon: Home },
  { key: "earnings", label: "Earnings History", icon: Wallet },
  { key: "documents", label: "My Documents", icon: FileText },
  { key: "ratings", label: "Ratings & Reviews", icon: Star },
  { key: "profile", label: "Profile Settings", icon: Settings },
];

export default function Sidebar({
  view,
  onNavigate,
  open,
  onClose,
}) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>

        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">

            <div className="logo-icon">
              <Car size={20} strokeWidth={2.5} />
            </div>

            <div className="logo-text">
              <h2>Driver Hub</h2>
              <p>Cab Partner Portal</p>
            </div>

          </div>

          <button
            className="sidebar-close"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {/* Divider */}
        <div className="sidebar-divider" />

        {/* Navigation */}
        <nav className="sidebar-nav">

          <span className="menu-heading">
            MENU
          </span>

          {NAV.map(({ key, label, icon: Icon }) => {
            const active = view === key;

            return (
              <button
                key={key}
                className={`nav-link ${active ? "active" : ""}`}
                onClick={() => {
                  onNavigate(key);

                  if (window.innerWidth < 992) {
                    onClose();
                  }
                }}
              >
                <div className="nav-left">
                  <Icon size={22} strokeWidth={2.2} />
                  <span>{label}</span>
                </div>

                {active && (
                  <span className="active-dot"></span>
                )}
              </button>
            );
          })}

          {/* Pushes profile card to bottom */}
          <div className="sidebar-spacer"></div>

        </nav>

        {/* Footer */}
        <div className="sidebar-footer">

          <button
            className="driver-card"
            onClick={() => {
              onNavigate("profile");

              if (window.innerWidth < 992) {
                onClose();
              }
            }}
          >
            <img
              src={driverProfile.avatarUrl}
              alt={driverProfile.name}
              className="driver-avatar"
            />

            <div className="driver-details">

              <h4>{driverProfile.name}</h4>

              <p>
                {driverProfile.vehiclePlate} •{" "}
                {driverProfile.vehicleModel
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}
              </p>

            </div>

          </button>

        </div>

      </aside>
    </>
  );
}