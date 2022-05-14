import useStore from "./../../Store/appStore";
import { formatPrice } from "./../../utils";
function Price() {
  const { product } = useStore();
  return (
    <div className="price">
      <span>{formatPrice(product.price)} руб.</span>
    </div>
  );
}

export default Price;
