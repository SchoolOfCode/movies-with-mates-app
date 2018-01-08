const express = require("express");
const router = express.Router();

var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require("jsonwebtoken");

const User = require("../models/users.js");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "wtfwebtokens";

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("payload received", jwt_payload);
  // usually this would be a database call:
  User.findById(jwt_payload.id, (err, user) => {
    console.log(user);
    if (err) {
      res.json({ error: err });
    }
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

router.get("/", function(req, res) {
  console.log("req.headers.email", req.headers.email);
  User.findOne({ "local.email": req.headers.email }, (err, user) => {
    if (err) {
      res.json({ error: err });
    }
    res.json({ message: "we found one", payload: user });
  });
});

router.post("/", function(req, res) {
  console.log("ma body", req.body);
  User.findOne({ "local.email": req.body.local.email }, (err, user) => {
    console.log("inside the find: ", user);
    if (err) {
      res.json({ message: err });
    }
    if (!user) {
      res.status(401).json({ message: "no such user found" });
    }
    if (user.local.password === req.body.local.password) {
      console.log("stored password", user.local.password);
      console.log("password they sent off", req.body.local.password);
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      var payload = { id: user._id };
      var token = jwt.sign(payload, jwtOptions.secretOrKey, {
        expiresIn: 60 * 60 * 24
      });

      user.tokens.localToken = token;
      console.log("user after token", user);
      res.json({
        message: "ok",
        token: token,
        email: user.local.email,
        userId: user._id,
        name: user.name
      });
    } else {
      res.status(401).json({ message: "passwords did not match" });
    }
  });
});

module.exports = router;
