const fse = require('fs-extra');
const path = require('path');
const rootdir = path.normalize(__dirname + '/../../..');
const Product = require('./product.model');

exports.index = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.indexFilter = async (req, res) => {
  try {
    const product = await Product.find({ file: { $exists: true, $ne: [] } });
    res.status(200).json(product);
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.one = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(200).json({
      message: 'New product succesfully created'
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.upload = async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      file: req.file.originalname
    });
    const save = await newProduct.save();

    await fse.ensureDir(`${rootdir}/static/uploads/${save._id}`);
    await fse.move(req.file.path, `${rootdir}/static/uploads/${save._id}/${req.file.originalname}`, { overwrite: true });

    res.status(200).json({
      message: 'New product succesfully created'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.uploadUpdate = async (req, res) => {
  try {
    const get = await Product.findById(req.params.id);
    if(get.file) {
      await fse.remove(`${rootdir}/static/uploads/${req.params.id}/${get.file}`);
    }
    await Product.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      file: req.file.originalname
    });
    await fse.move(req.file.path, `${rootdir}/static/uploads/${req.params.id}/${req.file.originalname}`, { overwrite: true });
    res.status(200).json({
      message: 'Product succesfully updated'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description
    });
    res.status(200).json({
      message: 'Product succesfully updated'
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await Promise.all(req.body.selected.map(async (selected) => {
      await Product.findByIdAndRemove(selected._id);
      if(selected.file) {
        await fse.remove(`${rootdir}/static/uploads/${selected._id}`);
      }
    }));
    res.status(200).json({
      message: 'Deleted succesfully'
    });
  } catch(err) {
    res.status(400).json(err);
  }
};
