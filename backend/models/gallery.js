const mongoose = require("mongoose");

const artPieceSchema = new mongoose.Schema({
  title: String,
  author: String,
  style: String,
  url: String,
});

const gallerySchema = new mongoose.Schema({
  userid: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  artpieces: [artPieceSchema],
});

module.exports = mongoose.model("Gallery", gallerySchema);
