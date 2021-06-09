const mongoose = require('mongoose')
const User = require('../models/user')
const Comment = require('../models/comment')

const addComment = async (req, res, title, commentBody) => {
    if(title && commentBody){
        var comment = new Comment({
            userId : req.user.id,
            newsTitle : title,
            content: commentBody
        })
        comment.save().then(result=>{
            var url = "/news?title="+title
            res.redirect(url)
        })
        .catch(err=> console.log(err))
    }else{
        res.redirect('/')
    }
}

module.exports = addComment
