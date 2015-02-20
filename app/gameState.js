function getObjectPrototype() {
    return {
        position: {},
        rotation: {},
        movement: {}
    };
}

var gameState = {
    state: {
        objects: [],
        bootstrapping: [],
        tombstoned: []
    },
    add(type, x, y, z) {
        var newObject = getObjectPrototype();
        newObject.type = type;
        newObject.initialPosition = {x, y, z};
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
gameState.add('cube', 0, 0, 6);
gameState.state.player = gameState.state.bootstrapping[0];

module.exports = gameState;
