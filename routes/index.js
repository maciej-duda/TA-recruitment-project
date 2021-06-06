var express = require("express");
var router = express.Router();
var passport = require("passport");
var ensure = require("connect-ensure-login");

var updateUserAvatar = require("../functions/updateUserAvatar.js")
var register = require("../functions/register.js");

var upload = require('../config/upload.js')

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

router.get("/logout", ensure.ensureLoggedIn('/login'), function (req, res) {
  req.logout()
  res.redirect('/login')
})
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
  if(req.file){
    await updateUserAvatar(req, res, req.file.path)
    res.redirect('/profile')
  }else{
    res.redirect('/profile')
  }
});

module.exports = router;
