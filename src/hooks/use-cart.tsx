
import { createContext, useContext, useState, useEffect } from "react";
import type { CartItem } from "@/types/cart";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Загрузка корзины из localStorage при инициализации
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  // Добавление товара в корзину
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Проверка, есть ли уже такой товар в корзине
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Если товар уже в корзине, обновляем количество
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        // Если товара нет в корзине, добавляем его
        return [...prevCart, item];
      }
    });
  };
  
  // Удаление товара из корзины
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  
  // Обновление количества товара
  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  // Очистка корзины
  const clearCart = () => {
    setCart([]);
  };
  
  // Расчет общего количества товаров в корзине
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Расчет общей стоимости корзины
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
