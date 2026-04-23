import type { Field } from '../types';
import { useTheme } from '../context/ThemeContext';
import { PaletteSelect } from './inputs/PaletteSelect';
import { SelectInput } from './inputs/SelectInput';
import { ToggleInput } from './inputs/ToggleInput';
import { TextInput } from './inputs/TextInput';

function inputKind(t: string): 'color' | 'select' | 'toggle' | 'text' {
  if (t === 'color') return 'color';
  if (t === 'font-weight' || t === 'font-family') return 'select';
  if (t === 'boolean') return 'toggle';
  return 'text';
}

export function FieldEditor({ field }: { field: Field }) {
  const { values, schema, handleFieldChange } = useTheme();
  const kind = inputKind(field.type);
  console.log(`[FieldEditor] id="${field.id}" type="${field.type}" cssVar="${field.cssVar}" → kind="${kind}"`);

  if (!field.cssVar) {
    console.warn(`[FieldEditor] SKIPPED id="${field.id}" — no cssVar`);
    return null;
  }

  const cssVar = field.cssVar;
  const value = values[cssVar] ?? String(field.default ?? '');
  const set = (val: string) => handleFieldChange(cssVar, val);

  return (
    <div className="field-row">
      <label className="field-label">{field.label}</label>
      <div className="field-input">
        {kind === 'color' && <PaletteSelect value={value} onChange={set} />}
        {kind === 'select' && (
          <SelectInput value={value} options={schema.fieldTypes[field.type]?.options ?? []} onChange={set} />
        )}
        {kind === 'toggle' && <ToggleInput checked={value === 'true'} onChange={v => set(String(v))} />}
        {kind === 'text' && <TextInput value={value} placeholder={String(field.default ?? '')} onChange={set} />}
      </div>
      <span className="field-cssvar" title={cssVar}>{cssVar}</span>
    </div>
  );
}
