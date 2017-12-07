(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var pixel = require('.');

pixel.art(`\
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
  .pos({ x: 20, y: 20 })
  .scale(6)
  .draw(canvas.getContext('2d'));

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
      ctx.fillRect(x*s+p.x, y*s+p.y, s, s);
    }
  }
  return this;
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS40LjEvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbnZhciBwaXhlbCA9IHJlcXVpcmUoJy4nKTtcblxucGl4ZWwuYXJ0KGBcXFxuICAgICAgICAgICAgICAgICAgQkJCQkJCQkJCQkJCQkJCQkJcbiAgICAgICAgICAgICAgICAgQi0tLS0tLS0tLS0tLS0tLS0tQlxuICAgICAgICAgICAgICAgIEItLSoqKioqKioqKioqKioqLS0tQlxuICAgIHJycnIgICAgcnJyckItLSoqKioqKkAqKkAqKioqKi0tQlxucnJycnJycnJycnJycnJyckItKipAKioqKioqKioqKioqKiotQlxucnJycm9vb29ycnJyb29vb0ItKioqKioqKioqKkJCKkAqKiotQiBCQlxub29vb29vb29vb29vb29vb0ItKioqKioqKioqQi4uQioqKiotQkIuLkJcbm9vb295eXl5b29CQkJCeXlCLSoqKioqKkAqKkIuLi5CKioqLUIuLi5CXG55eXl5eXl5eXl5Qi4uQkJ5Qi0qKioqKioqKipCLi4uLkJCQkIuLi4uQlxueXl5eWdnZ2d5eUJCLi5CQkItKioqQCoqKioqQi4uLi4uLi4uLi4uLkJcbmdnZ2dnZ2dnZ2dnQkIuLkJCLSoqKioqKioqQi4uLi4uLi4uLi4uLi4uQlxuZ2dnZ2JiYmJnZ2dnQkIuLkItKkAqKioqKipCLi4uXkIuLi4uLl5CLi5CXG5iYmJiYmJiYmJiYmJiQkJCQi0qKioqKipAKkIuLi5CQi4uLkIuQkIuLkJcbmJiYmJtbW1tYmJiYm1tbUJCLSoqKioqKioqQi4qKi4uLi4uLi4uLioqQlxubW1tbW1tbW1tbW1tbW1tbUItLSpAKioqKipCLioqLkIuLkIuLkIuKipCXG5tbW1tICAgIG1tbW0gICAgQi0tLSoqKioqKipCLi4uQkJCQkJCQi4uQlxuICAgICAgICAgICAgICAgQkJCLS0tLS0tLS0tLUIuLi4uLi4uLi4uQlxuICAgICAgICAgICAgICBCLi4uQkJCQkJCQkJCQkJCQkJCQkJCQkJCXG4gICAgICAgICAgICAgIEIuLkJCIEIuLkIgICAgIEIuLkIgQi4uQlxuICAgICAgICAgICAgICBCQkJCQiBCQkIgICAgICAgQkJCICBCQlxcXG5gKVxuICAucGFsZXR0ZSh7XG4gICAgJ3InOiAncmVkJyxcbiAgICAnbyc6ICdvcmFuZ2UnLFxuICAgICd5JzogJ3llbGxvdycsXG4gICAgJ2cnOiAnIzBmMCcsXG4gICAgJ2InOiAnIzU1ZicsXG4gICAgJ20nOiAnIzkwOScsXG4gICAgJ0InOiAnYmxhY2snLFxuICAgICcuJzogJyNkZGQnLFxuICAgICctJzogJyNmZmEnLFxuICAgICcqJzogJyNmOGUnLFxuICAgICdAJzogJyNiMDknLFxuICAgICdeJzogJ3doaXRlJ1xuICB9KVxuICAucG9zKHsgeDogMjAsIHk6IDIwIH0pXG4gIC5zY2FsZSg2KVxuICAuZHJhdyhjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSk7XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gUGl4ZWxBcnQ7XG5cbmZ1bmN0aW9uIFBpeGVsQXJ0KHJvd3MpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBpeGVsQXJ0KSkgcmV0dXJuIG5ldyBQaXhlbEFydChyb3dzKTtcblxuICB0aGlzLl9wYWxldHRlID0ge307XG4gIHRoaXMuX3NjYWxlID0gMjtcbiAgdGhpcy5fcm93cyA9IFtdO1xuICB0aGlzLl9wb3MgPSB7IHg6IDAsIHk6IDAgfTtcblxuICBpZiAocm93cykgdGhpcy5hcnQocm93cyk7XG59XG5cblBpeGVsQXJ0LmFydCA9IFBpeGVsQXJ0LnByb3RvdHlwZS5hcnQgPSBmdW5jdGlvbihyb3dzKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQaXhlbEFydCkpIHJldHVybiBuZXcgUGl4ZWxBcnQocm93cyk7XG4gIHRoaXMuX3Jvd3MgPSAnc3RyaW5nJyA9PT0gdHlwZW9mIHJvd3MgPyByb3dzLnNwbGl0KCdcXG4nKSA6IHJvd3M7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGl4ZWxBcnQucHJvdG90eXBlLnBhbGV0dGUgPSBmdW5jdGlvbihwYWxldHRlKSB7XG4gIHRoaXMuX3BhbGV0dGUgPSBwYWxldHRlO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpeGVsQXJ0LnByb3RvdHlwZS5zY2FsZSA9IGZ1bmN0aW9uKHNjYWxlKSB7XG4gIHRoaXMuX3NjYWxlID0gc2NhbGU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGl4ZWxBcnQucHJvdG90eXBlLnBvcyA9IGZ1bmN0aW9uKHBvcykge1xuICB0aGlzLl9wb3MgPSBwb3M7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGl4ZWxBcnQucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogdGhpcy5fcm93cy5yZWR1Y2UoZnVuY3Rpb24obWF4LCBjb2xzKSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgobWF4LCBjb2xzLmxlbmd0aCk7XG4gICAgfSwgMCkgKiB0aGlzLl9zY2FsZSxcbiAgICBoZWlnaHQ6IHRoaXMuX3Jvd3MubGVuZ3RoICogdGhpcy5fc2NhbGVcbiAgfTtcbn07XG5cblBpeGVsQXJ0LnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY3R4KSB7XG4gIHZhciBwID0gdGhpcy5fcG9zO1xuICB2YXIgcyA9IHRoaXMuX3NjYWxlO1xuICB2YXIgcm93cyA9IHRoaXMuX3Jvd3M7XG4gIGZvciAodmFyIGNvbHMsIHkgPSAwOyB5IDwgcm93cy5sZW5ndGg7IHkrKykge1xuICAgIGNvbHMgPSByb3dzW3ldO1xuICAgIGZvciAodmFyIGNvbCwgeCA9IDA7IHggPCBjb2xzLmxlbmd0aDsgeCsrKSB7XG4gICAgICBjb2wgPSBjb2xzW3hdO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuX3BhbGV0dGVbY29sXSB8fCAndHJhbnNwYXJlbnQnO1xuICAgICAgY3R4LmZpbGxSZWN0KHgqcytwLngsIHkqcytwLnksIHMsIHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG4iXX0=
