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
            email: req.body.inputEmail,
            password : hash
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
