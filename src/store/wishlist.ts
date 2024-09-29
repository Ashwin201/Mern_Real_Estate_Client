import { create } from "zustand";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/themeApi/wishlist";

export interface WishlistState {
  wishlist: any;
  wishlistCount: number;
  fetchWishlist: () => void;
  addToWishlist: (postId: string) => void;
  removeFromWishlist: (itemId: string) => void;
}

const useWishlistStore = create<WishlistState>()((set) => ({
  wishlist: [],
  wishlistCount: 0,
  fetchWishlist: async () => {
    try {
      const response = await getWishlist();
      // console.log(response);
      set({
        wishlist: response?.wishlist?.items,
        wishlistCount: response?.wishlist?.items?.length || 0,
      });
    } catch (error) {
      console.error(error);
    }
  },
  addToWishlist: async (postId) => {
    try {
      const response = await addToWishlist(postId);
      // console.log(response);
      if (response) {
        set((state) => ({
          wishlist: response?.items,
          wishlistCount: state?.wishlistCount + 1,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  },
  removeFromWishlist: async (itemId) => {
    try {
      const response = await removeFromWishlist(itemId);
      set({ wishlist: response?.items });
      set((state: any) => ({
        wishlist: state.wishlist?.filter((data: any) => data?._id !== itemId),
        wishlistCount: state.wishlist - 1,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useWishlistStore;
