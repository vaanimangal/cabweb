import { useMemo, useState } from "react";

import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { BottomNav } from "./components/BottomNav";
import { ToastStack, useToasts } from "./components/Toast";

import { HomeView } from "./views/HomeView";
import { EarningsView } from "./views/EarningsView";
import { DocumentsView } from "./views/DocumentsView";
import { RatingsView } from "./views/RatingsView";
import { ProfileView } from "./views/ProfileView";

import { weeklyEarnings } from "./data";

const VIEW_META = {
  home: {
    title: "Dashboard",
    subtitle: "Welcome back",
  },
  earnings: {
    title: "Earnings",
    subtitle: "Track your earnings",
  },
  documents: {
    title: "Documents",
    subtitle: "Manage verification documents",
  },
  ratings: {
    title: "Ratings",
    subtitle: "Passenger reviews",
  },
  profile: {
    title: "Profile",
    subtitle: "Manage account",
  },
};

export default function DriverDashboard() {
  const [view, setView] = useState("home");
  const [status, setStatus] = useState("offline");
  const [menuOpen, setMenuOpen] = useState(false);

  const { toasts, push, dismiss } = useToasts();

  const todayIdx = useMemo(() => {
    const t = new Date().getDay();
    return t === 0 ? 6 : t - 1;
  }, []);

  const todayData = weeklyEarnings[todayIdx];

  const todayEarnings = todayData?.earnings ?? 0;
  const todayTrips = todayData?.trips ?? 0;

  const weeklyTotal = weeklyEarnings.reduce(
    (sum, day) => sum + day.earnings,
    0
  );

  const toggleStatus = () => {
    setStatus((prev) => {
      const next = prev === "online" ? "offline" : "online";

      push(
        next === "online" ? "success" : "info",
        next === "online"
          ? "You are now online"
          : "You are now offline"
      );

      return next;
    });
  };

  const meta = VIEW_META[view];

  return (
    <div className="min-h-screen bg-ink-50 flex">

      <Sidebar
        view={view}
        onNavigate={setView}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="flex-1">

        <TopBar
          status={status}
          onToggleStatus={toggleStatus}
          onOpenMenu={() => setMenuOpen(true)}
          title={meta.title}
          subtitle={meta.subtitle}
        />

        <main className="p-6">

          {view === "home" && (
            <HomeView
              status={status}
              onToggleStatus={toggleStatus}
              todayEarnings={todayEarnings}
              todayTrips={todayTrips}
              weeklyTotal={weeklyTotal}
              pushToast={push}
            />
          )}

          {view === "earnings" && (
            <EarningsView />
          )}

          {view === "documents" && (
            <DocumentsView pushToast={push} />
          )}

          {view === "ratings" && (
            <RatingsView />
          )}

          {view === "profile" && (
            <ProfileView pushToast={push} />
          )}

        </main>

      </div>

      <BottomNav
        view={view}
        onNavigate={setView}
      />

      <ToastStack
        toasts={toasts}
        onDismiss={dismiss}
      />

    </div>
  );
}