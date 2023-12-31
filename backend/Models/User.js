const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  role: {
    type: String,
    required: true,
    max: 10,
  },
  title: {
    type: String,
    required: true,
    max: 20,
  },
});

module.exports = mongoose.model("Users", userSchema);
