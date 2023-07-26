const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  tickets: {
    type: Array,
  },
  users: {
    type: Array,
  },
  fulldate:{
    type: String,
  },
  fulldate:{
    type: String,
  },
  onlydate:{
    type: String,
  },
  
});

module.exports = mongoose.model("Projects", projectSchema);
