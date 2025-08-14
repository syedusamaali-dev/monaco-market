import { useState } from 'react';

export function CheckoutPage({ cartItems, appliedCoupon, onClearCart, onNavigate }) {
  const [step, setStep] = useState(1); // 1: Order Form, 2: Order Confirmation
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // Calculate Prices
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API Payment Processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
      onClearCart();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* 1. Header Bar with Back Navigation */}
      <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors cursor-pointer"
          >
            ← Back to Dashboard
          </button>
          
          <h1 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">
            🔒 Secure Checkout
          </h1>

          <div className="text-xs text-[var(--text-muted)] font-bold">
            {cartItems.reduce((a, b) => a + b.quantity, 0)} Items
          </div>
        </div>
      </header>

      {/* 2. Main Checkout Form & Summary Grid */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Shipping Card */}
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs">
                <h2 className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-4">
                  1. Shipping Information
                </h2>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2">
                    <label className="block text-[var(--text-muted)] font-bold mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none focus:border-[var(--brand-primary)]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[var(--text-muted)] font-bold mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none focus:border-[var(--brand-primary)]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[var(--text-muted)] font-bold mb-1">Street Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Market St"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none focus:border-[var(--brand-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] font-bold mb-1">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none focus:border-[var(--brand-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] font-bold mb-1">ZIP Code</label>
                    <input
                      required
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="10001"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none focus:border-[var(--brand-primary)]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Card */}
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs">
                <h2 className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-4">
                  2. Payment Method
                </h2>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[var(--text-muted)] font-bold mb-1">Card Number</label>
                    <input
                      required
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="4111 2222 3333 4444"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none focus:border-[var(--brand-primary)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[var(--text-muted)] font-bold mb-1">Expiry Date</label>
                      <input
                        required
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none focus:border-[var(--brand-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[var(--text-muted)] font-bold mb-1">CVV</label>
                      <input
                        required
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none focus:border-[var(--brand-primary)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 sticky top-24 shadow-xs">
                <h2 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 border-b border-[var(--border-color)] pb-3">
                  Order Summary
                </h2>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-1 mb-4 border-b border-[var(--border-color)] pb-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-[var(--text-primary)]">{item.title}</p>
                        <p className="text-[var(--text-muted)]">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-[var(--brand-primary)]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs">
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

                  <div className="flex justify-between text-[var(--text-muted)]">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between text-base font-black text-[var(--text-primary)] border-t border-[var(--border-color)] pt-3">
                    <span>Total Due</span>
                    <span className="text-[var(--brand-primary)]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || cartItems.length === 0}
                  className="w-full py-3.5 mt-6 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-black uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? 'Authorizing Payment...' : `Complete Order ($${total.toFixed(2)})`}
                </button>
              </div>
            </div>

          </form>
        ) : (
          /* 3. Confirmation Screen */
          <div className="max-w-md mx-auto text-center py-16 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 shadow-xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-[var(--text-primary)] mb-2">
              Order Confirmed!
            </h2>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              Thank you for shopping! Your order is currently being prepared for shipment.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 bg-[var(--brand-primary)] text-white rounded-xl text-xs font-bold hover:opacity-90 cursor-pointer shadow-xs"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}