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
gameState.add('cube', {x: 0, y: 0, z: 10});
gameState.add('tower', {x: 20, y: 50, z: 20});
gameState.add('tower', {x: -20, y: 20, z: 20});
gameState.state.player = gameState.state.bootstrapping[0];

module.exports = gameState;
