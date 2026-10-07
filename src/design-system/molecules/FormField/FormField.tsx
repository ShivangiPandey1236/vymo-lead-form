type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
};

export function FormField({
  label,
  children,
  hint,
  error,
  hideLabel = false,
}: FormFieldProps) {
  return (
    <div className="form-field">
      {!hideLabel && (
        <label className="form-field-label">
          {label}
        </label>
      )}

      <div className="form-field-control">
        {children}
      </div>

      {hint && !error && (
        <span className="form-field-hint">
          {hint}
        </span>
      )}

      {error && (
        <span
          className="form-field-error"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}