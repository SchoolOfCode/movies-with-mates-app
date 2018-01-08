const express = require("express");
const router = express.Router();

const User = require("../models/users.js");

const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

var FACEBOOK_APP_ID = "192854244610400",
  FACEBOOK_APP_SECRET = "babc88bdef4940419f1212f4a711227c";

var fbOptions = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:5000/api/fb/login/auth/facebook/callback"
};

var fbCallback = function(accessToken, refreshToken, profile, done) {
  console.log(profile);
  User.findOne({ fb: { fbId: profile.id } }, function(err, user) {
    if (err) {
      return done(err);
    }
    console.log("hey", user);
    if (!user || user.length == 0) {
      console.log("ho");
      const newFBUser = new User({
        fb: {
          fbId: profile.id,
          displayName: profile.displayName
        }
      });
      newFBUser.save(function(err) {
        if (err) console.log(err);
        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
};
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy(fbOptions, fbCallback));

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/profile",
    failureRedirect: "/api"
  })
);

router.get("/logout", function(req, res) {
  console.log("logging out");
  req.session.destroy(function(err) {
    res.redirect("/api");
  });
});

module.exports = router;
