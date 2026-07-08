import { Home, Wallet, FileText, Star, Settings } from 'lucide-react';
import './BottomNav.css';

const NAV = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'earnings', label: 'Earnings', icon: Wallet },
  { key: 'documents', label: 'Docs', icon: FileText },
  { key: 'ratings', label: 'Ratings', icon: Star },
  { key: 'profile', label: 'Profile', icon: Settings },
];

export function BottomNav({ view, onNavigate }) {
  return (
    <nav className="bottom-nav">
      <div className="nav-grid">
        {NAV.map(({ key, label, icon: Icon }) => {
          const active = view === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`nav-btn ${active ? 'active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {active && <span className="active-indicator" />}
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 2}
                className={active ? 'icon-active' : 'icon-inactive'}
              />
              <span className={`nav-label ${active ? 'active' : ''}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}