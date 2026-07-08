import { Menu, Bell, Search, Power } from "lucide-react";
import { driverProfile } from "../data";

export function TopBar({
  status,
  onToggleStatus,
  onOpenMenu,
  title,
  subtitle,
}) {
  const online = status === "online";

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-ink-100">
      <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
        <button
          onClick={onOpenMenu}
          className="lg:hidden grid place-items-center w-10 h-10 rounded-xl text-ink-700 hover:bg-ink-100 tap"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-ink-900 truncate">
            {title}
          </h1>

          <p className="text-xs text-ink-500 font-medium truncate hidden sm:block">
            {subtitle}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 h-10 px-3 rounded-xl bg-ink-100 text-ink-500 w-56">
          <Search size={16} />

          <input
            placeholder="Search trips, places…"
            className="bg-transparent outline-none text-sm text-ink-800 placeholder:text-ink-400 w-full"
          />
        </div>

        <button
          className="relative grid place-items-center w-10 h-10 rounded-xl text-ink-700 hover:bg-ink-100 tap"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <button
          onClick={onToggleStatus}
          className={`btn btn-md tap shrink-0 font-bold border-2 transition-all duration-300 ${
            online
              ? "bg-red-500 text-white border-red-500 shadow-glowRed hover:bg-red-600"
              : "bg-ink-900 text-white border-ink-900 hover:bg-ink-800"
          }`}
          aria-pressed={online}
          aria-label={online ? "Go offline" : "Go online"}
        >
          <span className="relative flex items-center">
            <span
              className={`w-2 h-2 rounded-full ${
                online ? "bg-white" : "bg-red-500"
              } ${online ? "animate-ping-slow" : ""}`}
            />
          </span>

          <span>{online ? "Online" : "Offline"}</span>

          <Power size={15} className="opacity-80" />
        </button>

        <img
          src={driverProfile.avatarUrl}
          alt=""
          className="hidden sm:block w-10 h-10 rounded-xl object-cover ring-2 ring-ink-100"
        />
      </div>
    </header>
  );
}