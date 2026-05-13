import { useTheme } from '../context/ThemeContext';
import { SCHEMA_TAB } from '../utils';
import { TabBar } from './TabBar';
import { SchemaEditor } from './SchemaEditor';
import { SectionContent } from './SectionContent';

export function EditorPane() {
  const { activeSection } = useTheme();

  return (
    <div className="editor-pane">
      <TabBar />
      {activeSection === SCHEMA_TAB ? <SchemaEditor /> : <SectionContent />}
    </div>
  );
}
