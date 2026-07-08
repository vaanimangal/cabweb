import { useMemo, useState } from "react";
import {
  Search,
  Banknote,
  CreditCard,
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Download,
} from "lucide-react";

import { earningsHistory, weeklyEarnings } from "../data";
import { AnimatedNumber } from "../components/AnimatedNumber";

const payMeta = {
  cash: { label: "Cash", icon: Banknote, color: "text-ink-700 bg-ink-100" },
  card: { label: "Card", icon: CreditCard, color: "text-red-700 bg-red-50" },
  wallet: { label: "Wallet", icon: Wallet, color: "text-gold-700 bg-gold-50" },
};

export function EarningsView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return earningsHistory.filter((t) => {
      const matchesQuery =
        !query ||
        t.passengerName.toLowerCase().includes(query.toLowerCase()) ||
        t.pickup.toLowerCase().includes(query.toLowerCase()) ||
        t.dropoff.toLowerCase().includes(query.toLowerCase());

      const matchesFilter =
        filter === "all" || t.paymentMethod === filter;

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const total = filtered.reduce((s, t) => s + t.fare, 0);
  const totalKm = filtered.reduce((s, t) => s + t.distanceKm, 0);
  const totalMin = filtered.reduce((s, t) => s + t.durationMin, 0);
  const weeklyTotal = weeklyEarnings.reduce((s, d) => s + d.earnings, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 stagger">
        <SummaryCard
          label="Total earnings"
          value={total}
          prefix="$"
          decimals={2}
          icon={ArrowUpRight}
          tone="red"
        />
        <SummaryCard
          label="This week"
          value={weeklyTotal}
          prefix="$"
          decimals={2}
          icon={Calendar}
          tone="ink"
        />
        <SummaryCard
          label="Total distance"
          value={totalKm}
          suffix=" km"
          decimals={1}
          icon={ArrowDownRight}
          tone="gold"
        />
        <SummaryCard
          label="Drive time"
          value={totalMin}
          suffix=" min"
          icon={Calendar}
          tone="ink"
        />
      </div>

      <div className="card p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 h-11 px-3 rounded-xl bg-ink-100 text-ink-500 flex-1">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by passenger, pickup, or drop-off…"
              className="bg-transparent outline-none text-sm text-ink-800 placeholder:text-ink-400 w-full"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1 pb-1 sm:pb-0">
            {["all", "cash", "card", "wallet"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`btn btn-md tap shrink-0 capitalize ${
                  filter === f
                    ? "bg-ink-900 text-white"
                    : "bg-ink-100 text-ink-700 hover:bg-ink-200"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}

            <button className="btn btn-md tap shrink-0 bg-red-50 text-red-700 hover:bg-red-100">
              <Download size={15} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-extrabold text-ink-900">Trip History</h2>
          <span className="text-sm text-ink-500 font-semibold">
            {filtered.length} trips
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-ink-500">
            <p className="font-semibold">No trips match your filters.</p>
          </div>
        ) : (
          <ul className="divide-y divide-ink-100">
            {filtered.map((t, i) => (
              <TripRow key={t.id} trip={t} index={i} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  icon: Icon,
  tone,
}) {
  const tones = {
    red: "bg-red-50 text-red-700",
    ink: "bg-ink-100 text-ink-700",
    gold: "bg-gold-50 text-gold-700",
  }[tone];

  return (
    <div className="card p-4 sm:p-5">
      <span className={`grid place-items-center w-9 h-9 rounded-xl ${tones}`}>
        <Icon size={18} />
      </span>

      <p className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900">
        <AnimatedNumber
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </p>

      <p className="text-xs text-ink-500 font-semibold mt-0.5">
        {label}
      </p>
    </div>
  );
}

function TripRow({ trip, index }) {
  const pay = payMeta[trip.paymentMethod];
  const PayIcon = pay.icon;

  return (
    <li
      className="px-4 sm:px-5 py-4 hover:bg-ink-50/60 transition-colors animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 0.03, 0.4)}s` }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="grid place-items-center w-11 h-11 rounded-xl bg-ink-100 text-ink-600 shrink-0">
          <PayIcon size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-bold text-ink-900 truncate">
              {trip.passengerName}
            </p>

            <span className={`chip ${pay.color} hidden sm:inline-flex`}>
              <PayIcon size={11} />
              {pay.label}
            </span>
          </div>

          <p className="text-xs text-ink-500 truncate mt-0.5">
            {trip.pickup} → {trip.dropoff}
          </p>

          <p className="text-[11px] text-ink-400 font-medium mt-0.5">
            {trip.date} · {trip.time} · {trip.distanceKm} km ·{" "}
            {trip.durationMin} min
          </p>
        </div>

        <div className="text-right shrink-0">
          <p className="font-extrabold text-ink-900">
            +${trip.fare.toFixed(2)}
          </p>
          <p className="text-[11px] text-ink-400 font-semibold mt-0.5">
            {pay.label}
          </p>
        </div>
      </div>
    </li>
  );
}