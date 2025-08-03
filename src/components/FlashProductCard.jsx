import { Star, ShoppingCart, Zap } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export const FlashProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden group hover:border-[var(--accent-blue)] transition-all duration-200 flex flex-col justify-between shadow-sm">
      <div>
        {/* Product Image & Discount Badge */}
        <div className="relative bg-[var(--bg-tertiary)] p-4 flex items-center justify-center h-48 overflow-hidden">
          <span className="absolute top-2 left-2 bg-[var(--accent-orange)] text-black text-[10px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow">
            <Zap className="w-3 h-3 fill-black" /> -{product.discount}%
          </span>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover rounded group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div className="p-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-1 text-[11px] text-[var(--accent-orange)] font-mono">
            <Star className="w-3 h-3 fill-[var(--accent-orange)]" />
            <span>{product.rating}</span>
            <span className="text-[var(--text-muted)]">({product.reviewsCount})</span>
          </div>

          <h3 className="text-xs text-[var(--text-primary)] font-medium line-clamp-2 h-8 font-sans">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base font-bold text-[var(--accent-green)] font-mono">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-[var(--text-muted)] line-through font-mono">
              ${product.originalPrice.toFixed(2)}
            </span>
          </div>

          {/* Temu Claim Meter */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="w-full bg-[var(--bg-primary)] h-1.5 rounded-full overflow-hidden border border-[var(--border-color)]">
              <div
                className="bg-[var(--accent-orange)] h-full transition-all duration-500"
                style={{ width: `${product.soldPercentage}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-[var(--accent-orange)] font-mono font-semibold">
              🔥 {product.soldPercentage}% claimed
            </span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="p-3 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-[var(--accent-blue)] text-black font-mono font-bold text-xs py-1.5 rounded hover:opacity-90 transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Quick Add
        </button>
      </div>
    </div>
  );
};