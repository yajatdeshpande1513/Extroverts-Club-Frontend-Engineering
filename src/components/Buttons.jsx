import { Loader2 } from "lucide-react";

export function PrimaryButton({
  children,
  onClick,
  loading,
  disabled,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="flex w-full items-center justify-center rounded-xl bg-white py-4 text-sm font-bold uppercase tracking-wide text-black transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin text-black/70" />
      ) : (
        children
      )}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center rounded-xl border border-white bg-transparent py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
