import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FlashSaleGrid } from './components/FlashSaleGrid';
import { CartDrawer } from './components/CartDrawer';
import { ProductInspectorModal } from './components/ProductInspectorModal';
import { SpinWheelModal } from './components/SpinWheelModal';
import { SocialProofToast } from './components/SocialProofToast';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForInspect, setSelectedProductForInspect] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  // Spin Wheel state
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Keychron K2 Wireless Mechanical Keyboard 75% Layout',
      price: 79.99,
      originalPrice: 119.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    },
  ]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: 1,
            image: product.image,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200 flex flex-col justify-between">
      <div>
        <Navbar
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Monaco Lucky Wheel Callout Banner */}
        <div className="bg-[var(--brand-primary)] text-white px-4 py-2.5 text-center text-xs font-black flex items-center justify-center gap-3 shadow-xs">
          <span>🎁 SPIN THE LUCKY WHEEL & WIN UP TO 90% OFF!</span>
          <button
            onClick={() => setIsWheelOpen(true)}
            className="bg-white text-[var(--brand-primary)] px-3 py-1 rounded-full text-[10px] font-black uppercase hover:bg-yellow-300 transition-colors cursor-pointer shadow-xs"
          >
            {appliedCoupon ? `COUPON: ${appliedCoupon.code}` : 'SPIN NOW'}
          </button>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-6 w-full">
          <FlashSaleGrid
            onAddToCart={handleAddToCart}
            onInspectProduct={(prod) => setSelectedProductForInspect(prod)}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </main>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        appliedCoupon={appliedCoupon}
        onUpdateQuantity={(id, newQty) =>
          setCartItems((prev) =>
            newQty <= 0
              ? prev.filter((i) => i.id !== id)
              : prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
          )
        }
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.id !== id))}
      />

      <ProductInspectorModal
        product={selectedProductForInspect}
        onClose={() => setSelectedProductForInspect(null)}
        onAddToCart={handleAddToCart}
      />

      <SpinWheelModal
        isOpen={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
        onApplyCoupon={(coupon) => setAppliedCoupon(coupon)}
      />

      {/* Floating Live Social Proof Toasts */}
      <SocialProofToast />
    </div>
  );
}