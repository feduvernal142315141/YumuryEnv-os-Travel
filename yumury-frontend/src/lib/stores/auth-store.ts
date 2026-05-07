import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { User } from "@/types";

type AuthState = {
  user: User | null;

  login: (email: string, _password: string) => Promise<void>;
  logout: () => void;
  register: (data: { name: string; email: string }) => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      login: async (email) => {
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800));
        const name = email.split("@")[0].replace(/[._]/g, " ");
        const user: User = {
          id: nanoid(),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          email,
          avatar: "😊",
          joinedAt: new Date().toISOString(),
          totalOrders: 3,
          totalSpent: 245.99,
        };
        set({ user });
      },

      logout: () => set({ user: null }),

      register: async ({ name, email }) => {
        await new Promise((r) => setTimeout(r, 800));
        const user: User = {
          id: nanoid(),
          name,
          email,
          avatar: "😊",
          joinedAt: new Date().toISOString(),
          totalOrders: 0,
          totalSpent: 0,
        };
        set({ user });
      },
    }),
    {
      name: "yumury:auth",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
