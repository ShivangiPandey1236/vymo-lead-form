export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "textarea" | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
  maxLength?: number;
  showWhen?: {
    field: string;
    value: string;
  };
};

export const leadFormConfig: FieldConfig[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter your full name",
  },

  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter your email",
  },

  {
    name: "leadType",
    label: "Lead Type",
    type: "select",
    required: true,
    options: [
      {
        label: "Individual",
        value: "individual",
      },
      {
        label: "Company",
        value: "company",
      },
    ],
  },

  {
    name: "companyName",
    label: "Company Name",
    type: "text",
    required: true,
    placeholder: "Enter company name",
    showWhen: {
      field: "leadType",
      value: "company",
    },
  },

  {
    name: "phone",
    label: "Phone",
    type: "text",
    required: true,
    placeholder: "Enter 10-digit phone number",
  },

  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    maxLength: 200,
    placeholder: "Enter your notes",
  },

  {
    name: "consent",
    label: "I agree to be contacted regarding my inquiry.",
    type: "checkbox",
    required: true,
  },
];