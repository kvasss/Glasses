import create from "zustand";

const useCartStore = create((set, get) => {
  return {
    products: [],
    total_cost: 0,
    total_count: 0,
    addProduct: (product) =>
      set((state) => ({ products: [...state.products, product] })),
    removeProduct: (product) =>
      set((state) => ({
        products: state.products.filter((p, i) => p !== product)
      }))
  };
});

export default useCartStore;
