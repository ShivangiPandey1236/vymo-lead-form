type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  type?: "text" | "email";
};

export function TextInput({
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
}: TextInputProps) {
  return (
    <div className="text-input">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
      />

      {error && (
        <span className="text-input-error">
          {error}
        </span>
      )}
    </div>
  );
}