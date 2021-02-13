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
    },
    createdAT:{
        type:Date,
        default:Date.now
    },
    updateAT: {
         type: Date, 
         default: Date.now }
    
    })


module.exports=Reply