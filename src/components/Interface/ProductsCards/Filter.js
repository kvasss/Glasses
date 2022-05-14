import React from "react";
import useStore from "./../../Store/appStore";

const Filter = () => {
  const {
    filterProducts,
    brands,
    currentBrand,
    filterByBrand,
    setCurrentBrand
  } = useStore();
  return (
    <div className="filter-model-container">
      <div className="count">{filterProducts.length}</div>
      <select
        value={currentBrand}
        onChange={(e) => {
          setCurrentBrand(e.target.value);
          filterByBrand(e.target.value);
        }}
      >
        <option defaultValue value="All">
          Все бренды
        </option>
        {brands.map((brand, id) => (
          <option value={brand.name} key={id}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
