var express = require('express')
var router = express.Router()
var passport = require('passport')

//var register = require('../functions/register.js')

//GET
router.get('/', async function(req, res) {
    res.render('index')
});

//POST

module.exports = router;