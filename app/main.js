const renderer = require('./renderer');
const controls = require('./controls');
const timing = require('./timing');
const physics = require('./physics');
const gameState = require('./gameState');
const stateManager = require('./stateManager');
const stats = require('./stats');
const loadMap = require('./loadMap');

/*eslint-disable*/
const echo = g => console.log(g.player.body.position)
/*eslint-enable*/


const gameLoop = () => {
    gameState
        .pipe(timing)
        .pipe(controls)
        .pipe(physics)
        // .pipe(echo)
        .pipe(renderer)
        .pipe(stateManager)
        .pipe(stats);
    return requestAnimationFrame(gameLoop);
}

window.addEventListener('load', loadMap(heightMap => {
    gameState.add('ground', {static: true, heightMap});
    window.gameState = gameState;
    gameLoop();
}));
