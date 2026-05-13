import { useTheme } from '../context/ThemeContext';

export function AppHeader() {
  const { schema, dark, copied, setDark, handleCopy } = useTheme();

  return (
    <header className="app-header">
      <div className="app-header-left">
        <span className="app-title">{schema.meta.name}</span>
        <span className="app-version">v{schema.meta.schemaVersion}</span>
      </div>
      <div className="app-header-right">
        <button className="btn-theme" onClick={() => setDark(!dark)} title="Toggle theme">
          {dark ? '○ Light' : '● Dark'}
        </button>
        <button className="btn-export" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy CSS'}
        </button>
      </div>
    </header>
  );
}
