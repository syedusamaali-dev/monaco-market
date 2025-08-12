import { ThemeToggle } from './ThemeToggle';

const CATEGORIES = ['ALL', 'Keyboards', 'Mice', 'Monitors', 'Audio', 'Electronics'];

export function Navbar({ 
  cartCount, 
  onOpenCart, 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategorySelect 
}) {
  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] shadow-xs">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Monaco Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            onClick={() => {
              onCategorySelect('ALL');
              onSearchChange('');
            }}
            className="flex items-center gap-1.5 text-xl font-black tracking-tight text-left cursor-pointer"
          >
            <span className="bg-[var(--brand-primary)] text-white px-2.5 py-1 rounded-md font-black tracking-widest text-base">
              Monaco
            </span>
            <span className="text-[var(--text-primary)] text-sm font-extrabold hidden sm:inline uppercase">
              Market
            </span>
          </button>
        </div>

        {/* Live Search Input */}
        <div className="flex-1 max-w-lg relative hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search deals, items, or categories..."
            className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] focus:border-[var(--brand-primary)] text-[var(--text-primary)] text-xs rounded-full pl-9 pr-8 py-2 outline-none placeholder:text-[var(--text-muted)]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors flex items-center justify-center cursor-pointer"
            aria-label="View Cart"
          >
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--brand-secondary)] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Pills Header Bar */}
      <div className="bg-[var(--bg-tertiary)] border-t border-[var(--border-color)] px-4 py-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <span className="text-[var(--text-muted)] font-semibold mr-1">Categories:</span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toUpperCase() === cat.toUpperCase();
            return (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
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