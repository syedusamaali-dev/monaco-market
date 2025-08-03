import { Zap, Clock } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { FlashProductCard } from './FlashProductCard';

export const FlashSaleGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--accent-orange)] text-black p-2 rounded-lg font-bold">
            <Zap className="w-6 h-6 fill-black" />
          </div>
          <div>
            <h2 className="font-mono font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
              LIGHTNING DEALS <span className="text-xs font-normal text-[var(--accent-orange)]">/* Limited Quantities */</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Up to 90% OFF on high-rated developer equipment
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 font-mono text-xs bg-[var(--bg-primary)] px-3 py-1.5 rounded border border-[var(--border-color)]">
          <Clock className="w-4 h-4 text-[var(--accent-orange)]" />
          <span className="text-[var(--text-muted)]">Ends In:</span>
          <span className="bg-[var(--bg-tertiary)] text-[var(--accent-green)] px-1.5 py-0.5 rounded font-bold">02h</span>:
          <span className="bg-[var(--bg-tertiary)] text-[var(--accent-green)] px-1.5 py-0.5 rounded font-bold">45m</span>:
          <span className="bg-[var(--bg-tertiary)] text-[var(--accent-green)] px-1.5 py-0.5 rounded font-bold">18s</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {PRODUCTS.map((product) => (
          <FlashProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};