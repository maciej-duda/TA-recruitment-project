var express = require("express");
var router = express.Router();
var passport = require("passport");

var register = require('../functions/register.js')

//GET
router.get("/", async function (req, res) {
  var errors = req.flash().error || []
  console.log(errors)
  if(req.user){
    console.log(req.user)
    res.render('index', {
      user: req.user,
      errors: errors
    })
  }else{
    res.render('index', {
      errors: errors
    })
  }
});

router.get("/login", async function (req, res) {
  res.render("login");
});

router.get("/register", async function (req, res) {
  res.render("register");
});

//POST

router.post('/register', async function(req, res) {
    register(req, res)
 });

 router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/',
      failureFlash: true
  })(req, res, next)
})

module.exports = router;
