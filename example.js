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
