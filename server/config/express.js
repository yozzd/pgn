const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const zlib = require('zlib');
const passport = require('passport');

module.exports = (app) => {
  app.use(helmet());
  app.use(compression({
    level: zlib.Z_BEST_COMPRESSION,
    threshold: "1kb"
  }));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(passport.initialize());
};
