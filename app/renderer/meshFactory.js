var THREE = require('three');

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function createCube() {
    var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    var material = new THREE.MeshLambertMaterial({color: getRandomColor()});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

function createTower() {
    var geometry = new THREE.BoxGeometry(10, 10, 40);
    var material = new THREE.MeshLambertMaterial({color: getRandomColor()});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

function createGround(props) {
    var heightMap = props.heightMap;
    var width = Math.sqrt(heightMap.length) - 1;
    var distance = 20;
    var groundGeo = new THREE.PlaneBufferGeometry(width * distance, width * distance, width, width);
    var groundMat = new THREE.MeshBasicMaterial({wireframe: true});
    groundMat.color.setHSL(0.095, 1, 0.75);
    // var vertices = groundGeo.vertices;
    var vertices = groundGeo.attributes.position.array;
    for ( var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3 ) {
        vertices[j + 2] = heightMap[i] - 31;
    }
    // for ( var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3 ) {
    //     console.log(heightMap[i]);
    //     vertices[i].z = heightMap[i] || 100;
    // }
    var ground = new THREE.Mesh(groundGeo, groundMat);
    ground.receiveShadow = true;
    return ground;
}

module.exports = {
    cube: createCube,
    tower: createTower,
    ground: createGround
};
