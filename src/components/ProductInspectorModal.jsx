export function ProductInspectorModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <div>
            <h3 className="text-lg font-black text-[var(--text-primary)] leading-tight">
              Product Inspector
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-medium">
              Detailed specifications & inventory details
            </p>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex gap-4 items-center bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--border-color)] mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">
              {product.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-black text-[var(--brand-primary)]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[var(--text-muted)] line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Formatted Specification Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-6">
          <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold tracking-wider">
              Category
            </span>
            <span className="font-bold text-[var(--text-primary)]">
              {product.category || 'Electronics'}
            </span>
          </div>

          <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold tracking-wider">
              Stock Status
            </span>
            <span className="font-bold text-[var(--accent-green)]">
              In Stock ({product.stock || 12} units)
            </span>
          </div>

          <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold tracking-wider">
              Rating
            </span>
            <span className="font-bold text-[var(--text-primary)]">
              ⭐ {product.rating || '4.8'} / 5.0
            </span>
          </div>

          <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold tracking-wider">
              Shipping
            </span>
            <span className="font-bold text-[var(--brand-primary)]">
              Free Express
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-bold text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}