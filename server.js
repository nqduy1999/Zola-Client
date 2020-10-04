const dev = process.env.NODE_ENV !== 'production';
const { createServer } = require('http');
const express = require('express');
const next = require('next');
const cors = require('cors');
const { parse } = require('url');

const routes = require('./core/routes');
const config = require('./config');

const app = next({ dev });

const handler = routes.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      return handler(req, res, parsedUrl);
    });

    server.use(cors());

    createServer(server).listen(config.PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${config.PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
