import { DollarSign, Calendar, Car, TrendingUp, Clock } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';
import { weeklyEarnings } from '../data';
import './EarningsOverview.css';

export function EarningsOverview({ todayEarnings, todayTrips, weeklyTotal }) {
  const maxBar = Math.max(...weeklyEarnings.map((d) => d.earnings), 1);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayLabel = days[[1, 2, 3, 4, 5, 6, 0][new Date().getDay() - 1 < 0 ? 6 : new Date().getDay() - 1]];

  return (
    <div className="eo-card">
      <div className="eo-header">
        <div>
          <p className="eo-label">Earnings Overview</p>
          <h2 className="eo-title">Today at a glance</h2>
        </div>
        <span className="eo-chip">
          <TrendingUp size={13} />
          +12.4% vs last week
        </span>
      </div>

      <div className="eo-stats-grid">
        <div className="stat-box primary">
          <div className="absolute-bg" />
          <div className="stat-header">
            <DollarSign size={14} /> Today
          </div>
          <p className="stat-value">
            <AnimatedNumber value={todayEarnings} prefix="$" decimals={2} />
          </p>
          <p className="stat-footer">{todayTrips} trips completed</p>
        </div>

        <div className="stat-box secondary">
          <div className="stat-header">
            <Calendar size={14} /> This Week
          </div>
          <p className="stat-value">
            <AnimatedNumber value={weeklyTotal} prefix="$" decimals={2} />
          </p>
          <p className="stat-footer">7-day gross earnings</p>
        </div>

        <div className="stat-box secondary">
          <div className="stat-header">
            <Car size={14} /> Completed Trips
          </div>
          <p className="stat-value">
            <AnimatedNumber value={todayTrips} />
          </p>
          <p className="stat-footer">today · <Clock size={11} className="inline" /> 5h 12m online</p>
        </div>
      </div>

      <div className="eo-chart-section">
        <div className="chart-header">
          <p className="chart-title">Weekly performance</p>
          <p className="chart-helper">Tap a bar for details</p>
        </div>
        <div className="bar-chart">
          {weeklyEarnings.map((d) => {
            const h = Math.max(4, (d.earnings / maxBar) * 100);
            const isToday = d.label === todayLabel;
            return (
              <div key={d.label} className={`bar-column ${isToday ? 'active' : ''}`}>
                <div className="bar-wrapper">
                  <div className="bar" style={{ height: `${h}%` }} title={`${d.label}: $${d.earnings.toFixed(2)}`} />
                  {isToday && <span className="bar-tooltip">${d.earnings.toFixed(0)}</span>}
                </div>
                <span className="bar-label">{d.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}