import { ShaderMaterial, ShaderLib } from "three";

function occluderMaterial() {
  return new ShaderMaterial({
    vertexShader: ShaderLib.basic.vertexShader,
    fragmentShader:
      "precision lowp float;\n void main(void){\n gl_FragColor=vec4(1.,0.,0.,1.);\n }",
    uniforms: ShaderLib.basic.uniforms,
    colorWrite: false
  });
}

export default occluderMaterial;
