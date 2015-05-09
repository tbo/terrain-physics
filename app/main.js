var renderer = require('./renderer');
var controls = require('./controls');
var timing = require('./timing');
var physics = require('./physics');
var gameState = require('./gameState');
var stateManager = require('./stateManager');
var stats = require('./stats');

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

window.addEventListener('load', function() {
    window.gameState = gameState;
    gameLoop();
});
