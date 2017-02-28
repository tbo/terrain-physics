const stats = require('stats-js')();
// stats.setMode(1);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

module.exports = () => {
    stats.end();
    stats.begin();
};

window.addEventListener('load', () => document.body.appendChild( stats.domElement ));
