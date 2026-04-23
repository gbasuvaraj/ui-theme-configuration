interface Props {
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}

export function ToggleInput({ checked, onChange, disabled }: Props) {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="toggle-track" />
    </label>
  );
}
