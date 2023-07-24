
const Project = require("../Models/Project");

module.exports.addproject = async (req, res, next) => {
  try {
    const { name, status, priority } = req.body;
    const nameCheck = await Project.findOne({ name });
    if (nameCheck)
      return res.json({ msg: "Project-name already used", status: false });

    const project = await Project.create({
      name,
      status,
      priority
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