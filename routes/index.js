var express = require("express");
var router = express.Router();
var passport = require("passport");
var ensure = require("connect-ensure-login");

//const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");

var register = require("../functions/register.js");

//GET
router.get("/", async function (req, res) {
  var errors = req.flash().error || [];
  if (req.user) {
    console.log(req.user);
    res.render("index", {
      user: req.user,
      errors: errors,
    });
  } else {
    res.redirect("/login")
  }
});

router.get("/login", ensure.ensureLoggedOut('/'), async function (req, res) {
  var errors = req.flash().error || [];
  res.render("login", {
    errors: errors,
  });
});

router.get("/register", ensure.ensureLoggedOut('/'), async function (req, res) {
  res.render("register");
});

router.get("/upload", async function (req, res) {
  res.render("upload");
});

router.get("/profile", ensure.ensureLoggedIn('/login'), async function (req, res) {
  res.render("profile");
});
//POST

router.post("/register", ensure.ensureLoggedOut('/'), async function (req, res) {
  register(req, res);
});

router.post("/login", ensure.ensureLoggedOut('/'), (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.post("/upload", uploadController.uploadFile);

module.exports = router;
