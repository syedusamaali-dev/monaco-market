import { useState, useEffect } from 'react';

const THEME_OPTIONS = [
  { id: 'emerald', label: '🟢 Emerald & Mint (Light)' },
  { id: 'sapphire', label: '🔵 Sapphire Blue (Light)' },
  { id: 'violet', label: '🟣 Electric Violet (Light)' },
  { id: 'dark', label: '🌙 Dark Slate (Dark)' },
];

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState('sapphire');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <div className="relative inline-block">
      <select
        value={currentTheme}
        onChange={(e) => setCurrentTheme(e.target.value)}
        className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] text-xs font-bold py-1.5 px-3 rounded-lg outline-none cursor-pointer transition-all hover:border-[var(--brand-primary)]"
      >
        {THEME_OPTIONS.map((theme) => (
          <option key={theme.id} value={theme.id} className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  );
}