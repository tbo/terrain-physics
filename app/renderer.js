'use strict';
var THREE = require('three');
var lights = require('./lights');
var scene = new THREE.Scene();

function addLights() {
    for(var index in lights) {
        scene.add(lights[index]);
    }
}

function createPlayer() {
    var geometry = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    var playerMesh = new THREE.Mesh(geometry, material);
    playerMesh.castShadow = true;
    return playerMesh;
}

function createObstacle() {
    var obstacleGeometry = new THREE.BoxGeometry(6,4,4);
    var obstacleMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    var obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.castShadow = true;
    obstacle.position.set(5,0,2);
    return obstacle;
}

addLights();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

var player = createPlayer();
scene.add(player);
scene.add(createObstacle());

var groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
var groundMat = new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0xffffff, specular: 0x050505 } );
groundMat.color.setHSL( 0.095, 1, 0.75 );

var ground = new THREE.Mesh( groundGeo, groundMat );
scene.add( ground );

ground.receiveShadow = true;
camera.position.z = 6;
camera.position.y = -10;
renderer.gammaInput = true;
renderer.gammaOutput = true;

// renderer.shadowMapEnabled = true;
renderer.shadowMapCullFace = THREE.CullFaceBack;

function render (gameState) {
    player.position.x = gameState.player.position.x;
    player.position.y = gameState.player.position.y;
    player.position.z = gameState.player.position.z;
    camera.position.x = player.position.x;
    camera.lookAt(player.position);
    camera.rotation.z = 0;
    renderer.render(scene, camera);
}

function initialize () {
    document.body.appendChild(renderer.domElement);
}

module.exports = {
    initialize: initialize,
    render: render
};
