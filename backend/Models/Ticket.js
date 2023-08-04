const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  comments: {
    type: Array,
  },
  title: {
    type: String,
    required: true,
    max: 50,
  },
  status: {
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
  fulldate: {
    type: String,
  },
  onlydate: {
    type: String,
  },
  file: {
    type: String,
  },
});

module.exports = mongoose.model("Tickets", ticketSchema);
