const Position = require('./position.model');

exports.index = async (req, res) => {
  try {
    const position = await Position.find();
    res.status(200).json(position);
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const newPosition = new Position({
      name: req.body.name
    });

    await newPosition.save();
    res.status(200).json({
      message: 'New position succesfully created'
    });
  } catch(err) {
    res.status(201).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    await Position.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    });
    res.status(200).json({
      message: 'Position succesfully updated'
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await Promise.all(req.body.selected.map(async (selected) => {
      await Position.findByIdAndRemove(selected._id);
    }));
    res.status(200).json({
      message: 'Deleted succesfully'
    });
  } catch(err) {
    res.status(400).json(err);
  }
};
