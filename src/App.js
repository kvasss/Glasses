import { useEffect } from "@react-three/fiber";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";

import AppCanvas from "./components/AppCanvas";

import ProductsCards from "./components/Interface/ProductsCards/ProductsCards";
import Filter from "./components/Interface/ProductsCards/Filter";

import Preloader from "./components/Interface/Preloader";
import OptionsBtn from "./components/Interface/OptionsBtn";
import EmptyModel from "./components/Interface/EmptyModel";
import NextBtn from "./components/Interface/NextBtn";
import PrevBtn from "./components/Interface/PrevBtn";
import CloseModal from "./components/Interface/CloseModal";
import Screenshot from "./components/Interface/Screenshot";

import Draggable from "./components/Interface/MeshInterface/Draggable";
import Reset from "./components/Interface/MeshInterface/Reset";
import Accept from "./components/Interface/MeshInterface/Accept";
import SwitchEars from "./components/Interface/MeshInterface/SwitchEars";

import AddToCart from "./components/Interface/ProductInterface/AddToCart";
import Link from "./components/Interface/ProductInterface/Link";
import Price from "./components/Interface/ProductInterface/Price";
import Title from "./components/Interface/ProductInterface/Title";

const root = createRoot(document.querySelector("#root"));

root.render(
  <>
    <CloseModal />
    <div className="viewer-wrapper">
      <div id="ChangeModelWrapper" className="change-model-wrapper">
        <div className="change-model-container">
          <div id="FilterWrapper" className="filter-wrapper">
            <div className="filter-model-container">
              <Filter />
            </div>
          </div>
          <div className="products-cards-wrapper">
            <div className="products-cards-container">
              <ProductsCards />
            </div>
          </div>
          <div className="interface-wrapper">
            {/* <NextBtn /> */}
            {/* <PrevBtn /> */}
          </div>
        </div>
      </div>
      <div id="ModelWrapper" className="model-wrapper">
        <div id="meshInterface" className="buttons-wrapper">
          <Draggable />
          <Reset />
          <Accept />
        </div>
        <AppCanvas />
        <div id="productInfo" className="product-info-wrapper">
          <div className="product-info">
            <div className="product-info-left">
              <div className="model">
                <Title />
              </div>
              <div className="price">
                <Price />
              </div>
            </div>
            <div className="product-info-right">
              <AddToCart />
              <Link />
            </div>
          </div>
        </div>
        <div id="modal_root" className="modal-wrapper"></div>
      </div>
      <div id="interface_root" className="interface-wrapper">
        <div className="interface-container">
          <Preloader />
          <EmptyModel />
          <Screenshot />
          <SwitchEars />
          <PrevBtn />
          <NextBtn />
          <OptionsBtn
            // showFaceMesh={showFaceMesh}
            helpText="Скорректируйте положение модели перемещая рамку в центре окна."
          />
        </div>
      </div>
      <Preloader />
    </div>
  </>
);
