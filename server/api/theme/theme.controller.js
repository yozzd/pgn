const Theme = require('./theme.model');

exports.index = async (req, res) => {
  try {
    const theme = await Theme.find();
    res.status(200).json(theme);
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const newTheme = new Theme({
      day: req.body.day,
      theme: req.body.theme
    });

    await newTheme.save();
    res.status(200).json({
      message: 'New theme succesfully created'
    });
  } catch(err) {
    res.status(201).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    await Theme.findByIdAndUpdate(req.params.id, {
      theme: req.body.theme
    });
    res.status(200).json({
      message: 'Theme succesfully updated'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.show = async (req, res) => {
  try {
    const theme = await Theme.findOne({day: req.params.day});
    res.status(200).json(theme);
  } catch(err) {
    res.status(500).json(err);
  }
};
