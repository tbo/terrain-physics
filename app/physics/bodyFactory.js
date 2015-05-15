var CANNON = require('cannon');
var box = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
var tower = new CANNON.Box(new CANNON.Vec3(5, 5, 20));

function createCube(props) {
    var cube = new CANNON.Body({
        mass: 2000, // kg
        angularDamping: 0.9,
        linearDamping: 0.28,
        position: new CANNON.Vec3(props.x, props.y, props.z)
    });
    cube.addShape(box);
    return cube;
}

function createTower(props) {
    var cube = new CANNON.Body({
        mass: 10000, // kg
        position: new CANNON.Vec3(props.x, props.y, props.z)
    });
    cube.addShape(tower);
    return cube;
}

function createGround() {
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({
        mass: 0  // mass=0 will produce a static body automatically
    });
    groundBody.addShape(groundShape);
    return groundBody;
}

module.exports = {
    cube: createCube,
    tower: createTower,
    ground: createGround
};
