const mongoose = require('mongoose')
const User = require('../models/user')
const imageData = require('../models/imageData')

const fetchImage = async (req, res) => {
    return new Promise((resolve, reject)=>{
        imageData.findOne({files_id : req.user.imgId}).then(image=>{
            if(image.data){
                resolve (image.data.toString('base64'))
            }else{
                reject("error")
            }
        }).catch(err => console.log(err))
    })
}

module.exports = fetchImage
