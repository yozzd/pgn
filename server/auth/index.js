const { Router } = require('express');
const User = require('../api/user/user.model');
const passport = require('./auth.passport');
const controller = require('./auth.controller');

passport.setup(User);

const router = new Router();

router.post('/local', controller.token);

module.exports = router;
