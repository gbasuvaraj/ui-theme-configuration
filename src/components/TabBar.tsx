import { useTheme } from '../context/ThemeContext';
import { SCHEMA_TAB } from '../utils';

export function TabBar() {
  const { schema, activeSection, setActiveSection } = useTheme();

  return (
    <nav className="tab-bar" aria-label="Config sections">
      {schema.sections.map(section => (
        <button
          key={section.id}
          className={`tab${activeSection === section.id ? ' tab--active' : ''}`}
          onClick={() => setActiveSection(section.id)}
        >
          {section.label}
        </button>
      ))}
      <button
        className={`tab tab--schema${activeSection === SCHEMA_TAB ? ' tab--active' : ''}`}
        onClick={() => setActiveSection(SCHEMA_TAB)}
      >
        Schema
      </button>
    </nav>
  );
}
