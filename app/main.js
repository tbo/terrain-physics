import renderer from './renderer';
// import controls from './controls';
import timing from './timing';
import physics from './physics';
import gameState from './gameState';
import stateManager from './stateManager';
// import stats from './stats';
import loadMap from './loadMap';

/*eslint-disable*/
const echo = g => console.log(g.player.body.position)
/*eslint-enable*/


const gameLoop = () => {
    gameState.pipe(timing)
        // .pipe(controls)
        .pipe(physics)
        // .pipe(echo)
        .pipe(renderer)
        .pipe(stateManager)
        // .pipe(stats);
    return requestAnimationFrame(gameLoop);
}

window.addEventListener('load', loadMap(heightMap => {
    gameState.add('ground', {static: true, heightMap});
    window.gameState = gameState;
    gameLoop();
}));
