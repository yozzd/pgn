
const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const http = require('http');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const dbConfig = require('./config/db');
const expressConfig = require('./config/express');
const routeConfig = require('./routes');
const server = http.createServer(app);

mongoose.connect(dbConfig.uri, dbConfig.options);
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

app.set('port', port);

const config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

const start = async () => {
  expressConfig(app);
  routeConfig(app);

  const nuxt = new Nuxt(config);

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(nuxt.render);

  server.listen(port, host, () => {
    console.log('Express server listening on http://%s:%d in %s mode', host, port, process.env.NODE_ENV);
  });
};
start();
