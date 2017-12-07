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
  .draw(canvas.getContext('2d'));
console.log(nyan.toString())
var nyanCode = ' 18B17{} 17B-17B{} 16B-2*14-3B{} 4r4 4r4B-2*6@*2@*5-2B{}r16B-*2@*14-B{}r4o4r4o4B-*10B2*@*3-B B2{}o16B-*9B.2B*4-B2.2B{}o4y4o2B4y2B-*6@*2B.3B*3-B.3B{}y10B.2B2yB-*9B.4B4.4B{}y4g4y2B2.2B3-*3@*5B.12B{}g11B2.2B2-*8B.14B{}g4b4g4B2.2B-*@*6B.3^B.5^B.2B{}b13B4-*6@*B.3B2.3B.B2.2B{}b4m4b4m3B2-*8B.*2.9*2B{}m16B-2*@*5B.*2.B.2B.2B.*2B{}m4 4m4 4B-3*7B.3B7.2B{} 15B3-10B.10B{} 14B.3B21{} 14B.2B2 B.2B 5B.2B B.2B{} 14B5 B3 7B3 2B2[]r(red)o(orange)y(yellow)g(#0f0)b(#55f)m(#909)B(black).(#ddd)-(#ffa)*(#f8e)@(#b09)^(white)'
// nyanCode was generated with `nyan.toString()`

// Loading decoded string to image
nyan = new PixelArt().fromString(nyanCode).pos({ x: 0, y: 0 }).scale(6);
var image = document.createElement('img')
image.src = nyan.export();
document.querySelector('#image').appendChild(image);

},{".":2}],2:[function(require,module,exports){

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

PixelArt.fromString = PixelArt.prototype.fromString = function(string) {
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
  return canvas;
}

PixelArt.export = PixelArt.prototype.export = function(filetype, ratio) {
  if (!filetype) filetype = 'image/webp';
  if (!ratio) ratio = 1;
  return this.toCanvas().toDataURL(filetype, ratio);
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImV4YW1wbGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG52YXIgUGl4ZWxBcnQgPSByZXF1aXJlKCcuJyk7XG5cbnZhciBueWFuID0gUGl4ZWxBcnQuYXJ0KGBcXFxuICAgICAgICAgICAgICAgICAgQkJCQkJCQkJCQkJCQkJCQkJcbiAgICAgICAgICAgICAgICAgQi0tLS0tLS0tLS0tLS0tLS0tQlxuICAgICAgICAgICAgICAgIEItLSoqKioqKioqKioqKioqLS0tQlxuICAgIHJycnIgICAgcnJyckItLSoqKioqKkAqKkAqKioqKi0tQlxucnJycnJycnJycnJycnJyckItKipAKioqKioqKioqKioqKiotQlxucnJycm9vb29ycnJyb29vb0ItKioqKioqKioqKkJCKkAqKiotQiBCQlxub29vb29vb29vb29vb29vb0ItKioqKioqKioqQi4uQioqKiotQkIuLkJcbm9vb295eXl5b29CQkJCeXlCLSoqKioqKkAqKkIuLi5CKioqLUIuLi5CXG55eXl5eXl5eXl5Qi4uQkJ5Qi0qKioqKioqKipCLi4uLkJCQkIuLi4uQlxueXl5eWdnZ2d5eUJCLi5CQkItKioqQCoqKioqQi4uLi4uLi4uLi4uLkJcbmdnZ2dnZ2dnZ2dnQkIuLkJCLSoqKioqKioqQi4uLi4uLi4uLi4uLi4uQlxuZ2dnZ2JiYmJnZ2dnQkIuLkItKkAqKioqKipCLi4uXkIuLi4uLl5CLi5CXG5iYmJiYmJiYmJiYmJiQkJCQi0qKioqKipAKkIuLi5CQi4uLkIuQkIuLkJcbmJiYmJtbW1tYmJiYm1tbUJCLSoqKioqKioqQi4qKi4uLi4uLi4uLioqQlxubW1tbW1tbW1tbW1tbW1tbUItLSpAKioqKipCLioqLkIuLkIuLkIuKipCXG5tbW1tICAgIG1tbW0gICAgQi0tLSoqKioqKipCLi4uQkJCQkJCQi4uQlxuICAgICAgICAgICAgICAgQkJCLS0tLS0tLS0tLUIuLi4uLi4uLi4uQlxuICAgICAgICAgICAgICBCLi4uQkJCQkJCQkJCQkJCQkJCQkJCQkJCXG4gICAgICAgICAgICAgIEIuLkJCIEIuLkIgICAgIEIuLkIgQi4uQlxuICAgICAgICAgICAgICBCQkJCQiBCQkIgICAgICAgQkJCICBCQlxcXG5gKVxuICAucGFsZXR0ZSh7XG4gICAgJ3InOiAncmVkJyxcbiAgICAnbyc6ICdvcmFuZ2UnLFxuICAgICd5JzogJ3llbGxvdycsXG4gICAgJ2cnOiAnIzBmMCcsXG4gICAgJ2InOiAnIzU1ZicsXG4gICAgJ20nOiAnIzkwOScsXG4gICAgJ0InOiAnYmxhY2snLFxuICAgICcuJzogJyNkZGQnLFxuICAgICctJzogJyNmZmEnLFxuICAgICcqJzogJyNmOGUnLFxuICAgICdAJzogJyNiMDknLFxuICAgICdeJzogJ3doaXRlJ1xuICB9KVxuICAucG9zKHsgeDogMCwgeTogMCB9KVxuICAuc2NhbGUoNilcbiAgLmRyYXcoY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xuY29uc29sZS5sb2cobnlhbi50b1N0cmluZygpKVxudmFyIG55YW5Db2RlID0gJyAxOEIxN3t9IDE3Qi0xN0J7fSAxNkItMioxNC0zQnt9IDRyNCA0cjRCLTIqNkAqMkAqNS0yQnt9cjE2Qi0qMkAqMTQtQnt9cjRvNHI0bzRCLSoxMEIyKkAqMy1CIEIye31vMTZCLSo5Qi4yQio0LUIyLjJCe31vNHk0bzJCNHkyQi0qNkAqMkIuM0IqMy1CLjNCe315MTBCLjJCMnlCLSo5Qi40QjQuNEJ7fXk0ZzR5MkIyLjJCMy0qM0AqNUIuMTJCe31nMTFCMi4yQjItKjhCLjE0Qnt9ZzRiNGc0QjIuMkItKkAqNkIuM15CLjVeQi4yQnt9YjEzQjQtKjZAKkIuM0IyLjNCLkIyLjJCe31iNG00YjRtM0IyLSo4Qi4qMi45KjJCe31tMTZCLTIqQCo1Qi4qMi5CLjJCLjJCLioyQnt9bTQgNG00IDRCLTMqN0IuM0I3LjJCe30gMTVCMy0xMEIuMTBCe30gMTRCLjNCMjF7fSAxNEIuMkIyIEIuMkIgNUIuMkIgQi4yQnt9IDE0QjUgQjMgN0IzIDJCMltdcihyZWQpbyhvcmFuZ2UpeSh5ZWxsb3cpZygjMGYwKWIoIzU1ZiltKCM5MDkpQihibGFjaykuKCNkZGQpLSgjZmZhKSooI2Y4ZSlAKCNiMDkpXih3aGl0ZSknXG4vLyBueWFuQ29kZSB3YXMgZ2VuZXJhdGVkIHdpdGggYG55YW4udG9TdHJpbmcoKWBcblxuLy8gTG9hZGluZyBkZWNvZGVkIHN0cmluZyB0byBpbWFnZVxubnlhbiA9IG5ldyBQaXhlbEFydCgpLmZyb21TdHJpbmcobnlhbkNvZGUpLnBvcyh7IHg6IDAsIHk6IDAgfSkuc2NhbGUoNik7XG52YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuaW1hZ2Uuc3JjID0gbnlhbi5leHBvcnQoKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWFnZScpLmFwcGVuZENoaWxkKGltYWdlKTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBQaXhlbEFydDtcblxuZnVuY3Rpb24gUGl4ZWxBcnQocm93cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGl4ZWxBcnQpKSByZXR1cm4gbmV3IFBpeGVsQXJ0KHJvd3MpO1xuXG4gIHRoaXMuX3BhbGV0dGUgPSB7fTtcbiAgdGhpcy5fc2NhbGUgPSAyO1xuICB0aGlzLl9yb3dzID0gW107XG4gIHRoaXMuX3BvcyA9IHsgeDogMCwgeTogMCB9O1xuXG4gIGlmIChyb3dzKSB0aGlzLmFydChyb3dzKTtcbn1cblxuUGl4ZWxBcnQuYXJ0ID0gUGl4ZWxBcnQucHJvdG90eXBlLmFydCA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBpeGVsQXJ0KSkgcmV0dXJuIG5ldyBQaXhlbEFydChyb3dzKTtcbiAgdGhpcy5fcm93cyA9ICdzdHJpbmcnID09PSB0eXBlb2Ygcm93cyA/IHJvd3Muc3BsaXQoJ1xcbicpIDogcm93cztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXhlbEFydC5wcm90b3R5cGUucGFsZXR0ZSA9IGZ1bmN0aW9uKHBhbGV0dGUpIHtcbiAgdGhpcy5fcGFsZXR0ZSA9IHBhbGV0dGU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGl4ZWxBcnQucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24oc2NhbGUpIHtcbiAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXhlbEFydC5wcm90b3R5cGUucG9zID0gZnVuY3Rpb24ocG9zKSB7XG4gIHRoaXMuX3BvcyA9IHBvcztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXhlbEFydC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiB0aGlzLl9yb3dzLnJlZHVjZShmdW5jdGlvbihtYXgsIGNvbHMpIHtcbiAgICAgIHJldHVybiBNYXRoLm1heChtYXgsIGNvbHMubGVuZ3RoKTtcbiAgICB9LCAwKSAqIHRoaXMuX3NjYWxlLFxuICAgIGhlaWdodDogdGhpcy5fcm93cy5sZW5ndGggKiB0aGlzLl9zY2FsZVxuICB9O1xufTtcblxuUGl4ZWxBcnQucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjdHgpIHtcbiAgdmFyIHAgPSB0aGlzLl9wb3M7XG4gIHZhciBzID0gdGhpcy5fc2NhbGU7XG4gIHZhciByb3dzID0gdGhpcy5fcm93cztcbiAgZm9yICh2YXIgY29scywgeSA9IDA7IHkgPCByb3dzLmxlbmd0aDsgeSsrKSB7XG4gICAgY29scyA9IHJvd3NbeV07XG4gICAgZm9yICh2YXIgY29sLCB4ID0gMDsgeCA8IGNvbHMubGVuZ3RoOyB4KyspIHtcbiAgICAgIGNvbCA9IGNvbHNbeF07XG4gICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5fcGFsZXR0ZVtjb2xdIHx8ICd0cmFuc3BhcmVudCc7XG4gICAgICBjdHguZmlsbFJlY3QoeCAqIHMgKyBwLnggKiBzLCB5ICogcyArIHAueSAqIHMsIHMsIHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblBpeGVsQXJ0LnRvU3RyaW5nID0gUGl4ZWxBcnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcm93cyA9IHRoaXMuX3Jvd3MubWFwKGZ1bmN0aW9uIChyb3cpIHtcbiAgICB2YXIgY2hhcmFjdGVycyA9IFsnICddXG4gICAgcm93LnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChjaGFyYWN0ZXIpIHtcbiAgICAgIGlmIChjaGFyYWN0ZXJzLmluZGV4T2YoY2hhcmFjdGVyKSA9PT0gLTEpIGNoYXJhY3RlcnMucHVzaChjaGFyYWN0ZXIpXG4gICAgICByZXR1cm4gY2hhcmFjdGVyXG4gICAgfSlcbiAgICB2YXIgcmVnZXggPSBudWxsXG4gICAgdmFyIG1hdGNoZXMgPSBudWxsXG4gICAgY2hhcmFjdGVycy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFyYWN0ZXIpIHtcbiAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnKFsnICsgY2hhcmFjdGVyLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJykgKyAnXSkrJywnZycpXG4gICAgICBtYXRjaGVzID0gcm93Lm1hdGNoKHJlZ2V4KVxuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgIGlmKG1hdGNoLmxlbmd0aCA+IDEpIHJvdyA9IHJvdy5yZXBsYWNlKG1hdGNoLCBbY2hhcmFjdGVyLCBtYXRjaC5sZW5ndGhdLmpvaW4oJycpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJvd1xuICB9KS5qb2luKCd7fScpXG4gIHZhciBwYWxldHRlID0gT2JqZWN0LmtleXModGhpcy5fcGFsZXR0ZSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4ga2V5ICsgJygnICsgdGhpcy5fcGFsZXR0ZVtrZXldICsgJyknXG4gIH0uYmluZCh0aGlzKSkuam9pbignJylcblxuICByZXR1cm4gW3Jvd3MsIHBhbGV0dGVdLmpvaW4oJ1tdJylcbn1cblxuUGl4ZWxBcnQuZnJvbVN0cmluZyA9IFBpeGVsQXJ0LnByb3RvdHlwZS5mcm9tU3RyaW5nID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHZhciByb3dzID0gW11cbiAgdmFyIHBhbGV0dGUgPSB7fVxuICB2YXIgbWF0Y2hlcyA9IG51bGxcblxuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJ1tdJylcbiAgcm93cyA9IHN0cmluZ1swXS5zcGxpdCgne30nKVxuICBwYWxldHRlID0gc3RyaW5nWzFdXG5cbiAgcm93cyA9IHJvd3MubWFwKGZ1bmN0aW9uIChyb3cpIHtcbiAgICBtYXRjaGVzID0gcm93Lm1hdGNoKC9bXFxzXFxTXShcXGQrKS9nKVxuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICBtYXRjaGVzLmZvckVhY2goZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIG1hdGNoID0gbWF0Y2gubWF0Y2goLyhbXFxzXFxTXSkoXFxkKykvKVxuICAgICAgICByb3cgPSByb3cucmVwbGFjZShtYXRjaFswXSwgbWF0Y2hbMV0ucmVwZWF0KG1hdGNoWzJdKSlcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiByb3dcbiAgfSlcblxuICBwYWxldHRlID0gKHBhbGV0dGUubWF0Y2goLy5cXCgoW15cXCldKylcXCkvZykgfHwgW10pLnJlZHVjZShmdW5jdGlvbiAocGFsZXR0ZSwga2V5VmFsdWUpIHtcbiAgICBrZXlWYWx1ZSA9IGtleVZhbHVlLnNwbGl0KCcoJylcbiAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgcGFsZXR0ZVtrZXlWYWx1ZVswXV0gPSBrZXlWYWx1ZVsxXS5zdWJzdHIoMCwga2V5VmFsdWVbMV0ubGVuZ3RoIC0gMSlcbiAgICB9XG4gICAgcmV0dXJuIHBhbGV0dGVcbiAgfSwge30pXG5cbiAgdGhpcy5fcm93cyA9IHJvd3M7XG4gIHRoaXMuX3BhbGV0dGUgPSBwYWxldHRlO1xuICByZXR1cm4gdGhpcztcbn1cblxuUGl4ZWxBcnQudG9DYW52YXMgPSBQaXhlbEFydC5wcm90b3R5cGUudG9DYW52YXMgPSBmdW5jdGlvbihmaWxldHlwZSwgcmF0aW8pIHtcbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIHRoaXMuZHJhdyhjdHgpO1xuICByZXR1cm4gY2FudmFzO1xufVxuXG5QaXhlbEFydC5leHBvcnQgPSBQaXhlbEFydC5wcm90b3R5cGUuZXhwb3J0ID0gZnVuY3Rpb24oZmlsZXR5cGUsIHJhdGlvKSB7XG4gIGlmICghZmlsZXR5cGUpIGZpbGV0eXBlID0gJ2ltYWdlL3dlYnAnO1xuICBpZiAoIXJhdGlvKSByYXRpbyA9IDE7XG4gIHJldHVybiB0aGlzLnRvQ2FudmFzKCkudG9EYXRhVVJMKGZpbGV0eXBlLCByYXRpbyk7XG59XG4iXX0=
