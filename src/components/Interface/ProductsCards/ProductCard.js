import React from "react";
import useStore from "./../../Store/appStore";
import scrollCatalogTo from "./scrollCatalogTo";

function ProductCard() {
  const {
    filterProducts,
    basePathToModel,
    setCurrentProduct,
    product
    // getCurrentModel
  } = useStore();

  return filterProducts.map((p) => (
    <button
      onClick={(e) => {
        setCurrentProduct(p, e);
        scrollCatalogTo(e);
      }}
      key={p.model}
      className={"change-model" + (product.model === p.model ? " active" : "")}
    >
      <img
        width="100"
        height="64"
        loading="lazy"
        alt={p.folderName}
        src={basePathToModel + p.folderName + "/" + p.image}
      />
      <div className="product-title">{p.title}</div>
    </button>
  ));
}

export default ProductCard;
