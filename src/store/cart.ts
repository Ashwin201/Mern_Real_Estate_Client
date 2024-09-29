import { create } from "zustand";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
  removerCartItems,
} from "@/themeApi/cart";

export interface CartState {
  cart: any[];
  cartCount: number;
  fetchCart: () => Promise<void>;

  addToCart: (postId: string) => Promise<void>;

  // updateCartItem: (itemId: string, quantity: number) => Promise<void>;

  removeCartItem: (itemId: string) => any;

  resetCart: () => Promise<any>;
}

const useCartStore = create<CartState>()((set) => ({
  cart: [],
  cartCount: 0,
  fetchCart: async () => {
    try {
      const response = await getCart();
      // console.log(response);
      set({
        cart: response?.cart?.items,
        cartCount: response?.cart?.items?.length || 0,
      });
    } catch (error) {
      console.error(error);
    }
  },
  addToCart: async (postId) => {
    try {
      const response = await addToCart(postId);
      if (response) {
        set((state) => ({
          cart: response?.items,
          cartCount: state.cartCount + 1,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  },
  // updateCartItem: async (itemId, quantity) => {
  //   try {
  //     const response = await updateCartItem(itemId, quantity);
  //     set({ cart: response.data });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  removeCartItem: async (itemId) => {
    try {
      const response = await removeCartItem(itemId);
      // set({ cart: response?.data });
      set((state: any) => ({
        cart: state.cart?.filter((data: any) => data?.post?._id !== itemId),
        cartCount: state.cartCount - 1,
        loading: false,
      }));
      return { success: response.success, data: response?.data?.cart?.items };
    } catch (error) {
      console.error(error);
    }
  },
  resetCart: async () => {
    try {
      const response = await removerCartItems();
      set({ cart: [], cartCount: 0 });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCartStore;
