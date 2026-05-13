import { useState, useRef, useEffect, type DragEvent } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

function parseName(val: string): string | null {
  if (val.startsWith('var(--color-') && val.endsWith(')'))
    return val.slice('var(--color-'.length, -1);
  return null;
}

export function PaletteSelect({ value, onChange }: Props) {
  const { listValues } = useTheme();
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const palette = (listValues['color-palette'] ?? [])
    .filter(item => item.name && item.value)
    .map(item => ({ name: String(item.name), value: String(item.value) }));

  const selectedName = parseName(value);
  const selected = palette.find(c => c.name === selectedName) ?? null;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const onDragOver = (e: DragEvent) => {
    if (e.dataTransfer.types.includes('text/color-var')) { e.preventDefault(); setDragging(true); }
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: DragEvent) => {
    setDragging(false);
    const val = e.dataTransfer.getData('text/color-var');
    if (val) { onChange(val); e.preventDefault(); }
  };

  return (
    <div
      className="palette-select"
      ref={ref}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      data-drag-over={dragging || undefined}
    >
      <button
        className={`palette-select-btn${open ? ' palette-select-btn--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        disabled={palette.length === 0}
        title={palette.length === 0 ? 'Define colors in the Colors tab first' : undefined}
      >
        {selected ? (
          <>
            <span className="palette-chip" style={{ background: selected.value }} />
            <span className="palette-select-name">{selected.name}</span>
            <span className="palette-select-hex">{selected.value}</span>
          </>
        ) : (
          <span className="palette-select-placeholder">
            {palette.length === 0 ? 'No colors defined' : 'Select color…'}
          </span>
        )}
        <span className="palette-chevron">▾</span>
        <span className="palette-drop-hint">drop</span>
      </button>

      {open && (
        <div className="palette-dropdown">
          {palette.map(c => (
            <button
              key={c.name}
              className={`palette-option${c.name === selectedName ? ' palette-option--active' : ''}`}
              onClick={() => { onChange(`var(--color-${c.name})`); setOpen(false); }}
            >
              <span className="palette-chip" style={{ background: c.value }} />
              <span className="palette-option-name">{c.name}</span>
              <span className="palette-option-hex">{c.value}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
