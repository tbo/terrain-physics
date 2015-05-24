var THREE = require('three');
var vertexShader = require('../shader/vertexShader.glsl');
var fragmentShader = require('../shader/fragmentShader.glsl');

module.exports = function(geometry) {
    var attributesMixed = {center: {type: 'v3', boundTo: 'faceVertices', value: [] }};
    var values = attributesMixed.center.value;

    for(var f = 0; f < geometry.attributes.position.array.length; f += 1) {
        values[f] = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
    }

    var material = new THREE.ShaderMaterial({
        uniforms: {},
        attributes: attributesMixed,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    return material;
};
