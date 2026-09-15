import { useState } from "react";
import { useWizard } from "../../context/WizardContext";
import { PrimaryButton } from "../Buttons";
import Logo from "../Logo";

export default function LandingScreen() {
  const { goTo, SCREENS } = useWizard();
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      goTo(SCREENS.TERMS, "forward");
    }, 500);
  };

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden">
      {/* Gradient blob backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, #ff6a3d 0%, transparent 45%), radial-gradient(circle at 85% 15%, #3d9dff 0%, transparent 45%), radial-gradient(circle at 50% 55%, #2ee6a8 0%, transparent 55%), radial-gradient(circle at 30% 60%, #ff4d8d 0%, transparent 45%)",
        }}
      />
      {/* Dark mountain silhouette shape */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45%]"
        style={{
          background:
            "radial-gradient(ellipse 90% 100% at 50% 100%, rgba(5,5,5,0.97) 40%, transparent 70%), linear-gradient(to bottom, transparent, #050505 55%)",
        }}
      />
      <div
        className="absolute bottom-[28%] left-1/2 h-[220px] w-[130%] -translate-x-1/2 rounded-[50%] bg-[#0a0a0a]"
        style={{ filter: "blur(2px)" }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-8 py-14">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Logo size={72} />
        </div>

        <div className="flex w-full flex-col items-center gap-6 pb-4 text-center animate-slideUp">
          <div>
            <p className="text-sm font-semibold tracking-wide text-white/80">
              AN APP ONLY FOR
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white">
              EXTROVERTS
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            <span className="font-semibold text-orange-400">Warning:</span>{" "}
            Entering may lead to spontaneous dancing and unsolicited
            high-fives!
          </p>
          <div className="w-full pt-2">
            <PrimaryButton onClick={handleContinue} loading={loading}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
