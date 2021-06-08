const mongoose = require('mongoose')
const User = require('../models/user')
const Comment = require('../models/comment')

const getComments = async (req, res, title) => {
    return new Promise((resolve, reject)=>{
        Comment.find({userId: req.user.id, newsTitle: title}, (err, docs)=>{
            if(err){
                console.log(err)
            }
            if(docs){
                console.log(docs)
                resolve(docs)
            }else{
                resolve([])
            }
        })
    })
}

module.exports = getComments
