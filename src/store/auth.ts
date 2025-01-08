import { create } from "zustand";

interface PostingStore {
  access: string | undefined;
  setAccess: (access: string) => void;
  updateAccess: (access: string) => void;
  deleteAccess: () => void;
}

export const useAuthStore = create<PostingStore>((set, get) => ({
  access: undefined,
  setAccess: (access: string) => {
    if (!get().access) {
      set({ access: access });
    }
  },
  updateAccess: (access: string) => {
    set({ access: access });
  },
  deleteAccess: () => {
    set({ access: undefined });
  },
}));
