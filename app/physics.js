var CANNON = require('cannon');

var baseImpulse = 0.2;

var world = new CANNON.World();
world.gravity.set(0, 0, -9.82);
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;
world.defaultContactMaterial.contactEquationStiffness = 1e8;
world.defaultContactMaterial.contactEquationRegularizationTime = 10;
// Static ground plane
// Static bodies only interacts with dynamic bodies. Velocity is always zero.
var groundShape = new CANNON.Plane();
var groundBody = new CANNON.Body({
    mass: 0  // mass=0 will produce a static body automatically
});
groundBody.addShape(groundShape);
world.add(groundBody);
var box = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));

function createCube (x, y, z) {
    var cube = new CANNON.Body({
        mass: 5, // kg
        position: new CANNON.Vec3(x, y, z) // m
    });
    cube.addShape(box);
    return cube;
}

function bootstrappingObjects(bootstrapping) {
    var bootstrapLength = bootstrapping.length;
    if (bootstrapLength) {
        var body = null,
            obj = null;
        for (var i = 0; i < bootstrapLength; i++) {
            obj = bootstrapping[i];
            switch (obj.type) {
                case 'cube':
                    body = createCube(obj.initialPosition.x, obj.initialPosition.y, obj.initialPosition.z);
                    break;
                default:
                    console.warn('Type:', obj.type, 'unknown');
                    continue;
            }
            world.add(body);
            obj.body = body;
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

function movePlayer(player, delta) {
    var velocity = player.body.velocity,
        movement = player.movement,
        relativeImpulse = baseImpulse * delta;
    if (movement.forward) {
        velocity.y = relativeImpulse;
    }
    if (movement.backward) {
        velocity.y = -relativeImpulse;
    }
    if (movement.up) {
        velocity.z = relativeImpulse;
    }
    if (movement.right) {
        velocity.x = relativeImpulse;
    }
    if (movement.left) {
        velocity.x = -relativeImpulse;
    }
}

module.exports = function(gameState) {
    bootstrappingObjects(gameState.bootstrapping);
    movePlayer(gameState.player, gameState.timing.delta);
    world.step(1.0 / 60.0, gameState.timing.delta / 1000, 10);
    removeObjects(gameState.tombstoned);
};
