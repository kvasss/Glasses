import { useEffect } from "react";

import { useGLTF } from "@react-three/drei";

import occluderMaterial from "./occluderMaterial";

// Face
function FaceMesh() {
  const { scene } = useGLTF("/face.glb");
  // const { scene } = useGLTF("/cylynder.glb");
  useEffect(() => {
    scene.traverse((node, i) => {
      if (node.isMesh) {
        // node.material = occluderMaterial();
        node.material.roughness = 0.5;
        node.material.side = 2;
        node.renderOrder = -1;
      }
    });
  });

  return <primitive object={scene} />;
}

export default FaceMesh;
