const { Router } = require('express');
const controller = require('./position.controller');
const auth = require ('../../auth/auth.service');

const router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.post('/delete', auth.hasRole('admin'), controller.delete);

module.exports = router;
