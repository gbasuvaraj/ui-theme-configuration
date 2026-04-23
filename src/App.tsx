import { ThemeProvider } from './context/ThemeProvider';
import { AppHeader } from './components/AppHeader';
import { EditorPane } from './components/EditorPane';
import { RightPane } from './components/RightPane';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <AppHeader />
        <div className="app-body">
          <EditorPane />
          <RightPane />
        </div>
      </div>
    </ThemeProvider>
  );
}
