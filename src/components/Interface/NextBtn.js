import React from "react";
import useStore from "./../Store/appStore";
import scrollCatalogTo from "./ProductsCards/scrollCatalogTo";

const NextBtn = () => {
  const { setNextProduct } = useStore();

  return (
    <button
      onClick={(e) => {
        setNextProduct();
        scrollCatalogTo();
      }}
      id="next"
      className="next-model"
    >
      <i className="flaticons-next"></i>
    </button>
  );
};
export default NextBtn;
