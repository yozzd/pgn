const { Router } = require('express');
const controller = require('./user.controller');
const auth = require ('../../auth/auth.service');

const router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', controller.create);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

module.exports = router;
