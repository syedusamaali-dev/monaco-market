// src/components/FlashSaleGrid.jsx
import { useState, useEffect } from 'react';

const PRODUCTS = [
  {
    id: 1,
    title: 'Keychron K2 Mechanical Keyboard',
    category: 'Keyboards',
    price: 79.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    stockLeft: 4,
    totalStock: 25,
  },
  {
    id: 2,
    title: 'Logitech MX Master 3S',
    category: 'Mice',
    price: 89.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80',
    stockLeft: 12,
    totalStock: 50,
  },
  {
    id: 3,
    title: 'LG UltraGear 27" Gaming Monitor',
    category: 'Monitors',
    price: 249.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    stockLeft: 2,
    totalStock: 15,
  },
  {
    id: 4,
    title: 'Sony WH-1000XM5 Headphones',
    category: 'Audio',
    price: 298.00,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    stockLeft: 8,
    totalStock: 30,
  },
];

export function FlashSaleGrid({ onAddToCart }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="space-y-6">
      {/* Flash Sale Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg gap-4 font-mono">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <div>
            <h2 className="text-sm font-bold tracking-wide uppercase text-[var(--text-primary)]">
              FLASH_DEALS // LIMITED_TIME
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Grab high-grade dev equipment before inventory depletes.
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--text-muted)]">EXPIRES_IN:</span>
          <div className="flex gap-1 font-bold text-[var(--accent-orange)]">
            <span className="bg-[var(--bg-tertiary)] px-2 py-1 rounded border border-[var(--border-color)]">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span className="bg-[var(--bg-tertiary)] px-2 py-1 rounded border border-[var(--border-color)]">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span className="bg-[var(--bg-tertiary)] px-2 py-1 rounded border border-[var(--border-color)]">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCTS.map((product) => {
          const discount = Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
          );
          const stockPercent = Math.round((product.stockLeft / product.totalStock) * 100);

          return (
            <div
              key={product.id}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[var(--accent-blue)] transition-colors group font-mono"
            >
              <div>
                {/* Card Top / Image */}
                <div className="relative aspect-video bg-[var(--bg-tertiary)] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[var(--badge-bg)] text-black font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                    -{discount}% OFF
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  <span className="text-[10px] text-[var(--accent-purple)] tracking-wide uppercase">
                    // {product.category}
                  </span>
                  <h3 className="text-xs font-bold font-sans line-clamp-2 text-[var(--text-primary)]">
                    {product.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-[var(--accent-green)]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Stock Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                      <span>Stock status:</span>
                      <span className="text-[var(--accent-orange)]">{product.stockLeft} left</span>
                    </div>
                    <div className="w-full h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent-orange)]"
                        style={{ width: `${stockPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--accent-blue)] hover:text-white border border-[var(--border-color)] hover:border-[var(--accent-blue)] text-[var(--text-primary)] text-xs font-bold rounded transition-all flex items-center justify-center gap-2"
                >
                  <span>+ Quick Add</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}