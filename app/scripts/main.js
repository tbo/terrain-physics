'use strict';
var renderer = require('./renderer');

var gameState = {
    state: {value: 1},
    transform: function(transformer) {
        transformer(this.state);
        return this;
    },
    sink: function(sink) {
        sink(this.state);
    }
};

function echo(test) { console.log(test); test.value++;}

function gameLoop() {
    requestAnimationFrame(gameLoop);  // jshint ignore:line
    gameState
        .sink(renderer.render);
}

window.onload = function() {
    renderer.initialize();
    gameLoop();
};
