var express = require("express");
var router = express.Router();
var passport = require("passport");

var register = require('../functions/register.js')

//var register = require('../functions/register.js')

//GET
router.get("/", async function (req, res) {
  res.render("index");
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

module.exports = router;
