import { useState } from "react";
import { useWizard } from "../../context/WizardContext";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import StepHeader from "../StepHeader";
import TextField from "../TextField";
import Dropdown from "../Dropdown";
import PronounSelect from "../PronounSelect";
import { STATES, STATE_DATA } from "../../data/locations";
import {
  validateFullName,
  validateAge,
  validatePronouns,
  validateState,
  validateCity,
} from "../../hooks/validators";
import { useToast } from "../../context/ToastContext";

export default function Step3Profile() {
  const { formData, updateForm, goToNextStep, goToPrevStep } = useWizard();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(formData.fullName);
  const [age, setAge] = useState(formData.age);
  const [pronouns, setPronouns] = useState(formData.pronouns);
  const [state, setState] = useState(formData.state);
  const [city, setCity] = useState(formData.city);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const cityOptions = state ? STATE_DATA[state] || [] : [];

  const handleNameChange = (e) => {
    // Block whitespace-only input; allow letters, spaces, and basic punctuation
    const val = e.target.value.replace(/^\s+/, "");
    setFullName(val);
    if (touched.fullName) {
      setErrors((prev) => ({ ...prev, fullName: validateFullName(val) }));
    }
  };

  const handleAgeChange = (e) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "").slice(0, 3);
    setAge(digitsOnly);
    if (touched.age) {
      setErrors((prev) => ({ ...prev, age: validateAge(digitsOnly) }));
    }
  };

  const handleStateChange = (val) => {
    setState(val);
    setCity(""); // reset dependent field when parent changes
    setErrors((prev) => ({ ...prev, state: "", city: "" }));
  };

  const handleBlur = (field, value, validator) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validator(value) }));
  };

  const handleNext = () => {
    const nameErr = validateFullName(fullName);
    const ageErr = validateAge(age);
    const pronounErr = validatePronouns(pronouns);
    const stateErr = validateState(state);
    const cityErr = validateCity(city);

    const nextErrors = {
      fullName: nameErr,
      age: ageErr,
      pronouns: pronounErr,
      state: stateErr,
      city: cityErr,
    };
    setErrors(nextErrors);
    setTouched({ fullName: true, age: true, state: true, city: true });

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) {
      if (ageErr && parseInt(age, 10) < 18 && age) {
        showToast(ageErr, "error");
      } else {
        showToast("Please complete all fields correctly.", "error");
      }
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateForm({ fullName: fullName.trim(), age, pronouns, state, city });
      showToast("Profile details saved.", "success");
      goToNextStep();
    }, 700);
  };

  return (
    <div className="flex h-full flex-col">
      <StepHeader />

      <div className="flex flex-1 flex-col px-6 pb-8 pt-8">
        <div className="scroll-thin flex-1 overflow-y-auto">
          <h1 className="mb-8 text-2xl font-extrabold leading-snug text-white">
            Tell us about you
          </h1>

          <div className="space-y-5">
            <TextField
              label="Full Name"
              value={fullName}
              onChange={handleNameChange}
              onBlur={() => handleBlur("fullName", fullName, validateFullName)}
              error={touched.fullName ? errors.fullName : ""}
              placeholder="Your full name"
              maxLength={60}
              autoFocus
            />
            <TextField
              label="Age"
              inputMode="numeric"
              value={age}
              onChange={handleAgeChange}
              onBlur={() => handleBlur("age", age, validateAge)}
              error={touched.age ? errors.age : ""}
              placeholder="How many years have you been partying?"
              maxLength={3}
              helperText={!touched.age ? "You must be 18+ to join." : null}
            />
            <PronounSelect
              value={pronouns}
              onChange={(val) => {
                setPronouns(val);
                setErrors((prev) => ({ ...prev, pronouns: validatePronouns(val) }));
              }}
              error={errors.pronouns}
            />
            <Dropdown
              label="State"
              value={state}
              onChange={handleStateChange}
              options={STATES}
              placeholder="Select your state"
              error={touched.state ? errors.state : ""}
            />
            <Dropdown
              label="City / College"
              value={city}
              onChange={(val) => {
                setCity(val);
                setErrors((prev) => ({ ...prev, city: validateCity(val) }));
              }}
              options={cityOptions}
              placeholder="Select your city or college"
              error={touched.city ? errors.city : ""}
              disabled={!state}
              disabledHint={!state ? "Select a state first." : null}
            />
          </div>
        </div>

        <div className="mt-6 flex shrink-0 flex-col gap-3">
          <PrimaryButton onClick={handleNext} loading={loading}>
            Next
          </PrimaryButton>
          <SecondaryButton onClick={goToPrevStep} disabled={loading}>
            Back
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
