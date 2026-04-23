import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export function JsonPanel() {
  const { listValues } = useTheme();
  const [copied, setCopied] = useState(false);

  const json = JSON.stringify(listValues, null, 2);

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
