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
      priority: req.body.priority
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
      priority: req.body.priority
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

module.exports.addnewcomment = async (req, res, next) => {
  try {
    const projdata = await Project.find({ name: req.body.projectname });
    const newcomment = {
      comment: req.body.newcomment,
      user: req.body.user,
      date: req.body.fulldate,
    };
    let ticketlist = projdata[0].tickets;
    let commentlist = [];
    ticketlist.map((t) => {
      if (t.title == req.body.title) {
        commentlist = t.comments;
      }
    });
    commentlist.push(newcomment);
    ticketlist.map((t) => {
      if (t.title == req.body.title) {
        t.comments = commentlist;
      }
    });
    const addtoproject = await Project.updateOne(
      { name: req.body.projectname },
      {
        $set: {
          tickets: ticketlist,
        },
      }
    );
    const ticketdata = await Ticket.find({ title: req.body.title });
    let commentdata = [];
    commentdata = ticketdata[0].comments;
    commentdata.push(newcomment);
    const updateticket = await Ticket.updateOne(
      { title: req.body.title },
      {
        $set: {
          comments: commentdata,
        },
      }
    );
    return res.json({ status: true, commentdata });
  } catch (ex) {
    next(ex);
  }
};
