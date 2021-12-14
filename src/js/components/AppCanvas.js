import { Suspense, useEffect, useRef, Component, useMemo } from "react";

import { render } from "react-dom";

import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";

import { useGLTF, Environment, Loader, OrbitControls } from "@react-three/drei";

import { useControls } from "leva";

import {
  Vector2,
  ShaderMaterial,
  ShaderLib,
  MeshPhysicalMaterial
} from "three";

let _timerResize = 0;
const _faceFollowers = new Array(1);

const FaceFollower = (props) => {
  const objRef = useRef();
  const { scene } = useGLTF(props.pathToModel + "model.glb");
  useEffect(() => {
    _faceFollowers[0] = objRef.current;
  });

  return (
    <object3D ref={objRef} name="FACE3D">
      <object3D ref={objRef} name="FACE3DPIVOTED">
        <Glasses scene={scene.clone()} />
      </object3D>
    </object3D>
  );
};

function createMaterial(props, material) {
  // console.log(material)

  const mat = new MeshPhysicalMaterial({
    name: props.name ? props.name : "PhysicalMaterial",
    alphaMap: material.alphaMap ? material.alphaMap : null,
    attenuationTint: props.attenuationTint ? props.attenuationTint : "#ffffff",
    attenuationDistance: props.attenuationDistance
      ? props.attenuationDistance
      : 1,
    aoMap: material.aoMap ? material.aoMap : null,
    aoMapIntensity: props.aoMapIntensity
      ? props.aoMapIntensity
      : material.aoMapIntensity,
    blending: props.blending ? props.blending : material.blending,
    color: props.color ? props.color : material.color,
    clearcoat: props.clearcoat ? props.clearcoat : 0,
    clearcoatRoughness: props.clearcoatRoughness ? props.clearcoatRoughness : 0,
    envMapIntensity: props.envMapIntensity ? props.envMapIntensity : 1,
    emissive: props.emissive ? props.emissive : "#000000",
    // emissiveMap: material.emissiveMap ? material.emissiveMap : null,
    emissiveIntensity: props.emissiveIntensity ? props.emissiveIntensity : 0,
    ior: props.ior ? props.ior : 1,
    thickness: props.thickness ? props.thickness : 0.001,
    thicknessMap: props.thicknessMap ? props.thicknessMap : null,
    map: material.map ? material.map : null,
    metalness: props.metalness ? props.metalness : material.metalness,
    metalnessMap: material.metalnessMap ? material.metalnessMap : null,
    normalMap: material.normalMap ? material.normalMap : null,
    normalScale: material.normalScale ? material.normalScale : null,
    opacity: props.opacity ? props.opacity : 1,
    // premultipliedAlpha: false,
    // refractionRatio: props.refractionRatio ? props.refractionRatio : material.refractionRatio,
    roughness: props.roughness ? props.roughness : material.roughness,
    roughnessMap: material.roughnessMap ? material.roughnessMap : null,
    // reflectivity: props.reflectivity ? props.reflectivity : null,
    side: props.side ? props.side : material.side,
    // specularIntensity: props.specularIntensity ? props.specularIntensity : 0.5,
    transmission: props.transmission ? props.transmission : 0,
    // transmissionMap: material.transmissionMap ? material.transmissionMap : null,
    transparent: props.transparent
  });

  material.dispose();

  return mat;
}

function occluderMaterial() {
  return new ShaderMaterial({
    vertexShader: ShaderLib.basic.vertexShader,
    fragmentShader:
      "precision lowp float;\n void main(void){\n gl_FragColor=vec4(1.,0.,0.,1.);\n }",
    uniforms: ShaderLib.basic.uniforms,
    colorWrite: false
  });
}

function Glasses(props) {
  const ref = useRef();

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
    props.scene.traverse((node) => {
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

  return (
    <primitive ref={ref} object={props.scene} dispose={null}>
      <Face />
    </primitive>
  );
}

// Face
function Face() {
  const { scene } = useGLTF("/face.glb");
  useEffect(() => {
    scene.traverse((node, i) => {
      if (node.isMesh) {
        node.material.roughness = 1;
        node.material.side = 2;
      }
      node.material = occluderMaterial();
    });
  });

  return <primitive object={scene} />;
}

// const envProps = useControls({ background: false })
class AppCanvas extends Component {
  constructor(props) {
    super(props);

    this.config = null;

    this.basePath = window.location.pathname;
    this.baseOrigin = window.location.origin;

    this.basePathToModel = "/Models/";
    this.logoUrl = "./assets/images/logo.svg";

    this.state = {
      sizing: this.compute_sizing(),
      brands: [],
      models: [],
      filtredModels: [],
      modelsCount: 0,
      currentModelId: 1,
      pathToModel: "/Models/0TF2216__8333/",
      response: {},
      cartData: {
        total_cost: 0,
        total_count: 0
      }
    };

    // this.cardClickCallback = this.cardClickCallback.bind(this)
  }

  compute_sizing() {
    const height = 500;
    const wWidth = 500;
    const width = Math.min(wWidth, height);
    const top = 0;
    const left = 0;
    return { width, height, top, left };
  }

  do_resize() {
    _timerResize = null;
    const newSizing = this.compute_sizing();
    this.setState({ sizing: newSizing }, () => {
      if (_timerResize) return;
    });
  }

  handle_resize() {
    // do not resize too often:
    if (_timerResize) {
      clearTimeout(_timerResize);
    }
    _timerResize = setTimeout(this.do_resize, 200);
  }

  prevModel(e) {
    console.log(e);
  }

  nextModel(e) {
    console.log(e);
  }

  switchModel(current, next) {
    console.log(current, next);
  }

  cardClickhandler(e) {
    console.log(e);
  }

  addCards(response, currentId) {
    this.setState({
      models: response.models.filter((e) => {
        return parseInt(e.id) > 0;
      })
    });
    console.log(this.state.models);

    render(
      <div className="change-model-container">
        <div id="FilterWrapper" className="filter-wrapper">
          <div className="filter-model-container">Другие модели</div>
        </div>
        <div className="products-cards-wrapper">
          <div className="products-cards-container">
            {this.state.models.map((model, id) => (
              <button
                onClick={this.cardClickhandler}
                key={id}
                id={model.folderName}
                data-id={model.id}
                data-price={model.price}
                data-brand={model.brand}
                className="change-model"
              >
                <img
                  width="100"
                  height="64"
                  loading="lazy"
                  alt={model.folderName}
                  src={
                    this.basePathToModel + model.folderName + "/" + model.image
                  }
                />
                <div className="model-title">{model.title}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="interface-wrapper">
          <button onClick={this.nextModel} id="next" className="next-model">
            nextModel
          </button>
          <button onClick={this.prevModel} id="next" className="next-model">
            prevModel
          </button>
        </div>
      </div>,
      document.getElementById("ChangeModelWrapper")
    );
  }

  componentDidMount() {
    fetch("/models.json")
      .then((response) => response.json())
      .then((json) => {
        this.addCards(json, 1);
      });
  }

  render() {
    return (
      <>
        <div className="canvas-wrapper">
          <Canvas
            style={{
              zIndex: 2,
              ...this.state.sizing
            }}
            className=""
            dpr={[1, 2]}
            camera={{ position: [0.85, 0.5, 1.9] }}
            gl={{ alpha: false }}
          >
            <Suspense fallback={null}>
              {/* <color attach="background" args={['#151518']} /> */}
              <Environment background={true} preset={"lobby"} />

              <FaceFollower {...this.state} />
              {/* <ModelsCards /> */}
            </Suspense>
            <OrbitControls />
          </Canvas>
          <Loader />
        </div>
      </>
    );
  }
}

export default AppCanvas;
