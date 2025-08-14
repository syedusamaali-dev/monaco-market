export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) {
  if (!isOpen) return null;

  // Pricing Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[var(--bg-secondary)] h-full flex flex-col justify-between p-6 shadow-2xl border-l border-[var(--border-color)] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <h2 className="text-base font-black text-[var(--text-primary)] flex items-center gap-2">
              🛒 Shopping Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div className="max-h-[55vh] overflow-y-auto mt-4 space-y-3 pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-[var(--text-muted)] space-y-2">
                <p className="text-3xl">🛍️</p>
                <p className="text-xs font-medium">Your cart is empty.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">
                      {item.title}
                    </h4>
                    <span className="text-xs font-black text-[var(--brand-primary)]">
                      ${item.price}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-2 py-0.5">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] px-1 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-[var(--text-primary)] px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] px-1 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer & Checkout Action */}
        <div className="border-t border-[var(--border-color)] pt-4 space-y-3">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[var(--text-muted)]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-[var(--accent-green)] font-bold">
                <span>Discount ({appliedCoupon.code})</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between font-black text-sm text-[var(--text-primary)] pt-1 border-t border-[var(--border-color)]">
              <span>Total</span>
              <span className="text-[var(--brand-primary)]">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            disabled={cartItems.length === 0}
            onClick={() => {
              onClose();
              onOpenCheckout();
            }}
            className="w-full py-3 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-black uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            Proceed to Checkout 💳
          </button>
        </div>
      </div>
    </div>
  );
}