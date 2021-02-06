const mongoose=require('mongoose');
const Dislike=mongoose.module('Dislike',{
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

module.exports=Dislike