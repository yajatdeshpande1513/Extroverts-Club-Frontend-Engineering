import { WizardProvider, useWizard } from "./context/WizardContext";
import { ToastProvider } from "./context/ToastContext";
import PhoneShell from "./components/PhoneShell";
import LandingScreen from "./components/screens/LandingScreen";
import TermsScreen from "./components/screens/TermsScreen";
import Step1EmailPhone from "./components/screens/Step1EmailPhone";
import Step2Otp from "./components/screens/Step2Otp";
import Step3Profile from "./components/screens/Step3Profile";
import Step4Review from "./components/screens/Step4Review";
import CompleteScreen from "./components/screens/CompleteScreen";

function ScreenRouter() {
  const { screen, direction, SCREENS } = useWizard();

  const screens = {
    [SCREENS.LANDING]: LandingScreen,
    [SCREENS.TERMS]: TermsScreen,
    [SCREENS.STEP_1]: Step1EmailPhone,
    [SCREENS.STEP_2]: Step2Otp,
    [SCREENS.STEP_3]: Step3Profile,
    [SCREENS.STEP_4]: Step4Review,
    [SCREENS.COMPLETE]: CompleteScreen,
  };

  const Current = screens[screen] || LandingScreen;
  const animClass =
    direction === "forward" ? "animate-slideInRight" : "animate-slideInLeft";

  return (
    <div key={screen} className={`h-full min-h-full ${animClass}`}>
      <Current />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <WizardProvider>
        <PhoneShell>
          <ScreenRouter />
        </PhoneShell>
      </WizardProvider>
    </ToastProvider>
  );
}

export default App;
