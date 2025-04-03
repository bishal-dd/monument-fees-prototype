import { create } from "zustand";

interface CartItem {
  monumentId: number;
  monumentName: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (monumentId: number) => void;
  updateQuantity: (monumentId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (newItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.monumentId === newItem.monumentId
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.monumentId === newItem.monumentId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ),
        };
      }
      return { cartItems: [...state.cartItems, newItem] };
    }),
  removeFromCart: (monumentId) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.monumentId !== monumentId
      ),
    })),
  updateQuantity: (monumentId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.monumentId === monumentId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
