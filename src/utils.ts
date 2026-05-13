import type { Schema, CssValues, ListValues } from './types';

export const SCHEMA_TAB = '__schema__';

export function initValues(s: Schema): CssValues {
  const vals: CssValues = {};
  for (const section of s.sections) {
    for (const group of section.groups) {
      if (group.type !== 'list' && group.fields) {
        for (const field of group.fields) {
          if (field.cssVar && field.default !== undefined) {
            vals[field.cssVar] = String(field.default);
          }
        }
      }
    }
  }
  return vals;
}

export function initListValues(s: Schema): ListValues {
  const vals: ListValues = {};
  for (const section of s.sections) {
    for (const group of section.groups) {
      if (group.type === 'preset-list' && group.defaultItems) {
        vals[group.id] = group.defaultItems;
      }
    }
  }
  return vals;
}

export function generatePaletteVars(listValues: ListValues, schema: Schema): CssValues {
  const vars: CssValues = {};
  for (const section of schema.sections) {
    for (const group of section.groups) {
      if (group.cssVarPrefix && group.type === 'list') {
        for (const item of (listValues[group.id] ?? [])) {
          const name = String(item.name ?? '').trim();
          const value = String(item.value ?? '').trim();
          if (name && value) vars[`${group.cssVarPrefix}${name}`] = value;
        }
      }
    }
  }
  return vars;
}

export function generateCss(values: CssValues, paletteVars: CssValues = {}): string {
  const combined = { ...paletteVars, ...values };
  const lines = Object.entries(combined)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `  ${k}: ${v};`);
  return `:root {\n${lines.join('\n')}\n}`;
}
