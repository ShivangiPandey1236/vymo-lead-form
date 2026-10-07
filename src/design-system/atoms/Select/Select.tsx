type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
};

export function Select({
  value,
  options,
  onChange,
  onBlur,
  error,
  placeholder,
}: SelectProps) {
  return (
    <div className="select-field">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="select-error">
          {error}
        </span>
      )}
    </div>
  );
}