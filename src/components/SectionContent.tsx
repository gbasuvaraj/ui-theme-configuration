import { useTheme } from '../context/ThemeContext';
import { GroupEditor } from './GroupEditor';
import { PaletteStrip } from './PaletteStrip';

export function SectionContent() {
  const { schema, activeSection } = useTheme();
  const section = schema.sections.find(s => s.id === activeSection);
  console.log('[SectionContent] rendering section:', activeSection, '→', section ? section.label : 'NOT FOUND');

  if (!section) return null;

  const showPalette = activeSection !== 'colors';

  return (
    <div className="section-content">
      {showPalette && <PaletteStrip />}
      {section.description && <p className="section-desc">{section.description}</p>}
      {section.groups.map(group => (
        <GroupEditor key={group.id} group={group} />
      ))}
    </div>
  );
}
