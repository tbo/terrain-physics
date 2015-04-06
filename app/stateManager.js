module.exports = function(gameState) {
    gameState.objects = gameState.objects.concat(gameState.bootstrapping);
    gameState.bootstrapping.length = 0;
    gameState.tombstoned.length = 0;
};
