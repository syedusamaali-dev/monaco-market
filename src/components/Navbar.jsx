// src/components/Navbar.jsx
// import React, { useEffect } from 'react';
import { useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  User, 
  Sparkles, 
  Zap,
  Code2
} from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { useCartStore } from '../store/useCartStore';

export const Navbar = () => {
  const { theme, setTheme } = useThemeStore();
  const { getTotalItems, toggleCart } = useCartStore();

  const totalItems = getTotalItems();

  // Ensure initial data-theme attribute is set on body/documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors duration-200 shadow-md">
      {/* 1. Top Bar: Micro Deals + Theme Switcher */}
      <div className="bg-[var(--bg-tertiary)] border-b border-[var(--border-color)] px-4 py-1 text-xs flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-[var(--accent-orange)]">
            <Zap className="w-3.5 h-3.5 fill-[var(--accent-orange)]" /> FLASH OFFER:
          </span>
          <span className="text-[var(--text-muted)] hidden sm:inline">
            Free shipping on orders over $15 • 90-Day Free Returns
          </span>
        </div>

        {/* VS Code Theme Mode Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[var(--text-muted)] font-mono hidden md:inline">
            theme.config:
          </span>
          
          <button
            onClick={() => setTheme('vscode-dark')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
              theme === 'vscode-dark'
                ? 'bg-[var(--accent-blue)] text-black font-bold shadow-sm'
                : 'bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Dark+
          </button>

          <button
            onClick={() => setTheme('vscode-light')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
              theme === 'vscode-light'
                ? 'bg-[var(--accent-blue)] text-black font-bold shadow-sm'
                : 'bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Light+
          </button>

          <button
            onClick={() => setTheme('vscode-purple')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
              theme === 'vscode-purple'
                ? 'bg-[var(--accent-blue)] text-black font-bold shadow-sm'
                : 'bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            SynthWave
          </button>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-[var(--accent-blue)] text-black p-1.5 rounded flex items-center justify-center font-bold">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono font-black text-lg tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
              MONACO<span className="text-[var(--accent-orange)]">//</span>MARKET
            </span>
            <span className="block text-[9px] font-mono text-[var(--text-muted)] -mt-1">
              v2.0.26-release
            </span>
          </div>
        </div>

        {/* Dense Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search components, dev setup gear, mechanical keyboards..."
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-md pl-4 pr-10 py-1.5 focus:outline-none focus:border-[var(--accent-blue)] font-mono transition-colors"
            />
            <button 
              aria-label="Search"
              className="absolute right-1 bg-[var(--accent-orange)] text-black p-1 rounded hover:opacity-90 transition-opacity"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Actions: Account & Cart Drawer Toggle */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-[var(--accent-blue)] transition-colors">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Sign In</span>
          </div>

          {/* Cart Indicator with Badge */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] border border-[var(--border-color)] px-3 py-1.5 rounded-md transition-all"
          >
            <ShoppingCart className="w-4 h-4 text-[var(--accent-green)]" />
            <span className="hidden sm:inline font-semibold">Cart</span>
            {totalItems > 0 && (
              <span className="bg-[var(--badge-bg)] text-black font-bold text-[11px] min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-mono animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Category Bar (Temu-style high density shortcut links) */}
      <div className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-1.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
          <span className="text-[var(--accent-orange)] font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Best Sellers
          </span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer">5-Star Dev Gear</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer">Desk Setup</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer">Mechanical Keyboards</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer">Monitors & Arms</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer">Audio & Mics</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer text-[var(--accent-green)]">Under $10 Deals</span>
        </div>
      </div>
    </header>
  );
};