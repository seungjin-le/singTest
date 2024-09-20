import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SignItem {
  fontSet: {fontSize: string, textAlign: string, color: string, fontWeight: string},
  id: string;
  info: {
    email: string;
    name: string;
  };
  offset: {
    defaultPosition: {x: number, y: number},
    height: number,
    position: {x: number, y: number},
    value: string,
    width: number,
  };
  page: number;
  type: string;
  info: {
    email: string;
    name: string;
  }; 
  offset: {
    defaultPosition: {
      x: number;
      y: number;
    };
  };

}


export const useSignStore = create(
  persist(
    (set,get) => ({
      items: [],
      setUItems: (items) => set({  items }),
      getItems: () => get().items,
    }),
    {
      name: 'sign-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
