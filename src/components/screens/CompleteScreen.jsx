import { PartyPopper } from "lucide-react";
import { useWizard } from "../../context/WizardContext";
import { PrimaryButton } from "../Buttons";
import Logo from "../Logo";

export default function CompleteScreen() {
  const { formData, resetWizard } = useWizard();

  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center animate-fadeIn">
      <Logo size={44} />
      <div className="my-8 flex h-20 w-20 items-center justify-center rounded-full bg-app-accent/15">
        <PartyPopper size={36} className="text-app-accent" />
      </div>
      <h1 className="mb-3 text-2xl font-extrabold text-white">
        You're in, {formData.fullName?.split(" ")[0] || "friend"}!
      </h1>
      <p className="mb-10 text-sm leading-relaxed text-white/50">
        Your account is ready. Time to find your people and bring your best
        vibe.
      </p>
      <div className="w-full">
        <PrimaryButton onClick={resetWizard}>Start Over</PrimaryButton>
      </div>
    </div>
  );
}
