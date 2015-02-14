var gameState = {
    state: {
        objects: [{
            position: {
                x: 0,
                y: 0,
                z: 6
            },
            movement: {}
        }]
    },
    addObject() {
        // this.state.objects.push(
    },
    removeObject(id) {
    },
    pipe(transformer) {
        transformer(this.state);
        return this;
    }
};
gameState.state.player = gameState.state.objects[0];

module.exports = gameState;
