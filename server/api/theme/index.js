const { Router } = require('express');
const controller = require('./theme.controller');
const auth = require ('../../auth/auth.service');

const router = new Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:day', controller.show);
router.put('/:id', auth.hasRole('admin'), controller.update);

module.exports = router;
