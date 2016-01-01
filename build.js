(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var pixel = require('.');

pixel.art([
    '                  BBBBBBBBBBBBBBBBB',
    '                 B-----------------B',
    '                B--**************---B',
    '    rrrr    rrrrB--******@**@*****--B',
    'rrrrrrrrrrrrrrrrB-**@**************-B',
    'rrrroooorrrrooooB-**********BB*@***-B BB',
    'ooooooooooooooooB-*********B..B****-BB..B',
    'ooooyyyyooBBBByyB-******@**B...B***-B...B',
    'yyyyyyyyyyB..BByB-*********B....BBBB....B',
    'yyyyggggyyBB..BBB-***@*****B............B',
    'gggggggggggBB..BB-********B..............B',
    'ggggbbbbggggBB..B-*@******B...^B.....^B..B',
    'bbbbbbbbbbbbbBBBB-******@*B...BB...B.BB..B',
    'bbbbmmmmbbbbmmmBB-********B.**.........**B',
    'mmmmmmmmmmmmmmmmB--*@*****B.**.B..B..B.**B',
    'mmmm    mmmm    B---*******B...BBBBBBB..B',
    '               BBB----------B..........B',
    '              B...BBBBBBBBBBBBBBBBBBBBB',
    '              B..BB B..B     B..B B..B',
    '              BBBBB BBB       BBB  BB',
  ])
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
  this._rows = rows;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NC4yLjEvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbnZhciBwaXhlbCA9IHJlcXVpcmUoJy4nKTtcblxucGl4ZWwuYXJ0KFtcbiAgICAnICAgICAgICAgICAgICAgICAgQkJCQkJCQkJCQkJCQkJCQkInLFxuICAgICcgICAgICAgICAgICAgICAgIEItLS0tLS0tLS0tLS0tLS0tLUInLFxuICAgICcgICAgICAgICAgICAgICAgQi0tKioqKioqKioqKioqKiotLS1CJyxcbiAgICAnICAgIHJycnIgICAgcnJyckItLSoqKioqKkAqKkAqKioqKi0tQicsXG4gICAgJ3JycnJycnJycnJycnJycnJCLSoqQCoqKioqKioqKioqKioqLUInLFxuICAgICdycnJyb29vb3JycnJvb29vQi0qKioqKioqKioqQkIqQCoqKi1CIEJCJyxcbiAgICAnb29vb29vb29vb29vb29vb0ItKioqKioqKioqQi4uQioqKiotQkIuLkInLFxuICAgICdvb29veXl5eW9vQkJCQnl5Qi0qKioqKipAKipCLi4uQioqKi1CLi4uQicsXG4gICAgJ3l5eXl5eXl5eXlCLi5CQnlCLSoqKioqKioqKkIuLi4uQkJCQi4uLi5CJyxcbiAgICAneXl5eWdnZ2d5eUJCLi5CQkItKioqQCoqKioqQi4uLi4uLi4uLi4uLkInLFxuICAgICdnZ2dnZ2dnZ2dnZ0JCLi5CQi0qKioqKioqKkIuLi4uLi4uLi4uLi4uLkInLFxuICAgICdnZ2dnYmJiYmdnZ2dCQi4uQi0qQCoqKioqKkIuLi5eQi4uLi4uXkIuLkInLFxuICAgICdiYmJiYmJiYmJiYmJiQkJCQi0qKioqKipAKkIuLi5CQi4uLkIuQkIuLkInLFxuICAgICdiYmJibW1tbWJiYmJtbW1CQi0qKioqKioqKkIuKiouLi4uLi4uLi4qKkInLFxuICAgICdtbW1tbW1tbW1tbW1tbW1tQi0tKkAqKioqKkIuKiouQi4uQi4uQi4qKkInLFxuICAgICdtbW1tICAgIG1tbW0gICAgQi0tLSoqKioqKipCLi4uQkJCQkJCQi4uQicsXG4gICAgJyAgICAgICAgICAgICAgIEJCQi0tLS0tLS0tLS1CLi4uLi4uLi4uLkInLFxuICAgICcgICAgICAgICAgICAgIEIuLi5CQkJCQkJCQkJCQkJCQkJCQkJCQkInLFxuICAgICcgICAgICAgICAgICAgIEIuLkJCIEIuLkIgICAgIEIuLkIgQi4uQicsXG4gICAgJyAgICAgICAgICAgICAgQkJCQkIgQkJCICAgICAgIEJCQiAgQkInLFxuICBdKVxuICAucGFsZXR0ZSh7XG4gICAgJ3InOiAncmVkJyxcbiAgICAnbyc6ICdvcmFuZ2UnLFxuICAgICd5JzogJ3llbGxvdycsXG4gICAgJ2cnOiAnIzBmMCcsXG4gICAgJ2InOiAnIzU1ZicsXG4gICAgJ20nOiAnIzkwOScsXG4gICAgJ0InOiAnYmxhY2snLFxuICAgICcuJzogJyNkZGQnLFxuICAgICctJzogJyNmZmEnLFxuICAgICcqJzogJyNmOGUnLFxuICAgICdAJzogJyNiMDknLFxuICAgICdeJzogJ3doaXRlJ1xuICB9KVxuICAucG9zKHsgeDogMjAsIHk6IDIwIH0pXG4gIC5zY2FsZSg2KVxuICAuZHJhdyhjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSk7XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gUGl4ZWxBcnQ7XG5cbmZ1bmN0aW9uIFBpeGVsQXJ0KHJvd3MpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBpeGVsQXJ0KSkgcmV0dXJuIG5ldyBQaXhlbEFydChyb3dzKTtcblxuICB0aGlzLl9wYWxldHRlID0ge307XG4gIHRoaXMuX3NjYWxlID0gMjtcbiAgdGhpcy5fcm93cyA9IFtdO1xuICB0aGlzLl9wb3MgPSB7IHg6IDAsIHk6IDAgfTtcblxuICBpZiAocm93cykgdGhpcy5hcnQocm93cyk7XG59XG5cblBpeGVsQXJ0LmFydCA9IFBpeGVsQXJ0LnByb3RvdHlwZS5hcnQgPSBmdW5jdGlvbihyb3dzKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQaXhlbEFydCkpIHJldHVybiBuZXcgUGl4ZWxBcnQocm93cyk7XG4gIHRoaXMuX3Jvd3MgPSByb3dzO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpeGVsQXJ0LnByb3RvdHlwZS5wYWxldHRlID0gZnVuY3Rpb24ocGFsZXR0ZSkge1xuICB0aGlzLl9wYWxldHRlID0gcGFsZXR0ZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXhlbEFydC5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbihzY2FsZSkge1xuICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpeGVsQXJ0LnByb3RvdHlwZS5wb3MgPSBmdW5jdGlvbihwb3MpIHtcbiAgdGhpcy5fcG9zID0gcG9zO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBpeGVsQXJ0LnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHRoaXMuX3Jvd3MucmVkdWNlKGZ1bmN0aW9uKG1heCwgY29scykge1xuICAgICAgcmV0dXJuIE1hdGgubWF4KG1heCwgY29scy5sZW5ndGgpO1xuICAgIH0sIDApICogdGhpcy5fc2NhbGUsXG4gICAgaGVpZ2h0OiB0aGlzLl9yb3dzLmxlbmd0aCAqIHRoaXMuX3NjYWxlXG4gIH07XG59O1xuXG5QaXhlbEFydC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGN0eCkge1xuICB2YXIgcCA9IHRoaXMuX3BvcztcbiAgdmFyIHMgPSB0aGlzLl9zY2FsZTtcbiAgdmFyIHJvd3MgPSB0aGlzLl9yb3dzO1xuICBmb3IgKHZhciBjb2xzLCB5ID0gMDsgeSA8IHJvd3MubGVuZ3RoOyB5KyspIHtcbiAgICBjb2xzID0gcm93c1t5XTtcbiAgICBmb3IgKHZhciBjb2wsIHggPSAwOyB4IDwgY29scy5sZW5ndGg7IHgrKykge1xuICAgICAgY29sID0gY29sc1t4XTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLl9wYWxldHRlW2NvbF0gfHwgJ3RyYW5zcGFyZW50JztcbiAgICAgIGN0eC5maWxsUmVjdCh4KnMrcC54LCB5KnMrcC55LCBzLCBzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuIl19
