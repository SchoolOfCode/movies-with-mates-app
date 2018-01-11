const express = require("express");
const router = express.Router();

const User = require("../models/users.js");

router.get("/", function(req, res) {
  // console.log("header", req.headers);
  let fbId = req.headers.fbid;
  User.findOne({ "fb.fbId": fbId }, (err, user) => {
    if (err) {
      res.json({ error: err });
    }
    res.json({ payload: user });
  });
});

router.post("/", function(req, res) {
  // console.log("req.body", req.body);
  User.findOne({ "fb.fbId": req.body.fb.fbId }, function(err, user) {
    if (err) {
      return res.json({ error: err });
    }
    if (!user || user.length == 0) {
      // console.log("ho");
      const newFBUser = new User({
        name: req.body.name,
        local: { email: req.body.local.email },
        tokens: {
          accessToken: req.body.tokens.accessToken
        },
        fb: {
          fbId: req.body.fb.fbId,
          displayName: req.body.name,
          picture: req.body.fb.picture
        }
      });

      // console.log(newFBUser);
      return newFBUser.save(function(err) {
        if (err) {
          console.log(err);
        }
        res.json({ message: "User created" });
      });
    }

    user.tokens.accessToken = req.body.tokens.accessToken;
    let userId = user._id;
    let displayName = user.fb.displayName;
    console.log(userId);
    // console.log("hey", user);

    res.json({
      userAccessToken: req.body.tokens.accessToken,
      fbId: req.body.fb.fbId,
      picture: req.body.fb.picture,
      userId,
      displayName,
      email: req.body.local.email
    });
  });
});

module.exports = router;
