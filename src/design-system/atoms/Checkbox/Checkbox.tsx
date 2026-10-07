type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  error?: string;
};

export function Checkbox({
  label,
  checked,
  onChange,
  onBlur,
  error,
}: CheckboxProps) {
  return (
    <div className="checkbox-field">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          onBlur={onBlur}
        />

        <span>{label}</span>
      </label>

      {error && <span className="checkbox-error">{error}</span>}
    </div>
  );
}