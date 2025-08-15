import { useState } from 'react';

export function CheckoutPage({ cartItems, appliedCoupon, onClearCart, onNavigate }) {
  const [step, setStep] = useState(1); // 1: Order Form, 2: Order Confirmation
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'paypal' | 'applepay'
  const [orderReference, setOrderReference] = useState(''); // 👈 Stable Order Reference state

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  // Calculate Prices
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  // Auto-detect card brand for icon display
  const getCardBrand = (num) => {
    const cleaned = num.replace(/\s+/g, '');
    if (/^4/.test(cleaned)) return 'VISA';
    if (/^5[1-5]/.test(cleaned)) return 'MASTERCARD';
    if (/^3[47]/.test(cleaned)) return 'AMEX';
    return 'CARD';
  };

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Auto format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    }
    
    // Auto format expiry MM/YY
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').trim().slice(0, 5);
      if (value.endsWith('/')) value = value.slice(0, -1);
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // 🔒 Generate random reference inside Event Handler (Pure & Side-effect Safe)
    const newOrderRef = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    // Simulate Payment Gateway API Delay
    setTimeout(() => {
      setOrderReference(newOrderRef);
      setIsProcessing(false);
      setStep(2);
      onClearCart();
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Header Bar */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            ← Back to Store
          </button>

          {/* Stepper */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="text-slate-500">Cart</span>
            <span className="text-slate-600">›</span>
            <span className={step === 1 ? 'text-indigo-400 font-bold underline underline-offset-4' : 'text-slate-500'}>
              Shipping & Payment
            </span>
            <span className="text-slate-600">›</span>
            <span className={step === 2 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
              Confirmation
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-950/50 border border-emerald-800/60 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            256-bit SSL Encrypted
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-10 w-full flex-1">
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Shipping Section */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-black uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">1</span>
                    Shipping Address
                  </h2>
                  <span className="text-xs text-slate-500">* All fields required</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-slate-300 font-bold mb-1.5">Full Name</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Alex Morgan"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors text-white placeholder-slate-600"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-slate-300 font-bold mb-1.5">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors text-white placeholder-slate-600"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-slate-300 font-bold mb-1.5">Street Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="742 Evergreen Terrace"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors text-white placeholder-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Springfield"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors text-white placeholder-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">Postal Code</label>
                    <input
                      required
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="97477"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors text-white placeholder-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">2</span>
                  Payment Method
                </h2>

                {/* Payment Selector Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">💳</span>
                    Credit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg font-black italic text-blue-400">P</span>
                    PayPal
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'applepay'
                        ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">⚡</span>
                    Express Pay
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-6 pt-2">
                    {/* Dynamic Visual Credit Card Display */}
                    <div className="relative w-full h-44 rounded-2xl bg-gradient-to-tr from-indigo-900 via-slate-900 to-indigo-600 p-6 border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between text-white">
                      <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-indigo-500/20 blur-xl"></div>
                      <div className="absolute top-0 right-12 w-24 h-24 rounded-full bg-violet-400/20 blur-lg"></div>

                      <div className="flex justify-between items-start z-10">
                        <div className="w-10 h-7 rounded-md bg-amber-400/80 border border-amber-300 flex items-center justify-center">
                          <div className="w-8 h-5 border-t border-b border-amber-600/50"></div>
                        </div>

                        <span className="font-black tracking-widest text-xs px-2 py-1 rounded bg-white/10 backdrop-blur-md uppercase">
                          {getCardBrand(formData.cardNumber)}
                        </span>
                      </div>

                      <div className="z-10 space-y-3">
                        <div className="font-mono text-base tracking-widest text-slate-200">
                          {formData.cardNumber || '•••• •••• •••• ••••'}
                        </div>

                        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                          <div>
                            <span className="block text-slate-400 text-[8px]">Cardholder</span>
                            <span>{formData.cardName || 'YOUR NAME'}</span>
                          </div>
                          <div>
                            <span className="block text-slate-400 text-[8px]">Expires</span>
                            <span>{formData.expiry || 'MM/YY'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Input Fields */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="col-span-2">
                        <label className="block text-slate-300 font-bold mb-1.5">Cardholder Name</label>
                        <input
                          required
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          placeholder="Alex Morgan"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors text-white"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-slate-300 font-bold mb-1.5">Card Number</label>
                        <div className="relative">
                          <input
                            required
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="4111 2222 3333 4444"
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 pr-12 outline-none focus:border-indigo-500 transition-colors font-mono text-white"
                          />
                          <span className="absolute right-3 top-3 text-xs font-bold text-indigo-400">
                            {getCardBrand(formData.cardNumber)}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-bold mb-1.5">Expiration Date</label>
                        <input
                          required
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors font-mono text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-bold mb-1.5">Security Code (CVV)</label>
                        <input
                          required
                          type="password"
                          name="cvv"
                          maxLength={4}
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="•••"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors font-mono text-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs text-slate-300">
                      You will be redirected to complete your purchase securely via <strong className="text-indigo-400 uppercase">{paymentMethod}</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Summary Panel */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sticky top-24 shadow-2xl backdrop-blur-md space-y-6">
                <h2 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex justify-between items-center">
                  <span>Order Summary</span>
                  <span className="text-indigo-400">{cartItems.reduce((a, b) => a + b.quantity, 0)} Items</span>
                </h2>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs gap-3 p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
                      <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-200 truncate">{item.title}</p>
                        <p className="text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-indigo-400">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5 text-xs pt-3 border-t border-slate-800">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-400 font-bold bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/50">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Shipping</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between text-base font-black text-white pt-3 border-t border-slate-800">
                    <span>Total Amount</span>
                    <span className="text-indigo-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || cartItems.length === 0}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Processing Payment...
                    </span>
                  ) : (
                    `Authorize & Pay ($${total.toFixed(2)}) 🔒`
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                  <span>🛡️ 30-Day Money Back</span>
                  <span>•</span>
                  <span>🚚 Fast Dispatch</span>
                </div>
              </div>
            </div>

          </form>
        ) : (
          /* Confirmation View with Pure State Reference */
          <div className="max-w-md mx-auto text-center py-12 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center text-4xl mx-auto shadow-xl shadow-emerald-500/10 animate-bounce">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Payment Successful!</h2>
              <p className="text-xs text-slate-400">
                Order confirmation and digital receipt have been sent to <strong className="text-indigo-400">{formData.email || 'your email'}</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-left text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Order Reference:</span>
                <span className="font-mono text-white font-bold">{orderReference}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Delivery:</span>
                <span className="text-emerald-400 font-bold">3-5 Business Days</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
            >
              Return to Storefront
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 py-4 px-6 text-center text-[10px] text-slate-600">
        © Storefront Inc. All rights reserved. Encrypted payment processing powered by Stripe & PayPal.
      </footer>
    </div>
  );
}