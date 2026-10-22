
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      // CART STATE
      cart: [],

      // ADD TO CART
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );

          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      // REMOVE PRODUCT
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // INCREASE QUANTITY
      incrementQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // DECREASE QUANTITY
      decrementQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      // CLEAR CART
      clearCart: () => set({ cart: [] }),

      // WISHLIST STATE
      wishlist: [],

      // ADD TO WISHLIST
      addToWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some(
            (item) => item.id === product.id
          );

          if (exists) return state;

          return {
            wishlist: [...state.wishlist, product],
          };
        }),

      // REMOVE FROM WISHLIST
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => item.id !== id
          ),
        })),

      // TOGGLE WISHLIST
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some(
            (item) => item.id === product.id
          );

          return {
            wishlist: exists
              ? state.wishlist.filter(
                  (item) => item.id !== product.id
                )
              : [...state.wishlist, product],
          };
        }),

      // CLEAR WISHLIST
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "shopsphere-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    }
  )
);

export default useCartStore;
