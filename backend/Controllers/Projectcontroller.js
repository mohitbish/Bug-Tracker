const Project = require("../Models/Project");

module.exports.addproject = async (req, res, next) => {
  try {
    const { name, status, priority,onlydate, fulldate } = req.body;
    const nameCheck = await Project.findOne({ name });
    if (nameCheck)
      return res.json({ msg: "Project-name already used", status: false });

    const project = await Project.create({
      name,
      status,
      priority,
      onlydate,
      fulldate
    });
    const projects = await Project.find();
    return res.json({ status: true, projects });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getprojects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    return res.json({ status: true, projects });
  } catch (ex) {
    next(ex);
  }
};

module.exports.updateprojectinfo = async (req, res, next) => {
  try {
    const update = await Project.updateOne({_id: req.body.id}, {
      $set: {
        name: req.body.name,
        status: req.body.status,
        priority: req.body.priority,
      },
    });
    const project = await Project.find({_id:req.body.id});
    return res.json({ status: true, project });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getprojectinfo = async (req, res, next) => {
  try {
    const project = await Project.find({_id:req.body.id});
    return res.json({ status: true, project });
  } catch (ex) {
    next(ex);
  }
};

