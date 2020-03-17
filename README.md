# Tile Generator
This app is used to generate 256x256 tiles, commonly used in maps.

## Usage
- Run `npm install && npm start` to install the dependencies and start up the server locally
- Navigate to `http://localhost:4000` and upload an image
- The tiles will be available at `http://localhost:4000/tiles/{image-name}/{z}/{x}_{y}.png`

## Tech used
- **Express** on the backend
- **Imagemagick** to generate the tiles
- **Multer** for dealing with files
