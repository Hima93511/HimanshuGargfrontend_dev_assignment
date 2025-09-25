import create from "zustand";

type State = {
  dark: boolean;
  toggle: () => void;
  setDark: (val: boolean) => void;
};

export const useThemeStore = create<State>((set) => ({
  dark: false,
  toggle: () => set((s) => ({ dark: !s.dark })),
  setDark: (val) => set({ dark: val }),
}));
