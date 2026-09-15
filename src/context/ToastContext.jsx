import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const showToast = useCallback(
    (message, type = "success", duration = 3200) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 z-[100] flex flex-col items-center gap-2 px-4 pt-4"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ toast, onDismiss }) {
  const { message, type } = toast;

  const styles = {
    success: {
      icon: CheckCircle2,
      iconColor: "text-app-success",
      border: "border-app-success/40",
    },
    error: {
      icon: XCircle,
      iconColor: "text-app-error",
      border: "border-app-error/40",
    },
    info: {
      icon: Info,
      iconColor: "text-app-accent",
      border: "border-app-accent/40",
    },
  }[type] || {
    icon: Info,
    iconColor: "text-app-accent",
    border: "border-app-accent/40",
  };

  const Icon = styles.icon;

  return (
    <div
      className={`pointer-events-auto w-full max-w-[360px] animate-toastIn rounded-xl border ${styles.border} bg-[#151515] px-4 py-3 shadow-lg shadow-black/40`}
      role="status"
    >
      <div className="flex items-start gap-2.5">
        <Icon size={18} className={`mt-0.5 shrink-0 ${styles.iconColor}`} />
        <p className="flex-1 text-sm leading-snug text-white/90">{message}</p>
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 text-white/40 transition hover:text-white/80"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
