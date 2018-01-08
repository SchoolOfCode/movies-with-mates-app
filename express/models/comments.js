const mongoose = require("mongoose");

var commentsSchema = new mongoose.Schema({
  user: String,
  picture: String,
  displayName: String,
  movie: String,
  comment: String
},{timestamps: true});

var Comment = mongoose.model("comments", commentsSchema);

module.exports = Comment;
