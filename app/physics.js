var CANNON = require('cannon');

var baseImpulse = 4;

var world = new CANNON.World();
world.gravity.set(0,0,-9.82);
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
        position: new CANNON.Vec3(x, y, z), // m
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

function movePlayer(player) {
    var velocity = player.body.velocity,
        movement = player.movement;
    if (movement.forward) {
        velocity.y = baseImpulse;
    }
    if (movement.backward) {
        velocity.y = -baseImpulse;
    }
    if (movement.up) {
        velocity.z = baseImpulse;
    }
    if (movement.right) {
        velocity.x = baseImpulse;
    }
    if (movement.left) {
        velocity.x = -baseImpulse;
    }
}

module.exports = function(gameState) {
    bootstrappingObjects(gameState.bootstrapping);
    movePlayer(gameState.player);
    world.step(1.0/60.0, gameState.timing.delta / 1000, 3);
    removeObjects(gameState.tombstoned);
};
