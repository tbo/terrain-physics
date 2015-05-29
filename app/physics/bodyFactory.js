var CANNON = require('cannon');
var player = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
var box = new CANNON.Box(new CANNON.Vec3(5, 5, 5));
var tower = new CANNON.Box(new CANNON.Vec3(5, 5, 20));
var sphere = new CANNON.Sphere(5);

function createPlayer(props) {
    var cube = new CANNON.Body({
        mass: 2000, // kg
        angularDamping: 0.9,
        linearDamping: 0.28,
        position: new CANNON.Vec3(props.x, props.y, props.z)
    });
    cube.addShape(player);
    return cube;
}

function createCube(props) {
    var cube = new CANNON.Body({
        mass: 50, // kg
        position: new CANNON.Vec3(props.x, props.y, props.z)
    });
    cube.addShape(box);
    cube.allowSleep = true;
    return cube;
}

function createGunship(props) {
    var cube = new CANNON.Body({
        mass: 0, // kg
        position: new CANNON.Vec3(props.x, props.y, props.z)
    });
    cube.addShape(sphere);
    cube.allowSleep = true;
    return cube;
}

function createSphere(props) {
    var cube = new CANNON.Body({
        mass: 50, // kg
        position: new CANNON.Vec3(props.x, props.y, props.z)
    });
    cube.addShape(sphere);
    cube.allowSleep = true;
    return cube;
}

function createTower(props) {
    var cube = new CANNON.Body({
        mass: 0, // kg
        position: new CANNON.Vec3(props.x, props.y, props.z)
    });
    cube.addShape(tower);
    cube.allowSleep = true;
    return cube;
}

function createGround(props) {
    var heightMap = props.heightMap;
    var width = Math.sqrt(heightMap.length);
    var matrix = [];
    for(var i = 0, length = heightMap.length; i < length; i += width) {
        matrix.push(heightMap.subarray(i, i + width));
    }
    var groundBody = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3((width - 1) * -10, (width - 1) * 10, 0)
    });
    var groundShape = new CANNON.Heightfield(
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
