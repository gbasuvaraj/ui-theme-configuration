import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import schemaData from '../../theme.schema.json';
import type { Schema, ListItem } from '../types';
import { ThemeContext } from './ThemeContext';
import { SCHEMA_TAB, initValues, initListValues, generateCss, generatePaletteVars } from '../utils';

const initialSchema = schemaData as unknown as Schema;
const initialText = JSON.stringify(schemaData, null, 2);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [schema, setSchema] = useState<Schema>(initialSchema);
  const [schemaText, setSchemaText] = useState(initialText);
  const [schemaError, setSchemaError] = useState<string | null>(null);
  const [activeSection, setActiveSectionState] = useState(initialSchema.sections[0].id);
  const [values, setValues] = useState(() => initValues(initialSchema));
  const [listValues, setListValues] = useState(() => initListValues(initialSchema));
  const [dark, setDarkState] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [copied, setCopied] = useState(false);

  const paletteVars = useMemo(
    () => generatePaletteVars(listValues, schema),
    [listValues, schema],
  );

  useEffect(() => {
    for (const [cssVar, value] of Object.entries(paletteVars)) {
      if (value !== '') document.documentElement.style.setProperty(cssVar, value);
      else document.documentElement.style.removeProperty(cssVar);
    }
  }, [paletteVars]);

  useEffect(() => {
    for (const [cssVar, value] of Object.entries(values)) {
      if (value !== '') document.documentElement.style.setProperty(cssVar, value);
      else document.documentElement.style.removeProperty(cssVar);
    }
  }, [values]);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', dark);
    document.documentElement.classList.toggle('theme-light', !dark);
  }, [dark]);

  useEffect(() => {
    if (activeSection !== SCHEMA_TAB && !schema.sections.find(s => s.id === activeSection)) {
      setActiveSectionState(schema.sections[0]?.id ?? SCHEMA_TAB);
    }
  }, [schema, activeSection]);

  const setActiveSection = useCallback((id: string) => setActiveSectionState(id), []);

  const setDark = useCallback((d: boolean) => {
    setDarkState(d);
    localStorage.setItem('theme', d ? 'dark' : 'light');
  }, []);

  const handleFieldChange = useCallback((cssVar: string, value: string) => {
    setValues(prev => ({ ...prev, [cssVar]: value }));
  }, []);

  const handleListChange = useCallback((groupId: string, items: ListItem[]) => {
    setListValues(prev => ({ ...prev, [groupId]: items }));
  }, []);

  const handleSchemaChange = useCallback((text: string) => {
    setSchemaText(text);
    try {
      const parsed = JSON.parse(text) as Schema;
      setSchema(parsed);
      setSchemaError(null);
      setValues(prev => ({ ...initValues(parsed), ...prev }));
      setListValues(prev => ({ ...initListValues(parsed), ...prev }));
    } catch (e) {
      setSchemaError((e as Error).message);
    }
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generateCss(values, paletteVars));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [values, paletteVars]);

  return (
    <ThemeContext.Provider value={{
      schema, schemaText, schemaError, values, listValues,
      activeSection, dark, copied, paletteVars,
      setActiveSection, setDark, handleFieldChange,
      handleListChange, handleSchemaChange, handleCopy,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
