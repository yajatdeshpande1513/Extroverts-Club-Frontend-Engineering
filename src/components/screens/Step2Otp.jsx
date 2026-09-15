import { useEffect, useRef, useState } from "react";
import { useWizard } from "../../context/WizardContext";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import StepHeader from "../StepHeader";
import { useToast } from "../../context/ToastContext";
import { AlertCircle } from "lucide-react";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;
const CORRECT_OTP = "123456"; // simulated correct code

export default function Step2Otp() {
  const { formData, updateForm, goToNextStep, goToPrevStep } = useWizard();
  const { showToast } = useToast();

  const [digits, setDigits] = useState(
    formData.otp && formData.otp.length === OTP_LENGTH
      ? formData.otp
      : Array(OTP_LENGTH).fill("")
  );
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, rawValue) => {
    const value = rawValue.replace(/[^0-9]/g, "");
    if (!value) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    const chars = value.split("");
    const next = [...digits];
    let cursor = index;
    for (const ch of chars) {
      if (cursor >= OTP_LENGTH) break;
      next[cursor] = ch;
      cursor += 1;
    }
    setDigits(next);
    setError("");

    const nextEmptyIndex = next.findIndex((d, i) => i >= index && d === "");
    const focusTarget =
      nextEmptyIndex === -1 ? Math.min(cursor, OTP_LENGTH - 1) : nextEmptyIndex;
    inputRefs.current[focusTarget]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted
      .slice(0, OTP_LENGTH)
      .split("")
      .forEach((ch, i) => (next[i] = ch));
    setDigits(next);
    const lastFilled = Math.min(pasted.length, OTP_LENGTH) - 1;
    inputRefs.current[Math.max(lastFilled, 0)]?.focus();
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 420);
  };

  const handleVerify = () => {
    const code = digits.join("");
    if (code.length !== OTP_LENGTH) {
      setError("Enter the complete 6-digit code.");
      triggerShake();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code === CORRECT_OTP) {
        updateForm({ otp: digits });
        showToast("Phone and email verified successfully!", "success");
        goToNextStep();
      } else {
        setError("Incorrect code. Please try again.");
        triggerShake();
        showToast("That code didn't match. Try 123456 for this demo.", "error");
      }
    }, 800);
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setTimer(RESEND_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(""));
      setError("");
      inputRefs.current[0]?.focus();
      showToast(`A new code was sent to ${formData.email}`, "success");
    }, 600);
  };

  return (
    <div className="flex h-full flex-col">
      <StepHeader />

      <div className="flex flex-1 flex-col justify-between px-6 pb-8 pt-8">
        <div className="">
          <h1 className="mb-2 text-2xl font-extrabold leading-snug text-white">
            Enter OTP
          </h1>
          <p className="mb-8 text-sm text-white/50">
            A 6-digit code has been sent to{" "}
            <span className="text-white/80">{formData.email || "your email"}</span>.
          </p>

          <div
            className={`flex justify-between gap-2 ${shake ? "animate-shake" : ""}`}
          >
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className={`h-14 w-11 rounded-xl border bg-transparent text-center text-xl font-semibold text-white outline-none transition-colors focus:border-white ${
                  error ? "border-app-error/70" : "border-app-border"
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="mt-3 flex items-center gap-1.5 animate-fadeIn">
              <AlertCircle size={13} className="shrink-0 text-app-error" />
              <p className="text-xs text-app-error">{error}</p>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            {timer > 0 ? (
              <span className="text-xs text-white/40">
                Resend OTP in {timer}s
              </span>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-xs font-semibold text-white/80 underline underline-offset-2 disabled:opacity-40"
              >
                {resending ? "Resending…" : "Resend OTP"}
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <PrimaryButton onClick={handleVerify} loading={loading}>
            Verify
          </PrimaryButton>
          <SecondaryButton onClick={goToPrevStep} disabled={loading}>
            Go Back
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
