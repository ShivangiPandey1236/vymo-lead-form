# Dynamic Lead Form & Design System

A responsive dynamic lead form built with React and TypeScript.

The project demonstrates a small reusable design system, config-driven form rendering, conditional fields, centralized validation, and responsive layouts without using a third-party component library.

## Tech Stack

- React
- TypeScript
- Vite
- CSS Modules
- Plain CSS

## Features

- Config-driven dynamic form
- Reusable design-system atoms
- Reusable `FormField` molecule
- Conditional Company Name field
- Validation on blur and submit
- Email validation
- 10-digit phone validation
- Required consent validation
- Notes limited to 200 characters
- Responsive desktop, tablet, and mobile layouts
- Submitted values displayed in the console
- No backend or database required

## Project Structure


src/
├── design-system/
│   ├── tokens/
│   │   └── tokens.css
│   ├── atoms/
│   │   ├── TextInput/
│   │   │   └── TextInput.tsx
│   │   ├── Select/
│   │   │   └── Select.tsx
│   │   ├── Checkbox/
│   │   │   └── Checkbox.tsx
│   │   └── Button/
│   │       └── Button.tsx
│   └── molecules/
│       └── FormField/
│           └── FormField.tsx
│
├── features/
│   └── lead/
│       ├── leadConfig.ts
│       ├── leadValidation.ts
│       ├── LeadForm.tsx
│       └── LeadForm.module.css
│
├── App.tsx
└── main.tsx