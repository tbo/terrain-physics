const fullscreen = require('fullscreen');
const lock = require('pointer-lock');

const KEYCODE_SPACE = 32;
const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_DOWN = 40;
const KEYCODE_S = 83;
const KEYCODE_W = 87;
const KEYCODE_UP = 38;
const KEYCODE_A = 65;
const KEYCODE_D = 68;
let left = false;
let right = false;
let up = false;
/*eslint-disable*/
let down = false;
/*eslint-enable*/
let forward = false;
let backward = false;
let pointer;
let pointerDx;
let pointerDy;

window.addEventListener('load', function() {
  const fs = fullscreen(document.body);
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

const onKey = v => event => {
  switch (event.keyCode) {
    case KEYCODE_LEFT:
    case KEYCODE_A: left = v; break;

    case KEYCODE_RIGHT:
    case KEYCODE_D: right = v; break;

    case KEYCODE_SPACE: up = v; break;

    case KEYCODE_UP:
    case KEYCODE_W: forward = v; break;

    case KEYCODE_DOWN:
    case KEYCODE_S: backward = v; break;
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
