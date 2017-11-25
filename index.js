var LZString = require('lz-string')

module.exports = PixelArt;

function PixelArt(rows, palette) {
  if (!(this instanceof PixelArt)) return new PixelArt(rows);

  this._palette = {};
  this._scale = 2;
  this._rows = [];
  this._pos = { x: 0, y: 0 };

  if (rows) this.art(rows);
}

PixelArt.art = PixelArt.prototype.art = function(rows) {
  if (!(this instanceof PixelArt)) return new PixelArt(rows);
  this._rows = 'string' === typeof rows ? rows.split('\n') : rows;
  return this;
};

PixelArt.prototype.palette = function(palette) {
  this._palette = palette;
  return this;
};

PixelArt.prototype.scale = function(scale) {
  this._scale = scale;
  return this;
};

PixelArt.prototype.pos = function(pos) {
  this._pos = pos;
  return this;
};

PixelArt.prototype.size = function() {
  return {
    width: this._rows.reduce(function(max, cols) {
      return Math.max(max, cols.length);
    }, 0) * this._scale,
    height: this._rows.length * this._scale
  };
};

PixelArt.prototype.draw = function(ctx) {
  var p = this._pos;
  var s = this._scale;
  var rows = this._rows;
  for (var cols, y = 0; y < rows.length; y++) {
    cols = rows[y];
    for (var col, x = 0; x < cols.length; x++) {
      col = cols[x];
      ctx.fillStyle = this._palette[col] || 'transparent';
      ctx.fillRect(x * s + p.x * s, y * s + p.y * s, s, s);
    }
  }
  return this;
};

PixelArt.save = PixelArt.prototype.save = function() {
  return LZString.compressToUint8Array(this._rows.join('\n') + '\t' + JSON.stringify(this._palette));
}

PixelArt.load = PixelArt.prototype.load = function(code) {
  if (typeof code === 'string') {
    code = code.split(',');
    var size = code.length;
    var array = new Uint8Array(size);
    for (var i = 0; i < size; i++) {
      array[i] = parseInt(code[i]);
    }
    code = array;
  }
  code = LZString.decompressFromUint8Array(code);
  if (!code) throw 'Invalid code';
  code = code.split('\t');
  var palette = null;
  try {
    palette = JSON.parse(code[1]);
  } catch (e) {
    throw 'Invalid palette code';
  }
  this._rows = code[0].split('\n');
  this._palette = palette;
  return this;
}

PixelArt.export = PixelArt.prototype.export = function(filetype, ratio) {
  if (!filetype) filetype = 'image/webp'
  if (!ratio) ratio = 1
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  this.draw(ctx);
  return canvas.toDataURL(filetype, ratio);
}
