var express = require("express");
var router = express.Router();
var passport = require("passport");
//const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");

var register = require("../functions/register.js");

//GET
router.get("/", async function (req, res) {
  var errors = req.flash().error || [];
  console.log(errors);
  if (req.user) {
    console.log(req.user);
    res.render("index", {
      user: req.user,
      errors: errors,
    });
  } else {
    res.render("index", {
      errors: errors,
    });
  }
});

router.get("/login", async function (req, res) {
  res.render("login");
});

router.get("/register", async function (req, res) {
  res.render("register");
});

router.get("/upload", async function (req, res) {
  res.render("upload");
});

router.get("/profile", async function (req, res) {
  res.render("profile");
});
//POST

router.post("/register", async function (req, res) {
  register(req, res);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.post("/upload", uploadController.uploadFile);

module.exports = router;
