import { useState } from "react";

import { TextInput } from "../../design-system/atoms/TextInput/TextInput";
import { Select } from "../../design-system/atoms/Select/Select";
import { Checkbox } from "../../design-system/atoms/Checkbox/Checkbox";
import { Button } from "../../design-system/atoms/Button/Button";
import { FormField } from "../../design-system/molecules/FormField/FormField";

import { leadFormConfig } from "./leadConfig";
import {
  validateLeadForm,
  type LeadFormErrors,
  type LeadFormValues,
} from "./leadValidation";

const initialValues: LeadFormValues = {
  fullName: "",
  email: "",
  leadType: "",
  companyName: "",
  phone: "",
  notes: "",
  consent: false,
};

export function LeadForm() {
  const [values, setValues] =
    useState<LeadFormValues>(initialValues);

  const [errors, setErrors] =
    useState<LeadFormErrors>({});

  const [submitted, setSubmitted] =
    useState(false);

  const updateValue = (
    fieldName: string,
    value: string | boolean
  ) => {
    setValues((previousValues) => ({
      ...previousValues,
      [fieldName]: value,
    }));

    // Remove error when user changes the field
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));
  };

  const isFieldVisible = (field: (typeof leadFormConfig)[number]) => {
    if (!field.showWhen) {
      return true;
    }

    return (
      values[field.showWhen.field] ===
      field.showWhen.value
    );
  };

  const handleBlur = () => {
    const validationErrors = validateLeadForm(
      leadFormConfig,
      values
    );

    setErrors(validationErrors);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors = validateLeadForm(
      leadFormConfig,
      values
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);

    console.log("Submitted Lead:", values);
  };

  return (
    <form onSubmit={handleSubmit}>
      {leadFormConfig.map((field) => {
        if (!isFieldVisible(field)) {
          return null;
        }

        const fieldValue = values[field.name];

        return (
          <FormField
            key={field.name}
            label={field.label}
            error={errors[field.name]}
          >
            {field.type === "text" && (
              <TextInput
                value={String(fieldValue ?? "")}
                placeholder={field.placeholder}
                onChange={(value) =>
                  updateValue(field.name, value)
                }
                onBlur={handleBlur}
              />
            )}

            {field.type === "email" && (
              <TextInput
                type="email"
                value={String(fieldValue ?? "")}
                placeholder={field.placeholder}
                onChange={(value) =>
                  updateValue(field.name, value)
                }
                onBlur={handleBlur}
              />
            )}

            {field.type === "select" && (
              <Select
                value={String(fieldValue ?? "")}
                options={field.options ?? []}
                placeholder="Select an option"
                onChange={(value) =>
                  updateValue(field.name, value)
                }
                onBlur={handleBlur}
              />
            )}

            {field.type === "checkbox" && (
              <Checkbox
                checked={Boolean(fieldValue)}
                onChange={(checked) =>
                  updateValue(field.name, checked)
                }
                onBlur={handleBlur}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                value={String(fieldValue ?? "")}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                onChange={(event) =>
                  updateValue(
                    field.name,
                    event.target.value
                  )
                }
                onBlur={handleBlur}
              />
            )}
          </FormField>
        );
      })}

      <Button type="submit">
        Submit
      </Button>

      {submitted && (
        <p>
          Form submitted successfully!
        </p>
      )}
    </form>
  );
}