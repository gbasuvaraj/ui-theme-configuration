import { PreviewPanel } from './PreviewPanel';
import { CssPanel } from './CssPanel';
import { JsonPanel } from './JsonPanel';

export function RightPane() {
  return (
    <div className="right-pane">
      <PreviewPanel />
      <CssPanel />
      <JsonPanel />
    </div>
  );
}
