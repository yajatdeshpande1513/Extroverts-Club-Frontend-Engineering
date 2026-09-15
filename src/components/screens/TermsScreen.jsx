import { useRef, useState } from "react";
import { useWizard } from "../../context/WizardContext";
import { PrimaryButton } from "../Buttons";
import Logo from "../Logo";
import { useToast } from "../../context/ToastContext";

const TERMS_BODY = `By using this app, you're agreeing to keep things fun, safe, and respectful… and also agreeing to our terms and conditions. Politeness is a must—treat others how you'd want to be treated. Everyone here is looking for reasons to `;

export default function TermsScreen() {
  const { goTo, SCREENS } = useWizard();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const reachedEnd =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
    if (reachedEnd) setScrolledToEnd(true);
  };

  const handleAccept = () => {
    if (!scrolledToEnd) {
      showToast("Please scroll through the full terms before accepting.", "info");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Terms accepted. Let's get you set up!", "success");
      goTo(SCREENS.STEP_1, "forward");
    }, 500);
  };

  return (
    <div className="flex h-full flex-col px-6 pb-8 pt-10">
      <Logo size={40} />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scroll-thin mt-10 flex-1 overflow-y-auto pr-1"
      >
        <p className="text-2xl font-extrabold leading-snug text-white">
          {TERMS_BODY}
          <span className="text-app-accent">PARTY</span>, so bring your best
          vibe and expect the same from others. Let's party responsibly and
          make every experience a great one!
        </p>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/50">
          <p>
            1. You must be 18 years or older to create an account and use
            this app.
          </p>
          <p>
            2. Respect other members at all times. Harassment, hate speech,
            or unsafe behavior will result in an immediate ban.
          </p>
          <p>
            3. Your profile information should be accurate. Impersonation of
            another person is not permitted.
          </p>
          <p>
            4. Event hosts are responsible for the safety and legality of
            their gatherings.
          </p>
          <p>
            5. We may use your location and preferences to recommend nearby
            events and members.
          </p>
          <p>
            6. Continued use of the app after policy updates constitutes
            acceptance of the revised terms.
          </p>
          <p className="pb-6">
            7. You can delete your account and data at any time from account
            settings.
          </p>
        </div>
      </div>

      <div className="mt-6 shrink-0">
        <p className="mb-3 text-center text-xs text-white/40">
          To proceed, accept{" "}
          <span className="underline underline-offset-2">
            Terms and Conditions
          </span>
        </p>
        <PrimaryButton onClick={handleAccept} loading={loading}>
          Accept
        </PrimaryButton>
      </div>
    </div>
  );
}
