const { Router } = require('express');
const auth = require ('../../auth/auth.service');
const controller = require('./culture.controller');
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
router.post('/delete', auth.hasRole('admin'), controller.delete);

router.post('/upload', multer({
  storage: storage
}).single('file'), controller.upload);

router.put('/upload/:id', multer({
  storage: storage
}).single('file'), controller.uploadUpdate);

module.exports = router;
