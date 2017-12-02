(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var PixelArt = require('.');

var nyan = PixelArt.art(`\
                  BBBBBBBBBBBBBBBBB
                 B-----------------B
                B--**************---B
    rrrr    rrrrB--******@**@*****--B
rrrrrrrrrrrrrrrrB-**@**************-B
rrrroooorrrrooooB-**********BB*@***-B BB
ooooooooooooooooB-*********B..B****-BB..B
ooooyyyyooBBBByyB-******@**B...B***-B...B
yyyyyyyyyyB..BByB-*********B....BBBB....B
yyyyggggyyBB..BBB-***@*****B............B
gggggggggggBB..BB-********B..............B
ggggbbbbggggBB..B-*@******B...^B.....^B..B
bbbbbbbbbbbbbBBBB-******@*B...BB...B.BB..B
bbbbmmmmbbbbmmmBB-********B.**.........**B
mmmmmmmmmmmmmmmmB--*@*****B.**.B..B..B.**B
mmmm    mmmm    B---*******B...BBBBBBB..B
               BBB----------B..........B
              B...BBBBBBBBBBBBBBBBBBBBB
              B..BB B..B     B..B B..B
              BBBBB BBB       BBB  BB\
`)
  .palette({
    'r': 'red',
    'o': 'orange',
    'y': 'yellow',
    'g': '#0f0',
    'b': '#55f',
    'm': '#909',
    'B': 'black',
    '.': '#ddd',
    '-': '#ffa',
    '*': '#f8e',
    '@': '#b09',
    '^': 'white'
  })
  .pos({ x: 0, y: 0 })
  .scale(6)

nyan.draw(canvas.getContext('2d'));

var nyanCode = ' 18B17{} 17B-17B{} 16B-2*14-3B{} 4r4 4r4B-2*6@*2@*5-2B{}r16B-*2@*14-B{}r4o4r4o4B-*10B2*@*3-B B2{}o16B-*9B.2B*4-B2.2B{}o4y4o2B4y2B-*6@*2B.3B*3-B.3B{}y10B.2B2yB-*9B.4B4.4B{}y4g4y2B2.2B3-*3@*5B.12B{}g11B2.2B2-*8B.14B{}g4b4g4B2.2B-*@*6B.3^B.5^B.2B{}b13B4-*6@*B.3B2.3B.B2.2B{}b4m4b4m3B2-*8B.*2.9*2B{}m16B-2*@*5B.*2.B.2B.2B.*2B{}m4 4m4 4B-3*7B.3B7.2B{} 15B3-10B.10B{} 14B.3B21{} 14B.2B2 B.2B 5B.2B B.2B{} 14B5 B3 7B3 2B2[]r(red)o(orange)y(yellow)g(#0f0)b(#55f)m(#909)B(black).(#ddd)-(#ffa)*(#f8e)@(#b09)^(white)'
// nyanCode was generated with `nyan.toString()`

// Loading decoded string to image
nyan = new PixelArt().fromString(nyan.toString()).pos({ x: 0, y: 0 }).scale(6);
var image = document.createElement('img')
image.src = nyan.export();
document.querySelector('#image').appendChild(image);

},{".":2}],2:[function(require,module,exports){
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

PixelArt.save = PixelArt.prototype.toString = function () {
  var rows = this._rows.map(function (row) {
    var characters = [' ']
    row.split('').forEach(function (character) {
      if (characters.indexOf(character) === -1) characters.push(character)
      return character
    })
    var regex = null
    var matches = null
    characters.forEach(function (character) {
      regex = new RegExp('([' + character.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '])+','g')
      matches = row.match(regex)
      if (matches) {
        matches.forEach(function (match) {
          if(match.length > 1) row = row.replace(match, [character, match.length].join(''))
        })
      }
    })
    return row
  }).join('{}')
  var palette = Object.keys(this._palette).map(function (key) {
    return key + '(' + this._palette[key] + ')'
  }.bind(this)).join('')

  return [rows, palette].join('[]')
}

PixelArt.load = PixelArt.prototype.fromString = function(string) {
  var rows = []
  var palette = {}
  var matches = null

  string = string.split('[]')
  rows = string[0].split('{}')
  palette = string[1]

  rows = rows.map(function (row) {
    matches = row.match(/[\s\S](\d+)/g)
    if (matches) {
      matches.forEach(function (match) {
        match = match.match(/([\s\S])(\d+)/)
        row = row.replace(match[0], match[1].repeat(match[2]))
      })
    }
    return row
  })

  palette = (palette.match(/.\(([^\)]+)\)/g) || []).reduce(function (palette, keyValue) {
    keyValue = keyValue.split('(')
    if (keyValue.length > 1) {
      palette[keyValue[0]] = keyValue[1].substr(0, keyValue[1].length - 1)
    }
    return palette
  }, {})

  this._rows = rows;
  this._palette = palette;
  return this;
}

PixelArt.toCanvas = PixelArt.prototype.toCanvas = function(filetype, ratio) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  this.draw(ctx);
  return canvas
}

PixelArt.export = PixelArt.prototype.export = function(filetype, ratio) {
  if (!filetype) filetype = 'image/webp'
  if (!ratio) ratio = 1
  return this.toCanvas().toDataURL(filetype, ratio);
}

},{}]},{},[1])
