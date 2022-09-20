let currentItem;
export default gameState => {
  while((currentItem = gameState.bootstrapping.pop()) !== undefined) {
    if (!currentItem.props.static) {
      gameState.objects.push(currentItem);
    }
  }
  gameState.bootstrapping.length = 0;
  gameState.tombstoned.length = 0;
};
