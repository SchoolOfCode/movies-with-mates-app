const express = require("express");

const router = express.Router();

const Movie = require("../models/movies.js");
const Comments = require("../models/comments.js");
const User = require("../models/users.js");

//new get request

// router.get("/", (req,res) => {
//
//   if(req.query["search"]){
//
//     let userInput = new RegExp(req.query.search, "gi");
//
//     Movie.find(
//       {
//         $or: [
//           { cinema: { $regex: userInput } },
//           { movie: { $regex: userInput } },
//           { date: { $regex: userInput } },
//           { time: { $regex: userInput } }
//         ]
//       },
//       (err, films) => {
//         if (err) {
//           return res.json({ error: "error" });
//         }
//         return res.json({ payload: films });
//       }
//     );
//
//   }
//
//   if(req.query["activity"]){
//     Comments.find({
//       user: ...
//     }, {},  (err, comments) => {
//       Movies.find({
//         [...comments.movies]
//       })
//     })
//   }
//
// })

router.get("/", (req, res, next) => {
  console.log("req.query", req.query);
  if (req.query.user) {
    Movie.find({ members: req.query.user }, (err, movies) => {
      if (err) {
        res.json({ error: err });
      }
      res.json({ going: movies });
    });
  } else {
    let yesterday = new Date().getDate() - 1;
    Movie.find(
      {
        date: {
          $gte: new Date(2018, 0, yesterday).toISOString()
        }
      },
      (err, movies) => {
        if (err) {
          res.json({ Error: err });
        }
        res.json({ payload: movies });
      }
    );
  }
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json({ payload: movie });
  });
});

/** join tests **/

router.get("/:id/join", (req, res, next) => {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) {
      return res.json({ error: err });
    }
    User.find(
      {
        _id: { $in: movie.members }
      },
      (err, users) => {
        if (err) {
          res.json({ error: err });
        }
        res.json({ attendees: users });
      }
    );
  });
});

router.post("/:id/join", (req, res, next) => {
  console.log("req.body", req.body);
  const { user } = req.body;
  console.log("user", user);
  Movie.findById(req.params.id, (err, movie) => {
    if (err) {
      return res.json({ error: err });
    }
    if (movie.members.includes(user)) {
      return res.json({ message: "Already a member", payload: movie });
    }
    movie.members.push(user);
    movie.save((err, movie) => {
      res.json({ payload: movie });
    });
  });
});
//
router.delete("/:id/join", (req, res, next) => {
  const { user } = req.body;
  Movie.findById(req.params.id, (err, movie) => {
    if (err) {
      return res.json({ error: err });
    }
    if (!movie.members.includes(user)) {
      return res.json({ message: "Not a member", payload: movie });
    }
    //TODO: make this work by splicing etc...
    let userIndex = movie.members.indexOf(user);
    movie.members = [
      ...movie.members.splice(0, userIndex),
      ...movie.members.splice(userIndex + 1)
    ];
    movie.save((err, movie) => {
      res.json({ payload: movie });
    });
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const movieEvent = new Movie(req.body);
  movieEvent.save((err, movie) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json({ message: "Film event" });
  });
});

router.delete("/:id", function(req, res, next) {
  Movie.findOneAndRemove({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ message: "deleted a film" });
  });
});

router.get("/search/:input", function(req, res) {
  const { input } = req.params;
  let userInput = new RegExp(input, "gi");
  Movie.find(
    {
      $or: [
        { cinema: { $regex: userInput } },
        { movie: { $regex: userInput } },
        { time: { $regex: userInput } }
      ]
    },
    (err, films) => {
      console.log("Films", films);
      console.log("Input", userInput);
      if (err) {
        console.log("Error:", err);
        return res.json({ error: err });
      }
      return res.json({ payload: films });
    }
  );
});

// router.get("/activity/:hack", function(req, res) {
//   console.log("in activity");
//   console.log("req.headers.activity", JSON.parse(req.headers.activity));
//   let arrayOfIDs = JSON.parse(req.headers.activity);
//   Movie.find(
//     {
//       _id: { $in: arrayOfIDs }
//     },
//     (err, movies) => {
//       if (err) {
//         return res.json({ error: err });
//       }
//       return res.json({ movies });
//     }
//   );
// });

/* comments */

router.get("/activity/:hack", (req, res) => {
  console.log("req.query", req.query);
  if (req.query.user) {
    Comments.find({ user: req.query.user }, (err, docs) => {
      console.log("docs", docs);
      if (err) {
        return res.json({ error: err });
      }
      let movies = docs.map(film => film.movie);
      console.log("movies", movies);
      Movie.find({ _id: { $in: movies } }, (err, films) => {
        console.log("films", films);
        if (err) {
          return res.json({ error: err });
        }
        return res.json({ films });
      });
    });
  }
});

router.get("/:id/comments", (req, res, next) => {
  console.log(req.params.id);
  Comments.find({ movie: req.params.id }, (err, comments) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json({ payload: comments });
  });
});

router.post("/:id/comments", (req, res, next) => {
  const Comment = new Comments(req.body);
  Comment.save((err, comment) => {
    if (err) {
      return res.json({ error: err });
    }
    User.findById({ _id: req.body.user }, (err, user) => {
      if (err) {
        res.json({ error: err });
      }
      let picture = user.fb.picture;
      res.json({ message: "Comment saved", comment, picture });
    });
  });
});

router.delete("/:id/comments/:cid", (req, res, next) => {
  Comments.findOneAndRemove({ _id: req.params.cid }, (err, movie) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ message: "deleted a comment" });
  });
});

router.get("/thing/:id", (req, res) => {
  Movie.find({ "user.id": req.params.id }, (err, movies) => {
    if (err) {
      res.json({ err });
    }
    const arr1 = movies.map(film => film._id);
    Comments.find({ user: req.params.id }, (errr, comments) => {
      if (errr) {
        res.json(errr);
      }
      const arr2 = comments.map(c => c.movie);
      Movie.find({ members: req.params.id }, (errrUpinHere, movies2) => {
        if (errrUpinHere) {
          res.json({ errrUpinHere });
        }
        const arr3 = movies2.map(f => f._id);

        console.log("arr1", arr1);
        console.log("arr2", arr2);
        console.log("arr3", arr3);

        Comments.find({
          $or: [
            { movie: { $in: arr1 } },
            { movie: { $in: arr2 } },
            { movie: { $in: arr3 } }
          ]
        })
          .sort({ updatedAt: -1 })
          .exec((error, comments) => {
            if (error) {
              return res.json(error);
            }
            let noUser = comments.filter(c => c.user !== req.params.id);
            res.json({
              comments: noUser,
              theirEvents: arr1,
              commentedEvents: arr2,
              going: arr3,
              postedMovies: movies,
              goingMovies: movies2
            });
          });
      });
    });
  });
});

module.exports = router;
