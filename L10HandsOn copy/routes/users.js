var express = require("express");
var router = express.Router();
var models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const auth = require("../config/auth");
const bcrypt = require("bcryptjs");
// const passport = require("passport");
// const connectEnsure = require("connect-ensure-login");
var models = require("../models");
// var authService = require("../services/auth");

/* GET users listing. */

router.get("/", (req, res) => {
  res.redirect("/users/login");
});

router.get("/signup", function(req, res, next) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users
    .findOne({
      where: {
        Username: req.body.Username
      }
    })
    .then(user => {
      if (user) {
        res.send("this user already exists");
      } else {
        models.users
          .create({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Email: req.body.email,
            Username: req.body.username,
            Password: hashedPassword
          })
          .then(createdUser => {
            const isMatch = createdUser.comparePassword(req.body.password);

            if (isMatch) {
              const userId = createdUser.UserId;
              const token = auth.signUser(createdUser);
              res.cookie("jwt", token);
              // res.redirect("profile/" + userId);
              res.redirect("login")
            } else {
              res.send("not a match");
            }
          });
      }
    });
});

router.get("/login", function(req, res, next) {
  res.render("login");
});

router.post("/login", function(req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users
    .findOne({
      where: {
        Username: req.body.username
      }
    })
    .then(user => {
      const isMatch = user.comparePassword(req.body.password);
      if (user.Deleted) {
        res.redirect("login");
      }
      if (!user) {
        return res.status(401).json({
          message: "Login Failed"
        });
      }
      if (isMatch) {
        const userId = user.UserId;
        const token = auth.signUser(user);
        res.cookie("jwt", token);
        // res.send('User logged In! Hooray!')
        if (user.Admin) {
          res.redirect("admin");
        } else {
          res.redirect("profile/" + userId);
        }
      } else {
        res.redirect("login");
      }
      
    });
});

router.get("/profile/:id", auth.verifyUser, function(req, res, next) {
  if (req.params.id !== String(req.user.UserId)) {
    res.send("This is not your profile");
  } else {
    models.posts
      .findAll({
        where: {
          [Op.and]: {
            Deleted: null,
            UserId: req.user.UserId
          }
        },
        include: [models.users]
      })
      .then(post => {
        let status;
        let display;
        if (req.user.Admin) {
          status = "Admin";
          display = "Go to Admin Page";
        } else {
          status = "Normal User";
        }
        res.render("profile", {
          FirstName: req.user.FirstName,
          LastName: req.user.LastName,
          Email: req.user.Email,
          UserId: req.user.UserId,
          Username: req.user.Username,
          Status: status,
          Display: display,
          posts: post
        });
      });
  }
});

router.get("/logout", function(req, res) {
  res.cookie("jwt", null);
  res.redirect("/users/login");
});

//admin access

router.get("/admin", auth.verifyUser, function(req, res, next) {
  if (req.user.Admin) {
    models.users
      .findAll({
        where: {
          Deleted: null
        }
      })
      .then(usersFound => {
        res.render("admin", {
          users: usersFound
        });
      });
  } else {
    if (!usersFound) {
      res.redirect("/users/login");
    }
  }
});

router.get("/admin/editUser/:id", (req, res) => {
  let userId = req.params.id;
  models.users
    .find({
      where: {
        UserId: userId
      }
    })
    .then(user => {
      res.render("specificUser", {
        UserId: user.UserId,
        Username: user.Username,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email
      });
    });
});

router.get("/admin/editUser/:id", auth.verifyUser, function(req, res) {
  let editUserId = parseInt(req.params.id);
  models.posts
    .find({
      where: {
        UserId: editUserId
      },
      include: [models.users]
    })
    .then(post => {
      res.render("specificUser", {
        FirstName: post.user.FirstName,
        LastName: post.user.LastName,
        Email: post.user.Email,
        UserId: post.user.UserId,
        Username: post.user.Username,
        posts: post
      });
    });
});

//get posts

router.put("/admin/editUser/:id", (req, res) => {
  let userId = parseInt(req.params.id);
  models.posts
    .update(
      {
        PostTitle: req.body.postTitle,
        PostBody: req.body.postBody
      },
      {
        where: {
          UserId: userId
        }
      }
    )
    .then(result => {
      res.send();
    });
});

router.delete("/admin/editUser/:id/delete", auth.verifyUser, (req, res) => {
  if (req.user.Admin) {
    let userId = parseInt(req.params.id);
    models.users
      .update(
        {
          Deleted: true
        },
        {
          where: {
            UserId: userId
          }
        }
      )
      .then(user => {
        res.redirect("users/admin");
      });
  }
});

router.delete("/admin/editUser/:id/delete", auth.verifyUser, (req, res) => {
  if (req.user.Admin) {
    let userId = parseInt(req.params.id);
    models.posts
      .update(
        {
          Deleted: "true"
        },
        {
          where: {
            UserId: userId
          }
        }
      )
      .then(post => {
        models.users.update(
          {
            Deleted: "true"
          },
          {
            where: {
              UserId: userId
            }
          }
        );
      })
      .then(users => {
        res.redirect("/users/admin");
      });
  } else {
    res.send("You are not able to delete this account");
  }
});

//posts section
router.post("/profile/:id", function(req, res) {
  let userId = parseInt(req.params.UserId);
  models.posts
    .findOrCreate({
      where: {
        PostTitle: req.body.postTitle,
        PostBody: req.body.postBody,
        UserId: req.params.id
      }
    })
    .then(post => {
      res.redirect(req.originalUrl);
    });
});

router.get("/posts", function(req, res, next) {
  models.posts
    .findAll({
      where: {
        Deleted: null
      }
    })
    .then(posts => {
      res.render("posts", {
        PostId: req.posts.PostId,
        PostTitle: req.posts.PostTitle,
        PostBody: req.posts.PostBody
      });
    });
});

// router.get("/posts", function(req, res, next) {
//   models.posts
//   .findAll({
//     where: {
//         Deleted: null,
//     },
//     include: [models.users]
//   })
//   .then(post => {
//    res.render('posts', {
//     PostTitle: req.post.PostTitle,
//     PostBody: req.post.PostBody,
//    });
//   });
// });

router.get("/posts/:id", (req, res) => {
  let postId = parseInt(req.params.id);
  models.posts
    .find({
      where: {
        PostId: postId
      },
      include: [models.users]
    })
    .then(post => {
      res.render("post", {
        PostTitle: post.PostTitle,
        PostBody: post.PostBody,
        Username: post.user.Username,
        PostId: post.PostId,
        UserId: post.UserId
      });
    });
});
//edit posts
router.put("/posts/:id", (req, res) => {
  console.log(req.body);
  let postId = parseInt(req.params.id);
  models.posts
    .update(
      {
        PostTitle: req.body.postTitle,
        PostBody: req.body.postBody
      },
      {
        where: {
          PostId: postId
        }
      }
    )
    .then(result => {
      res.send();
    });
});

router.delete("/posts/:id/delete", (req, res) => {
  let postId = parseInt(req.params.id);
  models.posts
    .update(
      {
        Deleted: "true"
      },
      {
        where: {
          PostId: postId
        }
      }
    )
    .then(post => {
      res.redirect("/users/profile/{{req.post.UserId}}");
    });
});

module.exports = router;
