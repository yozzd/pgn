const easyimage = require('easyimage');
const fse = require('fs-extra');
const moment = require('moment');
const path = require('path');
const rootdir = path.normalize(__dirname + '/../../..');
const Team = require('./team.model');

exports.index = async (req, res) => {
  try {
    const employees = await Team.find();
    res.status(200).json(employees);
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.one = async (req, res) => {
  try {
    const employee = await Team.findById(req.params.id);
    res.status(200).json(employee);
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    const saved = await newTeam.save();
    res.status(200).json({
      message: 'New employee succesfully created'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.image = async (req, res) => {
  try {
    const replacename = (req.file.originalname).replace(/\.[^/.]+$/, '');
    await fse.ensureDir(`${rootdir}/static/uploads/${req.body.id}`);
    const info = await easyimage.info(req.file.path);
    if(info.width > 400) {
      await easyimage.resize({
        src: req.file.path,
        dst: `${rootdir}/static/uploads/${req.body.id}/${replacename}.png`,
        width: 400
      });
    } else {
      await easyimage.resize({
        src: req.file.path,
        dst: `${rootdir}/static/uploads/${req.body.id}/${replacename}.png`,
        width: info.width
      });
    }

    const deleted = await Team.findById(req.body.id);
    if(deleted.image) {
      await fse.remove(`${rootdir}/static/uploads/${req.body.id}/${deleted.image}`);
    }

    await Team.findByIdAndUpdate(req.body.id, {image: `${replacename}.png`});
    res.status(200).json({
      message: 'Image succesfully updated'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    await Team.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      position: req.body.position,
      dob: req.body.dob,
      education: req.body.education
    });
    res.status(200).json({
      message: 'Employee succesfully updated'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await Promise.all(req.body.selected.map(async (selected) => {
      await Team.findByIdAndRemove(selected._id);
      if(selected.image) {
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

exports.statusUpdate = async (req, res) => {
  try {
    const getOne = await Team.findOne({ _id: req.params.id });

    const arr = await Promise.all(getOne.status.map((val) => {
      return moment(new Date(val.date)).format('DD-MM-YYYY');
    }));

    const index = arr.indexOf(moment(Date.now()).format('DD-MM-YYYY'));

    if(index >= 0) {
      getOne.status[index].value = req.body.statusValue;
      await getOne.save();
    } else {
      const newStatus = await Team.findById(req.params.id);
      newStatus.status.push({
        value: req.body.statusValue
      });
      await newStatus.save();
    }
    res.status(200).json({
      message: 'Status update succesfully'
    });
  } catch(err) {
    res.status(500).json(err);
  }
};
