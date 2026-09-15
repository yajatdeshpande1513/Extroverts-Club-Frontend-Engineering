# E° Signup Wizard — Frontend Replication

A high-fidelity, responsive web replication of a mobile app's signup wizard, built with React, Vite, Tailwind CSS, and Lucide React.

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  context/
    WizardContext.jsx    # Central step/state management, backward-nav data persistence
    ToastContext.jsx     # Global toast/banner notification system
  components/
    PhoneShell.jsx        # Responsive mobile-canvas wrapper (desktop) / full-bleed (mobile)
    Logo.jsx               # "E°" brand mark
    StepHeader.jsx          # Progress bar + "Getting Ready" header for wizard steps
    TextField.jsx           # Reusable input with inline validation error display
    Dropdown.jsx             # Custom dropdown (used for State + dependent City/College)
    PronounSelect.jsx         # Modal-based multi-select (up to 3 pronouns)
    Buttons.jsx                # PrimaryButton / SecondaryButton with loading spinner states
    screens/
      LandingScreen.jsx         # Gradient intro screen
      TermsScreen.jsx            # Scrollable Terms & Conditions requiring full-scroll acknowledgment
      Step1EmailPhone.jsx         # Email + phone input, validated
      Step2Otp.jsx                  # OTP verification: split boxes, auto-focus, resend timer
      Step3Profile.jsx               # Full name, age (18+ enforced), pronouns, state/city dropdowns
      Step4Review.jsx                 # Editable summary + interests + final submission
      CompleteScreen.jsx               # Success screen
  hooks/
    validators.js          # Shared validation functions (email, phone, name, age, etc.)
  data/
    locations.js            # State -> City/College dependent dropdown data
```

## Notes

- OTP demo code is `123456` (see `Step2Otp.jsx`).
- All form state lives in `WizardContext`, so navigating backward through any step preserves previously entered data.
- Age under 18 is blocked with a contextual inline error and a toast.
- The whole app is wrapped in a phone-canvas frame on desktop (≥768px) and stretches full-bleed on actual mobile viewports.
