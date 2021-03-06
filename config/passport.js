const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Load User Model
const User = require('../models/user')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ passReqToCallback: true, usernameField: 'inputEmail', passwordField: 'inputPassword' }, async (req, email, password, done) => {
            //Match User
            var znaleziono = false
            await User.findOne({ email: { $regex: new RegExp(email + "$", "i") } })
                .then(user => {
                    if (!user) {

                    } else {
                        //Match password
                        znaleziono = true
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return done(null, user)
                            } else {
                                return done(null, false, req.flash('error', 'Nieprawidłowe hasło!'))
                            }
                        })
                    }
                })
                .catch(err => console.log(err))
            if (!znaleziono) {
                await User.findOne({ username: { $regex: new RegExp(email + "$", "i") } })
                    .then(user => {
                        if (!user) {
                            return done(null, false, req.flash('error', 'Taki użytkownik nie istnieje!'))
                        }
                        //Match password
                        znaleziono = true
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return done(null, user)
                            } else {
                                return done(null, false, req.flash('error', 'Nieprawidłowe hasło!'))
                            }
                        })
                    })
                    .catch(err => console.log(err))
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}