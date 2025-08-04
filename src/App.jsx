// src/App.jsx
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FlashSaleGrid } from './components/FlashSaleGrid';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Mechanical Keychron Keyboard K2',
      price: 79.99,
      originalPrice: 119.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&q=80'
    }
  ]);

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200 flex flex-col justify-between">
      <div>
        {/* Pass cart toggle & count to Navbar */}
        <Navbar 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          onOpenCart={() => setIsCartOpen(true)} 
        />

        <main className="max-w-7xl mx-auto px-4 py-6 w-full">
          <FlashSaleGrid />
        </main>
      </div>

      {/* Cart Drawer Component */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}