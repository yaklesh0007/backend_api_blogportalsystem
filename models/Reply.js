const mongoose=require('mongoose');
const Reply=mongoose.model('Reply',{
    replybody:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    commentID:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=Reply