const express = require('express');
const next = require('next');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// const dev = process.env.NODE_ENV !== 'production';
const dev = process.env.NODE_ENV === 'development';

const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  server.use(cors());

  server.use(
    '/images',
    express.static(path.join(__dirname, 'src/assets/images'), {
      maxAge: dev ? '0' : '365d'
    })
  );

  server.use(
    '/vendors',
    express.static(path.join(__dirname, 'src/assets/vendors'), {
      maxAge: dev ? '0' : '365d'
    })
  );

  server.get('*', (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Read on http://localhost:${PORT}`);
  });
});
