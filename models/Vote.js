const mongoose=require('mongoose');
const Vote=mongoose.module('Vote',{
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

module.exports=Vote