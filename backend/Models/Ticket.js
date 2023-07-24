const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  type: {
    type: String,
    required: true,
    max: 50,
  },
  priority: {
    type: String,
    required: true,
    max: 50,
  },
  user: {
    type: Object,
  },
  projectname: {
    type: String,
    required: true,
    max: 50,
  },
  file:{
    type: Buffer,
  }

});

module.exports = mongoose.model("Tickets", ticketSchema);
