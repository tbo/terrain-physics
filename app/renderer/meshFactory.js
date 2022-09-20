import { JSONLoader, MeshLambertMaterial, SmoothShading, BoxGeometry, Mesh, Object3D, MeshBasicMaterial, SphereGeometry, PlaneBufferGeometry } from 'three';
import gunshipModel from './models/gunship.json';
var jsonLoader = new JSONLoader();
var wireframeMaterial = new MeshLambertMaterial({
    color: 0x333333,
    wireframe: true,
    shading: SmoothShading
});

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function createPlayer() {
  var geometry = new BoxGeometry(0.01, 0.01, 0.01);
  var material = new MeshLambertMaterial({depthWrite: false, color: getRandomColor()});
  var mesh = new Mesh(geometry, material);
  // mesh.castShadow = true;
  // mesh.receiveShadow = true;
  return mesh;
}

function createCube() {
    var geometry = new BoxGeometry(10, 10, 10);
    var material = new MeshLambertMaterial({color: getRandomColor()});
    var mesh = new Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

function createGunship() {
    var group = new Object3D();
    var geometry = jsonLoader.parse(gunshipModel).geometry;
    var material = new MeshBasicMaterial({color: 0xAAAAAA});
    var mesh = new Mesh(geometry, material);
    var wireframe = new Mesh(geometry, wireframeMaterial);
    group.add(mesh);
    group.add(wireframe);
    return group;
}

function createSphere() {
    var geometry = new SphereGeometry(5, 32, 16);
    var material = new MeshLambertMaterial({color: getRandomColor(), shading: SmoothShading});
    var mesh = new Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

function createTower() {
    var geometry = new BoxGeometry(10, 10, 40);
    var material = new MeshLambertMaterial({color: getRandomColor()});
    var mesh = new Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

function createGround(props) {
    var groundGroup = new Object3D();
    var heightMap = props.heightMap;
    var width = Math.sqrt(heightMap.length) - 1;
    var distance = 20;
    var geometry = new PlaneBufferGeometry(width * distance, width * distance, width, width);
    // var geometry = new THREE.PlaneGeometry(width * distance, width * distance, width, width);
    var material = new MeshLambertMaterial({color: 0xCCCCCC, shading: SmoothShading});
    var vertices = geometry.attributes.position.array;
    // var vertices = geometry.vertices;
    for ( var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3 ) {
        vertices[j + 2] = heightMap[i];
        // vertices[i].z = heightMap[i];
    }
    // geometry.mergeVertices();
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    var ground = new Mesh(geometry, material);
    var groundWireframe = new Mesh(
        geometry,
        new MeshLambertMaterial({color: 0x333333, wireframe: true, shading: SmoothShading})
    );
    groundGroup.add(ground);
    groundGroup.add(groundWireframe);
    ground.receiveShadow = true;
    // ground.castShadow = true;
    return groundGroup;
}

export const player = createPlayer;
export const cube = createCube;
export const gunship = createGunship;
export const sphere = createSphere;
export const tower = createTower;
export const ground = createGround;
