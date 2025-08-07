// src/components/ThemeToggle.jsx
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'temu';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'temu' ? 'vscode' : 'temu'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer shadow-xs"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)',
      }}
      title="Switch Theme"
    >
      {theme === 'temu' ? (
        <>
          <span className="w-2.5 h-2.5 rounded-full bg-[#fb641b]"></span>
          <span>Temu Mode</span>
        </>
      ) : (
        <>
          <span className="w-2.5 h-2.5 rounded-full bg-[#007acc]"></span>
          <span>VS Code Theme</span>
        </>
      )}
    </button>
  );
}