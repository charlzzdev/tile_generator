const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.use('/', express.static('./public'));
app.use('/tiles', express.static('./tiles'));

app.use('/upload', require('./api/routes/upload'));

app.listen(port, () => console.log(`App listening on port ${port}`));
