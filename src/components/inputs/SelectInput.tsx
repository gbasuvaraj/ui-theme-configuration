interface Props {
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

export function SelectInput({ value, options, onChange }: Props) {
  return (
    <select className="field-select" value={value} onChange={e => onChange(e.target.value)}>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}
