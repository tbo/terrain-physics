'use strict';
var renderer = require('./renderer');
var controls = require('./controls');
var timing = require('./timing');
var physics = require('./physics');
var gameState = require('./gameState');

var stats = require('stats-js')();
// stats.setMode(1);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

function echo(test) { console.log(test.player.position); }

function gameLoop() {
    stats.begin();
    gameState
        .pipe(timing)
        .pipe(controls)
        .pipe(physics)
        // .transform(echo)
        .pipe(renderer.render);
    stats.end();
    requestAnimationFrame(gameLoop);  // jshint ignore:line
}

window.onload = function() {
    renderer.initialize();
    document.body.appendChild( stats.domElement );
    gameLoop();
};
