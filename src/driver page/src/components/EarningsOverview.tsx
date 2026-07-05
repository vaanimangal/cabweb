import { DollarSign, Calendar, Car, TrendingUp, Clock } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';
import { weeklyEarnings } from '../data';

export function EarningsOverview({
  todayEarnings, todayTrips, weeklyTotal,
}: {
  todayEarnings: number;
  todayTrips: number;
  weeklyTotal: number;
}) {
  const maxBar = Math.max(...weeklyEarnings.map((d) => d.earnings), 1);
  const todayLabel = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][[1,2,3,4,5,6,0][new Date().getDay() - 1 < 0 ? 6 : new Date().getDay() - 1]];

  return (
    <div className="card p-5 sm:p-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Earnings Overview</p>
          <h2 className="text-lg font-extrabold text-ink-900 mt-0.5">Today at a glance</h2>
        </div>
        <span className="chip bg-red-50 text-red-700">
          <TrendingUp size={13} />
          +12.4% vs last week
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-800 text-white p-4 sm:p-5 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-red-500/30 blur-2xl" />
          <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wide">
            <DollarSign size={14} /> Today
          </div>
          <p className="mt-1 text-3xl font-extrabold tracking-tight">
            <AnimatedNumber value={todayEarnings} prefix="$" decimals={2} />
          </p>
          <p className="mt-1 text-xs text-white/50">{todayTrips} trips completed</p>
        </div>

        <div className="rounded-2xl bg-ink-50 border border-ink-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-ink-500 text-xs font-semibold uppercase tracking-wide">
            <Calendar size={14} /> This Week
          </div>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-ink-900">
            <AnimatedNumber value={weeklyTotal} prefix="$" decimals={2} />
          </p>
          <p className="mt-1 text-xs text-ink-400">7-day gross earnings</p>
        </div>

        <div className="rounded-2xl bg-ink-50 border border-ink-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-ink-500 text-xs font-semibold uppercase tracking-wide">
            <Car size={14} /> Completed Trips
          </div>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-ink-900">
            <AnimatedNumber value={todayTrips} />
          </p>
          <p className="mt-1 text-xs text-ink-400">today · <Clock size={11} className="inline -mt-0.5" /> 5h 12m online</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-ink-800">Weekly performance</p>
          <p className="text-xs text-ink-400 font-medium">Tap a bar for details</p>
        </div>
        <div className="flex items-end justify-between gap-2 h-28">
          {weeklyEarnings.map((d) => {
            const h = Math.max(4, (d.earnings / maxBar) * 100);
            const isToday = d.label === todayLabel;
            return (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5 group">
                <div className="relative w-full flex-1 flex items-end">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 group-hover:opacity-90 ${
                      isToday ? 'bg-red-500' : 'bg-ink-200 group-hover:bg-ink-300'
                    }`}
                    style={{ height: `${h}%` }}
                    title={`${d.label}: $${d.earnings.toFixed(2)}`}
                  />
                  {isToday && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-red-700 whitespace-nowrap">
                      ${d.earnings.toFixed(0)}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] font-semibold ${isToday ? 'text-red-700' : 'text-ink-400'}`}>{d.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
