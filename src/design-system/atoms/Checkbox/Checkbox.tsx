type CheckboxProps = {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  error?: string;
};

export function Checkbox({
  checked,
  label,
  onChange,
  onBlur,
  error,
}: CheckboxProps) {
  return (
    <label className="checkbox-field">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
      />

      <span className="checkbox-label">
        {label}
      </span>
    </label>
  );
}