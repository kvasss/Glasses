// three
import { sRGBEncoding, VideoTexture, Object3D, Group } from "three";

const videoBackground = (spec) => {
  const videoTexture = new VideoTexture(spec.videoElement);

  videoTexture.encoding = sRGBEncoding;

  const videoSize = {
    width: spec.videoElement.videoWidth,
    height: spec.videoElement.videoHeight
  };
  const viewSize = {
    width: spec.GL.drawingBufferWidth,
    height: spec.GL.drawingBufferHeight
  };

  let uScale =
    (viewSize.height * videoSize.width) / (viewSize.width * videoSize.height);
  let vScale =
    (viewSize.width * videoSize.height) / (viewSize.height * videoSize.width);
  let uOffset = 0;
  let vOffset = 0;

  if (uScale > vScale) {
    uScale = vScale;
    vScale = 1;
    uOffset = ((uScale - 1) / 2) * -1;
    // console.log("uScale > vScale");
  } else if (uScale < vScale) {
    vScale = uScale;
    uScale = 1;
    vOffset = ((vScale - 1) / 2) * -1;
    // console.log("uScale < vScale");
  } else {
    uScale = 1;
    vScale = 1;
    uOffset = 0;
    vOffset = 0;
    // console.log("uScale = vScale");
  }

  videoTexture.repeat.set(uScale, vScale);
  videoTexture.offset.set(uOffset, vOffset);

  return videoTexture;
};

export default videoBackground;
