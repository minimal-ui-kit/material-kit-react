import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
}));

export default useStore;
