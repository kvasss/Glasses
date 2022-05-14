import React, { useEffect } from "react";
import useStore from "./../../Store/appStore";
import ProductCard from "./ProductCard";

function ProductsCards() {
  const loadProducts = useStore((state) => state.loadProducts);

  useEffect(() => {
    loadProducts();
  }, []);
  return <ProductCard />;
}

export default ProductsCards;
