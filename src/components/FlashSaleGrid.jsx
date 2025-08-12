import { useState, useEffect } from 'react';

const PRODUCTS = [
  {
    id: 1,
    title: 'Keychron K2 Wireless Mechanical Keyboard 75% Layout',
    category: 'Keyboards',
    price: 79.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    stockLeft: 4,
    totalStock: 25,
    salesCount: '1.4k bought in last 24h',
  },
  {
    id: 2,
    title: 'Logitech MX Master 3S Ergonomic Wireless Mouse',
    category: 'Mice',
    price: 89.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80',
    stockLeft: 12,
    totalStock: 50,
    salesCount: '3.8k bought recently',
  },
  {
    id: 3,
    title: 'LG UltraGear 27" QHD Gaming Monitor 165Hz',
    category: 'Monitors',
    price: 249.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    stockLeft: 2,
    totalStock: 15,
    salesCount: 'Almost sold out!',
  },
  {
    id: 4,
    title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    category: 'Audio',
    price: 298.00,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    stockLeft: 8,
    totalStock: 30,
    salesCount: '800+ sold today',
  },
  {
    id: 5,
    title: 'NuPhy Air75 V2 Ultra-Slim Wireless Mechanical Keyboard',
    category: 'Keyboards',
    price: 109.99,
    originalPrice: 139.99,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80',
    stockLeft: 6,
    totalStock: 20,
    salesCount: '2.1k bought in last 24h',
  },
  {
    id: 6,
    title: 'Razer DeathAdder V3 Pro Lightweight Wireless Mouse',
    category: 'Mice',
    price: 119.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    stockLeft: 15,
    totalStock: 40,
    salesCount: '1.9k bought recently',
  },
  {
    id: 7,
    title: 'Dell UltraSharp 32" 4K USB-C Hub Monitor (U3223QE)',
    category: 'Monitors',
    price: 599.99,
    originalPrice: 729.99,
    image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&q=80',
    stockLeft: 3,
    totalStock: 10,
    salesCount: '500+ sold this week',
  },
  {
    id: 8,
    title: 'Anker Magnetic Wireless Power Bank 10,000mAh',
    category: 'Electronics',
    price: 34.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500&q=80',
    stockLeft: 22,
    totalStock: 60,
    salesCount: '5.2k bought recently',
  },
  {
    id: 9,
    title: 'Apple MacBook Pro 14" M3 Chip Space Gray',
    category: 'Electronics',
    price: 1399.00,
    originalPrice: 1599.00,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    stockLeft: 5,
    totalStock: 18,
    salesCount: 'Popular choice!',
  },
];

export function FlashSaleGrid({ onAddToCart, onInspectProduct, searchQuery = '', selectedCategory = 'ALL' }) {
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

  const filteredProducts = PRODUCTS.filter((product) => {
    const activeCategory = selectedCategory ? selectedCategory.trim().toLowerCase() : 'all';
    
    const matchesCategory =
      activeCategory === 'all' ||
      product.category.toLowerCase() === activeCategory;

    const query = searchQuery ? searchQuery.trim().toLowerCase() : '';

    const matchesSearch =
      query === '' ||
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-pulse">⚡</span>
          <div>
            <h2 className="text-sm font-black tracking-wide uppercase text-[var(--brand-secondary)] flex items-center gap-2">
              LIGHTNING DEALS <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">UP TO 70% OFF</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Showing {filteredProducts.length} of {PRODUCTS.length} total products
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-[var(--text-muted)]">ENDS IN:</span>
          <div className="flex gap-1 font-bold text-white">
            <span className="bg-[var(--brand-secondary)] px-2 py-1 rounded">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span className="bg-[var(--brand-secondary)] px-2 py-1 rounded">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span className="bg-[var(--brand-secondary)] px-2 py-1 rounded">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* Grid Display */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl space-y-3">
          <span className="text-4xl opacity-50 block">🔍</span>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            NO MATCHING DEALS FOUND
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            No items match query <span className="text-[var(--brand-primary)]">"{searchQuery}"</span> under category <span className="text-[var(--accent-blue)]">"{selectedCategory}"</span>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );
            const stockPercent = Math.round((product.stockLeft / product.totalStock) * 100);

            return (
              <div
                key={product.id}
                onClick={() => onInspectProduct(product)}
                className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group cursor-pointer"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-square bg-[var(--bg-tertiary)] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-[var(--brand-secondary)] text-white font-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                      -{discount}%
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-[var(--brand-primary)] tracking-wide uppercase">
                      {product.salesCount}
                    </span>
                    <h3 className="text-xs font-bold line-clamp-2 text-[var(--text-primary)]">
                      {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-lg font-black text-[var(--brand-secondary)]">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Stock Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-semibold">
                        <span>Stock status:</span>
                        <span className="text-[var(--brand-primary)] font-bold">{product.stockLeft} left</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--brand-primary)]"
                          style={{ width: `${stockPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Add Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="w-full py-2 bg-[var(--brand-primary)] hover:opacity-90 text-white text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>+ Quick Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}