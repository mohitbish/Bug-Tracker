const Ticket = require("../Models/Ticket");


module.exports.addticket = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const newticket = await Ticket.create({
      comment: req.body.comment,
      title: req.body.title,
      priority: req.body.priority,
      user: req.body.username,
      projectname: req.body.projname,
      fulldate: req.body.fulldate,
      onlydate: req.body.onlydate,
      file: req.file.filename,
    });
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


