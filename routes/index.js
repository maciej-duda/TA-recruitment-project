var express = require("express");
var router = express.Router();
var passport = require("passport");
var ensure = require("connect-ensure-login");

var upload = require('../config/upload.js');

var updateUserAvatar = require("../functions/updateUserAvatar.js")
var fetchImage = require("../functions/fetchImage.js")
var register = require("../functions/register.js");
const imageData = require("../models/imageData.js");

//GET
router.get("/", async function (req, res) {
  var errors = req.flash().error || [];
  if (req.user) {
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
  res.render("register", {
    user: req.user
  });
});

router.get("/upload", ensure.ensureLoggedIn('/login'), async function (req, res) {
  res.render("upload", {
    user: req.user
  });
});

router.get("/profile", ensure.ensureLoggedIn('/login'), async function (req, res) {
  res.render("profile", {
    user: req.user
  });
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

router.post("/upload", upload.single('file'), async (req, res, next) => {
  updateUserAvatar(req, res, req.file.id)
  fetchImage(req, res).then(imageData => {
    var errors = req.flash().error || [];
    res.render("index", {
      user: req.user,
      errors: errors,
      image: imageData
    });
  });
});

module.exports = router;
