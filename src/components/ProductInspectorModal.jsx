import { useState } from 'react';

export function ProductInspectorModal({ product, onClose, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('preview');

  if (!product) return null;

  const jsonCode = JSON.stringify(
    {
      id: product.id,
      name: product.title,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      stockLeft: product.stockLeft,
      salesCount: product.salesCount,
    },
    null,
    2
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[var(--bg-tertiary)] border-b border-[var(--border-color)] px-4 py-2.5 flex items-center justify-between text-xs font-bold">
          <span>ITEM DETAILS</span>
          <button
            onClick={onClose}
            className="hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full px-2 py-0.5 text-xs font-extrabold"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-center px-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'preview'
                ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]'
                : 'border-transparent text-[var(--text-muted)]'
            }`}
          >
            Product Preview
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'json'
                ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]'
                : 'border-transparent text-[var(--text-muted)]'
            }`}
          >
            JSON Spec
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1">
          {activeTab === 'preview' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative aspect-square rounded-lg overflow-hidden border border-[var(--border-color)] bg-[var(--bg-tertiary)]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase">
                    {product.salesCount}
                  </span>
                  <h2 className="text-base font-extrabold text-[var(--text-primary)] mt-1">
                    {product.title}
                  </h2>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-[var(--brand-secondary)]">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-[var(--text-muted)] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="p-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-xs space-y-2 font-semibold">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Stock:</span>
                    <span className="text-[var(--brand-primary)]">{product.stockLeft} left</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Shipping:</span>
                    <span className="text-[var(--accent-green)]">Fast Express</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <pre className="bg-[var(--bg-primary)] p-4 rounded-lg border border-[var(--border-color)] text-xs font-mono leading-relaxed overflow-x-auto text-[var(--text-primary)]">
              <code>{jsonCode}</code>
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[var(--bg-tertiary)] border-t border-[var(--border-color)] p-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-xs font-bold"
          >
            Close
          </button>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-5 py-2 bg-[var(--brand-primary)] text-white font-extrabold rounded-lg text-xs tracking-wider uppercase shadow-xs cursor-pointer"
          >
            Add To Cart (${product.price.toFixed(2)})
          </button>
        </div>

      </div>
    </div>
  );
}