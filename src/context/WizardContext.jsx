import { createContext, useContext, useState, useCallback } from "react";

const WizardContext = createContext(null);

export const SCREENS = {
  LANDING: "landing",
  TERMS: "terms",
  STEP_1: "step_1",
  STEP_2: "step_2",
  STEP_3: "step_3",
  STEP_4: "step_4",
  COMPLETE: "complete",
};

const STEP_ORDER = [
  SCREENS.STEP_1,
  SCREENS.STEP_2,
  SCREENS.STEP_3,
  SCREENS.STEP_4,
];

const initialFormData = {
  email: "",
  phone: "",
  otp: ["", "", "", "", "", ""],
  fullName: "",
  age: "",
  pronouns: [],
  state: "",
  city: "",
  preferences: [],
  newsletter: false,
};

export function WizardProvider({ children }) {
  const [screen, setScreen] = useState(SCREENS.LANDING);
  const [formData, setFormData] = useState(initialFormData);
  const [direction, setDirection] = useState("forward");

  const updateForm = useCallback((patch) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  }, []);

  const goTo = useCallback((nextScreen, dir = "forward") => {
    setDirection(dir);
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const currentStepIndex = STEP_ORDER.indexOf(screen);

  const goToNextStep = useCallback(() => {
    const idx = STEP_ORDER.indexOf(screen);
    if (idx === -1 || idx === STEP_ORDER.length - 1) {
      goTo(SCREENS.COMPLETE, "forward");
      return;
    }
    goTo(STEP_ORDER[idx + 1], "forward");
  }, [screen, goTo]);

  const goToPrevStep = useCallback(() => {
    const idx = STEP_ORDER.indexOf(screen);
    if (idx <= 0) {
      goTo(SCREENS.TERMS, "backward");
      return;
    }
    goTo(STEP_ORDER[idx - 1], "backward");
  }, [screen, goTo]);

  const resetWizard = useCallback(() => {
    setFormData(initialFormData);
    goTo(SCREENS.LANDING, "forward");
  }, [goTo]);

  return (
    <WizardContext.Provider
      value={{
        screen,
        goTo,
        formData,
        updateForm,
        direction,
        currentStepIndex,
        totalSteps: STEP_ORDER.length,
        goToNextStep,
        goToPrevStep,
        resetWizard,
        SCREENS,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within a WizardProvider");
  return ctx;
}
