import create from "zustand";

const materialStore = create((set, get) => {
  return {
    glass: {},
    refractive: {},
    opaque: {},
    setGlass: (material) => {
      set((state) => ({
        glass: () => material
      }));
    },
    setRefractive: (material) => {
      set((state) => ({
        refractive: () => material
      }));
    },
    setOpaque: (material) => {
      set((state) => ({
        opaque: () => material
      }));
    }
  };
});

export default materialStore;
