import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import './Toast.css';

let nextId = 1;

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const push = (kind, message) => {
    const id = nextId++;
    setToasts((t) => [...t, { id, kind, message }]);
  };
  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  return { toasts, push, dismiss };
}

export function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const meta = {
    success: { icon: CheckCircle2, className: 'success' },
    error: { icon: XCircle, className: 'error' },
    info: { icon: Info, className: 'info' },
  }[toast.kind];
  
  const Icon = meta.icon;

  return (
    <div className={`toast-item ${meta.className}`} role="status">
      <span className="toast-icon-wrapper">
        <Icon size={18} strokeWidth={2.5} />
      </span>
      <p className="toast-message">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="toast-dismiss"
        aria-label="Dismiss"
      >
        <X size={15} />
      </button>
    </div>
  );
}