const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')


const register = async(req,res) =>{
    const {inputUsername, inputEmail, inputPassword, inputPasswordRepeat} = req.body;
    let errors = []

//Check required fields

if(!inputUsername || !inputEmail || !inputPassword || !inputPasswordRepeat){
    errors.push('Please fill all fields')
}

//Check password match
if(inputPassword !== inputPasswordRepeat){
    errors.push('Password dont match')
}

 //Check if there is a user with the same username
 const a = await User.find({username: inputUsername})
 if(a.length>0){
     errors.push('Username already in use')
 }

 //Check if there is a user with the same email
 const b = await User.find({email: inputEmail})
 if(b.length>0){
     errors.push('E-mail already in use')
 }

    if(errors.length > 0){
        //Fail
        console.log(errors)
        //Render register page with error messages
        res.render('register', {
            errors
        })
    }else{
    //Hash password
    bcrypt.hash(req.body.inputPassword, 10, function(err, hash) {
        //Create user profile
        const registerUser = new User({
            username: req.body.inputUsername,
            email: req.body.inputEmail,
            password : hash,
        })
        //Save user into database
        registerUser.save().then(result =>{
            //Render login page with sucess registration message
            res.render('register',{
                sucess: true
            })
        })
        .catch(err => console.log(err))
    });
    }
    
}

module.exports = register
