const CANNON = require('cannon');
const bodyFactory = require('./bodyFactory');
const world = new CANNON.World();
world.gravity.set(0, 0, -9.82);
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 1;
world.allowSleep = true;
world.defaultContactMaterial.contactEquationStiffness = 1e8;
world.defaultContactMaterial.contactEquationRegularizationTime = 10;

function bootstrappingObjects(bootstrapping) {
  const bootstrapLength = bootstrapping.length;
  if (bootstrapLength) {
    let obj = null;
    for (let i = 0; i < bootstrapLength; i++) {
      obj = bootstrapping[i];
      obj.body = bodyFactory[obj.type](obj.props);
      world.add(obj.body);
    }
  }
}

function removeObjects(tombstoned) {
  const tombstonedLength = tombstoned.length;
  if (tombstonedLength) {
    for (let i = 0; i < tombstonedLength; i++) {
      world.remove(tombstoned[i].body);
    }
  }
}

const yawForce = 1.2;
const worldPoint = new CANNON.Vec3(0, 0, 0);
const nosePoint = new CANNON.Vec3(0, 0.5, 0);
const rollPoint = new CANNON.Vec3(0, 0, -0.5);
const rollImpulse = new CANNON.Vec3(0, 0, 0);
const centerImpulse = new CANNON.Vec3(0, 0, 0);
const baseImpulse = new CANNON.Vec3(0, 0, 0);
const noseImpulse = new CANNON.Vec3(0, 0, 0);
function movePlayer(player, delta) {
  const movement = player.movement,
      velocity = player.body.velocity,
      relativeImpulse = 2 * delta,
      yawImpulse = yawForce * delta;
  baseImpulse.z = 8.5 * delta;
  noseImpulse.x = 0;
  noseImpulse.z = 0;
  rollImpulse.x = 0;
  centerImpulse.y = 0;
  centerImpulse.x = 0;
  centerImpulse.z = 0;

  if (movement.forward) {
    centerImpulse.y = 0.5 * relativeImpulse;
  }
  if (movement.backward) {
    centerImpulse.y = -0.5 * relativeImpulse;
  }
  if (movement.pointerDy) {
    noseImpulse.z = movement.pointerDy * -delta * 2;
  }
  if (movement.right) {
    centerImpulse.x = 0.5 * relativeImpulse;
  }
  if (movement.left) {
    centerImpulse.x = -0.5 * relativeImpulse;
  }
  if (movement.pointerDx) {
    centerImpulse.x -= 7 * delta;
    rollImpulse.x = -movement.pointerDx * delta;
  }

  player.body.applyLocalImpulse(centerImpulse, worldPoint);
  player.body.applyLocalImpulse(rollImpulse, rollPoint);
  player.body.applyLocalImpulse(centerImpulse, worldPoint);
  player.body.applyImpulse(baseImpulse, worldPoint);
  player.body.applyLocalImpulse(noseImpulse, nosePoint);
}

module.exports = gameState => {
  bootstrappingObjects(gameState.bootstrapping);
  movePlayer(gameState.player, gameState.timing.delta);
  world.step(1.0 / 60.0, gameState.timing.delta / 1000, 10);
  removeObjects(gameState.tombstoned);
};
