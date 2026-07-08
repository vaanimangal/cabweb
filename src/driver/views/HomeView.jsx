import { useEffect, useState } from "react";
import { Radio, Inbox, Sparkles, Power } from "lucide-react";

import { makeRideRequest } from "../data";
import { EarningsOverview } from "../components/EarningsOverview";
import { RideRequestCard } from "../components/RideRequestCard";
import { ActiveTripPanel } from "../components/ActiveTripPanel";
import { RouteMap } from "../components/RouteMap";

export function HomeView({
  status,
  onToggleStatus,
  todayEarnings,
  todayTrips,
  weeklyTotal,
  pushToast,
}) {
  const online = status === "online";

  const [requests, setRequests] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);
  const [seed, setSeed] = useState(1);

  useEffect(() => {
    if (!online || activeTrip) return;

    const initial = setTimeout(() => {
      setRequests((r) => (r.length === 0 ? [makeRideRequest(seed)] : r));
    }, 1200);

    const interval = setInterval(() => {
      setRequests((r) => {
        if (r.length >= 3) return r;

        setSeed((s) => s + 1);

        return [...r, makeRideRequest(seed + 1)];
      });
    }, 9000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [online, activeTrip, seed]);

  const handleAccept = (r) => {
    setRequests((cur) => cur.filter((x) => x.id !== r.id));

    setActiveTrip({
      id: r.id,
      passengerName: r.passengerName,
      pickupAddress: r.pickupAddress,
      destinationAddress: r.destinationAddress,
      fare: r.estimatedFare,
      distanceKm: r.tripDistanceKm,
      etaMinutes: r.estimatedMinutes,
      status: "to_pickup",
    });

    pushToast("success", `Ride accepted — navigating to ${r.pickupAddress}`);
  };

  const handleReject = (r) => {
    setRequests((cur) => cur.filter((x) => x.id !== r.id));

    pushToast("info", `Request from ${r.passengerName} declined`);
  };

  const handleComplete = () => {
    if (!activeTrip) return;

    pushToast(
      "success",
      `Trip completed — $${activeTrip.fare.toFixed(2)} earned`
    );

    setActiveTrip(null);
  };

  const handleCancel = () => {
    if (!activeTrip) return;

    pushToast("error", "Trip cancelled");

    setActiveTrip(null);
  };

  const mapStatus = activeTrip ? activeTrip.status : "idle";

  return (
    <div className="space-y-5">
      <StatusBanner online={online} onToggle={onToggleStatus} />

      <EarningsOverview
        todayEarnings={todayEarnings}
        todayTrips={todayTrips}
        weeklyTotal={weeklyTotal}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <section className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio
                size={18}
                className={
                  online
                    ? "text-red-500 animate-ping-slow"
                    : "text-ink-400"
                }
              />

              <h2 className="text-lg font-extrabold text-ink-900">
                Live Ride Requests
              </h2>
            </div>

            <span className="chip bg-ink-100 text-ink-600">
              {online ? `${requests.length} incoming` : "Offline"}
            </span>
          </div>

          {activeTrip && (
            <ActiveTripPanel
              trip={activeTrip}
              onComplete={handleComplete}
              onCancel={handleCancel}
            />
          )}

          {online && requests.length > 0 ? (
            <div className="space-y-4 stagger">
              {requests.map((r, i) => (
                <RideRequestCard
                  key={r.id}
                  request={r}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  index={i}
                />
              ))}
            </div>
          ) : (
            !activeTrip && (
              <div className="card p-10 text-center">
                <div className="mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-ink-100 text-ink-400 mb-3">
                  <Inbox size={26} />
                </div>

                <p className="font-bold text-ink-800">
                  {online
                    ? "Waiting for ride requests"
                    : "You are offline"}
                </p>

                <p className="text-sm text-ink-500 mt-1">
                  {online
                    ? "New requests will appear here automatically."
                    : "Go online to start receiving ride requests."}
                </p>
              </div>
            )
          )}
        </section>

        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-extrabold text-ink-900">
              Navigation
            </h2>

            <span className="chip bg-gold-50 text-gold-700">
              <Sparkles size={13} /> Live route
            </span>
          </div>

          <div className="card p-2 h-[320px] sm:h-[400px] lg:h-[560px] lg:sticky lg:top-20">
            <RouteMap
              destination={activeTrip?.destinationAddress}
              status={mapStatus}
              online={online}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatusBanner({ online, onToggle }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-colors duration-500 ${
        online
          ? "bg-gradient-to-br from-red-600 to-red-700"
          : "bg-gradient-to-br from-ink-900 to-ink-800"
      } text-white animate-fade-in`}
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gold-400/20 blur-2xl" />
      <div className="absolute right-20 -bottom-16 w-32 h-32 rounded-full bg-white/5 blur-2xl" />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex w-3 h-3">
              {online && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-white/70 animate-pulse-ring" />
              )}

              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  online ? "bg-white" : "bg-red-500"
                }`}
              />
            </span>

            <p className="text-xs font-bold uppercase tracking-wider text-white/70">
              {online ? "You are online" : "You are offline"}
            </p>
          </div>

          <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight">
            {online
              ? "Ready to receive rides"
              : "Go online to start earning"}
          </h2>

          <p className="mt-1 text-sm text-white/70">
            {online
              ? "You will be matched with nearby passengers automatically."
              : "Toggle your status to begin accepting ride requests."}
          </p>
        </div>

        <button
          onClick={onToggle}
          className={`btn btn-lg tap shrink-0 font-extrabold text-base px-8 animate-toggle-pop border-2 ${
            online
              ? "bg-white text-red-600 border-white hover:bg-ink-100 shadow-lg"
              : "bg-red-500 text-white border-red-500 hover:bg-red-600 shadow-glowRed"
          }`}
          aria-pressed={online}
          aria-label={online ? "Go offline" : "Go online"}
        >
          <Power size={20} strokeWidth={2.5} />
          {online ? "Go Offline" : "Go Online"}
        </button>
      </div>
    </div>
  );
}