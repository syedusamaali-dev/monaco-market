// src/components/Navbar.jsx
import { useState } from 'react';

const CATEGORIES = ['ALL', 'Keyboards', 'Mice', 'Monitors', 'Audio'];

export function Navbar({ 
  cartCount, 
  onOpenCart, 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategorySelect 
}) {
  const [theme, setTheme] = useState('vscode-dark');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] sticky top-0 z-40 font-mono">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl">🇲🇨</span>
          <span className="font-bold text-sm tracking-wider uppercase text-[var(--accent-blue)]">
            MONACO_MARKET<span className="text-[var(--accent-orange)]">.JS</span>
          </span>
        </div>

        {/* Live Search Input */}
        <div className="flex-1 max-w-md relative hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search equipment or category... (e.g. Keychron)"
            className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] focus:border-[var(--accent-blue)] text-[var(--text-primary)] text-xs rounded pl-8 pr-8 py-1.5 outline-none placeholder:text-[var(--text-muted)]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Controls: Theme Switcher & Cart */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] text-xs rounded px-2 py-1 outline-none cursor-pointer"
          >
            <option value="vscode-dark">Dark+</option>
            <option value="vscode-light">Light+</option>
            <option value="vscode-purple">SynthWave '84</option>
          </select>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] border border-[var(--border-color)] px-3 py-1.5 rounded text-xs transition-colors relative"
          >
            <span>🛒</span>
            <span className="hidden sm:inline font-semibold">CART</span>
            <span className="bg-[var(--badge-bg)] text-black font-bold text-[10px] rounded-full px-1.5 py-0.2">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-[var(--bg-tertiary)] border-t border-[var(--border-color)] px-4 py-1.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <span className="text-[var(--text-muted)] mr-2">// FILTER:</span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--accent-blue)] text-white font-bold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}