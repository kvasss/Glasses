import React from "react";
import useStore from "./../Store/appStore";
import scrollCatalogTo from "./ProductsCards/scrollCatalogTo";

const PrevBtn = () => {
  const { setPrevProduct } = useStore();
  return (
    <button
      onClick={(e) => {
        setPrevProduct();
        scrollCatalogTo();
      }}
      id="prev"
      className="prev-model"
    >
      <i className="flaticons-prev"></i>
    </button>
  );
};

export default PrevBtn;
