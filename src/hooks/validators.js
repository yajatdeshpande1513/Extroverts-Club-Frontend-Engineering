export function isBlank(value) {
  return !value || value.trim().length === 0;
}

export function validateEmail(email) {
  if (isBlank(email)) return "Email is required.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.trim())) return "Enter a valid email address.";
  return "";
}

export function validatePhone(phone) {
  if (isBlank(phone)) return "Phone number is required.";
  const digitsOnly = /^[0-9]+$/;
  if (!digitsOnly.test(phone)) return "Phone number must contain digits only.";
  if (phone.length !== 10) return "Enter a valid 10-digit phone number.";
  return "";
}

export function validateFullName(name) {
  if (isBlank(name)) return "Full name is required.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  if (name.trim().length > 60) return "Name must be under 60 characters.";
  const validName = /^[a-zA-Z\s.'-]+$/;
  if (!validName.test(name.trim())) return "Name contains invalid characters.";
  return "";
}

export function validateAge(age) {
  if (isBlank(age)) return "Age is required.";
  const digitsOnly = /^[0-9]+$/;
  if (!digitsOnly.test(age)) return "Age must be a number.";
  const numeric = parseInt(age, 10);
  if (numeric < 18) return "You must be 18 or older to party with us.";
  if (numeric > 100) return "Enter a valid age.";
  return "";
}

export function validatePronouns(pronouns) {
  if (!pronouns || pronouns.length === 0) return "Select at least one pronoun.";
  return "";
}

export function validateState(state) {
  if (isBlank(state)) return "Please select your state.";
  return "";
}

export function validateCity(city) {
  if (isBlank(city)) return "Please select your city/college.";
  return "";
}
