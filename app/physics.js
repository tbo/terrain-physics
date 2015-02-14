var CANNON = require('cannon');

var world = new CANNON.World();
world.broadphase = new CANNON.NaiveBroadphase();
world.defaultContactMaterial.contactEquationStiffness = 5e7;
world.defaultContactMaterial.contactEquationRegularizationTime = 4;
world.gravity.set(0,0,-3);
var groundShape = new CANNON.Plane();
var groundBody = new CANNON.RigidBody(0,groundShape);
groundBody.position.set(0,0,-0.5);
world.add(groundBody);
var box = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
var sphereBody = new CANNON.RigidBody(150,box);
world.add(sphereBody);

var obstacleBox = new CANNON.Box(new CANNON.Vec3(2.5,4,3.5));
var obstacleBody = new CANNON.RigidBody(0,obstacleBox);
world.add(obstacleBody);
obstacleBody.position.set(5,0,0);

module.exports = function(gameState) {
    sphereBody.position.x = gameState.player.position.x;
    sphereBody.position.y = 0;
    sphereBody.position.z = gameState.player.position.z;
    if(gameState.player.movement.up) {
        sphereBody.velocity.set(
            sphereBody.velocity.x,
            0,
            4
        );
    }
    if(gameState.player.movement.right) {
        sphereBody.velocity.set(
            4,
            0,
            sphereBody.velocity.z
        );
    }
    if(gameState.player.movement.left) {
        sphereBody.velocity.set(
            -4,
            0,
            sphereBody.velocity.z
        );
    }
    world.step(gameState.timing.delta/1000);
    gameState.player.position.x = sphereBody.position.x;
    gameState.player.position.y = sphereBody.position.y;
    gameState.player.position.z = sphereBody.position.z;
    // sphereBody.quaternion.copy(cube.quaternion);
};
