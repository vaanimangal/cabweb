import { useMemo, useState } from 'react';
import type { ViewKey, DriverStatus } from './types';
import { weeklyEarnings } from './data';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { ToastStack, useToasts } from './components/Toast';
import { HomeView } from './views/HomeView';
import { EarningsView } from './views/EarningsView';
import { DocumentsView } from './views/DocumentsView';
import { RatingsView } from './views/RatingsView';
import { ProfileView } from './views/ProfileView';

const VIEW_META: Record<ViewKey, { title: string; subtitle: string }> = {
  home: { title: 'Dashboard', subtitle: 'Welcome back, Marcus' },
  earnings: { title: 'Earnings History', subtitle: 'Track your daily and weekly earnings' },
  documents: { title: 'My Documents', subtitle: 'Manage your verification documents' },
  ratings: { title: 'Ratings & Reviews', subtitle: 'See what passengers say about you' },
  profile: { title: 'Profile Settings', subtitle: 'Manage your account and preferences' },
};

export default function App() {
  const [view, setView] = useState<ViewKey>('home');
  const [status, setStatus] = useState<DriverStatus>('offline');
  const [menuOpen, setMenuOpen] = useState(false);
  const { toasts, push, dismiss } = useToasts();

  const todayIdx = useMemo(() => {
    const t = new Date().getDay();
    return t === 0 ? 6 : t - 1;
  }, []);
  const todayData = weeklyEarnings[todayIdx];
  const todayEarnings = todayData?.earnings ?? 0;
  const todayTrips = todayData?.trips ?? 0;
  const weeklyTotal = weeklyEarnings.reduce((s, d) => s + d.earnings, 0);

  const toggleStatus = () => {
    setStatus((s) => {
      const next = s === 'online' ? 'offline' : 'online';
      push(next === 'online' ? 'success' : 'info', next === 'online' ? 'You are now online — ready for rides' : 'You are now offline');
      return next;
    });
  };

  const meta = VIEW_META[view];

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 flex">
      <Sidebar view={view} onNavigate={setView} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar
          status={status}
          onToggleStatus={toggleStatus}
          onOpenMenu={() => setMenuOpen(true)}
          title={meta.title}
          subtitle={meta.subtitle}
        />

        <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6 max-w-7xl w-full mx-auto">
          <div key={view} className="animate-fade-in">
            {view === 'home' && (
              <HomeView
                status={status}
                onToggleStatus={toggleStatus}
                todayEarnings={todayEarnings}
                todayTrips={todayTrips}
                weeklyTotal={weeklyTotal}
                pushToast={push}
              />
            )}
            {view === 'earnings' && <EarningsView />}
            {view === 'documents' && <DocumentsView pushToast={push} />}
            {view === 'ratings' && <RatingsView />}
            {view === 'profile' && <ProfileView pushToast={push} />}
          </div>
        </main>

        <BottomNav view={view} onNavigate={setView} />
      </div>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
