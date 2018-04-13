const fse = require('fs-extra');
const easyimage = require('easyimage');
const path = require('path');
const rootdir = path.normalize(__dirname + '/../../..');
const Culture = require('./culture.model');

exports.index = async (req, res) => {
  try {
    const culture = await Culture.find();
    res.status(200).json(culture);
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.upload = async (req, res) => {
  try {
    const newCulture = new Culture({
      file: req.file.originalname
    });
    const save = await newCulture.save();

    await fse.ensureDir(`${rootdir}/static/uploads/${save._id}`);
    const info = await easyimage.info(req.file.path);
    if(info.width > 500) {
      await easyimage.resize({
        src: req.file.path,
        dst: `${rootdir}/static/uploads/${save._id}/${req.file.originalname}`,
        width: info.width / (info.height / 500)
      });
    } else {
      await fse.move(req.file.path, `${rootdir}/static/uploads/${save._id}/${req.file.originalname}`, { overwrite: true });
    }

    res.status(200).json({
      message: 'New culture succesfully created'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.uploadUpdate = async (req, res) => {
  try {
    const get = await Culture.findById(req.params.id);
    if(get.file) {
      await fse.remove(`${rootdir}/static/uploads/${req.params.id}/${get.file}`);
    }
    await Culture.findByIdAndUpdate(req.params.id, {
      file: req.file.originalname
    });
    const info = await easyimage.info(req.file.path);
    if(info.width > 500) {
      await easyimage.resize({
        src: req.file.path,
        dst: `${rootdir}/static/uploads/${req.params.id}/${req.file.originalname}`,
        width: info.width / (info.height / 500)
      });
    } else {
      await fse.move(req.file.path, `${rootdir}/static/uploads/${req.params.id}/${req.file.originalname}`, { overwrite: true });
    }
    res.status(200).json({
      message: 'Culture succesfully updated'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await Promise.all(req.body.selected.map(async (selected) => {
      await Culture.findByIdAndRemove(selected._id);
      if(selected.file) {
        await fse.remove(`${rootdir}/static/uploads/${selected._id}`);
      }
    }));
    res.status(200).json({
      message: 'Deleted succesfully'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};
