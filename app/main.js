var renderer = require('./renderer');
var controls = require('./controls');
var timing = require('./timing');
var physics = require('./physics');
var gameState = require('./gameState');
var stateManager = require('./stateManager');
var stats = require('./stats');
var loadMap = require('./loadMap');

/*eslint-disable*/
function echo(g) { console.log(g.player.body.position); }
/*eslint-enable*/


function gameLoop() {
    gameState
        .pipe(timing)
        .pipe(controls)
        .pipe(physics)
        // .pipe(echo)
        .pipe(renderer)
        .pipe(stateManager)
        .pipe(stats);
    requestAnimationFrame(gameLoop);
}

window.addEventListener('load', loadMap(function(heightMap) {
    gameState.add('ground', {static: true, heightMap});
    window.gameState = gameState;
    gameLoop();
}));
