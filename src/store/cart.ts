import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
  removerCartItems,
} from "@/themeApi/cart";

export interface CartState {
  cart: any;
  cartCount: number;
  fetchCart: () => Promise<void>;

  addToCart: (postId: string) => Promise<void>;

  updateCartItem: (itemId: string, quantity: number) => Promise<void>;

  removeCartItem: (itemId: string) => any;

  resetCart: () => Promise<any>;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      cartCount: 0,
      fetchCart: async () => {
        try {
          const response = await getCart();
          // console.log(response);
          set({
            cart: response?.cart,
            cartCount: response?.cart?.items?.length || 0,
          });
        } catch (error) {
          console.error(error);
        }
      },
      addToCart: async (postId) => {
        try {
          const response = await addToCart(postId);
          // console.log(response);
          set({ cart: response?.data });
        } catch (error) {
          console.error(error);
        }
      },
      updateCartItem: async (itemId, quantity) => {
        try {
          const response = await updateCartItem(itemId, quantity);
          set({ cart: response.data });
        } catch (error) {
          console.error(error);
        }
      },
      removeCartItem: async (itemId) => {
        try {
          const response = await removeCartItem(itemId);
          // set({ cart: response?.data });
          set((state: any) => ({
            cart: state.cart?.items?.filter(
              (data: any) => data?._id !== itemId
            ),
            loading: false,
          }));
          return { success: response.success, data: response?.data };
        } catch (error) {
          console.error(error);
        }
      },
      resetCart: async () => {
        try {
          const response = await removerCartItems();
          set({ cart: [] });
          return response;
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "cart-storage", // name of the item in the storage

      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);

export default useCartStore;
