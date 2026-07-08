import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

let nextId = 1;

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const push = (kind, message) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, kind, message }]);
  };

  const dismiss = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    push,
    dismiss,
  };
}

export function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const meta = {
    success: {
      icon: CheckCircle2,
      color: "text-red-600",
      bg: "bg-red-50",
      ring: "ring-red-200",
    },
    error: {
      icon: XCircle,
      color: "text-red-700",
      bg: "bg-red-50",
      ring: "ring-red-300",
    },
    info: {
      icon: Info,
      color: "text-ink-700",
      bg: "bg-ink-100",
      ring: "ring-ink-200",
    },
  }[toast.kind];

  const Icon = meta.icon;

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl bg-white shadow-card ring-1 ${meta.ring} animate-slide-in-right`}
      role="status"
    >
      <span
        className={`grid place-items-center w-9 h-9 rounded-xl ${meta.bg} ${meta.color} shrink-0`}
      >
        <Icon size={18} strokeWidth={2.5} />
      </span>

      <p className="flex-1 text-sm font-semibold text-ink-800 pt-1.5">
        {toast.message}
      </p>

      <button
        onClick={() => onDismiss(toast.id)}
        className="grid place-items-center w-7 h-7 rounded-lg text-ink-400 hover:bg-ink-100 tap shrink-0"
        aria-label="Dismiss"
      >
        <X size={15} />
      </button>
    </div>
  );
}