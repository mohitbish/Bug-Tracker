const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  title: {
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
  fulldate:{
    type: String,
  },
  onlydate:{
    type: String,
  },
  file: {
    type: String,
    required:true,
  },

});

module.exports = mongoose.model("Tickets", ticketSchema);
