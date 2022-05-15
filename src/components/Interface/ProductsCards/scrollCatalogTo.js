const scrollCatalogTo = (el) => {
  const modelsContainer = document.querySelector(".products-cards-wrapper");
  const modelWrapper = document.querySelector(".change-model-wrapper");
  const node = el
    ? el.target.parentNode
    : document.querySelector(".change-model.active");

  // console.log(node.offsetHeight);
  // console.log(modelWrapper.offsetHeight);

  if (window.innerWidth < 767) {
    const offset =
      node.offsetLeft + node.offsetWidth / 2 - modelWrapper.offsetWidth / 2;
    modelsContainer.scrollTo(offset, 0);
  } else {
    const offset =
      node.offsetTop + node.offsetHeight / 2 - modelWrapper.offsetHeight / 2;
    modelsContainer.scrollTo(0, offset);
  }

  return null;
};

export default scrollCatalogTo;
