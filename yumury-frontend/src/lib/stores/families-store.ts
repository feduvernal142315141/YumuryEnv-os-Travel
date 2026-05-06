import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Family } from "@/types";
import { mockFamilies } from "@/lib/mock-data/families";

type FamiliesState = {
  families: Family[];
  selectedFamilyId: string | null;
  /** True once the seed has been merged into local storage */
  seeded: boolean;
  addFamily: (family: Family) => void;
  updateFamily: (id: string, partial: Partial<Family>) => void;
  deleteFamily: (id: string) => void;
  selectFamily: (id: string | null) => void;
};

export const useFamiliesStore = create<FamiliesState>()(
  persist(
    (set) => ({
      families: mockFamilies,
      selectedFamilyId: null,
      seeded: true,
      addFamily: (family) => set((state) => ({ families: [...state.families, family] })),
      updateFamily: (id, partial) =>
        set((state) => ({
          families: state.families.map((f) => (f.id === id ? { ...f, ...partial } : f)),
        })),
      deleteFamily: (id) =>
        set((state) => ({
          families: state.families.filter((f) => f.id !== id),
          selectedFamilyId: state.selectedFamilyId === id ? null : state.selectedFamilyId,
        })),
      selectFamily: (id) => set({ selectedFamilyId: id }),
    }),
    {
      name: "yumury:families",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      // First time the store hydrates with no persisted state, the in-memory
      // mockFamilies are used as initial seed. After that the persisted list wins.
    },
  ),
);

export const selectFamilyById = (id: string) => (state: FamiliesState) =>
  state.families.find((f) => f.id === id);

export const selectSelectedFamily = (state: FamiliesState) =>
  state.selectedFamilyId ? state.families.find((f) => f.id === state.selectedFamilyId) : undefined;
