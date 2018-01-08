const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    name: String,
    local: {
      email: String,
      password: String
    },
    tokens: {
      type: Object
    },
    fb: { 
      fbId: String,
      displayName: String,
      picture: String
    }
  },
  { minimize: false }
);

const User = mongoose.model("users", usersSchema);

module.exports = User;
