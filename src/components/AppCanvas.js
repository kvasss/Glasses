import { Suspense, Component, useRef, useEffect } from "react";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls
} from "@react-three/drei";

// Jeeliz
import { JEELIZFACEFILTER, NN_DEFAULT } from "facefilter";
import { JeelizThreeFiberHelper } from "./Scene/JeelizThreeFiberHelper.js";

import FaceMesh from "./Scene/FaceMesh";
import GlassesMesh from "./Scene/GlassesMesh";
import videoBackground from "./Scene/videoBackground";

// import useStore from "./Store/appStore";

let _timerResize = 0;
let _threeFiber = null;
const _maxFacesDetected = 1;
const _faceFollowers = new Array(_maxFacesDetected);

const DirtyHook = (props) => {
  _threeFiber = useThree();
  useFrame(
    JeelizThreeFiberHelper.update_camera.bind(
      null,
      props.sizing,
      _threeFiber.camera
    )
  );
  return null;
};

const FaceFollower = () => {
  const objRef = useRef();

  useEffect(() => {
    _faceFollowers[0] = objRef.current;
  });

  return (
    <object3D scale={[0.6, 0.6, 0.6]} ref={objRef} name="FACEOBJ3D">
      <object3D name="FACE3DPIVOTED">
        <GlassesMesh />
        <FaceMesh />
      </object3D>
    </object3D>
  );
};

class AppCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sizing: this.compute_sizing(),
      devMode: false,
      demoMode: false
    };

    this.callbackReady = this.callbackReady.bind(this);
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

  // callbackReady
  callbackReady(errCode, spec) {
    if (!_threeFiber || !_threeFiber.scene) {
      return;
    }

    // this.addMesh(this.pathToModel);

    if (errCode) {
      console.log("AN ERROR HAPPENS. ERR =", errCode);

      this.setState({ demoMode: true });

      console.log(this.state);

      return;
    }

    _threeFiber.camera.fov = 65;
    _threeFiber.camera.near = 0.01;
    _threeFiber.camera.far = 20;

    _threeFiber.scene.background = videoBackground(spec);
    JeelizThreeFiberHelper.init(spec, _faceFollowers, this.callbackDetect);
  }

  // callbackTrack
  callbackTrack(detectStatesArg) {
    const detectStates = detectStatesArg.length
      ? detectStatesArg
      : [detectStatesArg];

    JeelizThreeFiberHelper.update(detectStates, _threeFiber.camera);

    // JEELIZFACEFILTER.render_video();

    // detectStates.forEach((detectState) => {
    //   const newState = { ...this.state };

    //   let rx = detectState.rx,
    //     ry = detectState.ry,
    //     rz = detectState.rz;

    //   if (
    //     typeof this.meshes.LEFTEARTEMPLE != "undefined" &&
    //     typeof this.meshes.RIGHTEARTEMPLE != "undefined"
    //   ) {
    //     this.meshes.LEFTEARTEMPLE.visible = false;
    //     this.meshes.RIGHTEARTEMPLE.visible = false;
    //     if (ry > -0.02) {
    //       this.meshes.RIGHTEARTEMPLE.visible = true;
    //     }
    //     if (ry < 0.02) {
    //       this.meshes.LEFTEARTEMPLE.visible = true;
    //     }

    //     if ((rx > 0.2 || rx < -0.2) && ry > -0.1 && ry < 0.1) {
    //       this.meshes.LEFTEARTEMPLE.visible = false;
    //       this.meshes.RIGHTEARTEMPLE.visible = false;
    //     }
    //   }

    //   this.setState(newState);
    // });
  }

  // callbackDetect
  callbackDetect(faceIndex, isDetected) {
    if (isDetected) {
      console.log("DETECTED");
      // this.meshes.FACEOBJ3D.visible = false;
    } else {
      console.log("LOST");
      // this.meshes.FACEOBJ3D.visible = true;
    }
  }

  // initFaceFilter
  initFaceFilter() {
    console.log("initFaceFilter");
    JEELIZFACEFILTER.init({
      canvasId: "faceFilterCanvas",
      NNC: NN_DEFAULT,
      maxFacesDetected: 1,
      followZRot: true,
      idealWidth: 500,
      idealHeight: 500,
      minWidth: 500,
      maxWidth: 500,
      minHeight: 500,
      maxHeight: 500,
      rotate: 0,
      flipX: false,
      callbackReady: this.callbackReady,
      callbackTrack: this.callbackTrack
    });

    JEELIZFACEFILTER.set_stabilizationSettings({
      translationFactorRange: [0.001, 0.003],
      rotationFactorRange: [0.02, 0.02],
      qualityFactorRange: [0.9, 0.98],
      alphaRange: [0.15, 1]
    });
  }

  // componentDidMount
  componentDidMount() {
    this.initFaceFilter();
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
            shadows={true}
            dpr={[1, 2]}
            gl={{
              alpha: false,
              preserveDrawingBuffer: true
            }}
          >
            <Suspense fallback={null}>
              <Environment background={false} preset={"lobby"} />
              <directionalLight
                intensity={0.25}
                castShadow
                position={[1, 1, 2]}
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
              />
              <pointLight
                color={"#ffffff"}
                intensity={0.25}
                castShadow
                position-x={2.3}
                position-y={1.3}
                position-z={2}
              />
              <ambientLight color={"#ffffff"} intensity={0.12} />

              {/* <Shadows /> */}
              <PerspectiveCamera makeDefault position={[0.85, 0.5, 1.9]} />

              <DirtyHook sizing={this.state.sizing} />

              <FaceFollower {...this.state} />
            </Suspense>
            <OrbitControls />
          </Canvas>

          <canvas
            className="mirrorX"
            id="faceFilterCanvas"
            style={{
              position: "relative",
              zIndex: 1,
              ...this.state.sizing
            }}
            width={this.state.sizing.width}
            height={this.state.sizing.height}
          />
          {/* <Loader /> */}
        </div>
      </>
    );
  }
}

export default AppCanvas;
