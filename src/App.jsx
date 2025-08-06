// src/App.jsx
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FlashSaleGrid } from './components/FlashSaleGrid';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Keychron K2 Mechanical Keyboard',
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

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
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

        <main className="max-w-7xl mx-auto px-4 py-6 w-full">
          <FlashSaleGrid
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </main>
      </div>

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