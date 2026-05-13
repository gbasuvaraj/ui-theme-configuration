import type { ListItem, Field } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ToggleInput } from './inputs/ToggleInput';
import { TextInput } from './inputs/TextInput';

interface Props {
  groupId: string;
  item: ListItem;
  idx: number;
  extraFields: Field[];
}

export function PresetItem({ groupId, item, idx, extraFields }: Props) {
  const { schema, listValues, handleListChange } = useTheme();
  const items = listValues[groupId] ?? [];
  const enabled = item.display === true || item.display === 'true';
  const showIcon = item.showIcon === true || item.showIcon === 'true';

  const update = (fieldId: string, val: string | boolean) =>
    handleListChange(groupId, items.map((it, i) => i === idx ? { ...it, [fieldId]: val } : it));

  return (
    <div className={`preset-item${enabled ? '' : ' preset-item--disabled'}`}>
      <ToggleInput checked={enabled} onChange={v => update('display', v)} />
      <TextInput
        value={String(item.label ?? '')}
        onChange={v => update('label', v)}
        disabled={!enabled}
        className="preset-item-label"
      />
      <TextInput
        value={String(item.url ?? '')}
        placeholder="/"
        onChange={v => update('url', v)}
        disabled={!enabled}
        className="preset-item-url"
      />
      <div className="preset-item-extras">
        {extraFields.map(field => {
          if (field.id === 'url') return null;
          if (field.id === 'imageUrl' && !showIcon) return null;
          const isToggle = (schema.fieldTypes[field.type] ?? { input: 'text' }).input === 'toggle';
          return (
            <div key={field.id} className="preset-extra">
              <label className="preset-extra-label">{field.label}</label>
              {isToggle
                ? <ToggleInput
                    checked={item[field.id] === true || item[field.id] === 'true'}
                    onChange={v => update(field.id, v)}
                    disabled={!enabled}
                  />
                : <TextInput
                    value={String(item[field.id] ?? '')}
                    placeholder={String(field.default ?? '')}
                    onChange={v => update(field.id, v)}
                    disabled={!enabled}
                    className="field-text preset-extra-text"
                  />
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
