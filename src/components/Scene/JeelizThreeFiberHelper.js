import { Vector3, Matrix4 } from "three";

const superThat = (function () {
  // internal settings:
  const _settings = {
    rotationOffsetX: 0.0,
    pivotOffsetYZ: [0.35, 0.6],
    detectionThreshold: 0.8,
    detectionHysteresis: 0.1,
    tweakMoveYRotateX: 0.1,
    cameraMinVideoDimFov: 35
  };

  let _threeFiberCompositeObjects = null,
    _threeProjMatrix = null;
  const _previousSizing = {
    width: 1,
    height: -1
  };

  let _threeTranslation = null,
    _maxFaces = -1,
    _detectCallback = null,
    _videoElement = null,
    _scaleW = 1,
    _canvasAspectRatio = -1;

  function detect(detectState) {
    _threeFiberCompositeObjects.forEach(function (
      threeFiberCompositeObject,
      i
    ) {
      const threeCompositeObject = threeFiberCompositeObject;
      if (!threeCompositeObject) return;

      const isDetected = threeCompositeObject.visible;
      const ds = detectState[i];
      if (
        isDetected &&
        ds.detected <
          _settings.detectionThreshold - _settings.detectionHysteresis
      ) {
        // DETECTION LOST
        if (_detectCallback) _detectCallback(i, false);
        // threeCompositeObject.visible = false;
      } else if (
        !isDetected &&
        ds.detected >
          _settings.detectionThreshold + _settings.detectionHysteresis
      ) {
        // FACE DETECTED
        if (_detectCallback) _detectCallback(i, true);
        // threeCompositeObject.visible = true;
      }
    }); //end loop on all detection slots
  }

  function update_poses(ds, threeCamera) {
    const halfTanFOVX = Math.tan(
      (threeCamera.aspect * threeCamera.fov * Math.PI) / 360
    );

    _threeFiberCompositeObjects.forEach(function (
      threeFiberCompositeObject,
      i
    ) {
      const threeCompositeObject = threeFiberCompositeObject;
      if (!threeCompositeObject) return;
      if (!threeCompositeObject.visible) return;
      const detectState = ds[i];

      const cz = Math.cos(detectState.rz),
        sz = Math.sin(detectState.rz);

      // relative width of the detection window (1-> whole width of the detection window):
      const W = detectState.s * _scaleW;

      // distance between the front face of the cube and the camera:
      const DFront = 1 / (2 * W * halfTanFOVX);

      // D is the distance between the center of the unit cube and the camera:
      const D = DFront + 0.5;

      // coords in 2D of the center of the detection window in the viewport:
      const xv = detectState.x * _scaleW;
      const yv = detectState.y * _scaleW;

      // coords in 3D of the center of the cube (in the view coordinates system):
      const z = -D;
      const x = xv * D * halfTanFOVX;
      const y = (yv * D * halfTanFOVX) / _canvasAspectRatio;
      let tweakY = _settings.tweakMoveYRotateX * Math.tan(detectState.rx);

      // set position before pivot:
      threeCompositeObject.position.set(
        -sz * _settings.pivotOffsetYZ[0],
        -cz * _settings.pivotOffsetYZ[0],
        -_settings.pivotOffsetYZ[1]
      );

      // set rotation and apply it to position:
      threeCompositeObject.rotation.set(
        detectState.rx * 0.95 + _settings.rotationOffsetX,
        detectState.ry * 1.15,
        detectState.rz,
        "ZYX"
      );
      threeCompositeObject.position.applyEuler(threeCompositeObject.rotation);

      _threeTranslation.set(
        x - detectState.x / (z * -1.7),
        y + _settings.pivotOffsetYZ[0] - detectState.y / 4,
        z + _settings.pivotOffsetYZ[1]
      );

      threeCompositeObject.position.add(_threeTranslation);
    });
  }

  // public methods:
  const that = {
    init: function (spec, threeObjects, detectCallback) {
      _maxFaces = spec.maxFacesDetected;
      _videoElement = spec.videoElement;

      _threeFiberCompositeObjects = threeObjects;

      if (typeof detectCallback !== "undefined") {
        _detectCallback = detectCallback;
      }

      _threeTranslation = new Vector3();
      _threeProjMatrix = new Matrix4();
    },
    update: function (detectStates, threeCamera) {
      detect(detectStates);
      update_poses(detectStates, threeCamera);
    },
    update_camera: function (sizing, threeCamera) {
      if (_maxFaces === -1) return;

      // reset camera position:
      if (threeCamera.matrixAutoUpdate) {
        threeCamera.matrixAutoUpdate = false;
        threeCamera.position.set(0, 0, 0);
        threeCamera.updateMatrix();
      }

      // compute aspectRatio:
      const cvw = sizing.width;
      const cvh = sizing.height;
      _canvasAspectRatio = cvw / cvh;

      // compute vertical field of view:
      const vw = _videoElement.videoWidth;
      const vh = _videoElement.videoHeight;
      const videoAspectRatio = vw / vh;
      const fovFactor = vh > vw ? 1.0 / videoAspectRatio : 1.0;
      const fov = _settings.cameraMinVideoDimFov * fovFactor;

      // compute X and Y offsets in pixels:
      let scale = 1.0;
      if (_canvasAspectRatio > videoAspectRatio) {
        scale = cvw / vw;
      } else {
        scale = cvh / vh;
      }
      const cvws = vw * scale,
        cvhs = vh * scale;
      const offsetX = (cvws - cvw) / 2.0;
      const offsetY = (cvhs - cvh) / 2.0;
      _scaleW = cvw / cvws;

      if (
        _previousSizing.width === sizing.width &&
        _previousSizing.height === sizing.height &&
        threeCamera.fov === fov &&
        threeCamera.view.offsetX === offsetX &&
        threeCamera.view.offsetY === offsetY &&
        threeCamera.projectionMatrix.equals(_threeProjMatrix)
      ) {
        return;
      }
      Object.assign(_previousSizing, sizing);

      threeCamera.aspect = _canvasAspectRatio;
      threeCamera.fov = fov;
      threeCamera.view = null;

      threeCamera.setViewOffset(cvws, cvhs, offsetX, offsetY, cvw, cvh);
      threeCamera.updateProjectionMatrix();
      _threeProjMatrix.copy(threeCamera.projectionMatrix);
    }
  };
  return that;
})();

export const JeelizThreeFiberHelper = superThat;
