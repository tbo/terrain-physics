module.exports = function(gameState) {
    var now = (new Date()).getTime();

    if(!gameState.timing) {
        gameState.timing = {
            previous: now
        };
    }

    gameState.timing.delta = now - gameState.timing.previous;
    gameState.timing.previous = now;
};

