const getObjectPrototype = () => ({movement: {}});

const gameState = {
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
gameState.add('gunship', {x: 0, y: 40, z: 100});
gameState.add('sphere', {x: 322, y: 250, z: 200});
gameState.add('cube', {x: -90, y: 240, z: 300});
// gameState.add('tower', {x: 0, y: 45, z: 100});
// gameState.add('tower', {x: -20, y: 20, z: 20});
gameState.state.player = gameState.state.bootstrapping[0];

export default gameState;
