import { Star, ThumbsUp, MessageSquare, TrendingUp } from 'lucide-react';
import { reviews, ratingBreakdown, driverProfile } from '../data';
import { Stars } from '../components/Stars';
import { AnimatedNumber } from '../components/AnimatedNumber';

export function RatingsView() {
  const total = ratingBreakdown.reduce((s, r) => s + r.count, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-6 text-center bg-gradient-to-br from-ink-900 to-ink-800 text-white animate-slide-up">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Overall Rating</p>
          <p className="mt-2 text-6xl font-extrabold tracking-tight">
            <AnimatedNumber value={driverProfile.rating} decimals={2} />
          </p>
          <div className="mt-2 flex justify-center">
            <Stars value={driverProfile.rating} size={22} />
          </div>
          <p className="mt-3 text-sm text-white/80 font-semibold">Based on {driverProfile.totalTrips.toLocaleString()} trips</p>
        </div>

        <div className="card p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-ink-900">Rating breakdown</h2>
            <span className="chip bg-red-50 text-red-700">
              <TrendingUp size={13} />
              Top 5% driver
            </span>
          </div>
          <div className="space-y-2.5">
            {ratingBreakdown.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16 shrink-0">
                  <span className="text-sm font-bold text-ink-700">{r.stars}</span>
                  <Star size={14} className="text-gold-400" fill="currentColor" strokeWidth={0} />
                </div>
                <div className="flex-1 h-2.5 rounded-full bg-ink-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-700" style={{ width: `${r.percent}%` }} />
                </div>
                <span className="text-xs font-semibold text-ink-500 w-16 text-right">{r.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: '5-star trips', value: ratingBreakdown[0].count, icon: ThumbsUp, tone: 'bg-red-50 text-red-700' },
          { label: 'Total reviews', value: total, icon: MessageSquare, tone: 'bg-ink-100 text-ink-700' },
          { label: 'Response rate', value: 98, suffix: '%', icon: Star, tone: 'bg-gold-50 text-gold-700' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-4 text-center">
              <span className={`mx-auto grid place-items-center w-10 h-10 rounded-xl ${s.tone}`}>
                <Icon size={18} />
              </span>
              <p className="mt-2 text-xl sm:text-2xl font-extrabold text-ink-900">
                <AnimatedNumber value={s.value} suffix={(s as { suffix?: string }).suffix || ''} />
              </p>
              <p className="text-[11px] sm:text-xs text-ink-500 font-semibold mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-100">
          <h2 className="font-extrabold text-ink-900">Recent reviews</h2>
          <p className="text-sm text-ink-500 mt-0.5">What passengers are saying about you</p>
        </div>
        <ul className="divide-y divide-ink-100">
          {reviews.map((rev, i) => (
            <li key={rev.id} className="px-5 py-4 hover:bg-ink-50/60 transition-colors animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-start gap-3">
                <div className="grid place-items-center w-10 h-10 rounded-full bg-ink-100 text-ink-600 font-bold shrink-0">
                  {rev.passengerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-ink-900 truncate">{rev.passengerName}</p>
                    <span className="text-xs text-ink-400 font-medium shrink-0">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Stars value={rev.rating} size={13} />
                    <span className="text-xs font-bold text-ink-700">{rev.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-ink-700 mt-2 leading-relaxed">"{rev.comment}"</p>
                  <p className="text-xs text-ink-400 mt-1.5 font-medium">{rev.tripRoute}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
