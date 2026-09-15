import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  disabled,
  disabledHint,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      {label && (
        <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-white/70">
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-xl border bg-transparent px-4 py-3.5 text-left text-[15px] outline-none transition-colors disabled:opacity-40 ${
          error ? "border-app-error/70" : "border-app-border"
        }`}
      >
        <span className={value ? "text-white" : "text-white/30"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {error ? (
        <p className="mt-2 text-xs text-app-error">{error}</p>
      ) : disabled && disabledHint ? (
        <p className="mt-2 text-xs text-white/40">{disabledHint}</p>
      ) : null}

      {open && !disabled && (
        <div className="scroll-thin absolute z-30 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-app-border bg-[#121212] shadow-xl shadow-black/50 animate-fadeIn">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-white/40">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-3 text-left text-[15px] transition-colors hover:bg-white/5 ${
                  option === value ? "text-white font-semibold" : "text-white/80"
                }`}
              >
                {option}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
