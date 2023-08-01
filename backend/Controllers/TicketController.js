const Ticket = require("../Models/Ticket");
const Project = require("../Models/Project");

module.exports.addticketwithfile = async (req, res, next) => {
  try {
    const projdata = await Project.find({ name: req.body.projname });
    const comments = [
      {
        comment: req.body.comment,
        user: req.body.username,
        date: req.body.fulldate,
      },
    ];
    const newticket = await Ticket.create({
      comments: comments,
      title: req.body.title,
      status: req.body.status,
      user: req.body.username,
      projectname: req.body.projname,
      fulldate: req.body.fulldate,
      onlydate: req.body.onlydate,
      file: req.file.filename,
    });
    const newlist = projdata[0].tickets;
    newlist.push(newticket);

    const addtoproject = await Project.updateOne(
      { name: req.body.projname },
      {
        $set: {
          tickets: newlist,
        },
      }
    );
    const tickets = await Ticket.find();
    return res.json({ status: true, tickets });
  } catch (ex) {
    next(ex);
  }
};

module.exports.gettickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find();
    return res.json({ status: true, tickets });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addticket = async (req, res, next) => {
  try {
    const projdata = await Project.find({ name: req.body.projname });
    const comments = [
      {
        comment: req.body.comment,
        user: req.body.username,
        date: req.body.fulldate,
      },
    ];
    const newticket = await Ticket.create({
      comments: comments,
      title: req.body.title,
      status: req.body.status,
      user: req.body.username,
      projectname: req.body.projname,
      fulldate: req.body.fulldate,
      onlydate: req.body.onlydate,
    });
    const newlist = projdata[0].tickets;
    newlist.push(newticket);

    const addtoproject = await Project.updateOne(
      { name: req.body.projname },
      {
        $set: {
          tickets: newlist,
        },
      }
    );
    const tickets = await Ticket.find();
    return res.json({ status: true, tickets });
  } catch (ex) {
    next(ex);
  }
};
