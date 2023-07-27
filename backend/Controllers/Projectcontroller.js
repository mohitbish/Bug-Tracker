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


module.exports.addusertoproject = async (req, res, next) => {
  try {
    const userlist = req.body.userlist
    const user = req.body.user
    await userlist.push(user)
    const update = await Project.updateOne({name: req.body.name}, {
      $set: {
        users: userlist,
      },
    });
    const project = await Project.find({name: req.body.name})
    return res.json({ status: true, projectinfo: project});
  } catch (ex) {
    next(ex);
  }
};

module.exports.removeformproject = async (req, res, next) => {
  try {
    const userlist = req.body.userlist
    await userlist.splice(req.body.userindex,1)
    const update = await Project.updateOne({name: req.body.name}, {
      $set: {
        users: userlist,
      },
    });
    const project = await Project.find({name: req.body.name})
    return res.json({ status: true, projectinfo: project});
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteproject = async (req, res, next) => {
  try {
    const deleteproj = await Project.deleteOne({ _id:req.body.id});
    return res.json({ status: true });
  } catch (ex) {
    next(ex);
  }
};