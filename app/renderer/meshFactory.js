var THREE = require('three');
var gunshipModel = require('./models/gunship.json');
var jsonLoader = new THREE.JSONLoader();
var wireframeMaterial = new THREE.MeshLambertMaterial({
    color: 0x333333,
    wireframe: true,
    shading: THREE.SmoothShading
});

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function createPlayer() {
    var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    var material = new THREE.MeshLambertMaterial({color: getRandomColor()});
    var mesh = new THREE.Mesh(geometry, material);
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    return mesh;
}

function createCube() {
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshLambertMaterial({color: getRandomColor()});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

function createGunship() {
    var group = new THREE.Object3D();
    var geometry = jsonLoader.parse(gunshipModel).geometry;
    var material = new THREE.MeshBasicMaterial({color: 0xAAAAAA});
    var mesh = new THREE.Mesh(geometry, material);
    var wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    group.add(mesh);
    group.add(wireframe);
    return group;
}

function createSphere() {
    var geometry = new THREE.SphereGeometry(5, 32, 16);
    var material = new THREE.MeshLambertMaterial({color: getRandomColor(), shading: THREE.SmoothShading});
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
    var groundGroup = new THREE.Object3D();
    var heightMap = props.heightMap;
    var width = Math.sqrt(heightMap.length) - 1;
    var distance = 20;
    var geometry = new THREE.PlaneBufferGeometry(width * distance, width * distance, width, width);
    // var geometry = new THREE.PlaneGeometry(width * distance, width * distance, width, width);
    var material = new THREE.MeshLambertMaterial({color: 0xCCCCCC, shading: THREE.SmoothShading});
    var vertices = geometry.attributes.position.array;
    // var vertices = geometry.vertices;
    for ( var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3 ) {
        vertices[j + 2] = heightMap[i];
        // vertices[i].z = heightMap[i];
    }
    // geometry.mergeVertices();
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    var ground = new THREE.Mesh(geometry, material);
    var groundWireframe = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({color: 0x333333, wireframe: true, shading: THREE.SmoothShading})
    );
    groundGroup.add(ground);
    groundGroup.add(groundWireframe);
    ground.receiveShadow = true;
    // ground.castShadow = true;
    return groundGroup;
}

module.exports = {
    player: createPlayer,
    cube: createCube,
    gunship: createGunship,
    sphere: createSphere,
    tower: createTower,
    ground: createGround
};
