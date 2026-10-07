import type { FieldConfig } from "./leadConfig";

export type LeadFormValues = Record<string, string | boolean>;

export type LeadFormErrors = Record<string, string>;

export function validateLeadForm(
  config: FieldConfig[],
  values: LeadFormValues
): LeadFormErrors {
  const errors: LeadFormErrors = {};

  config.forEach((field) => {
    // Skip hidden fields
    if (field.showWhen) {
      const dependentValue = values[field.showWhen.field];

      if (dependentValue !== field.showWhen.value) {
        return;
      }
    }

    const value = values[field.name];

    // Required validation
    if (field.required) {
      const isEmpty =
        value === undefined ||
        value === "" ||
        value === false;

      if (isEmpty) {
        errors[field.name] = `${field.label} is required`;
        return;
      }
    }

    // Email validation
    if (field.type === "email" && typeof value === "string") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(value)) {
        errors[field.name] = "Please enter a valid email";
        return;
      }
    }

    // Phone validation
    if (field.name === "phone" && typeof value === "string") {
      const phonePattern = /^\d{10}$/;

      if (!phonePattern.test(value)) {
        errors[field.name] = "Phone must be exactly 10 digits";
        return;
      }
    }

    // Maximum length validation
    if (
      field.maxLength &&
      typeof value === "string" &&
      value.length > field.maxLength
    ) {
      errors[field.name] =
        `${field.label} must be ${field.maxLength} characters or less`;
    }
  });

  return errors;
}