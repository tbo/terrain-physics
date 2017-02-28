const CANNON = require('cannon');
const player = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
const box = new CANNON.Box(new CANNON.Vec3(5, 5, 5));
const tower = new CANNON.Box(new CANNON.Vec3(5, 5, 20));
const sphere = new CANNON.Sphere(5);

function createPlayer(props) {
  const cube = new CANNON.Body({
    mass: 0, // kg
    angularDamping: 0.9,
    linearDamping: 0.28,
    position: new CANNON.Vec3(props.x, props.y, props.z)
  });
  cube.addShape(player);
  return cube;
}

function createCube(props) {
  const cube = new CANNON.Body({
    mass: 50, // kg
    position: new CANNON.Vec3(props.x, props.y, props.z)
  });
  cube.addShape(box);
  cube.allowSleep = true;
  return cube;
}

function createGunship(props) {
  const cube = new CANNON.Body({
    mass: 0, // kg
    position: new CANNON.Vec3(props.x, props.y, props.z)
  });
  cube.addShape(sphere);
  cube.allowSleep = true;
  return cube;
}

function createSphere(props) {
  const cube = new CANNON.Body({
    mass: 50, // kg
    position: new CANNON.Vec3(props.x, props.y, props.z)
  });
  cube.addShape(sphere);
  cube.allowSleep = true;
  return cube;
}

function createTower(props) {
  const cube = new CANNON.Body({
    mass: 0, // kg
    position: new CANNON.Vec3(props.x, props.y, props.z)
  });
  cube.addShape(tower);
  cube.allowSleep = true;
  return cube;
}

function createGround(props) {
  const heightMap = props.heightMap;
  const width = Math.sqrt(heightMap.length);
  const matrix = [];
  for(let i = 0, length = heightMap.length; i < length; i += width) {
    matrix.push(heightMap.subarray(i, i + width));
  }
  const groundBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3((width - 1) * -10, (width - 1) * 10, 0)
  });
  const groundShape = new CANNON.Heightfield(
    matrix,
    {elementSize: 20}
  );
  groundBody.addShape(groundShape);
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), -Math.PI / 2);
  return groundBody;
}

module.exports = {
  player: createPlayer,
  cube: createCube,
  gunship: createGunship,
  sphere: createSphere,
  tower: createTower,
  ground: createGround
};
