import { useTheme } from '../context/ThemeContext';

export function PaletteStrip() {
  const { listValues } = useTheme();

  const palette = (listValues['color-palette'] ?? [])
    .filter(item => item.name && item.value)
    .map(item => ({ name: String(item.name), value: String(item.value) }));

  if (palette.length === 0) return null;

  return (
    <div className="palette-strip">
      <span className="palette-strip-label">Palette</span>
      <div className="palette-strip-chips">
        {palette.map(c => (
          <div
            key={c.name}
            className="palette-strip-chip"
            style={{ background: c.value }}
            title={`${c.name} · ${c.value}`}
            draggable
            onDragStart={e => {
              e.dataTransfer.effectAllowed = 'copy';
              e.dataTransfer.setData('text/color-var', `var(--color-${c.name})`);
            }}
          />
        ))}
      </div>
      <span className="palette-strip-hint">drag onto any color field to apply</span>
    </div>
  );
}
