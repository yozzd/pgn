const Education = require('./education.model');

exports.index = async (req, res) => {
  try {
    const education = await Education.find();
    res.status(200).json(education);
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const newEducation = new Education({
      name: req.body.name,
      description: req.body.description
    });

    await newEducation.save();
    res.status(200).json({
      message: 'New education succesfully created'
    });
  } catch(err) {
    res.status(201).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    await Education.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description
    });
    res.status(200).json({
      message: 'Education succesfully updated'
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await Promise.all(req.body.selected.map(async (selected) => {
      await Education.findByIdAndRemove(selected._id);
    }));
    res.status(200).json({
      message: 'Deleted succesfully'
    });
  } catch(err) {
    res.status(400).json(err);
  }
};
