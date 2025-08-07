export function CartDrawer({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 99;
  
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

      {/* Drawer */}
      <aside className="relative z-10 w-full max-w-md bg-[var(--bg-secondary)] border-l border-[var(--border-color)] text-[var(--text-primary)] shadow-2xl flex flex-col h-full text-sm">
        
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h2 className="font-extrabold text-xs tracking-wider uppercase">
              YOUR CART ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full px-2 py-1 text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-3 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
          <div className="flex justify-between text-xs mb-1.5 font-semibold">
            <span className="text-[var(--text-muted)]">
              {amountToFreeShipping === 0 ? (
                <span className="text-[var(--accent-green)] font-bold">
                  ✓ UNLOCKED FREE SHIPPING
                </span>
              ) : (
                <>Add <strong className="text-[var(--brand-primary)]">${amountToFreeShipping.toFixed(2)}</strong> for Free Shipping</>
              )}
            </span>
            <span className="font-bold">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
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
              <span className="text-4xl opacity-50">🛒</span>
              <p className="text-xs font-bold">Your cart is empty.</p>
              <p className="text-xs text-[var(--brand-primary)]">Add some deals to get started!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id}
                className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex gap-3 relative group"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 object-cover rounded-md bg-[var(--bg-primary)] border border-[var(--border-color)] flex-shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="text-xs font-bold truncate leading-tight">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[var(--text-muted)] hover:text-red-500 text-xs px-1 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="text-xs mt-1 space-x-2">
                      <span className="text-[var(--brand-secondary)] font-bold">${item.price.toFixed(2)}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-[var(--text-muted)] line-through text-[10px]">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-color)]/50">
                    <div className="flex items-center border border-[var(--border-color)] rounded-md bg-[var(--bg-primary)]">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs hover:bg-[var(--border-color)] text-[var(--text-muted)] font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-extrabold text-[var(--text-primary)]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs hover:bg-[var(--border-color)] text-[var(--text-muted)] font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[var(--brand-primary)]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-[var(--bg-tertiary)] border-t border-[var(--border-color)] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Subtotal:</span>
                <span className="text-[var(--text-primary)] font-bold">${subtotal.toFixed(2)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[var(--accent-green)] font-semibold">
                  <span>Savings:</span>
                  <span>-${totalSavings.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold pt-2 border-t border-[var(--border-color)]">
                <span>TOTAL:</span>
                <span className="text-[var(--brand-secondary)]">
                  ${(subtotal + (amountToFreeShipping === 0 ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-[var(--brand-primary)] hover:opacity-90 text-white font-extrabold rounded-lg text-xs tracking-wider uppercase transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer">
              <span>CHECKOUT NOW</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}