var THREE = require('three');
var lights = require('./lights');
var scene = new THREE.Scene();

function addLights() {
    for(var index in lights) {
        scene.add(lights[index]);
    }
}

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

addLights();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0;
camera.position.y = -1;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

var groundGeo = new THREE.PlaneBufferGeometry(1000, 1000, 300, 300);
var groundMat = new THREE.MeshBasicMaterial({wireframe: true});
groundMat.color.setHSL( 0.095, 1, 0.75 );

var ground = new THREE.Mesh( groundGeo, groundMat );
scene.add( ground );

ground.receiveShadow = true;
renderer.gammaInput = true;
renderer.gammaOutput = true;

renderer.shadowMapEnabled = true;
renderer.shadowMapCullFace = THREE.CullFaceBack;

function bootstrappingObjects(bootstrapping) {
    var bootstrapLength = bootstrapping.length;
    if(bootstrapLength) {
        var mesh = null, obj = null;
        for(var i = 0; i < bootstrapLength; i++) {
            obj = bootstrapping[i];
            switch(obj.type) {
                case 'cube':
                    mesh = createCube();
                    break;
                case 'tower':
                    mesh = createTower();
                    break;
                default:
                    console.warn('Type:', obj.type, 'unknown');
                    continue;
            }
            scene.add(mesh);
            obj.mesh = mesh;
        }
    }
}

function removeObjects(tombstoned) {
    var tombstonedLength = tombstoned.length;
    if(tombstonedLength) {
        for(var i = 0; i < tombstonedLength; i++) {
            scene.remove(tombstoned[i].mesh);
        }
    }
}

function updatePositions(objects) {
    var objectsLength = objects.length;
    for(var i = 0; i < objectsLength; i++) {
        objects[i].mesh.position.x = objects[i].body.position.x;
        objects[i].mesh.position.y = objects[i].body.position.y;
        objects[i].mesh.position.z = objects[i].body.position.z;
        objects[i].mesh.quaternion.x = objects[i].body.quaternion.x;
        objects[i].mesh.quaternion.y = objects[i].body.quaternion.y;
        objects[i].mesh.quaternion.z = objects[i].body.quaternion.z;
        objects[i].mesh.quaternion.w = objects[i].body.quaternion.w;
    }
}

function updateCamera(mesh) {
    if(camera.parent !== mesh) {
        mesh.add(camera);
        camera.rotation.z = 0;
    }
}

module.exports = function (gameState) {
    bootstrappingObjects(gameState.bootstrapping);
    updatePositions(gameState.objects);
    updateCamera(gameState.player.mesh);
    renderer.render(scene, camera);
    removeObjects(gameState.tombstoned);
};

window.addEventListener('load', function () {
    document.body.appendChild(renderer.domElement);
});
