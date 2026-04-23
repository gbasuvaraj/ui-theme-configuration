import { createContext, useContext } from 'react';
import type { Schema, CssValues, ListItem, ListValues } from '../types';

export interface ThemeCtx {
  schema: Schema;
  schemaText: string;
  schemaError: string | null;
  values: CssValues;
  listValues: ListValues;
  activeSection: string;
  dark: boolean;
  copied: boolean;
  paletteVars: CssValues;

  setActiveSection: (id: string) => void;
  setDark: (dark: boolean) => void;
  handleFieldChange: (cssVar: string, value: string) => void;
  handleListChange: (groupId: string, items: ListItem[]) => void;
  handleSchemaChange: (text: string) => void;
  handleCopy: () => void;
}

export const ThemeContext = createContext<ThemeCtx | null>(null);

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
