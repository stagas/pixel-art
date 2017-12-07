
module.exports = PixelArt;

function PixelArt(rows) {
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

PixelArt.toString = PixelArt.prototype.toString = function () {
  var rows = this._rows.map(function (row) {
    var characters = [' '];
    row.split('').forEach(function (character) {
      if (characters.indexOf(character) === -1) characters.push(character);
      return character;
    })
    var regex = null;
    var matches = null;
    characters.forEach(function (character) {
      regex = new RegExp('([' + character.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '])+','g');
      matches = row.match(regex);
      if (matches) {
        matches.forEach(function (match) {
          if(match.length > 1) row = row.replace(match, [character, match.length].join(''));
        });
      }
    });
    return row;
  }).join('{}');
  var palette = Object.keys(this._palette).map(function (key) {
    return key + '(' + this._palette[key] + ')';
  }.bind(this)).join('');

  return [rows, palette].join('[]');
}

PixelArt.fromString = PixelArt.prototype.fromString = function(string) {
  var rows = [];
  var palette = {};
  var matches = null;

  string = string.split('[]');
  rows = string[0].split('{}');
  palette = string[1];

  rows = rows.map(function (row) {
    matches = row.match(/[\s\S](\d+)/g);
    if (matches) {
      matches.forEach(function (match) {
        match = match.match(/([\s\S])(\d+)/);
        row = row.replace(match[0], match[1].repeat(match[2]));
      })
    }
    return row;
  });

  palette = (palette.match(/.\(([^\)]+)\)/g) || []).reduce(function (palette, keyValue) {
    keyValue = keyValue.split('(');
    if (keyValue.length > 1) {
      palette[keyValue[0]] = keyValue[1].substr(0, keyValue[1].length - 1);
    }
    return palette;
  }, {});

  this._rows = rows;
  this._palette = palette;
  return this;
}

PixelArt.toCanvas = PixelArt.prototype.toCanvas = function(filetype, ratio) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  this.draw(ctx);
  return canvas;
}

PixelArt.export = PixelArt.prototype.export = function(filetype, ratio) {
  if (!filetype) filetype = 'image/webp';
  if (!ratio) ratio = 1;
  return this.toCanvas().toDataURL(filetype, ratio);
}
