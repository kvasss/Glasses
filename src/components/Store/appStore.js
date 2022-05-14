import create from "zustand";

const defaultProduct = {
  brand: "CA",
  folderName: "0BV2228B__2023",
  id: "1",
  image: "preview.jpg",
  model: "0BV2228B__2023",
  price: 10100,
  title: "0BV2228B__2023",
  url: "#"
};

const useStore = create((set, get) => {
  return {
    product: defaultProduct,
    products: [],
    brands: [],
    filterProducts: [],
    modelsCount: 0,
    currentBrand: "All",
    currentModel: defaultProduct.model,
    basePathToModel: "/Models/",
    setCurrentBrand: (brand) => set((state) => ({ currentBrand: brand })),
    setCurrentProduct: (product) =>
      set((state) => ({
        product: product
      })),
    setPrevProduct: () =>
      set((state) => ({
        product: setPrevProduct(state.filterProducts, state.product)
      })),
    setNextProduct: () =>
      set((state) => ({
        product: setNextProduct(state.filterProducts, state.product)
      })),
    filterByBrand: () => {
      set((state) => ({
        filterProducts: state.products.filter(
          (product) =>
            product.brand === state.currentBrand || state.currentBrand === "All"
        )
      }));
    },
    loadProducts: async (current) => {
      await handleLoadProducts(set, get, current);
    }
    // status: () =>
    //   get((state) => (get().isAvailable ? "Available" : "Unavailable"))
  };
});

const handleLoadProducts = async (set, get, current) => {
  fetch("/models.json")
    .then((response) => response.json())
    .then((json) => {
      set({
        products: json.models,
        filterProducts: json.models,
        brands: json.brands
      });
      // console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

const setPrevProduct = (products, currentModel) => {
  var itemIndex = products
    .map(function (o) {
      return o.model;
    })
    .indexOf(currentModel.model);

  return products[itemIndex > 0 ? (itemIndex += -1) : itemIndex];
};

const setNextProduct = (products, currentModel) => {
  var itemIndex = products
    .map(function (o) {
      return o.model;
    })
    .indexOf(currentModel.model);

  return products[
    itemIndex < products.length - 1 ? (itemIndex += 1) : itemIndex
  ];
};

export default useStore;
