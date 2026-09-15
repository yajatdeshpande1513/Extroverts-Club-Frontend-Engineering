import { useWizard } from "../context/WizardContext";
import Logo from "./Logo";

export default function StepHeader() {
  const { currentStepIndex, totalSteps } = useWizard();
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className="px-6 pt-8">
      <div className="flex items-center justify-between">
        <Logo size={34} />
        <span className="text-xs font-bold uppercase tracking-widest text-white/90">
          Getting Ready
        </span>
      </div>
      <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
