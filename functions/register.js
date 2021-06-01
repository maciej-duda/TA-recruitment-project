const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')


const register = async(req,res) =>{
    const {inputEmail, inputPassword, inputPasswordRepeat} = req.body;
    let errors = []


//Check required fields

if(!inputEmail || !inputPassword || !inputPasswordRepeat){
    errors.push({ id: 'fields' , msg: 'Please fill all fields'})
}

//Check password match
if(inputPassword !== inputPasswordRepeat){
    errors.push({id: 'password_match' , msg: 'Password dont match'})
}


//Create user profile
const inputUser = new User({
        email: req.body.inputEmail,
        password: req.biody.inputPassword
    })

if(errors.length > 0){
    //Fail
    console.log(errors)
    //Render register page with error messages
    registerUser.save().then(result =>{
        res.render('register', {
            errors
        })
    })
    .catch(err => console.log(err))
    };
    
}

module.exports = register
