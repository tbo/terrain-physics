var CANNON = require('cannon');
var bodyFactory = require('./bodyFactory');
var world = new CANNON.World();
world.gravity.set(0, 0, -9.82);
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 1;
world.allowSleep = true;
world.defaultContactMaterial.contactEquationStiffness = 1e8;
world.defaultContactMaterial.contactEquationRegularizationTime = 10;

function bootstrappingObjects(bootstrapping) {
    var bootstrapLength = bootstrapping.length;
    if (bootstrapLength) {
        var obj = null;
        for (var i = 0; i < bootstrapLength; i++) {
            obj = bootstrapping[i];
            obj.body = bodyFactory[obj.type](obj.props);
            world.add(obj.body);
        }
    }
}

function removeObjects(tombstoned) {
    var tombstonedLength = tombstoned.length;
    if (tombstonedLength) {
        for (var i = 0; i < tombstonedLength; i++) {
            world.remove(tombstoned[i].body);
        }
    }
}

var yawForce = 1.2;
var worldPoint = new CANNON.Vec3(0, 0, 0);
var nosePoint = new CANNON.Vec3(0, 0.5, 0);
var rollPoint = new CANNON.Vec3(0, 0, -0.5);
var rollImpulse = new CANNON.Vec3(0, 0, 0);
var centerImpulse = new CANNON.Vec3(0, 0, 0);
var baseImpulse = new CANNON.Vec3(0, 0, 0);
var noseImpulse = new CANNON.Vec3(0, 0, 0);
function movePlayer(player, delta) {
    var movement = player.movement,
        relativeImpulse = 9 * delta,
        yawImpulse = yawForce * delta;
    baseImpulse.z = 8.5 * delta;
    noseImpulse.x = 0;
    noseImpulse.z = 0;
    rollImpulse.x = 0;
    centerImpulse.x = 0;
    centerImpulse.z = 11 * delta;

    if (movement.forward) {
        centerImpulse.z = relativeImpulse;
        baseImpulse.set(0, 0, 13 * delta);
    }
    if (movement.backward) {
        centerImpulse.z = -relativeImpulse * 0.2;
    }
    if (movement.pointerDy) {
        noseImpulse.z = movement.pointerDy * -delta * 2;
    }
    if (movement.right) {
        noseImpulse.x = yawImpulse;
    }
    if (movement.left) {
        noseImpulse.x = -yawImpulse;
    }
    if (movement.pointerDx) {
        centerImpulse.x -= 7 * delta;
        rollImpulse.x = -movement.pointerDx * delta;
    }

    player.body.applyLocalImpulse(rollImpulse, rollPoint);
    player.body.applyLocalImpulse(centerImpulse, worldPoint);
    player.body.applyImpulse(baseImpulse, worldPoint);
    player.body.applyLocalImpulse(noseImpulse, nosePoint);
}

module.exports = function(gameState) {
    bootstrappingObjects(gameState.bootstrapping);
    movePlayer(gameState.player, gameState.timing.delta);
    world.step(1.0 / 60.0, gameState.timing.delta / 1000, 10);
    removeObjects(gameState.tombstoned);
};
