import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
}));

export default useStore;
