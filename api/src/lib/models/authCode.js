// models/authCode.js
const mongoose = require("mongoose");

const authCodeSchema = new mongoose.Schema({
  code: String,
  owner: String,
  used: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("AuthCode", authCodeSchema);