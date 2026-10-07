type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  error?: string;
};

export function Checkbox({
  checked,
  onChange,
  onBlur,
  error,
}: CheckboxProps) {
  return (
    <div className="checkbox-field">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
      />

      {error && (
        <span className="checkbox-error">
          {error}
        </span>
      )}
    </div>
  );
}