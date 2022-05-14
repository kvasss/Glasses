import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import useStore from "./../Store/appStore";

function GlassesMesh(props) {
  const ref = useRef();
  const { basePathToModel, product } = useStore();

  const pathToModel = basePathToModel + "/" + product.folderName + "/";
  const { scene, materials } = useGLTF(pathToModel + "model.glb");

  useEffect(() => {
    for (let [key, material] of Object.entries(materials)) {
      if (key.indexOf("LENS") !== -1) {
      } else if (key.indexOf("REFRACTIVE") !== -1) {
      }
    }
  }, []);

  return <primitive ref={ref} object={scene} dispose={null} />;
}

export default GlassesMesh;
