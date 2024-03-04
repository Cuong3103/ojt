export const validateUserFields = (fields: {
  [key: string]: any;
}): { [key: string]: any } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,}$/;
  const errors: { [key: string]: any } = {};

  if (!fields.fullName) {
    errors["required"] = "This field is required";
  }
  if (!fields.birthDay) {
    errors["dob"] = "Day of birth is required";
  }
  if (!fields.role) {
    errors["role"] = "Role is required";
  }
  if (!emailRegex.test(fields.email)) {
    errors["email"] = "Please enter a valid email address";
  }
  if (!phoneRegex.test(fields.phone)) {
    errors["phone"] = "Please enter a valid phone number";
  }

  return errors;
};
