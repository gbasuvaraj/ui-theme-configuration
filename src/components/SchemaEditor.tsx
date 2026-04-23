import { useState, type CSSProperties } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useTheme } from '../context/ThemeContext';

const LS_KEY = 'schema-editor-font-size';
const MIN = 10;
const MAX = 20;

function loadSize(): number {
  const v = parseInt(localStorage.getItem(LS_KEY) ?? '', 10);
  return isNaN(v) ? 13 : v;
}

export function SchemaEditor() {
  const { schemaText, dark, handleSchemaChange } = useTheme();
  const [fontSize, setFontSize] = useState(loadSize);

  const adjust = (delta: number) => {
    const next = Math.min(MAX, Math.max(MIN, fontSize + delta));
    setFontSize(next);
    localStorage.setItem(LS_KEY, String(next));
  };

  return (
    <div className="schema-editor" style={{ '--schema-font-size': `${fontSize}px` } as CSSProperties}>
      <div className="schema-editor-toolbar">
        <span className="schema-editor-toolbar-label">Font size</span>
        <button className="schema-font-btn" onClick={() => adjust(-1)} disabled={fontSize <= MIN}>A−</button>
        <span className="schema-font-size">{fontSize}px</span>
        <button className="schema-font-btn" onClick={() => adjust(+1)} disabled={fontSize >= MAX}>A+</button>
      </div>
      <div className="schema-editor-body">
      <CodeMirror
        value={schemaText}
        theme={dark ? 'dark' : 'light'}
        extensions={[json()]}
        onChange={handleSchemaChange}

        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          bracketMatching: true,
          autocompletion: true,
          highlightActiveLine: true,
          lintKeymap: true,
        }}
      />
      </div>
    </div>
  );
}
