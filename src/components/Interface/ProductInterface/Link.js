import useStore from "./../../Store/appStore";

function Link() {
  const { product } = useStore();
  return (
    <a rel="nofollow" title="Подробнее" className="to-page" href={product.url}>
      Подробнее
    </a>
  );
}

export default Link;
