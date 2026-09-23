import { createContext, useContext, useMemo, useState } from 'react';
import { dishes, priceValue } from './data.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [quantities, setQuantities] = useState({});

  const addItem = (dishId) => {
    setQuantities((q) => ({ ...q, [dishId]: (q[dishId] || 0) + 1 }));
  };

  const removeItem = (dishId) => {
    setQuantities((q) => {
      const next = { ...q };
      delete next[dishId];
      return next;
    });
  };

  const setQuantity = (dishId, qty) => {
    setQuantities((q) => {
      if (qty <= 0) {
        const next = { ...q };
        delete next[dishId];
        return next;
      }
      return { ...q, [dishId]: qty };
    });
  };

  const clearCart = () => setQuantities({});

  const items = useMemo(() => {
    return Object.entries(quantities)
      .map(([id, qty]) => {
        const dish = dishes.find((d) => d.id === Number(id));
        return dish ? { dish, qty } : null;
      })
      .filter(Boolean);
  }, [quantities]);

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + priceValue(i.dish) * i.qty, 0),
    [items],
  );

  const value = {
    quantities,
    items,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
