export const validateUserFields = (
  fields: Record<string, any>
): Record<string, string> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^0\d{9}$/;
  const errors: Record<string, string> = {};

  const requiredFields = [
    "fullName",
    "email",
    "phone",
    "birthDay",
    "userRoleId",
  ];

  requiredFields.forEach((field) => {
    if (!fields[field]) {
      errors[field] = `${field} is required`;
    }
  });

  if (fields.email && !emailRegex.test(fields.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (fields.phone && !phoneRegex.test(fields.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  return errors;
};
