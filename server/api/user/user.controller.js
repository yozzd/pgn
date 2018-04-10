const User = require('./user.model');

exports.index = async (req, res) => {
  try {
    const users = await User.find({}, '-salt -password');
    if(users) {
      res.status(200).json(users);
    }
  } catch(err) {
    res.status(500).send(err);
  }
};

exports.create = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });

    await newUser.save();
    res.status(200).json({
      message: 'New user succesfully created'
    });
  } catch(err) {
    res.status(201).send(err);
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id});
    if(user) {
      res.status(200).json({user: user.profile});
    } else {
      res.status(404).end();
    }
  } catch(err) {
    throw err;
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const oldPass = String(req.body.oldPassword);
    const newPass = String(req.body.newPassword);

    const user = await User.findById(req.params.id);
    const auth = await user.authenticate(oldPass);
    if(auth) {
      user.password = newPass;
      await user.save();
      res.status(200).json({
        message: 'Your password successfully updated, please logout and login with your new password'
      });
    } else {
      return res.status(403).json({
        message: 'Your password doesn\'t match!'
      });
    }
  } catch(err) {
    res.status(500).send(err);
  }
};
