export type LeadFormValues = {
  fullName: string;
  email: string;
  leadType: string;
  companyName: string;
  phone: string;
  notes: string;
  consent: boolean;
};

export type LeadFormErrors = Partial<
  Record<keyof LeadFormValues, string>
>;

export function validateLeadForm(
  config: any[],
  values: LeadFormValues
): LeadFormErrors {
  const errors: LeadFormErrors = {};

  config.forEach((field) => {
    // Check if conditional field should be validated
    if (field.showWhen) {
      const dependentValue =
        values[field.showWhen.field as keyof LeadFormValues];

      if (dependentValue !== field.showWhen.value) {
        return;
      }
    }

    const value =
      values[field.name as keyof LeadFormValues];

    // Required validation
    if (field.required) {
      const isEmpty =
        typeof value === "boolean"
          ? value === false
          : String(value).trim() === "";

      if (isEmpty) {
        if (field.name === "consent") {
          errors.consent = "Consent is required";
        } else {
          errors[field.name as keyof LeadFormValues] =
            `${field.label} is required`;
        }

        return;
      }
    }

    // Email validation
    if (
      field.name === "email" &&
      String(value).trim() !== ""
    ) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(String(value))) {
        errors.email = "Please enter a valid email";
      }
    }

    // Phone validation
    if (
      field.name === "phone" &&
      String(value).trim() !== ""
    ) {
      const phoneRegex = /^\d{10}$/;

      if (!phoneRegex.test(String(value))) {
        errors.phone =
          "Phone must be exactly 10 digits";
      }
    }

    // Notes validation
    if (
      field.name === "notes" &&
      String(value).length > 200
    ) {
      errors.notes =
        "Notes must not exceed 200 characters";
    }
  });

  return errors;
}