const mongoose=require('mongoose');
const Like=mongoose.module('Like',{
    count:{
        type:Number,
        required:true
    },
    postID:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    }
})

module.exports=Like