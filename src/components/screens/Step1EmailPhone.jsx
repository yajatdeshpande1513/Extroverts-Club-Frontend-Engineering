import { useState } from "react";
import { useWizard } from "../../context/WizardContext";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import StepHeader from "../StepHeader";
import TextField from "../TextField";
import { validateEmail, validatePhone } from "../../hooks/validators";
import { useToast } from "../../context/ToastContext";

export default function Step1EmailPhone() {
  const { formData, updateForm, goToNextStep, goToPrevStep } = useWizard();
  const { showToast } = useToast();
  const [email, setEmail] = useState(formData.email);
  const [phone, setPhone] = useState(formData.phone);
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [touched, setTouched] = useState({ email: false, phone: false });
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(digitsOnly);
    if (touched.phone) {
      setErrors((prev) => ({ ...prev, phone: validatePhone(digitsOnly) }));
    }
  };

  const handleBlur = (field, value, validator) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validator(value) }));
  };

  const handleNext = () => {
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    setErrors({ email: emailErr, phone: phoneErr });
    setTouched({ email: true, phone: true });

    if (emailErr || phoneErr) {
      showToast("Please fix the errors before continuing.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateForm({ email: email.trim(), phone });
      showToast(`OTP sent to ${email.trim()}`, "success");
      goToNextStep();
    }, 700);
  };

  return (
    <div className="flex h-full flex-col">
      <StepHeader />

      <div className="flex flex-1 flex-col justify-between px-6 pb-8 pt-8">
        <div className="">
          <h1 className="mb-8 text-2xl font-extrabold leading-snug text-white">
            Let's verify it's really you
          </h1>

          <div className="space-y-5">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => handleBlur("email", email, validateEmail)}
              error={touched.email ? errors.email : ""}
              placeholder="you@example.com"
              autoFocus
            />
            <TextField
              label="Phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => handleBlur("phone", phone, validatePhone)}
              error={touched.phone ? errors.phone : ""}
              placeholder="10-digit mobile number"
              maxLength={10}
              helperText={!touched.phone ? "We'll text you a verification code." : null}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
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
