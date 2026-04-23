export interface FieldTypeDef {
  input: 'color-picker' | 'text' | 'select' | 'toggle';
  description: string;
  options?: string[];
}

export interface Field {
  id: string;
  label: string;
  cssVar?: string;
  type: string;
  default?: string | boolean;
  optional?: boolean;
  inherits?: string;
}

export interface ListItemSchema {
  fields: Field[];
}

export interface Group {
  id: string;
  label: string;
  description?: string;
  type?: 'list' | 'preset-list';
  allowAdd?: boolean;
  cssVarPrefix?: string;
  fields?: Field[];
  itemSchema?: ListItemSchema;
  defaultItems?: ListItem[];
}

export interface Section {
  id: string;
  label: string;
  description?: string;
  groups: Group[];
}

export interface Schema {
  meta: { schemaVersion: string; name: string; description: string };
  fieldTypes: Record<string, FieldTypeDef>;
  sections: Section[];
}

export type CssValues = Record<string, string>;
export type ListItem = Record<string, string | boolean>;
export type ListValues = Record<string, ListItem[]>;
