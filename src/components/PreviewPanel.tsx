const NAV_ITEMS = ['Home', 'About', 'Services', 'Contact'];

const HEADINGS = [
  { tag: 'h1', label: 'H1' },
  { tag: 'h2', label: 'H2' },
  { tag: 'h3', label: 'H3' },
  { tag: 'h4', label: 'H4' },
  { tag: 'h5', label: 'H5' },
  { tag: 'h6', label: 'H6' },
] as const;

export function PreviewPanel() {
  return (
    <div className="preview-panel">
      <p className="preview-panel-title">Live Preview</p>

      {/* Navigation */}
      <div className="preview-section">
        <p className="preview-label">Navigation</p>
        <nav
          className="preview-nav"
          style={{
            backgroundColor: 'var(--nav-bg)',
            borderBottom: '1px solid var(--nav-border-color)',
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              className={`preview-nav-item${i === 0 ? ' is-active' : ''}`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Typography */}
      <div className="preview-section">
        <p className="preview-label">Typography</p>
        <div className="preview-typo">
          {HEADINGS.map(({ tag, label }) => {
            const Tag = tag;
            return (
              <Tag
                key={tag}
                style={{
                  fontFamily: `var(--text-${tag}-font-family, var(--font-family))`,
                  fontSize: `var(--text-${tag}-font-size)`,
                  fontWeight: `var(--text-${tag}-font-weight)`,
                  color: `var(--text-${tag}-color)`,
                }}
              >
                {label} — The quick brown fox
              </Tag>
            );
          })}
          <p
            style={{
              fontFamily: 'var(--text-body-font-family, var(--font-family))',
              fontSize: 'var(--text-body-font-size)',
              fontWeight: 'var(--text-body-font-weight)',
              color: 'var(--text-body-color)',
              margin: 0,
            }}
          >
            Body — The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="preview-section">
        <p className="preview-label">Buttons</p>
        <div className="preview-buttons">
          <button className="preview-btn preview-btn--primary">Primary</button>
          <button className="preview-btn preview-btn--secondary">Secondary</button>
          <button className="preview-btn preview-btn--disabled" disabled>Disabled</button>
        </div>
      </div>
    </div>
  );
}
