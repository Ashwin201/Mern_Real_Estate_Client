import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface UserState {
  user: any;
  setUser: (data: any) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {},
      setUser: async (data) => {
        try {
          set({ user: data });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "userData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useUserStore;
