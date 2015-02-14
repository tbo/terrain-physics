var KEYCODE_SPACE = 32;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_S = 83;
var KEYCODE_W = 87;
var KEYCODE_UP = 38;
var KEYCODE_A = 65;
var KEYCODE_D = 68;

var left = false;
var right = false;
var up = false;
var down = false;

function onKey(v) {
    return function ( event ) {
        // event.preventDefault();
        switch ( event.keyCode ) {
            case KEYCODE_LEFT: 
            case KEYCODE_A: left = v; break;

            case KEYCODE_RIGHT: 
            case KEYCODE_D: right = v; break;

            case KEYCODE_SPACE: 
            case KEYCODE_UP: 
            case KEYCODE_W: up = v; break;

            case KEYCODE_DOWN: 
            case KEYCODE_S: down = v; break;
        }
    };
}

document.addEventListener( 'keydown', onKey(true), false );
document.addEventListener( 'keyup', onKey(false), false );

module.exports = function(gameState) {
    gameState.player.movement.up = up;
    gameState.player.movement.down = down;
    gameState.player.movement.left = left;
    gameState.player.movement.right = right;
};
