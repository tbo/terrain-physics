var renderer = require('./renderer');
var controls = require('./controls');
var timing = require('./timing');
var physics = require('./physics');
var gameState = require('./gameState');
var stateManager = require('./stateManager');

var stats = require('stats-js')();
// stats.setMode(1);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

/*eslint-disable*/
function echo(g) { console.log(g.player.body.position); }
/*eslint-enable*/


function gameLoop() {
    stats.begin();
    gameState
        .pipe(timing)
        .pipe(controls)
        .pipe(physics)
        // .pipe(echo)
        .pipe(renderer.render)
        .pipe(stateManager);
    stats.end();
    requestAnimationFrame(gameLoop);
}

window.onload = function() {
    renderer.initialize();
    document.body.appendChild( stats.domElement );
    window.gameState = gameState;
    gameLoop();
};
