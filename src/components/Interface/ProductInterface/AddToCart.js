import React from "react";
import useCartStore from "./../../Store/cartStore";

function AddToCart() {
  const { addProduct } = useCartStore();
  return (
    <button
      onClick={(e) => addProduct(e)}
      id="add_to_cart"
      className="add-to-cart"
    >
      <span>В корзину</span>
    </button>
  );
}

export default AddToCart;
