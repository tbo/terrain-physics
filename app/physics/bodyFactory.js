import { Box, Vec3, Sphere, Body, Heightfield } from "cannon";

function createPlayer(props) {
  const player = new Box(new Vec3(0.5, 0.5, 0.5));

  const cube = new Body({
    mass: 0, // kg
    angularDamping: 0.9,
    linearDamping: 0.28,
    position: new Vec3(props.x, props.y, props.z),
  });
  cube.addShape(player);
  return cube;
}

function createCube(props) {
  const box = new Box(new Vec3(5, 5, 5));

  const cube = new Body({
    mass: 50, // kg
    position: new Vec3(props.x, props.y, props.z),
  });
  cube.addShape(box);
  cube.allowSleep = true;
  return cube;
}

function createGunship(props) {
  const sphere = new Sphere(5);

  const cube = new Body({
    mass: 0, // kg
    position: new Vec3(props.x, props.y, props.z),
  });
  cube.addShape(sphere);
  cube.allowSleep = true;
  return cube;
}

function createSphere(props) {
  const sphere = new Sphere(5);

  const cube = new Body({
    mass: 50, // kg
    position: new Vec3(props.x, props.y, props.z),
  });
  cube.addShape(sphere);
  cube.allowSleep = true;
  return cube;
}

function createTower(props) {
  const tower = new Box(new Vec3(5, 5, 20));

  const cube = new Body({
    mass: 0, // kg
    position: new Vec3(props.x, props.y, props.z),
  });
  cube.addShape(tower);
  cube.allowSleep = true;
  return cube;
}

function createGround(props) {
  const heightMap = props.heightMap;
  const width = Math.sqrt(heightMap.length);
  const matrix = [];
  for (let i = 0, length = heightMap.length; i < length; i += width) {
    matrix.push(heightMap.subarray(i, i + width));
  }
  const groundBody = new Body({
    mass: 0,
    position: new Vec3((width - 1) * -10, (width - 1) * 10, 0),
  });
  const groundShape = new Heightfield(matrix, { elementSize: 20 });
  groundBody.addShape(groundShape);
  groundBody.quaternion.setFromAxisAngle(new Vec3(0, 0, 1), -Math.PI / 2);
  return groundBody;
}

export const player = createPlayer;
export const cube = createCube;
export const gunship = createGunship;
export const sphere = createSphere;
export const tower = createTower;
export const ground = createGround;
