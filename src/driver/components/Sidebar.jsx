import { Home, Wallet, FileText, Star, Settings, Car, X } from "lucide-react";
import { driverProfile } from "../data";

const NAV = [
  { key: "home", label: "Home", icon: Home },
  { key: "earnings", label: "Earnings History", icon: Wallet },
  { key: "documents", label: "My Documents", icon: FileText },
  { key: "ratings", label: "Ratings & Reviews", icon: Star },
  { key: "profile", label: "Profile Settings", icon: Settings },
];

export function Sidebar({
  view,
  onNavigate,
  open,
  onClose,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed z-50 inset-y-0 left-0 w-72 bg-ink-950 text-white flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="grid place-items-center w-9 h-9 rounded-xl bg-red-500 shadow-glowRed">
              <Car size={20} className="text-white" strokeWidth={2.5} />
            </div>

            <div className="leading-tight">
              <p className="font-extrabold tracking-tight text-[15px]">
                GEO RIDES
              </p>
              <p className="text-[11px] text-white/50 font-medium">
                GO GEO, GO PLACES
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden grid place-items-center w-9 h-9 rounded-lg text-white/70 hover:bg-white/10 tap"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Menu
          </p>

          {NAV.map(({ key, label, icon: Icon }) => {
            const active = view === key;

            return (
              <button
                key={key}
                onClick={() => {
                  onNavigate(key);
                  onClose();
                }}
                className={`group w-full flex items-center gap-3 px-3 h-12 rounded-xl text-sm font-semibold transition-all duration-200 tap ${
                  active
                    ? "bg-red-500 text-white shadow-glowRed"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />

                <span>{label}</span>

                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3">
          <button
            onClick={() => {
              onNavigate("profile");
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors tap text-left"
          >
            <img
              src={driverProfile.avatarUrl}
              alt=""
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-white/10"
            />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold truncate">
                {driverProfile.name}
              </p>

              <p className="text-xs text-white/50 truncate">
                {driverProfile.vehiclePlate} ·{" "}
                {driverProfile.vehicleModel.split(" ").slice(0, 2).join(" ")}
              </p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}