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

## Design System

### Tokens

Design tokens are maintained in:

src/design-system/tokens/tokens.css

The token layer contains reusable values for colors, spacing, typography, and responsive breakpoints.

### Atoms

Reusable basic controls are located in:

src/design-system/atoms/

Available atoms:

- TextInput
- Select
- Checkbox
- Button

These components are domain-agnostic and do not contain lead-specific business rules.

### Form Field Molecule

The reusable field wrapper is located at:

src/design-system/molecules/FormField/FormField.tsx

It handles:

- Label
- Control
- Hint
- Error message

## Dynamic Lead Form

The lead form is located at:

src/features/lead/LeadForm.tsx

The form renders fields from configuration instead of hardcoding every field.

Configuration:

src/features/lead/leadConfig.ts

Adding a new field can be done by adding a configuration entry and mapping the required control type to an existing atom.

## Validation

Validation is centralized in:

src/features/lead/leadValidation.ts

The validation module receives:

- Form configuration
- Current form values

It returns the current validation errors.

Validation includes:

- Required field validation
- Email format validation
- 10-digit phone validation
- Company name validation when Company is selected
- Consent validation
- Notes character limit

The atoms do not contain lead-specific validation rules.

## Conditional Fields

The Company Name field is displayed only when Lead Type is set to Company.

When Individual is selected, the Company Name field is hidden and does not produce a validation error.

## Responsive Layout

The form uses CSS Modules:

src/features/lead/LeadForm.module.css

Desktop:

- Two-column form layout
- Full Name and Email share the same row
- Notes and Consent use the full width
- Submit button aligns with the form actions

Mobile:

- Single-column layout
- Full-width form controls
- Full-width submit button
- Responsive spacing and typography

Tablet layouts use the mobile-style single-column layout for better usability.

## Getting Started

Install dependencies:

npm install

Start the development server:

npm run dev

Build the project:

npm run build

## Form Fields

The form contains the following fields:

- Full Name - required
- Email - required and validated
- Lead Type - Individual or Company
- Company Name - required when Company is selected
- Phone - required and must contain exactly 10 digits
- Notes - optional, maximum 200 characters
- Consent - required

## Design Approach

The implementation follows a configuration-driven approach so the form can be extended without rewriting the form structure.

The architecture separates:

- Design system components
- Form configuration
- Validation logic
- Form rendering
- Responsive styling

This keeps the components reusable and the business rules isolated from the UI controls.

## Out of Scope

The assignment does not include:

- Backend integration
- Database
- Authentication
- Third-party form libraries
- Storybook
- Additional complex controls

## Submission

This project was built as part of the Vymo.AI Technologies frontend assignment.