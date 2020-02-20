const fs = require('fs');
const im = require('imagemagick');

for(let zoom = 2; zoom <= 4; zoom++){
  fs.mkdir(`tiles/${zoom}`, {recursive: true}, err => {
    if(err) throw err;
  });

  const tileSize = 256;
  const numberOfColumns = 2 ** zoom;
  const resize = tileSize * numberOfColumns;
  
  im.convert([
    '../b.png',
    '-resize', `${resize}x${resize}`,
    '-crop', `${tileSize}x${tileSize}`,
    '-set', 'filename:tile', `%[fx:page.x/${tileSize}]_%[fx:page.y/${tileSize}]`,
    `./tiles/${zoom}/%[filename:tile].png`
  ], err => { if(err) throw err; });
}
