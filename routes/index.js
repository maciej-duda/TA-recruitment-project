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
  var errors = req.flash().error || [];
  res.render("profile", {
    user: req.user,
    errors: errors
  });
});

router.get("/about", async function (req, res) {
  res.render("about", {
    user: req.user
  });
});

router.get("/contact", async function (req, res) {
  res.render("contact", {
    user: req.user
  });
});
/* AUTHOR PAGES */
router.get("/maciej", ensure.ensureLoggedIn('/login'), async function (req, res) {
  res.render("maciej", {
    user: req.user
  });
});

router.get("/jacob", ensure.ensureLoggedIn('/login'), async function (req, res) {
  res.render("jacob", {
    user: req.user
  });
});

router.get("/adam", ensure.ensureLoggedIn('/login'), async function (req, res) {
  res.render("adam", {
    user: req.user
  });
});

/* END OF AUTHOR PAGES */

/* NEWS PAGES */

router.get("/news/welcome-to-your-recruitment-task", ensure.ensureLoggedIn('/login'), async function (req, res) {
  res.render("news/welcome-to-your-recruitment-task", {
    user: req.user
  });
});

/* END OF NEWS PAGES */
router.get("/logout", ensure.ensureLoggedIn('/login'), function (req, res) {
  req.logout()
  res.redirect('/login')
})
//POST

router.post("/register", ensure.ensureLoggedOut('/'), async function (req, res) {
  register(req, res);
});

router.post("/login", ensure.ensureLoggedOut('/'), (req, res, next) => {
  if(req.body.checkbox){
    req.sessionOptions.maxAge = 3 * 60 * 60 * 1000 // valid for 3h
  }else{
    req.sessionOptions.maxAge = 15 * 60 * 1000 // valid for 15min
  }
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
    req.flash('error', 'Wrong file type or size')
    res.redirect('/profile')
  }
});

module.exports = router;
