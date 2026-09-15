import { useState } from "react";
import { X } from "lucide-react";
import { PRONOUN_OPTIONS, MAX_PRONOUNS } from "../data/locations";
import { PrimaryButton } from "./Buttons";
import { useToast } from "../context/ToastContext";

export default function PronounSelect({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value || []);
  const { showToast } = useToast();

  const openModal = () => {
    setDraft(value || []);
    setOpen(true);
  };

  const toggle = (pronoun) => {
    setDraft((prev) => {
      if (prev.includes(pronoun)) {
        return prev.filter((p) => p !== pronoun);
      }
      if (prev.length >= MAX_PRONOUNS) {
        showToast(`You can select up to ${MAX_PRONOUNS} pronouns.`, "info");
        return prev;
      }
      return [...prev, pronoun];
    });
  };

  const handleProceed = () => {
    onChange(draft);
    setOpen(false);
  };

  return (
    <div className="w-full">
      <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-white/70">
        Pronouns
      </label>
      <button
        type="button"
        onClick={openModal}
        className={`flex w-full items-center justify-between rounded-xl border bg-transparent px-4 py-3.5 text-left text-[15px] outline-none transition-colors ${
          error ? "border-app-error/70" : "border-app-border"
        }`}
      >
        <span className={value?.length ? "text-white" : "text-white/30"}>
          {value?.length ? value.join(" / ") : "Select up to 3"}
        </span>
      </button>
      {error && <p className="mt-2 text-xs text-app-error">{error}</p>}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 animate-fadeIn md:items-center">
          <div className="flex max-h-[85%] w-full max-w-[390px] flex-col rounded-t-3xl bg-app-bg md:max-h-[80%] md:rounded-3xl md:border md:border-app-border">
            <div className="flex items-center justify-between px-6 pt-6">
              <h2 className="text-xl font-extrabold text-white">
                Select Pronouns
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-white/70 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>
            <p className="px-6 pt-2 text-sm text-white/50">
              Select upto {MAX_PRONOUNS}
            </p>

            <div className="scroll-thin mt-4 flex-1 overflow-y-auto px-6">
              <div className="flex flex-col gap-1 pb-4">
                {PRONOUN_OPTIONS.map((pronoun) => {
                  const checked = draft.includes(pronoun);
                  return (
                    <label
                      key={pronoun}
                      className="flex cursor-pointer items-center gap-3 py-2.5"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          checked
                            ? "border-white bg-white"
                            : "border-app-borderLight"
                        }`}
                      >
                        {checked && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 6L5 9L10 3"
                              stroke="black"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={checked}
                        onChange={() => toggle(pronoun)}
                      />
                      <span className="text-[15px] text-white">{pronoun}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="px-6 pb-8 pt-2">
              <PrimaryButton onClick={handleProceed}>Proceed</PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
