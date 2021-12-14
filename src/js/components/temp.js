const lensProps = useControls(
  "lensProps",
  {
    name: "LENS",
    color: "#ffffff",
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.01, min: 0, max: 1, step: 0.01 },
    envMapIntensity: { value: 1.5, min: 0, max: 10, step: 0.01 },
    thickness: { value: 0.01, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.01, min: 0, max: 1, step: 0.01 },
    transmission: { value: 0.95, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.25, min: 0, max: 3, step: 0.01 },
    refletivity: { value: 1, min: 0, max: 4, step: 0.01 },
    opacity: { value: 0.5, min: 0, max: 1, step: 0.01 },
    side: 2,
    transparent: true
  },
  { collapsed: true }
);

const refractiveProps = useControls(
  "refractiveProps",
  {
    name: "REFRACTIVE",
    blending: 0,
    color: "#ffffff",
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.15, min: 0, max: 1, step: 0.01 },
    envMapIntensity: { value: 1, min: 0, max: 10, step: 0.01 },
    thickness: { value: 0.2, min: 0, max: 1.2 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    transmission: { value: 0.98, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.75, min: 1, max: 2, step: 0.01 },
    refletivity: { value: 1, min: 0, max: 4, step: 0.01 },
    attenuationTint: "#ff9797",
    attenuationDistance: { value: 0.2, min: 0, max: 10 },
    opacity: { value: 1, min: 0, max: 1, step: 0.1 },
    side: 0,
    transparent: true
  },
  { collapsed: true }
);

const opaqueProps = useControls(
  "opaqueProps",
  {
    name: "OPAQUE",
    blending: 2,
    color: "#8d8d8d",
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.15, min: 0, max: 1, step: 0.01 },
    envMapIntensity: { value: 1, min: 0, max: 10, step: 0.01 },
    roughness: { value: 0.98, min: 0, max: 1, step: 0.01 },
    opacity: { value: 0.2, min: 0, max: 1, step: 0.1 },
    side: 2,
    transparent: false
  },
  { collapsed: true }
);

useEffect(() =>
  scene.traverse((node) => {
    if (node.isMesh) {
      if (node.name.indexOf("LENS") !== -1) {
        node.material = createMaterial(lensProps, node.material);
        // node.material.transparent = true;
        node.renderOrder = 1;
      } else if (node.material.name.indexOf("REFRACTIVE") !== -1) {
        node.material = createMaterial(refractiveProps, node.material);
      } else if (node.material.name.indexOf("SSS") !== -1) {
        // node.material = createMaterial(refractiveProps, node.material);
      } else if (node.material.name.indexOf("OPAQUE") !== -1) {
        node.material = createMaterial(opaqueProps, node.material);
      } else if (node.material.name.indexOf("FRAME") !== -1) {
        // node.material.transparent = true;
      }
    }
  })
);
