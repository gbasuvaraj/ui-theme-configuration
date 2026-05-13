import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import type { ListValues, CssValues } from '../types';

function resolveValues(listValues: ListValues, paletteVars: CssValues): ListValues {
  const resolved: ListValues = {};
  for (const [groupId, items] of Object.entries(listValues)) {
    resolved[groupId] = items.map(item => {
      const out: typeof item = {};
      for (const [key, val] of Object.entries(item)) {
        if (typeof val === 'string' && val.startsWith('var(--') && val.endsWith(')')) {
          out[key] = paletteVars[val.slice(4, -1)] ?? val;
        } else {
          out[key] = val;
        }
      }
      return out;
    });
  }
  return resolved;
}

export function JsonPanel() {
  const { listValues, paletteVars } = useTheme();
  const [copied, setCopied] = useState(false);

  const json = JSON.stringify(resolveValues(listValues, paletteVars), null, 2);

  const copy = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="css-panel">
      <div className="css-panel-header">
        <span>Generated JSON</span>
        <button className="btn-panel-copy" onClick={copy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="css-panel-code">{json}</pre>
    </div>
  );
}
