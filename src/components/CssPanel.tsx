import { useTheme } from '../context/ThemeContext';
import { generateCss } from '../utils';

export function CssPanel() {
  const { values, paletteVars } = useTheme();

  return (
    <div className="css-panel">
      <div className="css-panel-header">
        <span>Generated CSS</span>
      </div>
      <pre className="css-panel-code">{generateCss(values, paletteVars)}</pre>
    </div>
  );
}
