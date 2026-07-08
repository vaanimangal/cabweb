import { Star, ThumbsUp, MessageSquare, TrendingUp } from 'lucide-react';
import { reviews, ratingBreakdown, driverProfile } from '../data';
import { Stars } from '../components/Stars';
import { AnimatedNumber } from '../components/AnimatedNumber';
import './RatingsView.css';

export function RatingsView() {
  const total = ratingBreakdown.reduce((s, r) => s + r.count, 0);

  return (
    <div className="rv-container">
      {/* Rating summary */}
      <div className="rv-summary-grid">
        <div className="rv-card rv-hero-card">
          <p className="rv-label">Overall Rating</p>
          <p className="rv-rating-val">
            <AnimatedNumber value={driverProfile.rating} decimals={2} />
          </p>
          <div className="rv-star-wrapper">
            <Stars value={driverProfile.rating} size={22} />
          </div>
          <p className="rv-footer">Based on {driverProfile.totalTrips.toLocaleString()} trips</p>
        </div>

        <div className="rv-card rv-breakdown-card">
          <div className="rv-section-header">
            <h2>Rating breakdown</h2>
            <span className="rv-chip"><TrendingUp size={13} /> Top 5% driver</span>
          </div>
          <div className="rv-bars">
            {ratingBreakdown.map((r) => (
              <div key={r.stars} className="rv-bar-row">
                <div className="rv-bar-label">
                  <span className="rv-bar-stars">{r.stars}</span>
                  <Star size={14} className="star" fill="currentColor" strokeWidth={0} />
                </div>
                <div className="rv-progress-bg">
                  <div className="rv-progress-fill" style={{ width: `${r.percent}%` }} />
                </div>
                <span className="rv-bar-count">{r.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="rv-stats-grid">
        {[
          { label: '5-star trips', value: ratingBreakdown[0].count, icon: ThumbsUp, color: 'red' },
          { label: 'Total reviews', value: total, icon: MessageSquare, color: 'ink' },
          { label: 'Response rate', value: 98, suffix: '%', icon: Star, color: 'gold' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rv-card rv-stat-card">
              <span className={`rv-stat-icon ${s.color}`}><Icon size={18} /></span>
              <p className="rv-stat-val">
                <AnimatedNumber value={s.value} suffix={s.suffix || ''} />
              </p>
              <p className="rv-stat-label">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Reviews list */}
      <div className="rv-card rv-reviews-list">
        <div className="rv-reviews-header">
          <h2>Recent reviews</h2>
          <p>What passengers are saying about you</p>
        </div>
        <ul className="rv-reviews-items">
          {reviews.map((rev) => (
            <li key={rev.id} className="rv-review-item">
              <div className="rv-review-avatar">
                {rev.passengerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="rv-review-content">
                <div className="rv-review-meta">
                  <p className="rv-p-name">{rev.passengerName}</p>
                  <span className="rv-p-date">{rev.date}</span>
                </div>
                <div className="rv-review-rating">
                  <Stars value={rev.rating} size={13} />
                  <span>{rev.rating.toFixed(1)}</span>
                </div>
                <p className="rv-comment">"{rev.comment}"</p>
                <p className="rv-route">{rev.tripRoute}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}