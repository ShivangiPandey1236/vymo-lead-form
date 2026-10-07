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

import styles from "./LeadForm.module.css";

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

    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));

    setSubmitted(false);
  };

  const isFieldVisible = (
    field: (typeof leadFormConfig)[number]
  ) => {
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
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <h1 className={styles.title}>
        Lead Capture Form
      </h1>

      <div className={styles.fields}>
        {leadFormConfig.map((field) => {
          if (!isFieldVisible(field)) {
            return null;
          }

          const fieldValue = values[field.name];

          const isFullWidth =
            field.name === "notes" ||
            field.name === "consent";

          return (
            <div
              key={field.name}
              className={
                isFullWidth
                  ? styles.fieldFull
                  : styles.field
              }
            >
             <FormField
  label={field.label}
  error={errors[field.name]}
  hideLabel={field.type === "checkbox"}
>
                <div className={styles.control}>
                  {field.type === "text" && (
                    <TextInput
                      value={String(fieldValue ?? "")}
                      placeholder={field.placeholder}
                      onChange={(value) =>
                        updateValue(
                          field.name,
                          value
                        )
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
                        updateValue(
                          field.name,
                          value
                        )
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
                        updateValue(
                          field.name,
                          value
                        )
                      }
                      onBlur={handleBlur}
                    />
                  )}

                  {field.type === "checkbox" && (
  <Checkbox
    checked={Boolean(fieldValue)}
    label={field.label}
    error={errors[field.name]}
    onChange={(checked) =>
      updateValue(
        field.name,
        checked
      )
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
                </div>
              </FormField>
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        <Button type="submit">
          Submit
        </Button>
      </div>

      {submitted && (
        <p className={styles.success}>
          Form submitted successfully!
        </p>
      )}
    </form>
  );
}