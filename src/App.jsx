// src/App.jsx
import { Navbar } from './components/Navbar';
import { FlashSaleGrid } from './components/FlashSaleGrid';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200 flex flex-col justify-between">
      <div>
        {/* Fixed / Sticky Header */}
        <Navbar />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 py-6 w-full">
          <FlashSaleGrid />
        </main>
      </div>

      {/* VS Code Status Bar Style Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-2 font-mono text-xs text-[var(--text-muted)] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[var(--accent-green)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] inline-block"></span> main*
          </span>
          <span>0 errors, 0 warnings</span>
        </div>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span className="hidden sm:inline">JavaScript React</span>
          <span className="text-[var(--accent-blue)]">Monaco-Market v2.0</span>
        </div>
      </footer>
    </div>
  );
}