import { useState } from "react";
import { useWizard } from "../../context/WizardContext";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import StepHeader from "../StepHeader";
import { useToast } from "../../context/ToastContext";
import { Check, Pencil } from "lucide-react";

const INTEREST_OPTIONS = [
  "Live Music",
  "House Parties",
  "Rooftop Nights",
  "Clubbing",
  "Board Games",
  "Foodie Meetups",
  "Day Trips",
  "Art & Culture",
];

export default function Step4Review() {
  const { formData, updateForm, goToNextStep, goToPrevStep, goTo, SCREENS } =
    useWizard();
  const { showToast } = useToast();

  const [interests, setInterests] = useState(formData.preferences || []);
  const [newsletter, setNewsletter] = useState(formData.newsletter || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleInterest = (interest) => {
    setInterests((prev) => {
      const next = prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest];
      if (next.length) setError("");
      return next;
    });
  };

  const summaryRows = [
    { label: "Email", value: formData.email, step: SCREENS.STEP_1 },
    { label: "Phone", value: formData.phone, step: SCREENS.STEP_1 },
    { label: "Name", value: formData.fullName, step: SCREENS.STEP_3 },
    { label: "Age", value: formData.age, step: SCREENS.STEP_3 },
    {
      label: "Pronouns",
      value: formData.pronouns?.join(" / ") || "—",
      step: SCREENS.STEP_3,
    },
    {
      label: "Location",
      value: [formData.city, formData.state].filter(Boolean).join(", ") || "—",
      step: SCREENS.STEP_3,
    },
  ];

  const handleFinish = () => {
    if (interests.length === 0) {
      setError("Pick at least one interest so we can tailor your feed.");
      showToast("Select at least one interest to continue.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateForm({ preferences: interests, newsletter });
      showToast("Account created. Welcome to the party!", "success");
      goToNextStep();
    }, 900);
  };

  return (
    <div className="flex h-full flex-col">
      <StepHeader />

      <div className="flex flex-1 flex-col px-6 pb-8 pt-8">
        <div className="scroll-thin flex-1 overflow-y-auto">
          <h1 className="mb-1 text-2xl font-extrabold leading-snug text-white">
            Almost there
          </h1>
          <p className="mb-6 text-sm text-white/50">
            Review your details and pick a few interests.
          </p>

          <div className="mb-8 divide-y divide-app-border rounded-xl border border-app-border">
            {summaryRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/40">
                    {row.label}
                  </p>
                  <p className="text-sm text-white/90">{row.value || "—"}</p>
                </div>
                <button
                  onClick={() => goTo(row.step, "backward")}
                  aria-label={`Edit ${row.label}`}
                  className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white/80"
                >
                  <Pencil size={14} />
                </button>
              </div>
            ))}
          </div>

          <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-white/70">
            What are you into?
          </p>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const active = interests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
                    active
                      ? "border-white bg-white text-black"
                      : "border-app-border text-white/70"
                  }`}
                >
                  {active && <Check size={12} />}
                  {interest}
                </button>
              );
            })}
          </div>
          {error && <p className="mt-3 text-xs text-app-error">{error}</p>}

          <label className="mt-6 flex cursor-pointer items-center gap-3">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                newsletter ? "border-white bg-white" : "border-app-borderLight"
              }`}
            >
              {newsletter && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
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
              checked={newsletter}
              onChange={() => setNewsletter((v) => !v)}
            />
            <span className="text-sm text-white/70">
              I'd like to subscribe to your newsletter
            </span>
          </label>
        </div>

        <div className="mt-6 flex shrink-0 flex-col gap-3">
          <PrimaryButton onClick={handleFinish} loading={loading}>
            Create Account
          </PrimaryButton>
          <SecondaryButton onClick={goToPrevStep} disabled={loading}>
            Back
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
