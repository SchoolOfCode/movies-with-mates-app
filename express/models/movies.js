const mongoose = require("mongoose");

var moviesSchema = mongoose.Schema(
  {
    movie: String,
    cinema: String,
    date: {type: Date},
    time: String,
    members: {
      type: Array,
      default: []
    },
    user: {
      type: Object
    }
  },
  { minimize: false }
);

var Movie = mongoose.model("events", moviesSchema);

module.exports = Movie;
