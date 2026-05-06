"use client";

import { useFamiliesStore, selectSelectedFamily } from "@/lib/stores/families-store";

export function useFamilies() {
  const families = useFamiliesStore((s) => s.families);
  const selectedFamilyId = useFamiliesStore((s) => s.selectedFamilyId);
  const selected = useFamiliesStore(selectSelectedFamily);
  const addFamily = useFamiliesStore((s) => s.addFamily);
  const updateFamily = useFamiliesStore((s) => s.updateFamily);
  const deleteFamily = useFamiliesStore((s) => s.deleteFamily);
  const selectFamily = useFamiliesStore((s) => s.selectFamily);

  return {
    families,
    selectedFamilyId,
    selected,
    addFamily,
    updateFamily,
    deleteFamily,
    selectFamily,
    isEmpty: families.length === 0,
  };
}
