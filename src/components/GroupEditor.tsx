import type { Group, ListItem } from '../types';
import { useTheme } from '../context/ThemeContext';

const DEMO_COLORS: ListItem[] = [
  { name: 'primary',   value: '#6366f1' },
  { name: 'secondary', value: '#8b5cf6' },
  { name: 'accent',    value: '#ec4899' },
  { name: 'success',   value: '#10b981' },
  { name: 'warning',   value: '#f59e0b' },
  { name: 'danger',    value: '#ef4444' },
  { name: 'info',      value: '#3b82f6' },
  { name: 'muted',     value: '#94a3b8' },
  { name: 'white',     value: '#ffffff' },
  { name: 'black',     value: '#0f172a' },
];
import { FieldEditor } from './FieldEditor';
import { PresetItem } from './PresetItem';
import { ToggleInput } from './inputs/ToggleInput';
import { TextInput } from './inputs/TextInput';
import { ColorInput } from './inputs/ColorInput';

function GroupHeader({ label, description }: { label: string; description?: string }) {
  return (
    <div className="group-header">
      <h3 className="group-title">{label}</h3>
      {description && <p className="group-desc">{description}</p>}
    </div>
  );
}

export function GroupEditor({ group }: { group: Group }) {
  const { schema, listValues, handleListChange } = useTheme();
  console.log(`[GroupEditor] id="${group.id}" label="${group.label}" type=${group.type ?? 'fields'} fields=${group.fields?.length ?? 0}`);

  if (group.type === 'preset-list') {
    const items = listValues[group.id] ?? group.defaultItems ?? [];
    const extraFields = group.itemSchema!.fields.filter(f => f.id !== 'label' && f.id !== 'display' && f.id !== 'url');
    const addItem = () => {
      const newItem: ListItem = {};
      for (const f of group.itemSchema!.fields) newItem[f.id] = f.default ?? (f.type === 'boolean' ? false : '');
      handleListChange(group.id, [...items, newItem]);
    };
    const removeItem = (idx: number) =>
      handleListChange(group.id, items.filter((_, i) => i !== idx));

    return (
      <div className="group">
        <GroupHeader label={group.label} description={group.description} />
        <div className="preset-items">
          {items.map((item, idx) => {
            const isDefault = idx < (group.defaultItems?.length ?? 0);
            return (
              <div key={idx} className="preset-item-row">
                <PresetItem groupId={group.id} item={item} idx={idx} extraFields={extraFields} />
                {group.allowAdd && !isDefault && (
                  <button className="btn-remove preset-item-remove" onClick={() => removeItem(idx)}>✕</button>
                )}
              </div>
            );
          })}
        </div>
        {group.allowAdd && (
          <button className="btn-add" onClick={addItem}>+ Add Item</button>
        )}
      </div>
    );
  }

  if (group.type === 'list') {
    const items = listValues[group.id] ?? [];
    const schemaFields = group.itemSchema!.fields;
    const addItem = () => {
      const newItem: ListItem = {};
      for (const f of schemaFields) newItem[f.id] = f.default ?? (f.type === 'boolean' ? false : '');
      handleListChange(group.id, [...items, newItem]);
    };
    const removeItem = (idx: number) =>
      handleListChange(group.id, items.filter((_, i) => i !== idx));
    const updateItem = (idx: number, fid: string, val: string | boolean) =>
      handleListChange(group.id, items.map((item, i) => i === idx ? { ...item, [fid]: val } : item));

    return (
      <div className="group">
        <div className="group-header-row">
          <GroupHeader label={group.label} description={group.description} />
          {group.cssVarPrefix && (
            <button className="btn-prefill" onClick={() => handleListChange(group.id, DEMO_COLORS)}>
              Prefill demo colors
            </button>
          )}
        </div>
        <div className="list-items">
          {items.map((item, idx) => (
            <div key={idx} className="list-item">
              <span className="list-item-num">#{idx + 1}</span>
              {schemaFields.map(field => {
                const typeDef = schema.fieldTypes[field.type] ?? { input: 'text' };
                return (
                  <div key={field.id} className="list-field">
                    <label className="list-field-label">{field.label}</label>
                    {typeDef.input === 'toggle'
                      ? <ToggleInput checked={item[field.id] === true || item[field.id] === 'true'}
                          onChange={v => updateItem(idx, field.id, v)} />
                      : typeDef.input === 'color-picker'
                        ? <ColorInput value={String(item[field.id] ?? field.default ?? '')}
                            placeholder={String(field.default ?? '')}
                            onChange={v => updateItem(idx, field.id, v)} />
                        : <TextInput value={String(item[field.id] ?? field.default ?? '')}
                            placeholder={String(field.default ?? '')}
                            onChange={v => updateItem(idx, field.id, v)} />
                    }
                  </div>
                );
              })}
              <button className="btn-remove" onClick={() => removeItem(idx)}>✕</button>
            </div>
          ))}
          <button className="btn-add" onClick={addItem}>+ Add Item</button>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <GroupHeader label={group.label} description={group.description} />
      <div className="group-fields">
        {(group.fields ?? []).map(field => (
          <FieldEditor key={field.id} field={field} />
        ))}
      </div>
    </div>
  );
}
