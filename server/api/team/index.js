const { Router } = require('express');
const auth = require ('../../auth/auth.service');
const controller = require('./team.controller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp');
  },
  filename: (req, file, cb) => {
    const datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

const router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.one);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.post('/delete', auth.hasRole('admin'), controller.delete);
router.put('/status/:id', auth.hasRole('admin'), controller.statusUpdate);

router.post('/image', multer({
  storage: storage
}).single('file'), controller.image);

module.exports = router;
