const express = require("express");
const router = express.Router();

const User = require("../models/users.js");

router.post("/", function(req, res) {
  console.log("register bodaay", req.body);
  console.log("tokens", req.body.tokens);
  const newUser = new User({
    name: req.body.name,
    local: {
      email: req.body.local.email,
      password: req.body.local.password
    },
    tokens: {},
    fb: {
      fbId: "",
      displayName: ""
    }
  });
  console.log("newUser", newUser);
  newUser.save((err, user) => {
    if (err) {
      res.json({ error: err });
    }
    res.json({ message: "User saved", test: user });
  });
});

module.exports = router;
