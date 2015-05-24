var img = new Image();
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var scale = 0.3;

module.exports = function(callback) {
    img.onload = function () {
        var i;
        canvas.width = img.width;
        canvas.height = img.height;
        var size = img.width * img.height;
        var data = new Float32Array(size);
        context.drawImage(img, 0, 0);
        for (i = 0; i < size; i++) {
            data[i] = 0;
        }
        var imgd = context.getImageData(0, 0, img.width, img.height);
        var pix = imgd.data;
        var j = 0;
        var all;
        for (i = 0; i < pix.length; i += 4) {
            all = pix[i] + pix[i + 1] + pix[i + 2];
            data[j++] = all / (12 * scale);
        }
        callback(data);
    };
    img.src = '/heightmap.png';
};
