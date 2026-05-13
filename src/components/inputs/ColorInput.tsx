interface Props {
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
}

function isHex(val: string) {
  return /^#[0-9a-fA-F]{3,8}$/.test(val);
}

export function ColorInput({ value, placeholder, onChange }: Props) {
  return (
    <div className="color-group">
      <input
        type="color"
        className="color-swatch"
        value={isHex(value) ? value : '#000000'}
        onChange={e => onChange(e.target.value)}
      />
      <input
        type="text"
        className="color-text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
