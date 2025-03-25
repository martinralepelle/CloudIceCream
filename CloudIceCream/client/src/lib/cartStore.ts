import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@shared/schema';

interface CartState {
  cart: CartItem[];
  subtotal: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Calculate the subtotal from cart items
const calculateSubtotal = (cart: CartItem[]): number => {
  return parseFloat(
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  );
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      subtotal: 0,
      
      addToCart: (item: CartItem) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          (cartItem) => cartItem.productId === item.productId
        );

        let newCart: CartItem[];

        if (existingItemIndex >= 0) {
          // Item already exists, update quantity
          newCart = [...currentCart];
          newCart[existingItemIndex] = {
            ...newCart[existingItemIndex],
            quantity: newCart[existingItemIndex].quantity + item.quantity,
          };
        } else {
          // Item doesn't exist, add it
          newCart = [...currentCart, item];
        }

        const subtotal = calculateSubtotal(newCart);
        set({ cart: newCart, subtotal });
      },
      
      removeFromCart: (productId: number) => {
        const newCart = get().cart.filter((item) => item.productId !== productId);
        const subtotal = calculateSubtotal(newCart);
        set({ cart: newCart, subtotal });
      },
      
      updateQuantity: (productId: number, quantity: number) => {
        const currentCart = get().cart;
        const itemIndex = currentCart.findIndex(
          (item) => item.productId === productId
        );

        if (itemIndex >= 0) {
          const newCart = [...currentCart];
          newCart[itemIndex] = { ...newCart[itemIndex], quantity };
          const subtotal = calculateSubtotal(newCart);
          set({ cart: newCart, subtotal });
        }
      },
      
      clearCart: () => {
        set({ cart: [], subtotal: 0 });
      },
    }),
    {
      name: 'clouds-cart',
    }
  )
);
