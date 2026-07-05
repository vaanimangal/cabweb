import { Home, Wallet, FileText, Star, Settings } from 'lucide-react';
import type { ViewKey } from '../types';

const NAV: { key: ViewKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'earnings', label: 'Earnings', icon: Wallet },
  { key: 'documents', label: 'Docs', icon: FileText },
  { key: 'ratings', label: 'Ratings', icon: Star },
  { key: 'profile', label: 'Profile', icon: Settings },
];

export function BottomNav({ view, onNavigate }: { view: ViewKey; onNavigate: (v: ViewKey) => void }) {
  return (
    <nav className="lg:hidden sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-ink-100 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5">
        {NAV.map(({ key, label, icon: Icon }) => {
          const active = view === key;
          return (
            <button key={key} onClick={() => onNavigate(key)} className="relative flex flex-col items-center justify-center gap-1 h-16 tap" aria-current={active ? 'page' : undefined}>
              {active && <span className="absolute top-0 h-1 w-8 rounded-b-full bg-red-500" />}
              <Icon size={22} strokeWidth={active ? 2.5 : 2} className={active ? 'text-red-600' : 'text-ink-400'} />
              <span className={`text-[10px] font-semibold ${active ? 'text-red-700' : 'text-ink-500'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
