var fullscreen = require('fullscreen');
var lock = require('pointer-lock');

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
/*eslint-disable*/
var down = false;
/*eslint-enable*/
var forward = false;
var backward = false;
var pointer;
var pointerDx;
var pointerDy;

window.addEventListener('load', function() {
    var fs = fullscreen(document.body);
    pointer = lock(document.body);
    document.addEventListener('click', function() {
        fs.request();
    });
    fs.on('error', function() {
        console.warn('no fullscreen available');
    });
    fs.once('attain', function() {
        pointer.request();
    });
    pointer.on('attain', function(movements) {
        movements.on('data', function(move) {
            pointerDx = move.dx;
            pointerDy = move.dy;
        });
    });
});

function onKey(v) {
    return function (event) {
        // event.preventDefault();
        switch ( event.keyCode ) {
            case KEYCODE_LEFT:
            case KEYCODE_A: left = v; break;

            case KEYCODE_RIGHT:
            case KEYCODE_D: right = v; break;

            case KEYCODE_SPACE: up = v; break;

            case KEYCODE_UP:
            case KEYCODE_W: forward = v; break;

            case KEYCODE_DOWN:
            case KEYCODE_S: backward = v; break;
        }
    };
}

document.addEventListener('keydown', onKey(true), false);
document.addEventListener('keyup', onKey(false), false);

module.exports = function(gameState) {
    gameState.player.movement.up = up;
    gameState.player.movement.forward = forward;
    gameState.player.movement.backward = backward;
    gameState.player.movement.left = left;
    gameState.player.movement.right = right;
    gameState.player.movement.pointerDx = pointerDx;
    gameState.player.movement.pointerDy = pointerDy;
    pointerDx = 0;
    pointerDy = 0;
};
