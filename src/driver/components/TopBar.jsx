import { Menu, Bell, Search, Power } from 'lucide-react';
import { driverProfile } from '../data';
import './TopBar.css';

export function TopBar({ status, onToggleStatus, onOpenMenu, title, subtitle }) {
  const online = status === 'online';

  return (
    <header className="topbar">
      <div className="topbar-content">
        <button onClick={onOpenMenu} className="menu-btn" aria-label="Open menu">
          <Menu size={22} />
        </button>

        <div className="title-area">
          <h1 className="title">{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>

        <div className="search-bar">
          <Search size={16} />
          <input placeholder="Search trips, places…" />
        </div>

        <button className="notify-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notify-dot" />
        </button>

        <button
          onClick={onToggleStatus}
          className={`status-btn ${online ? 'online' : 'offline'}`}
          aria-pressed={online}
          aria-label={online ? 'Go offline' : 'Go online'}
        >
          <span className="status-indicator-wrapper">
            <span className={`status-dot ${online ? 'ping' : ''}`} />
          </span>
          <span>{online ? 'Online' : 'Offline'}</span>
          <Power size={15} className="power-icon" />
        </button>

        <img src={driverProfile.avatarUrl} alt="Profile" className="avatar" />
      </div>
    </header>
  );
}