import useStore from "./../../Store/appStore";

function Title() {
  const { product } = useStore();
  return (
    <div className="product-title">
      <span>{product.title}</span>
    </div>
  );
}

export default Title;
