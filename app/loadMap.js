const img = new Image();
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const scale = 0.3;

export default function(callback) {
  img.onload = function () {
    const size = img.width * img.height;
    const data = new Float32Array(size);
    let i;
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    for (i = 0; i < size; i++) {
      data[i] = 0;
    }
    const imgd = context.getImageData(0, 0, img.width, img.height);
    const pix = imgd.data;
    let j = 0;
    let all;
    for (i = 0; i < pix.length; i += 4) {
      all = pix[i] + pix[i + 1] + pix[i + 2];
      data[j++] = all / (12 * scale);
    }
    callback(data);
  };
  img.src = '/heightmap.png';
};
