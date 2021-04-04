const mongoose=require('mongoose');
const Reply=mongoose.model('Reply',{
    replybody:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
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