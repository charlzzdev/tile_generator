const express = require('express');
const fs = require('fs');
const im = require('imagemagick');
const multer = require('multer');

const router = express.Router();

if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else cb(null, false);
  }
});

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.json({ ok: false, msg: 'A formátum nem PNG vagy JPEG.' });
  }

  const folderName = req.file.filename.split(".")[0];

  for (let zoom = 2; zoom <= 4; zoom++) {
    fs.mkdir(`tiles/${folderName}/${zoom}`, { recursive: true }, err => {
      if (err) throw err;
    });

    const tileSize = 256;
    const numberOfColumns = 2 ** zoom;
    const resize = tileSize * numberOfColumns;

    im.convert([
      req.file.path,
      '-resize', `${resize}x${resize}`,
      '-crop', `${tileSize}x${tileSize}`,
      '-set', 'filename:tile', `%[fx:page.x/${tileSize}]_%[fx:page.y/${tileSize}]`,
      `./tiles/${folderName}/${zoom}/%[filename:tile].png`
    ], err => { if (err) throw err; });
  }

  res.json({ ok: true, msg: `${req.file.filename} sikeresen feltöltve.` });
});

module.exports = router;
