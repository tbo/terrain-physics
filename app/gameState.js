function getObjectPrototype() {
    return {
        movement: {}
    };
}

var gameState = {
    state: {
        map: [],
        objects: [],
        bootstrapping: [],
        tombstoned: []
    },
    add(type, props) {
        var newObject = getObjectPrototype();
        newObject.type = type;
        newObject.props = props;
        return this.state.bootstrapping.push(newObject) - 1;
    },
    remove(index) {
        return this.state.tombstoned.push(this.state.objects.splice(index, 1).pop()) - 1;
    },
    assumeControl(index) {
        this.state.player = this.state.objects[index];
    },
    pipe(transformer) {
        transformer(this.state);
        return this;
    }
};
gameState.add('player', {x: 0, y: 5, z: 100});
gameState.add('cube', {x: 50, y: 0, z: 100});
var initX = -400;
var initY = -400;
for(var i = 0; i < 10; i++) {
    for(var j = 0; j < 10; j++) {
        gameState.add('cube', {x: initX + i * 100, y: initY + j * 100, z: 100});
    }
}
gameState.add('tower', {x: 0, y: 45, z: 100});
// gameState.add('tower', {x: -20, y: 20, z: 20});
gameState.state.player = gameState.state.bootstrapping[0];

module.exports = gameState;
