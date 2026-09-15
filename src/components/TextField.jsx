import { AlertCircle } from "lucide-react";

export default function TextField({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
  inputMode,
  maxLength,
  autoFocus,
  helperText,
  disabled,
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-white/70">
          {label}
        </label>
      )}
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        autoFocus={autoFocus}
        disabled={disabled}
        className={`w-full rounded-xl border bg-transparent px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors duration-150 focus:border-white/70 disabled:opacity-50 ${
          error ? "border-app-error/70" : "border-app-border"
        }`}
      />
      {error ? (
        <div className="mt-2 flex items-center gap-1.5 animate-fadeIn">
          <AlertCircle size={13} className="shrink-0 text-app-error" />
          <p className="text-xs text-app-error">{error}</p>
        </div>
      ) : helperText ? (
        <p className="mt-2 text-xs leading-relaxed text-white/40">{helperText}</p>
      ) : null}
    </div>
  );
}
