const user = require('./api/user');
const auth = require('./auth');
const team = require('./api/team');
const position = require('./api/position');
const education = require('./api/education');
const culture = require('./api/culture');
const theme = require('./api/theme');
const product = require('./api/product');

module.exports = function(app) {
  app.use('/api/user', user);
  app.use('/auth', auth);
  app.use('/api/team', team);
  app.use('/api/position', position);
  app.use('/api/education', education);
  app.use('/api/culture', culture);
  app.use('/api/theme', theme);
  app.use('/api/product', product);
}

