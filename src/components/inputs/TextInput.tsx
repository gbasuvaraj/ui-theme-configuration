interface Props {
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  className?: string;
}

export function TextInput({ value, placeholder, onChange, disabled, className }: Props) {
  return (
    <input
      type="text"
      className={className ?? 'field-text'}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
