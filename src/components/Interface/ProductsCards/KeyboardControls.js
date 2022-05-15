import { useEffect } from "react";
import useStore from "./../../Store/appStore";
import scrollCatalogTo from "./scrollCatalogTo";

const KeyboardControls = () => {
  const { setPrevProduct, setNextProduct } = useStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "d") {
        setNextProduct();
        scrollCatalogTo();
      } else if (e.key === "a") {
        setPrevProduct();
        scrollCatalogTo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // return <></>;
};

export default KeyboardControls;
