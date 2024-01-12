// models/vote.js
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  nomorKandidat: Number,
  option: String,
  avataruri: String,
  visi: String,
  misi: String,
  count: Number,
});

module.exports = mongoose.model("Vote", voteSchema);
