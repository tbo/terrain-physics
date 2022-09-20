import { Vector3, ShaderMaterial } from 'three';
import vertexShader from '../shader/vertexShader.glsl';
import fragmentShader from '../shader/fragmentShader.glsl';

export default function(geometry) {
    var attributesMixed = {center: {type: 'v3', boundTo: 'faceVertices', value: [] }};
    var values = attributesMixed.center.value;

    for(var f = 0; f < geometry.attributes.position.array.length; f += 1) {
        values[f] = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];
    }

    var material = new ShaderMaterial({
        uniforms: {},
        attributes: attributesMixed,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    return material;
};
