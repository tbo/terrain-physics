import { Scene, PerspectiveCamera, Vector3, WebGLRenderer, PCFSoftShadowMap } from 'three';
import * as lights from './lights';
var scene = new Scene();
import * as meshFactory from './meshFactory';

var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0;
camera.position.y = -1;
camera.lookAt(new Vector3(0, 0, 0));

var renderer = new WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.soft = true;
renderer.shadowMap.renderReverseSided = false;
renderer.shadowMap.type = PCFSoftShadowMap;

for(var index in lights) {
    scene.add(lights[index]);
}

function bootstrappingObjects(bootstrapping) {
    var bootstrapLength = bootstrapping.length;
    if(bootstrapLength) {
        var obj = null;
        for(var i = 0; i < bootstrapLength; i++) {
            obj = bootstrapping[i];
            obj.mesh = meshFactory[obj.type](obj.props);
            scene.add(obj.mesh);
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
    }
    camera.rotation.z = 0;
}

export default function (gameState) {
    bootstrappingObjects(gameState.bootstrapping);
    updatePositions(gameState.objects);
    updateCamera(gameState.player.mesh);
    renderer.render(scene, camera);
    removeObjects(gameState.tombstoned);
};

window.addEventListener('load', function () {
    document.body.appendChild(renderer.domElement);
});

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
