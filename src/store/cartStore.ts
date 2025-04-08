// stores/cartStore.ts
import { create } from "zustand";

interface CartItem {
  monumentId: number;
  monumentName: string;
  price: number;
  adultQuantity: number;
  kidQuantity: number;
  adultTotal: number;
  kidTotal: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (monumentId: number) => void;
  updateAdultQuantity: (monumentId: number, quantity: number) => void;
  updateKidQuantity: (monumentId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (newItem) =>
    set((state) => {
      const index = state.cartItems.findIndex(
        (item) => item.monumentId === newItem.monumentId
      );
      if (index >= 0) {
        const existing = state.cartItems[index];
        const updated = {
          ...existing,
          adultQuantity: existing.adultQuantity + newItem.adultQuantity,
          kidQuantity: existing.kidQuantity + newItem.kidQuantity,
          adultTotal: existing.adultTotal + newItem.adultTotal,
          kidTotal: existing.kidTotal + newItem.kidTotal,
        };
        return {
          cartItems: [
            ...state.cartItems.slice(0, index),
            updated,
            ...state.cartItems.slice(index + 1),
          ],
        };
      } else {
        return { cartItems: [...state.cartItems, newItem] };
      }
    }),
  removeFromCart: (monumentId) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.monumentId !== monumentId
      ),
    })),
  updateAdultQuantity: (monumentId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) => {
          if (item.monumentId !== monumentId) return item;
          const adultTotal = quantity * item.price;
          return { ...item, adultQuantity: quantity, adultTotal };
        })
        .filter((item) => item.adultQuantity + item.kidQuantity > 0),
    })),
  updateKidQuantity: (monumentId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) => {
          if (item.monumentId !== monumentId) return item;
          const kidTotal = quantity * (item.price * 0.5);
          return { ...item, kidQuantity: quantity, kidTotal };
        })
        .filter((item) => item.adultQuantity + item.kidQuantity > 0),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
