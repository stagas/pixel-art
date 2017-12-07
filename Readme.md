
# pixel-art

  generate pixel art programatically

## Install

```
npm install pixel-art
```

## Example

```js
var pixel = require('pixel-art');

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
```

Result:

![example.png](example.png)

## Export

To export to a base64 code, use:

```js
var filetype = 'image/png' // default: 'image/webp'
var ratio = 0.5 // default: 1

nyan.export(filetype, ratio)
// <- String
```

## Serialize with simple compression object

To load the compressed art string, use `toString` to save and `fromString` to load the art and palette:

```js
var PixelArt = require('pixel-art');
new PixelArt().fromString(nyan.toString()).pos({ x: 0, y: 0 })
.scale(6)
.draw(canvas.getContext('2d'));
```


## License

MIT © [stagas](https://github.com/stagas)
