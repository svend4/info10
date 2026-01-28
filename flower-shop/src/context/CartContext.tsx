import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Flower } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (flower: Flower) => void;
  removeFromCart: (flowerId: string) => void;
  updateQuantity: (flowerId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'flower-shop-cart';

const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (flower: Flower) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.flower.id === flower.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.flower.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { flower, quantity: 1 }];
    });
  };

  const removeFromCart = (flowerId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.flower.id !== flowerId));
  };

  const updateQuantity = (flowerId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(flowerId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.flower.id === flowerId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.flower.price * item.quantity, 0);
  };

  const getItemsCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
