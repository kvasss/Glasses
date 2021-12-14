import React, {
  Suspense,
  useEffect,
  useRef,
  Component,
  useMemo,
  useState
} from "react";

import { render } from "react-dom";

import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";

import { useGLTF, Environment, Loader, OrbitControls } from "@react-three/drei";

import { useControls } from "leva";

import {
  Vector2,
  ShaderMaterial,
  ShaderLib,
  MeshPhysicalMaterial,
  Object3D,
  Group
} from "three";

let _timerResize = 0;
const _faceFollowers = new Array(1);

const FaceFollower = (props) => {
  const objRef = useRef();
  useEffect(() => {
    _faceFollowers[0] = objRef.current;
  });

  return (
    <object3D ref={objRef} name="FACE3D">
      <object3D ref={objRef} name="FACE3DPIVOTED">
        {props.pathToModel ? <Glasses {...props} /> : <object3D />}
      </object3D>
      <Face />
    </object3D>
  );
};

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
  const { scene } = useGLTF(props.pathToModel + "/model.glb");

  return <primitive key={props.pathToModel} object={scene.clone()}></primitive>;
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
      pathToModel: null,
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

  prevModel = (e) => {
    // console.log(e);
    this.setState({
      pathToModel: this.basePathToModel + "/0ST3065__0002/"
    });
  };

  nextModel = (e) => {
    // console.log(e);

    this.setState({
      pathToModel: this.basePathToModel + "/0TF2209__8328/"
    });
  };

  switchModel(current, next) {
    console.log(current, next);
  }

  clearModel() {}

  cardClickhandler(e) {
    console.log(e);
  }

  getModelById = (id) => {
    let model = this.state.models.filter((e) => {
      return parseInt(e.id) === parseInt(id);
    });

    return model[0];
  };

  getModelSettings(pathToModel) {
    const url = pathToModel + "config.json";
    fetch(url)
      .then((response) =>
        response.ok ? response.json() : Promise.reject({ err: response.status })
      )
      .then((json) => {
        if (json) {
          this.setState({
            settings: json
          });

          this.state.params.y = json.pivotOffsetYZ[0];
          this.state.params.z = json.pivotOffsetYZ[1];
          this.state.params.scale = json.scale;

          if (this.devMode) {
            this.addDevGui();
          }
          // this.SETTINGS = json;
          return;
        }
      })
      .catch((error) => console.log("Request Failed:", error));
  }

  addCards(response, currentId) {
    this.setState({
      models: response.models.filter((e) => {
        return parseInt(e.id) > 0;
      })
    });

    // const url = this.basePathToModel + this.getModelById(1).folderName;
    // console.log(url);

    // this.setState({
    //   pathToModel: url
    // });

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
            </Suspense>
            <OrbitControls />
          </Canvas>
          {/* <Loader /> */}
        </div>
      </>
    );
  }
}

export default AppCanvas;
