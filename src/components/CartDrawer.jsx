
export function CartDrawer({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 99;
  
  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSavings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 
    0
  );
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel - Styled like VS Code Secondary Sidebar / Debug Console */}
      <aside className="relative z-10 w-full max-w-md bg-[var(--bg-secondary)] border-l border-[var(--border-color)] text-[var(--text-primary)] shadow-2xl flex flex-col h-full font-mono text-sm">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-orange)] text-base">🛒</span>
            <h2 className="font-bold text-xs tracking-wider uppercase">
              OUT_PUT // CART_ITEMS ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded px-2 py-1 text-xs"
            aria-label="Close cart"
          >
            [ESC ✕]
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-3 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[var(--text-muted)]">
              {amountToFreeShipping === 0 ? (
                <span className="text-[var(--accent-green)] font-semibold">
                  ✓ QUALIFIED FOR FREE SHIPPING
                </span>
              ) : (
                <>Add <strong className="text-[var(--accent-orange)]">${amountToFreeShipping.toFixed(2)}</strong> for Free Shipping</>
              )}
            </span>
            <span className="font-bold">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--accent-green)] transition-all duration-300"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[var(--text-muted)] space-y-2">
              <span className="text-3xl opacity-50">📂</span>
              <p className="text-xs">// Cart buffer is currently empty.</p>
              <p className="text-xs text-[var(--accent-blue)]">Select items from flash deals to initialize buffer.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id}
                className="p-3 rounded bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex gap-3 relative group"
              >
                {/* Product Thumbnail */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 object-cover rounded bg-[var(--bg-primary)] border border-[var(--border-color)] flex-shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-sans text-xs font-semibold truncate leading-tight">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[var(--text-muted)] hover:text-red-400 text-xs px-1"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="text-xs mt-1 space-x-2">
                      <span className="text-[var(--accent-green)] font-bold">${item.price.toFixed(2)}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-[var(--text-muted)] line-through text-[10px]">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-color)]/50">
                    <div className="flex items-center border border-[var(--border-color)] rounded bg-[var(--bg-primary)]">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs hover:bg-[var(--border-color)] text-[var(--text-muted)]"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-[var(--text-primary)]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs hover:bg-[var(--border-color)] text-[var(--text-muted)]"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[var(--accent-orange)]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-[var(--bg-tertiary)] border-t border-[var(--border-color)] space-y-3">
            {/* Calculation Lines */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>subtotal:</span>
                <span className="text-[var(--text-primary)]">${subtotal.toFixed(2)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[var(--accent-green)]">
                  <span>instant_savings:</span>
                  <span>-${totalSavings.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>estimated_shipping:</span>
                <span>{amountToFreeShipping === 0 ? 'FREE' : '$5.99'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[var(--border-color)]">
                <span>TOTAL:</span>
                <span className="text-[var(--accent-green)]">
                  ${(subtotal + (amountToFreeShipping === 0 ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full py-2.5 px-4 bg-[var(--accent-blue)] hover:opacity-90 text-white font-bold rounded text-xs tracking-wider uppercase transition-opacity flex items-center justify-center gap-2">
              <span>🚀 COMMIT & CHECKOUT</span>
            </button>

            <p className="text-[10px] text-center text-[var(--text-muted)]">
              🔒 Encrypted SSL connection // 256-bit security
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}