import { useMemo, useState } from 'react';
import { Search, Banknote, CreditCard, Wallet, ArrowDownRight, ArrowUpRight, Calendar, Download } from 'lucide-react';
import { earningsHistory, weeklyEarnings } from '../data';
import { AnimatedNumber } from '../components/AnimatedNumber';
import './EarningsView.css';

const payMeta = {
  cash: { label: 'Cash', icon: Banknote, color: 'ev-cash' },
  card: { label: 'Card', icon: CreditCard, color: 'ev-card' },
  wallet: { label: 'Wallet', icon: Wallet, color: 'ev-wallet' },
};

export function EarningsView() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return earningsHistory.filter((t) => {
      const matchesQuery =
        !query ||
        t.passengerName.toLowerCase().includes(query.toLowerCase()) ||
        t.pickup.toLowerCase().includes(query.toLowerCase()) ||
        t.dropoff.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === 'all' || t.paymentMethod === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const total = filtered.reduce((s, t) => s + t.fare, 0);
  const totalKm = filtered.reduce((s, t) => s + t.distanceKm, 0);
  const totalMin = filtered.reduce((s, t) => s + t.durationMin, 0);
  const weeklyTotal = weeklyEarnings.reduce((s, d) => s + d.earnings, 0);

  return (
    <div className="ev-container">
      {/* Summary cards */}
      <div className="ev-summary-grid">
        <SummaryCard label="Total earnings" value={total} prefix="$" decimals={2} icon={ArrowUpRight} tone="red" />
        <SummaryCard label="This week" value={weeklyTotal} prefix="$" decimals={2} icon={Calendar} tone="ink" />
        <SummaryCard label="Total distance" value={totalKm} suffix=" km" decimals={1} icon={ArrowDownRight} tone="gold" />
        <SummaryCard label="Drive time" value={totalMin} suffix=" min" icon={Calendar} tone="ink" />
      </div>

      {/* Controls */}
      <div className="ev-card ev-controls">
        <div className="ev-control-row">
          <div className="ev-search-input">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by passenger, pickup, or drop-off…"
            />
          </div>
          <div className="ev-filter-group">
            {['all', 'cash', 'card', 'wallet'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`ev-btn ${filter === f ? 'active' : ''}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            <button className="ev-btn ev-btn-export">
              <Download size={15} /> <span className="hide-sm">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trip list */}
      <div className="ev-card ev-history">
        <div className="ev-history-header">
          <h2>Trip History</h2>
          <span>{filtered.length} trips</span>
        </div>

        {filtered.length === 0 ? (
          <div className="ev-empty">No trips match your filters.</div>
        ) : (
          <ul className="ev-list">
            {filtered.map((t, i) => (
              <TripRow key={t.id} trip={t} index={i} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, prefix = '', suffix = '', decimals = 0, icon: Icon, tone }) {
  return (
    <div className={`ev-card ev-summary-card ${tone}`}>
      <div className="ev-summary-icon"><Icon size={18} /></div>
      <p className="ev-summary-val">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
      <p className="ev-summary-label">{label}</p>
    </div>
  );
}

function TripRow({ trip, index }) {
  const pay = payMeta[trip.paymentMethod];
  const PayIcon = pay.icon;
  return (
    <li className="ev-row" style={{ animationDelay: `${Math.min(index * 0.03, 0.4)}s` }}>
      <div className="ev-row-icon"><PayIcon size={18} /></div>
      <div className="ev-row-content">
        <div className="ev-row-main">
          <p>{trip.passengerName}</p>
          <span className={`ev-chip ${pay.color}`}><PayIcon size={11} /> {pay.label}</span>
        </div>
        <p className="ev-row-route">{trip.pickup} → {trip.dropoff}</p>
        <p className="ev-row-meta">{trip.date} · {trip.time} · {trip.distanceKm} km · {trip.durationMin} min</p>
      </div>
      <div className="ev-row-fare">
        <p>+${trip.fare.toFixed(2)}</p>
        <span>{pay.label}</span>
      </div>
    </li>
  );
}