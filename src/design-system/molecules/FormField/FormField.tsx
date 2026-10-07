type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  hint?: string;
  error?: string;
};

export function FormField({
  label,
  children,
  hint,
  error,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="form-field-label">
        {label}
      </label>

      {children}

      {hint && !error && (
        <span className="form-field-hint">
          {hint}
        </span>
      )}

      {error && (
        <span className="form-field-error">
          {error}
        </span>
      )}
    </div>
  );
}